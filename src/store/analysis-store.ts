import { create } from "zustand";
import type { AmbiguityFinding } from "@/lib/analysis/schema";

type Status = "idle" | "streaming" | "complete" | "error";

interface AnalysisState {
  findings: AmbiguityFinding[];
  status: Status;
  error: string | null;
  clarityScore: number | null;
  totalCount: number | null;
  setStreaming: () => void;
  addFinding: (finding: AmbiguityFinding) => void;
  setComplete: (clarityScore: number, totalCount: number) => void;
  setError: (msg: string) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  findings: [],
  status: "idle",
  error: null,
  clarityScore: null,
  totalCount: null,

  setStreaming: () => set({ status: "streaming", findings: [], error: null, clarityScore: null, totalCount: null }),
  addFinding: (finding) => set((s) => ({ findings: [...s.findings, finding] })),
  setComplete: (clarityScore, totalCount) => set({ status: "complete", clarityScore, totalCount }),
  setError: (error) => set({ status: "error", error }),
  reset: () => set({ findings: [], status: "idle", error: null, clarityScore: null, totalCount: null }),
}));
