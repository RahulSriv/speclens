import { create } from "zustand";
import type { Provider } from "@/lib/analysis/schema";

interface ProviderState {
  provider: Provider;
  apiKey: string | null;
  remaining: number;
  setProvider: (provider: Provider, apiKey?: string) => void;
  setRemaining: (n: number) => void;
  disconnect: () => void;
  loadFromStorage: () => void;
}

const STORAGE_KEY = "speclens_provider";
const WINDOW_MS = 24 * 60 * 60 * 1000;

function saveToStorage(data: { provider: Provider; apiKey: string | null; remaining: number; resetAt: number }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const useProviderStore = create<ProviderState>((set, get) => ({
  provider: "shared",
  apiKey: null,
  remaining: 3,

  setProvider: (provider, apiKey) => {
    const { remaining } = get();
    set({ provider, apiKey: apiKey ?? null });
    saveToStorage({ provider, apiKey: apiKey ?? null, remaining, resetAt: Date.now() + WINDOW_MS });
  },

  setRemaining: (remaining) => {
    const { provider, apiKey } = get();
    set({ remaining });
    // Only persist remaining for the shared provider — BYOK has no server-side limit
    if (provider === "shared") {
      saveToStorage({ provider, apiKey, remaining, resetAt: Date.now() + WINDOW_MS });
    }
  },

  disconnect: () => {
    set({ provider: "shared", apiKey: null, remaining: 3 });
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  },

  loadFromStorage: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const { provider, apiKey, remaining, resetAt } = JSON.parse(raw);
      const isExpired = !resetAt || Date.now() > resetAt;
      set({
        provider: provider ?? "shared",
        apiKey: apiKey ?? null,
        remaining: isExpired ? 3 : (remaining ?? 3),
      });
      if (isExpired && provider === "shared") {
        saveToStorage({ provider: provider ?? "shared", apiKey: apiKey ?? null, remaining: 3, resetAt: Date.now() + WINDOW_MS });
      }
    } catch {
      // ignore corrupt storage
    }
  },
}));
