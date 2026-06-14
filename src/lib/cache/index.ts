import { createHash } from "crypto";
import type { AmbiguityFinding } from "@/lib/analysis/schema";

interface CacheEntry {
  findings: AmbiguityFinding[];
  expiresAt: number;
}

const TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_ENTRIES = 500;

const store = new Map<string, CacheEntry>();

export function specHash(spec: string, provider: string): string {
  return createHash("sha256").update(`${provider}:${spec.trim()}`).digest("hex").slice(0, 16);
}

export function getCached(hash: string): AmbiguityFinding[] | null {
  const entry = store.get(hash);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { store.delete(hash); return null; }
  return entry.findings;
}

export function setCached(hash: string, findings: AmbiguityFinding[]): void {
  if (store.size >= MAX_ENTRIES) {
    // evict oldest entry
    const firstKey = store.keys().next().value;
    if (firstKey) store.delete(firstKey);
  }
  store.set(hash, { findings, expiresAt: Date.now() + TTL_MS });
}
