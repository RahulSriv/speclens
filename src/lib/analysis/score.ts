import type { AmbiguityFinding } from "@/lib/analysis/schema";

export const SEVERITY_PENALTY: Record<AmbiguityFinding["severity"], number> = {
  critical: 22,
  high: 12,
  medium: 5,
  low: 2,
};

export function computeClarityScore(findings: AmbiguityFinding[]): number {
  const penalty = findings.reduce((sum, f) => sum + SEVERITY_PENALTY[f.severity], 0);
  return Math.max(0, Math.min(100, 100 - penalty));
}
