import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createGroq } from "@ai-sdk/groq";
import type { Provider } from "@/lib/analysis/schema";

export function getModel(provider: Provider, apiKey?: string) {
  switch (provider) {
    case "shared": {
      const groq = createGroq({ apiKey: process.env.GROQ_API_KEY ?? "" });
      return groq("llama-3.3-70b-versatile");
    }
    case "gemini": {
      const google = createGoogleGenerativeAI({
        apiKey: apiKey ?? process.env.GEMINI_API_KEY ?? "",
      });
      return google("gemini-2.0-flash");
    }
    case "claude": {
      const anthropic = createAnthropic({ apiKey: apiKey ?? "" });
      return anthropic("claude-sonnet-4-6");
    }
    case "openai": {
      const openai = createOpenAI({ apiKey: apiKey ?? "" });
      return openai("gpt-4o");
    }
    case "groq": {
      const groq = createGroq({ apiKey: apiKey ?? "" });
      return groq("llama-3.3-70b-versatile");
    }
  }
}
