# SpecLens

**AI-powered spec ambiguity detector.** Paste a PRD, user story, or requirements doc — SpecLens finds the gaps, contradictions, and missing edge cases before they cost you a sprint.

🔗 **[speclens.vercel.app](https://speclens-avxl-p904zpn32-rahul-sriv.vercel.app)** · [GitHub](https://github.com/RahulSriv/speclens)

---

## What it does

SpecLens runs your spec through a systematic 18-point ambiguity checklist across six categories:

| Category | What it catches |
|---|---|
| **Underspecified** | Missing success/error states, undefined outcomes |
| **Undefined term** | Vague words like "manage", "fast", "admin" |
| **Contradiction** | Conflicting statements or rules |
| **Missing edge case** | Empty states, limits, concurrent access, failures |
| **Implicit assumption** | Unstated dependencies (auth, data, platform) |
| **Scope gap** | Undefined permissions, ownership, actor boundaries |

Each finding includes the exact excerpt from your spec, a one-sentence explanation of why it's a problem, and a specific clarifying question to resolve it.

---

## Features

- **Streaming results** — findings appear one by one as the AI identifies them
- **Clarity score** — 0–100 score computed from finding severity distribution
- **Free shared tier** — 3 analyses/day with no setup required
- **BYOK** — bring your own Gemini, Groq (both free), Claude, or OpenAI key for unlimited analyses
- **File upload** — drag and drop `.md` or `.txt` spec files
- **Copy as Markdown** — export all findings to paste into Notion, Linear, or your spec doc
- **Result caching** — same spec always returns the same findings
- **No account required** — API keys stored in browser localStorage only, never on the server

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS with full design token system |
| AI | Vercel AI SDK — Groq, Gemini, Claude, OpenAI |
| State | Zustand |
| Validation | Zod |
| Deployment | Vercel (Hobby — free) |

---

## Getting started

### Prerequisites

- Node.js 18.17+
- A free [Groq API key](https://console.groq.com/keys) for the shared tier

### Local development

```bash
git clone https://github.com/RahulSriv/speclens.git
cd speclens
npm install
```

Copy the example env file and add your key:

```bash
cp .env.example .env.local
```

```env
GROQ_API_KEY=gsk_...         # Required — powers the free shared tier
FREE_ANALYSES_PER_DAY=3      # Optional — default is 3
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deploying to Vercel

1. Fork this repo
2. Import it at [vercel.com/new](https://vercel.com/new)
3. Add `GROQ_API_KEY` in the Environment Variables section
4. Deploy

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | Groq key for the shared free tier |
| `GEMINI_API_KEY` | No | Fallback Gemini key (optional) |
| `FREE_ANALYSES_PER_DAY` | No | Daily limit per IP (default: 3) |

API keys are **never** stored server-side. User-provided BYOK keys live in browser localStorage only and are sent directly to the AI provider's API.

---

## Project structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page with live demo
│   ├── analyze/page.tsx          # Main analyze page
│   └── api/analyze/route.ts      # Streaming POST endpoint
├── components/
│   ├── analyze/                  # SpecInput, FindingCard
│   ├── provider/                 # ProviderPicker, ProviderStatus
│   ├── layout/                   # Header, Footer
│   └── ui/                       # Button, Badge
├── hooks/use-analysis.ts         # Stream consumer
├── lib/
│   ├── ai/                       # Model factory
│   ├── analysis/                 # Zod schemas, prompt, example spec
│   ├── cache/                    # In-memory result cache
│   └── rate-limit/               # Sliding window rate limiter
└── store/                        # Zustand stores
```

---

## Contributing

See [docs/development-workflow.md](docs/development-workflow.md) for the full product development process used to build this project.

Pull requests are welcome. For significant changes, open an issue first.

---

## License

MIT © 2026 Rahul Srivastava
