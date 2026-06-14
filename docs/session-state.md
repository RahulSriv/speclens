# SpecLens — Session State (resume guide)

Last updated: 2026-06-14

---

## Where we are

The Next.js app is fully scaffolded and running locally at http://localhost:3000.

### What's built and working
- Full project scaffolded at `F:\workspace\claude-explore\speclens\`
- `globals.css` — all CSS custom properties (design tokens as CSS vars)
- `tailwind.config.ts` — full token system (colors, typography, spacing, radius)
- `src/lib/utils.ts` — `cn()` helper
- `src/lib/analysis/schema.ts` — Zod schemas (AmbiguityFinding, AnalysisResult, AnalyzeRequest)
- `src/lib/analysis/prompt.ts` — system prompt + user prompt builder
- `src/lib/ai/index.ts` — `getModel()` factory for all 4 providers
- `src/lib/rate-limit/index.ts` — in-memory sliding window rate limiter
- `src/app/api/analyze/route.ts` — streaming POST endpoint
- `src/store/analysis-store.ts` — Zustand store for findings/status
- `src/store/provider-store.ts` — Zustand store for provider/apiKey
- `src/hooks/use-analysis.ts` — stream consumer hook
- `src/components/ui/badge.tsx` — SeverityBadge + CategoryBadge
- `src/components/ui/button.tsx` — Button (primary/secondary/ghost, sm/md/lg)
- `src/components/analyze/finding-card.tsx` — FindingCard + FindingCardSkeleton
- `src/components/analyze/spec-input.tsx` — SpecInput with file upload + char counter
- `src/components/provider/provider-status.tsx` — ProviderStatus header badge
- `src/components/provider/provider-picker.tsx` — ProviderPicker slide-in sheet
- `src/components/layout/header.tsx` — Header with provider status
- `src/components/layout/footer.tsx` — Footer
- `src/app/layout.tsx` — Root layout with Google Fonts (Inter + JetBrains Mono)
- `src/app/page.tsx` — Landing page (hero, demo section, how it works)
- `src/app/analyze/page.tsx` — Analyze page (split layout, streaming findings)

### Bug fixed this session
`apiKey: null` from the Zustand store was failing Zod's `z.string().optional()`.
Fix applied:
- `schema.ts`: changed `z.string().optional()` → `z.string().nullish()`
- `route.ts`: added `const resolvedKey = apiKey ?? undefined` before usage

### Known issue to verify
The Gemini API key in `.env.local` starts with `AQ.` — real Gemini keys from AI Studio
start with `AIza`. The user may need to get the correct key from:
https://aistudio.google.com/apikey

### Dev server
```
cd F:\workspace\claude-explore\speclens
npm run dev
```
Runs on http://localhost:3000. Next.js 14 hot-reloads on save.

---

## What still needs to be done

### Immediate (test the app)
1. Verify the analyze flow works end-to-end with a real Gemini key
2. Confirm the key format — if `AQ.` key fails, user needs to get `AIza...` key from AI Studio
3. Test the ProviderPicker sheet (click the badge in the header)
4. Test file upload (.md / .txt)
5. Test "Copy as Markdown" button

### Nice-to-have improvements
- Add `next/font` for Inter instead of Google Fonts CDN (better performance)
- Add `.gitignore` entry to ensure `.env.local` is excluded
- Test on mobile viewport (responsive layout)

### Phase 5: Launch
1. Create GitHub repo, push code
2. Deploy to Vercel (connect GitHub repo, add GEMINI_API_KEY env var in Vercel dashboard)
3. Write README.md
4. Write CLAUDE.md
5. Write CONTRIBUTING.md
6. Add `generate_figma_design` step to capture running app screens into Figma

---

## Resume instructions for new session

1. Read `speclens/docs/session-state.md` (this file)
2. Read `speclens/docs/TDD.md` for architecture context
3. Read `speclens/docs/wireframes.md` for screen specs
4. The code is complete — primary task is testing + fixing + then launching
5. Dev server: `cd F:\workspace\claude-explore\speclens && npm run dev`
6. After app is verified working → Phase 5: GitHub + Vercel deploy + README

---

## File structure (complete)

```
speclens/
├── docs/
│   ├── BRD.md
│   ├── PRD.md
│   ├── TDD.md
│   ├── competitive-analysis.md
│   ├── design-plan.md
│   ├── personas.md
│   ├── wireframes.md
│   └── session-state.md          ← this file
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts
│   │   ├── analyze/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── analyze/
│   │   │   ├── finding-card.tsx
│   │   │   └── spec-input.tsx
│   │   ├── layout/
│   │   │   ├── footer.tsx
│   │   │   └── header.tsx
│   │   ├── provider/
│   │   │   ├── provider-picker.tsx
│   │   │   └── provider-status.tsx
│   │   └── ui/
│   │       ├── badge.tsx
│   │       └── button.tsx
│   ├── hooks/
│   │   └── use-analysis.ts
│   ├── lib/
│   │   ├── ai/index.ts
│   │   ├── analysis/
│   │   │   ├── prompt.ts
│   │   │   └── schema.ts
│   │   ├── rate-limit/index.ts
│   │   └── utils.ts
│   └── store/
│       ├── analysis-store.ts
│       └── provider-store.ts
├── .env.local                     ← has GEMINI_API_KEY (verify format)
├── .env.example
├── tailwind.config.ts
└── tsconfig.json
```
