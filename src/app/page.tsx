import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/ui/badge";
import { FindingCard } from "@/components/analyze/finding-card";
import { Zap, ArrowRight } from "lucide-react";
import { EXAMPLE_SPEC, EXAMPLE_FINDINGS, EXAMPLE_CLARITY_SCORE } from "@/lib/analysis/example";

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Paste your spec",
    body: "Paste or upload any PRD, user story, or requirements document.",
  },
  {
    step: "2",
    title: "SpecLens scans for issues",
    body: "AI finds ambiguities, contradictions, and gaps in seconds.",
  },
  {
    step: "3",
    title: "Fix before code is written",
    body: "Each finding comes with a clarifying question to resolve it.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      <Header />

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 pt-24 pb-24">
        <div className="inline-flex items-center gap-2 mb-6">
          <CategoryBadge category="underspecified" />
          <span className="text-label-lg text-text-secondary">AI-powered ambiguity detection</span>
        </div>

        <h1 className="text-display-xl font-extrabold text-text-primary max-w-3xl text-balance leading-tight">
          Catch every ambiguity<br />before code is written.
        </h1>

        <p className="mt-5 text-body-lg text-text-secondary max-w-xl text-balance">
          Paste your PRD or user story. SpecLens finds the gaps, contradictions, and missing edge cases — before they cost you a sprint.
        </p>

        <div className="mt-8 flex items-center gap-3 flex-wrap justify-center">
          <Link href="/analyze">
            <Button size="lg">
              <Zap className="w-4 h-4" />
              Analyze your spec
            </Button>
          </Link>
          <a href="#demo">
            <Button variant="ghost" size="lg">
              View demo <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>

        <p className="mt-4 text-label-md text-text-muted">
          Free to start · No account needed · 100% open source
        </p>
      </section>

      {/* DEMO */}
      <section id="demo" className="bg-bg-surface border-y border-border-default py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-heading-xl text-text-primary">See it in action</h2>
            <p className="mt-2 text-body-md text-text-secondary">A real spec analyzed. No setup required.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8">
            {/* Spec */}
            <div>
              <p className="text-label-lg text-text-muted mb-3 uppercase tracking-wide">Sample spec</p>
              <div className="bg-bg-elevated border border-border-default rounded-lg p-5">
                <pre className="font-mono text-code-md text-text-secondary whitespace-pre-wrap leading-relaxed">
                  {EXAMPLE_SPEC}
                </pre>
              </div>
            </div>

            {/* Findings */}
            <div>
              <p className="text-label-lg text-text-muted mb-3 uppercase tracking-wide">
                {EXAMPLE_FINDINGS.length} issues found · Clarity score:{" "}
                <span className={EXAMPLE_CLARITY_SCORE >= 71 ? "text-success" : EXAMPLE_CLARITY_SCORE >= 41 ? "text-warning" : "text-error"}>
                  {EXAMPLE_CLARITY_SCORE}
                </span>
                <span className="text-text-muted"> / 100</span>
              </p>
              <div className="space-y-4">
                {EXAMPLE_FINDINGS.map((f) => (
                  <FindingCard key={f.id} finding={f} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/analyze">
              <Button size="lg">
                Analyze your own spec <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-heading-xl text-text-primary text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map(({ step, title, body }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 bg-accent-default/15 border border-accent-default/30 text-accent-default font-bold text-heading-md">
                  {step}
                </div>
                <h3 className="text-heading-md text-text-primary mb-2">{title}</h3>
                <p className="text-body-md text-text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="border-t border-border-default py-20 px-6 text-center">
        <h2 className="text-heading-xl text-text-primary mb-4">Ready to sharpen your spec?</h2>
        <p className="text-body-lg text-text-secondary mb-8 max-w-md mx-auto">
          Free for everyone. No account, no credit card.
        </p>
        <Link href="/analyze">
          <Button size="lg">
            <Zap className="w-4 h-4" />
            Start analyzing
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
