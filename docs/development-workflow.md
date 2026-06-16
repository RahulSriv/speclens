# SpecLens — Development Workflow

This document describes the end-to-end product development process used to build SpecLens — from problem discovery to live deployment. It follows an enterprise-style lifecycle applied to a solo open source project.

---

## Overview

```
Phase 1: Discovery
Phase 2: Product Definition
Phase 3: Technical & Design
Phase 4: Build
Phase 5: Launch
```

Each phase produced concrete artifacts committed to the repository. No phase was skipped, even for a small project — the discipline of following the full lifecycle was intentional.

---

## Phase 1 — Discovery

**Goal:** Understand the problem space before writing a single line of product or technical spec.

### 1a. Problem Statement

Identified the core pain: engineering misalignment caused by ambiguous specs. The observation was that most rework, missed requirements, and sprint failures trace back to something that was never clearly defined — not to bad engineering.

Defined the target users:
- Product managers handing off specs to engineering
- QA engineers writing test cases from requirements
- Tech leads reviewing specs before sprint planning
- Engineering managers accountable for delivery quality

Full personas: [`docs/product/personas.md`](product/personas.md)

### 1b. Market Research

Surveyed the existing landscape: Grammarly Business, Notion AI, GitHub Copilot, SpecFlow, and manual review checklists. Finding: no tool specifically targets spec-level ambiguity with structured, AI-generated findings. Existing tools are either general writing aids or test automation tools.

Full analysis: [`docs/product/competitive-analysis.md`](product/competitive-analysis.md)

---

## Phase 2 — Product Definition

**Goal:** Define what to build and why, with explicit constraints and priorities.

### 2a. Business Requirements Document (BRD)

Captured business goals, constraints, and non-goals before writing any user stories. Key constraints that shaped the entire product:

- **$0 operating cost** — no paid infrastructure, no database, no auth service
- **No account required** — reduces friction for the core value proposition
- **API keys in localStorage only** — never persisted server-side; privacy by design

Full BRD: [`docs/product/BRD.md`](product/BRD.md)

### 2b. Product Requirements Document (PRD)

Translated business requirements into user stories and MoSCoW-prioritized features. The PRD forced explicit decisions about scope — the "Should Have" and "Could Have" lists defined what was deliberately deferred.

MVP features: spec input, file upload, streaming analysis, shared free key, provider picker, BYOK support, copy as Markdown.

Full PRD: [`docs/product/PRD.md`](product/PRD.md)

---

## Phase 3 — Technical & Design

**Goal:** Design the system and UI before writing implementation code.

### 3a. Technical Design Document (TDD)

Made stack decisions with explicit rationale before writing any code:

- **Next.js 14 App Router** — full-stack in one repo, streaming API routes, Vercel-native
- **Vercel AI SDK** — unified streaming interface across all AI providers
- **Zod** — shared validation schemas between server and client
- **Zustand** — lightweight client state with localStorage persistence
- **In-memory rate limiter** — no Redis required; satisfies the $0 constraint

Defined the API contract (`POST /api/analyze`), streaming format (NDJSON), data models, and all architectural decisions before implementation.

Full TDD: [`docs/engineering/TDD.md`](engineering/TDD.md)

### 3b. UI/UX Design

Built a complete design token system (colors, typography, spacing, radius) as Tailwind CSS custom properties. Produced text wireframes for all three screens — Landing, Analyze, Provider Picker — before writing any component code.

Design plan: [`docs/design/design-plan.md`](design/design-plan.md)
Wireframes: [`docs/design/wireframes.md`](design/wireframes.md)

---

## Phase 4 — Build

**Goal:** Implement the full application against the spec.

### 4a. Scaffolding

Bootstrapped with `create-next-app`, then immediately replaced the default setup:
- Installed all AI SDK provider packages
- Wired the full Tailwind token system
- Built all UI components from scratch (Radix UI primitives directly, no shadcn CLI)

### 4b. Core Implementation Order

Components were built in dependency order — data models first, then API, then UI:

1. Zod schemas (`schema.ts`) — shared types for server and client
2. Prompt engineering (`prompt.ts`) — the 18-point ambiguity checklist
3. AI model factory (`lib/ai/index.ts`) — provider switching logic
4. Rate limiter (`lib/rate-limit/index.ts`) — sliding window, in-memory
5. Streaming API route (`api/analyze/route.ts`) — NDJSON streaming with caching
6. Zustand stores — analysis state + provider state with localStorage persistence
7. Stream consumer hook (`use-analysis.ts`) — reads NDJSON, populates store
8. UI components — Badge, Button, FindingCard, SpecInput, ProviderPicker
9. Pages — Landing (demo), Analyze (main flow)

### 4c. Key Engineering Decisions Made During Build

| Problem | Decision |
|---|---|
| AI output non-determinism | Switched from open-ended prompting to a 18-point checklist; added result caching by spec hash |
| Zod null vs undefined | `z.string().nullish()` required for Zustand store values that default to `null` |
| Streaming error surfacing | Added 30s `AbortController` timeout; fallback error state if stream returns no valid NDJSON |
| Model deprecation (llama-3.1) | Migrated to `llama-3.3-70b-versatile` |
| Windows `next/og` path bug | Replaced dynamic `icon.tsx` with static `icon.svg` |

### 4d. Result Caching

Analysis results are cached in-memory keyed by `SHA-256(spec + provider)`. The landing page demo spec is pre-seeded at server startup so users who paste the example always get the exact results shown on the page.

---

## Phase 5 — Launch

**Goal:** Ship to production with proper open source hygiene.

### 5a. Repository Setup

- Created public GitHub repo: [github.com/RahulSriv/speclens](https://github.com/RahulSriv/speclens)
- Branch protection enforced: all changes via PR, never direct commits to `main`
- MIT LICENSE added

### 5b. Vercel Deployment

- Connected GitHub repo to Vercel (auto-deploy on merge to `main`)
- Added `GROQ_API_KEY` environment variable in Vercel dashboard
- Live at: [speclens-rouge.vercel.app](https://speclens-rouge.vercel.app)

### 5c. Open Source Hygiene

- `.env.example` documents all environment variables
- `.env.local` is gitignored — API keys never committed
- MIT license with correct copyright
- README covers getting started, env vars, project structure, and contributing

---

## Principles Applied Throughout

**No phase skipped.** Even for a small solo project, skipping discovery or design leads to rework. The BRD prevented scope creep. The TDD prevented architectural mistakes.

**$0 constraint is a design input, not a limitation.** It forced creative solutions: in-memory rate limiting instead of Redis, Groq free tier instead of paid models, localStorage instead of a user database.

**Docs as a forcing function.** Writing the PRD before building exposed feature scope decisions that would otherwise have been made unconsciously mid-implementation.

**Branch → PR → merge.** Even as a solo contributor, every change goes through a pull request. This keeps `main` always deployable and creates a clean audit trail.
