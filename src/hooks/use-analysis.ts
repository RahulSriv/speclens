"use client";

import { useCallback } from "react";
import { useAnalysisStore } from "@/store/analysis-store";
import { useProviderStore } from "@/store/provider-store";
import { AmbiguityFindingSchema, type AmbiguityFinding } from "@/lib/analysis/schema";

const TIMEOUT_MS = 30_000;

const SEVERITY_PENALTY: Record<AmbiguityFinding["severity"], number> = {
  critical: 22,
  high: 12,
  medium: 5,
  low: 2,
};

function computeClarityScore(findings: AmbiguityFinding[]): number {
  const penalty = findings.reduce((sum, f) => sum + SEVERITY_PENALTY[f.severity], 0);
  return Math.max(0, Math.min(100, 100 - penalty));
}

export function useAnalysis() {
  const { setStreaming, addFinding, setComplete, setError } = useAnalysisStore();
  const { provider, apiKey, setRemaining } = useProviderStore();

  const analyze = useCallback(async (spec: string) => {
    setStreaming();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spec, provider, apiKey }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 429) {
          setRemaining(0);
          setError("Daily limit reached. Connect your own free key to continue.");
        } else {
          setError(data.error ?? `Analysis failed (${res.status}). Please try again.`);
        }
        return;
      }

      const remaining = res.headers.get("X-Remaining-Analyses");
      if (remaining !== null) setRemaining(Number(remaining));

      const reader = res.body?.getReader();
      if (!reader) { setError("Stream unavailable."); return; }

      const decoder = new TextDecoder();
      let buffer = "";
      const collectedFindings: AmbiguityFinding[] = [];

      const processLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        try {
          const obj = JSON.parse(trimmed);
          if (obj.type === "complete") return; // we compute this ourselves
          const parsed = AmbiguityFindingSchema.safeParse(obj);
          if (parsed.success) {
            addFinding(parsed.data);
            collectedFindings.push(parsed.data);
          }
        } catch {
          // skip non-JSON lines
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) processLine(line);
      }

      if (buffer.trim()) processLine(buffer);

      if (collectedFindings.length > 0) {
        const score = computeClarityScore(collectedFindings);
        setComplete(score, collectedFindings.length);
      } else {
        setError("No findings returned. Check your API key or try a longer spec.");
      }

    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof Error && err.name === "AbortError") {
        setError("Request timed out after 30 seconds. Check your API key and try again.");
      } else {
        setError(err instanceof Error ? err.message : "Network error. Please try again.");
      }
    }
  }, [provider, apiKey, setStreaming, addFinding, setComplete, setError, setRemaining]);

  return { analyze };
}
