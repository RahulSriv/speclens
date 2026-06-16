import { z } from "zod";

export const AmbiguityFindingSchema = z.object({
  id: z.string().uuid(),
  category: z.enum([
    "underspecified",
    "undefined_term",
    "contradiction",
    "missing_edge_case",
    "implicit_assumption",
    "scope_gap",
  ]),
  severity: z.enum(["critical", "high", "medium", "low"]),
  excerpt: z.string(),
  issue: z.string(),
  question: z.string(),
});


export const AnalyzeRequestSchema = z.object({
  spec: z.string().min(50, "Spec must be at least 50 characters").max(50000, "Spec exceeds 50,000 character limit"),
  provider: z.enum(["shared", "gemini", "groq", "claude", "openai"]),
  apiKey: z.string().nullish(),
});

export type AmbiguityFinding = z.infer<typeof AmbiguityFindingSchema>;
export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
export type Category = AmbiguityFinding["category"];
export type Severity = AmbiguityFinding["severity"];
export type Provider = AnalyzeRequest["provider"];
