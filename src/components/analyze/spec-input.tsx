"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, useCallback } from "react";
import { Upload } from "lucide-react";

const MAX_CHARS = 50000;

interface SpecInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SpecInput({ value, onChange, disabled }: SpecInputProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const charCount = value.length;
  const isNearLimit = charCount > 45000;
  const isOverLimit = charCount > MAX_CHARS;

  const handleFile = useCallback((file: File) => {
    if (!file.name.match(/\.(md|txt)$/i)) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string).slice(0, MAX_CHARS);
      onChange(text);
    };
    reader.readAsText(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste your spec here… PRD, user story, or requirements doc."
          className={cn(
            "w-full min-h-[280px] resize-none bg-bg-elevated border rounded-lg px-4 py-3",
            "text-body-md text-text-primary placeholder:text-text-muted",
            "focus:outline-none focus:ring-1 focus:ring-accent-default focus:border-accent-default",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-colors duration-150",
            isOverLimit ? "border-error" : "border-border-default"
          )}
        />
        <span
          className={cn(
            "absolute bottom-3 right-3 text-label-md tabular-nums",
            isOverLimit ? "text-error" : isNearLimit ? "text-warning" : "text-text-muted"
          )}
        >
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex items-center justify-center gap-2 py-3 rounded-lg border border-dashed cursor-pointer transition-colors duration-150",
          dragOver
            ? "border-accent-default bg-accent-default/5"
            : "border-border-default bg-bg-surface hover:border-border-strong hover:bg-bg-elevated"
        )}
      >
        <Upload className="w-4 h-4 text-text-muted" />
        <span className="text-label-md text-text-muted">Upload .md or .txt</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.txt"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
