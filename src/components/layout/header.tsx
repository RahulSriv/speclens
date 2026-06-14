"use client";

import Link from "next/link";
import { GitFork } from "lucide-react";
import { ProviderStatus } from "@/components/provider/provider-status";
import { ProviderPicker } from "@/components/provider/provider-picker";
import { useState } from "react";

export function Header() {
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 flex items-center px-6 bg-bg-surface/80 backdrop-blur-md border-b border-border-default">
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <span className="text-lg font-semibold text-text-primary tracking-tight">
            Spec<span className="text-accent-default">Lens</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ProviderStatus onClick={() => setPickerOpen(true)} />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-text-secondary transition-colors"
            aria-label="GitHub"
          >
            <GitFork className="w-5 h-5" />
          </a>
        </div>
      </header>

      <ProviderPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}
