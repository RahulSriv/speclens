"use client";

import { cn } from "@/lib/utils";
import { useProviderStore } from "@/store/provider-store";
import { ChevronDown } from "lucide-react";

const PROVIDER_LABELS: Record<string, string> = {
  shared: "Free",
  gemini: "Gemini",
  groq:   "Groq",
  claude: "Claude",
  openai: "OpenAI",
};

interface ProviderStatusProps {
  onClick: () => void;
}

export function ProviderStatus({ onClick }: ProviderStatusProps) {
  const { provider, remaining } = useProviderStore();
  const isShared = provider === "shared";
  const isLimitReached = isShared && remaining === 0;

  const dotClass = isLimitReached
    ? "bg-severity-critical"
    : isShared
    ? "bg-success"
    : "bg-accent-default";

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-default",
        "bg-bg-elevated hover:bg-bg-hover transition-colors duration-150",
        "text-label-lg text-text-primary"
      )}
    >
      <span className={cn("w-2 h-2 rounded-full shrink-0", dotClass)} />
      <span>{PROVIDER_LABELS[provider]}</span>
      {isShared && (
        <span className="text-label-md text-text-muted">
          · {remaining} / 3 today
        </span>
      )}
      <ChevronDown className="w-3.5 h-3.5 text-text-muted" />
    </button>
  );
}
