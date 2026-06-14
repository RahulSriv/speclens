import { streamText } from "ai";
import { NextRequest } from "next/server";
import { getModel } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rate-limit";
import { AnalyzeRequestSchema, AmbiguityFindingSchema, type AmbiguityFinding } from "@/lib/analysis/schema";
import { SYSTEM_PROMPT, buildUserPrompt } from "@/lib/analysis/prompt";
import { specHash, getCached, setCached } from "@/lib/cache";
import { EXAMPLE_SPEC, EXAMPLE_FINDINGS } from "@/lib/analysis/example";

export const runtime = "nodejs";
export const maxDuration = 60;

// Pre-seed cache with the example spec so landing page demo is always consistent
setCached(specHash(EXAMPLE_SPEC, "shared"), EXAMPLE_FINDINGS);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = AnalyzeRequestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { spec, provider, apiKey } = parsed.data;
  const resolvedKey = apiKey ?? undefined;

  if (provider !== "shared" && !resolvedKey) {
    return Response.json({ error: "API key required for this provider" }, { status: 400 });
  }

  // Rate limit only shared-key requests
  if (provider === "shared") {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      return Response.json(
        { error: "Daily limit reached", code: "RATE_LIMITED" },
        { status: 429 }
      );
    }

    // Check cache for shared provider
    const hash = specHash(spec, provider);
    const cached = getCached(hash);
    if (cached) {
      const streamResponse = streamFromCache(cached);
      streamResponse.headers.set("X-Remaining-Analyses", String(remaining));
      streamResponse.headers.set("X-Cache", "HIT");
      return streamResponse;
    }

    const streamResponse = await runStream(spec, provider, resolvedKey, hash);
    streamResponse.headers.set("X-Remaining-Analyses", String(remaining));
    return streamResponse;
  }

  // BYOK: check cache keyed by spec + provider (API key never goes in the hash)
  const hash = specHash(spec, provider);
  const cached = getCached(hash);
  if (cached) {
    const res = streamFromCache(cached);
    res.headers.set("X-Cache", "HIT");
    return res;
  }

  return runStream(spec, provider, resolvedKey, hash);
}

function streamFromCache(findings: AmbiguityFinding[]): Response {
  const lines = findings.map((f) => JSON.stringify(f)).join("\n") + "\n";
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(lines));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

async function runStream(
  spec: string,
  provider: Parameters<typeof getModel>[0],
  apiKey?: string,
  cacheKey?: string
): Promise<Response> {
  const model = getModel(provider, apiKey);

  try {
    const result = streamText({
      model,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(spec) }],
      temperature: 0,
    });

    if (!cacheKey) {
      return result.toTextStreamResponse();
    }

    // Intercept the stream to populate cache
    const textStream = result.textStream;
    const encoder = new TextEncoder();
    let buffer = "";
    const collectedFindings: AmbiguityFinding[] = [];

    const intercepted = new ReadableStream({
      async start(controller) {
        for await (const chunk of textStream) {
          controller.enqueue(encoder.encode(chunk));
          buffer += chunk;
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const obj = JSON.parse(trimmed);
              if (obj.type !== "complete") {
                const p = AmbiguityFindingSchema.safeParse(obj);
                if (p.success) collectedFindings.push(p.data);
              }
            } catch { /* skip */ }
          }
        }
        // flush remaining buffer
        if (buffer.trim()) {
          try {
            const obj = JSON.parse(buffer.trim());
            if (obj.type !== "complete") {
              const p = AmbiguityFindingSchema.safeParse(obj);
              if (p.success) collectedFindings.push(p.data);
            }
          } catch { /* skip */ }
        }
        if (collectedFindings.length > 0) {
          setCached(cacheKey, collectedFindings);
        }
        controller.close();
      },
    });

    return new Response(intercepted, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI provider error";
    return Response.json({ error: message }, { status: 502 });
  }
}
