import { cn } from "@/lib/utils";
import type { Category, Severity } from "@/lib/analysis/schema";

const SEVERITY_STYLES: Record<Severity, string> = {
  critical: "bg-severity-critical/15 border-severity-critical/35 text-severity-critical",
  high:     "bg-severity-high/15    border-severity-high/35    text-severity-high",
  medium:   "bg-severity-medium/15  border-severity-medium/35  text-severity-medium",
  low:      "bg-severity-low/15     border-severity-low/35     text-severity-low",
};

const SEVERITY_DOT: Record<Severity, string> = {
  critical: "bg-severity-critical",
  high:     "bg-severity-high",
  medium:   "bg-severity-medium",
  low:      "bg-severity-low",
};

const CATEGORY_STYLES: Record<Category, string> = {
  underspecified:    "bg-cat-underspecified/15   border-cat-underspecified/35   text-cat-underspecified",
  undefined_term:    "bg-cat-undefined-term/15   border-cat-undefined-term/35   text-cat-undefined-term",
  contradiction:     "bg-cat-contradiction/15    border-cat-contradiction/35    text-cat-contradiction",
  missing_edge_case: "bg-cat-edge-case/15        border-cat-edge-case/35        text-cat-edge-case",
  implicit_assumption:"bg-cat-assumption/15      border-cat-assumption/35       text-cat-assumption",
  scope_gap:         "bg-cat-scope-gap/15        border-cat-scope-gap/35        text-cat-scope-gap",
};

const CATEGORY_DOT: Record<Category, string> = {
  underspecified:     "bg-cat-underspecified",
  undefined_term:     "bg-cat-undefined-term",
  contradiction:      "bg-cat-contradiction",
  missing_edge_case:  "bg-cat-edge-case",
  implicit_assumption:"bg-cat-assumption",
  scope_gap:          "bg-cat-scope-gap",
};

const CATEGORY_LABELS: Record<Category, string> = {
  underspecified:     "Underspecified",
  undefined_term:     "Undefined term",
  contradiction:      "Contradiction",
  missing_edge_case:  "Edge case",
  implicit_assumption:"Assumption",
  scope_gap:          "Scope gap",
};

interface SeverityBadgeProps { severity: Severity; className?: string }
interface CategoryBadgeProps { category: Category; className?: string }

function BadgeBase({ dot, label, className }: { dot: string; label: string; className: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-label-md font-medium", className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dot)} />
      {label}
    </span>
  );
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  return (
    <BadgeBase
      dot={SEVERITY_DOT[severity]}
      label={severity.charAt(0).toUpperCase() + severity.slice(1)}
      className={cn(SEVERITY_STYLES[severity], className)}
    />
  );
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  return (
    <BadgeBase
      dot={CATEGORY_DOT[category]}
      label={CATEGORY_LABELS[category]}
      className={cn(CATEGORY_STYLES[category], className)}
    />
  );
}
