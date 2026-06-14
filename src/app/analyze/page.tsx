"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SpecInput } from "@/components/analyze/spec-input";
import { Button } from "@/components/ui/button";
import { FindingCard, FindingCardSkeleton } from "@/components/analyze/finding-card";
import { useAnalysisStore } from "@/store/analysis-store";
import { useProviderStore } from "@/store/provider-store";
import { useAnalysis } from "@/hooks/use-analysis";
import { cn } from "@/lib/utils";
import { Search, Copy, Check, RotateCcw, Zap } from "lucide-react";
import { EXAMPLE_SPEC, SAMPLE_SPEC } from "@/lib/analysis/example";
import { ProviderPicker } from "@/components/provider/provider-picker";

function ClarityScore({ score }: { score: number }) {
  const color = score >= 71 ? "text-success" : score >= 41 ? "text-warning" : "text-error";
  return (
    <span className={cn("text-heading-lg font-bold tabular-nums", color)}>{score}</span>
  );
}

function copyFindings(findings: ReturnType<typeof useAnalysisStore.getState>["findings"]) {
  const md = findings.map((f, i) => (
    `### Finding ${i + 1}: ${f.category.replace(/_/g, " ")} (${f.severity})\n\n` +
    `> "${f.excerpt}"\n\n` +
    `**Issue:** ${f.issue}\n\n` +
    `**Question:** ${f.question}`
  )).join("\n\n---\n\n");
  navigator.clipboard.writeText(md);
}

export default function AnalyzePage() {
  return (
    <Suspense>
      <AnalyzePageInner />
    </Suspense>
  );
}

function AnalyzePageInner() {
  const searchParams = useSearchParams();
  const [spec, setSpec] = useState(() =>
    searchParams.get("example") === "true" ? EXAMPLE_SPEC : ""
  );
  const [copied, setCopied] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { findings, status, error, clarityScore, totalCount, reset } = useAnalysisStore();
  const { provider, remaining, loadFromStorage } = useProviderStore();
  const { analyze } = useAnalysis();

  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  const isStreaming = status === "streaming";
  const isComplete  = status === "complete";
  const isError     = status === "error";
  const hasFindings = findings.length > 0;
  const isLimited   = provider === "shared" && remaining === 0;

  function handleAnalyze() {
    if (!spec.trim() || isStreaming) return;
    analyze(spec);
  }

  function handleCopy() {
    copyFindings(findings);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[560px_1fr]">
        {/* Left panel */}
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] overflow-y-auto border-r border-border-default p-8 lg:p-10 space-y-5">
          <div>
            <h1 className="text-heading-xl text-text-primary">Analyze your spec</h1>
            <p className="mt-1.5 text-body-md text-text-secondary">
              Paste a PRD, user story, or requirements doc to find ambiguities before they ship.{" "}
              <button
                onClick={() => { reset(); setSpec(SAMPLE_SPEC); }}
                className="text-accent-default hover:text-accent-hover transition-colors"
              >
                Try sample spec →
              </button>
            </p>
          </div>

          <SpecInput value={spec} onChange={setSpec} disabled={isStreaming} />

          {isLimited && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-elevated border border-border-default">
              <span className="text-warning mt-0.5">⚠</span>
              <div>
                <p className="text-body-md text-text-secondary">
                  Daily limit reached. Try again tomorrow — or <span onClick={() => setPickerOpen(true)} className="text-accent-default hover:text-accent-hover transition-colors cursor-pointer">connect your own key</span>.
                </p>
              </div>
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            loading={isStreaming}
            disabled={!spec.trim() || isStreaming || isLimited}
            className="w-full"
            size="lg"
          >
            <Zap className="w-4 h-4" />
            {isStreaming ? "Analyzing…" : "Analyze spec"}
          </Button>
        </div>

        {/* Right panel */}
        <div className="overflow-y-auto p-8 lg:p-10">
          {/* Empty state */}
          {status === "idle" && !hasFindings && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3 text-center">
              <Search className="w-10 h-10 text-text-muted" />
              <h3 className="text-heading-md text-text-secondary">Your findings will appear here</h3>
              <p className="text-body-md text-text-muted max-w-xs">
                Paste a spec on the left to begin.
              </p>
            </div>
          )}

          {/* Results header */}
          {(isComplete || (isStreaming && hasFindings)) && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-label-lg text-text-secondary">
                  {isComplete ? `${totalCount} issues found` : `${findings.length} found so far…`}
                </span>
                {isComplete && clarityScore !== null && (
                  <span className="flex items-center gap-1.5 text-label-lg text-text-muted">
                    Clarity: <ClarityScore score={clarityScore} />
                  </span>
                )}
              </div>
              {isComplete && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleCopy}>
                    {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy as Markdown"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={reset}>
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Streaming shimmer */}
          {isStreaming && !hasFindings && (
            <div className="space-y-4">
              <FindingCardSkeleton />
              <FindingCardSkeleton />
            </div>
          )}

          {/* Findings list */}
          {hasFindings && (
            <div className="space-y-4">
              {findings.map((finding, i) => (
                <FindingCard
                  key={finding.id}
                  finding={finding}
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
              {isStreaming && <FindingCardSkeleton />}
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-4 text-center">
              <p className="text-body-md text-error">{error}</p>
              <Button variant="secondary" onClick={reset}>Try again</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ProviderPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </div>
  );
}
