import { cn } from "@/lib/utils";
import { SeverityBadge, CategoryBadge } from "@/components/ui/badge";
import type { AmbiguityFinding } from "@/lib/analysis/schema";

interface FindingCardProps {
  finding: AmbiguityFinding;
  className?: string;
  style?: React.CSSProperties;
}

export function FindingCard({ finding, className, style }: FindingCardProps) {
  return (
    <div
      className={cn(
        "bg-bg-elevated border border-border-default rounded-lg p-5 animate-fade-in-up",
        className
      )}
      style={style}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <CategoryBadge category={finding.category} />
        <SeverityBadge severity={finding.severity} />
      </div>

      <div className="mt-3 bg-bg-surface border-l-2 border-border-strong rounded-sm px-3 py-2">
        <p className="text-code-md font-mono text-text-secondary leading-relaxed">
          &ldquo;{finding.excerpt}&rdquo;
        </p>
      </div>

      <p className="mt-3 text-body-md text-text-secondary leading-relaxed">
        {finding.issue}
      </p>

      <div className="mt-3 border-l-2 border-accent-default pl-3">
        <p className="text-body-md text-text-primary font-semibold">
          ❓ {finding.question}
        </p>
      </div>
    </div>
  );
}

export function FindingCardSkeleton() {
  return (
    <div className="bg-bg-elevated border border-border-default rounded-lg p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="h-5 w-28 rounded-full animate-shimmer" />
        <div className="h-5 w-16 rounded-full animate-shimmer" />
      </div>
      <div className="mt-3 h-10 rounded-sm animate-shimmer" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-full rounded animate-shimmer" />
        <div className="h-4 w-3/4 rounded animate-shimmer" />
      </div>
      <div className="mt-3 border-l-2 border-border-default pl-3">
        <div className="h-4 w-5/6 rounded animate-shimmer" />
      </div>
    </div>
  );
}
