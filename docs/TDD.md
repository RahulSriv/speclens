# SpecLens — Technical Design Document (TDD)

**Version:** 1.0  
**Date:** 2026-06-14  
**Status:** Approved

---

## 1. System Overview

SpecLens is a Next.js 14 web application that accepts product spec text as input, sends it to an AI provider via the Vercel AI SDK, and streams back structured ambiguity findings. It uses a shared server-side Gemini key for free analyses, with BYOK support for Gemini, Groq, Claude, and OpenAI.

---

## 2. Tech Stack Decisions

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Full-stack in one repo; streaming API routes; Vercel-native |
| Language | TypeScript (strict mode) | Type safety end-to-end; Zod schema sharing between server and client |
| Styling | Tailwind CSS + shadcn/ui | Utility-first; shadcn gives unstyled accessible primitives |
| AI SDK | Vercel AI SDK (`ai` package) | Unified streaming interface across all providers; handles SSE |
| Providers | `@ai-sdk/google`, `@ai-sdk/anthropic`, `@ai-sdk/openai`, `@ai-sdk/groq` | One adapter per provider; swappable at runtime |
| State | Zustand | Lightweight; no boilerplate; works with SSR |
| Validation | Zod | Runtime validation of inputs AND AI outputs |
| Testing | Vitest (unit) + Playwright (e2e) | Vitest is fast; Playwright for real browser flows |
| Linting | ESLint + Prettier + Husky + lint-staged | Pre-commit hooks enforce quality |
| Deployment | Vercel (Hobby — free) | Zero config; serverless functions; edge runtime support |
| Analytics | Vercel Analytics (free, privacy-first) | No PII; GDPR-safe |

---

## 3. Repository Structure

```
speclens/
├── src/
│   ├── app/
│   │   ├── page.tsx                  # Landing page (static demo)
│   │   ├── analyze/
│   │   │   └── page.tsx              # Main analyze page
│   │   ├── api/
│   │   │   └── analyze/
│   │   │       └── route.ts          # Streaming POST endpoint
│   │   ├── layout.tsx                # Root layout + providers
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn primitives (button, badge, card, sheet, etc.)
│   │   ├── layout/
│   │   │   ├── header.tsx            # Provider status badge + settings icon
│   │   │   └── footer.tsx
│   │   ├── analyze/
│   │   │   ├── spec-input.tsx        # Textarea + file upload + char count
│   │   │   ├── analyze-button.tsx    # CTA with loading state
│   │   │   ├── findings-list.tsx     # Streaming findings container
│   │   │   └── finding-card.tsx      # Individual finding (category, severity, excerpt, issue, question)
│   │   ├── provider/
│   │   │   ├── provider-status.tsx   # Header badge showing current provider + usage
│   │   │   └── provider-picker.tsx   # Settings sheet (shadcn Sheet)
│   │   └── demo/
│   │       └── demo-section.tsx      # Static pre-rendered demo on landing
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── index.ts              # getModel(provider, apiKey) factory
│   │   │   ├── providers.ts          # Provider config, labels, URLs
│   │   │   └── shared-key.ts        # Server-side shared Gemini key logic
│   │   ├── analysis/
│   │   │   ├── prompt.ts             # System prompt (ambiguity detection instructions)
│   │   │   ├── parser.ts             # Parse streaming AI output → AmbiguityFinding[]
│   │   │   └── schema.ts             # Zod schemas (AmbiguityFinding, AnalysisResult)
│   │   ├── rate-limit/
│   │   │   └── index.ts              # In-memory sliding window limiter (per IP)
│   │   └── utils.ts                  # cn(), formatters, etc.
│   ├── hooks/
│   │   ├── use-analysis.ts           # useAnalysis() — calls /api/analyze, manages stream state
│   │   ├── use-provider.ts           # useProvider() — read/write provider from localStorage
│   │   └── use-free-usage.ts         # useFreeUsage() — track daily analyses count
│   ├── store/
│   │   ├── analysis-store.ts         # Zustand: findings[], status, error
│   │   └── provider-store.ts         # Zustand: activeProvider, apiKey
│   └── types/
│       └── index.ts                  # Re-exports of Zod inferred types
├── tests/
│   ├── unit/
│   │   ├── analysis/
│   │   │   ├── prompt.test.ts
│   │   │   └── parser.test.ts
│   │   └── rate-limit/
│   │       └── rate-limiter.test.ts
│   └── e2e/
│       ├── analyze.spec.ts
│       └── provider-picker.spec.ts
├── docs/                             # All project documentation
├── .github/
│   ├── workflows/
│   │   └── ci.yml                    # Lint → typecheck → test on every PR
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
├── .env.example
├── .env.local                        # gitignored
├── CLAUDE.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── LICENSE                           # MIT
└── README.md
```

---

## 4. Data Models

### AmbiguityFinding (Zod schema)

```typescript
const AmbiguityFindingSchema = z.object({
  id: z.string().uuid(),
  category: z.enum([
    'underspecified',    // System behavior incomplete
    'undefined_term',   // Term used without definition
    'contradiction',    // Two statements conflict
    'missing_edge_case', // Boundary condition unaddressed
    'implicit_assumption', // Unstated precondition
    'scope_gap',        // Actor/permission boundary undefined
  ]),
  severity: z.enum(['critical', 'high', 'medium', 'low']),
  excerpt: z.string(),      // Exact text from spec that is ambiguous
  issue: z.string(),        // Why this is a problem
  question: z.string(),     // Clarifying question to resolve it
})

const AnalysisResultSchema = z.object({
  findings: z.array(AmbiguityFindingSchema),
  totalCount: z.number(),
  clarityScore: z.number().min(0).max(100), // 100 = perfectly clear
})
```

---

## 5. API Design

### POST /api/analyze

**Request:**
```typescript
{
  spec: string          // Max 50,000 chars
  provider: 'shared' | 'gemini' | 'groq' | 'claude' | 'openai'
  apiKey?: string       // Required for non-shared providers
}
```

**Response:** Server-Sent Events (streaming)
```
data: {"type":"finding","data":{...AmbiguityFinding}}
data: {"type":"finding","data":{...AmbiguityFinding}}
data: {"type":"complete","data":{"totalCount":5,"clarityScore":72}}
data: [DONE]
```

**Error responses:**
```typescript
400 // Invalid input (spec too long, missing required fields)
429 // Rate limit exceeded (shared key daily limit)
500 // AI provider error
```

---

## 6. AI Provider Abstraction

```typescript
// lib/ai/index.ts
export function getModel(provider: Provider, apiKey?: string) {
  switch (provider) {
    case 'shared':
    case 'gemini':
      return google('gemini-2.0-flash', { apiKey: apiKey ?? process.env.GEMINI_API_KEY })
    case 'claude':
      return anthropic('claude-sonnet-4-6', { apiKey })
    case 'openai':
      return openai('gpt-4o', { apiKey })
    case 'groq':
      return groq('llama-3.1-70b-versatile', { apiKey })
  }
}
```

Swapping a provider is a one-line change. The same `streamText()` call works for all.

---

## 7. Rate Limiting Strategy

**In-memory sliding window** (no Redis needed):

```typescript
// lib/rate-limit/index.ts
const store = new Map<string, { count: number; resetAt: number }>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const window = store.get(ip)

  if (!window || now > window.resetAt) {
    store.set(ip, { count: 1, resetAt: now + 86_400_000 }) // 24h window
    return { allowed: true, remaining: 2 }
  }

  if (window.count >= FREE_ANALYSES_PER_DAY) { // 3
    return { allowed: false, remaining: 0 }
  }

  window.count++
  return { allowed: true, remaining: FREE_ANALYSES_PER_DAY - window.count }
}
```

Resets daily per IP. Applied only to `provider: 'shared'` requests. BYOK requests skip rate limiting entirely.

---

## 8. System Prompt Architecture

The prompt instructs the model to:
1. Read the entire spec before outputting anything (think first)
2. Output findings as a JSON array, one finding per line (NDJSON streaming)
3. For each finding: identify the exact excerpt, categorize it, rate severity, explain the issue, ask the clarifying question
4. Output a final summary line with total count and clarity score

The prompt enforces strict JSON output so the parser can process it reliably.

---

## 9. Key Storage & Security

- API keys entered by users are stored in **browser `localStorage` only**
- Keys are sent to `/api/analyze` in the request body over HTTPS — never logged
- The shared Gemini key lives in `process.env.GEMINI_API_KEY` (Vercel env var) — never exposed to client
- No keys are ever written to any database or server-side store
- Security headers configured in `next.config.ts`: CSP, HSTS, X-Frame-Options, X-Content-Type-Options

---

## 10. Environment Variables

```bash
# .env.example

# Required — shared free Gemini key for unauthenticated analyses
GEMINI_API_KEY=

# Optional — override rate limit for testing
FREE_ANALYSES_PER_DAY=3

# Optional — Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

---

## 11. CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  ci:
    steps:
      - lint          # ESLint
      - typecheck     # tsc --noEmit
      - test:unit     # vitest run
      - test:e2e      # playwright test (on PRs only)
```

Vercel auto-deploys on merge to `main`. Preview deployments on every PR.

---

## 12. Architecture Decision Records (ADRs)

| Decision | Choice | Rationale |
|---|---|---|
| App Router vs Pages Router | App Router | Streaming RSC; native streaming API routes |
| Vercel AI SDK vs raw fetch | Vercel AI SDK | Handles SSE parsing, retries, provider normalization |
| Zustand vs Context API | Zustand | Less boilerplate; works outside React tree |
| In-memory rate limit vs Redis | In-memory | Zero cost; sufficient for single-instance Vercel deployment |
| localStorage for keys | localStorage | No database needed; user-controlled; privacy-preserving |
| NDJSON streaming vs JSON | NDJSON | Allows incremental parsing; each finding renders immediately |
| shadcn/ui vs Radix direct | shadcn/ui | Pre-built accessible patterns; easy to customize |
