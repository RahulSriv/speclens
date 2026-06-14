# SpecLens — Screen Wireframes

Text wireframes for all 3 screens. Used as coding guide before Figma capture.  
All colors reference design-plan.md tokens. All spacing uses the spacing scale (spacing/1=4px … spacing/16=64px).

---

## Global Layout

```
┌─────────────────────────────── 1440px ───────────────────────────────┐
│  Header (64px tall, sticky, bg/surface, border-b border/default)      │
│  └─ Logo left · Nav/actions right                                      │
├───────────────────────────────────────────────────────────────────────┤
│  Page content (varies by screen)                                       │
├───────────────────────────────────────────────────────────────────────┤
│  Footer (72px tall, bg/base, border-t border/default)                  │
└───────────────────────────────────────────────────────────────────────┘
```

**Header content (both Landing + Analyze pages):**
```
[ SpecLens logo (text: "SpecLens" in Inter Semi Bold 18px, white) ]   [ ProviderStatusBadge ]  [ GitHub icon link ]
  left                                                                     center-right             far right
```

**Footer content:**
```
[ © 2026 SpecLens · MIT License ]    [ "Built to make specs sharper" ]    [ ⭐ Star on GitHub ]
  left                                   center                              right
```

---

## Screen 01 — Landing Page

**Purpose:** Explain what SpecLens does, build trust with a live demo, get users to analyze their own spec.

### Layout (top to bottom)

```
┌─────────────────────────────── 1440px ───────────────────────────────┐
│  HEADER                                                               │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                        HERO SECTION                                   │
│                      (padding: 96px top)                              │
│                                                                       │
│            ┌──────── max-width 760px, centered ────────┐             │
│            │                                           │             │
│            │  [Badge: Category=Underspecified]         │             │
│            │  "AI-powered ambiguity detection"         │             │
│            │  (Label/lg, text/secondary)               │             │
│            │                                           │             │
│            │  Catch every ambiguity                    │             │
│            │  before code is written.                  │             │
│            │  (Display/xl, text/primary, center)       │             │
│            │                                           │             │
│            │  Paste your PRD or user story. SpecLens   │             │
│            │  finds the gaps, contradictions, and      │             │
│            │  missing edge cases — before they cost    │             │
│            │  you a sprint.                            │             │
│            │  (Body/lg, text/secondary, center)        │             │
│            │                                           │             │
│            │  [ Analyze your spec →  ]  [ View demo ↓ ]│             │
│            │   Primary Button LG         Ghost Button LG│             │
│            │                                           │             │
│            └───────────────────────────────────────────┘             │
│                      (padding: 96px bottom)                           │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                      DEMO SECTION                                     │
│             (bg/surface, padding 80px vertical)                       │
│                                                                       │
│  ┌── Section label ─────────────────────────────────────────────┐    │
│  │  "See it in action"  (Heading/xl, text/primary)              │    │
│  │  "A real spec analyzed. No setup required."                  │    │
│  │  (Body/md, text/secondary)                                   │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                         (gap: 48px)                                   │
│                                                                       │
│  ┌── LEFT PANEL (45%) ──────┐  ┌── RIGHT PANEL (55%) ────────────┐  │
│  │                          │  │                                  │  │
│  │  SAMPLE SPEC TEXT        │  │  FINDINGS (4 hardcoded cards)    │  │
│  │  ┌────────────────────┐  │  │                                  │  │
│  │  │ bg/elevated        │  │  │  ┌── FindingCard 1 ──────────┐  │  │
│  │  │ radius/lg          │  │  │  │  [Contradiction] [High]   │  │  │
│  │  │ padding: 24px      │  │  │  │  Excerpt: "Users get…"    │  │  │
│  │  │                    │  │  │  │  Issue: Sections 2 and 5  │  │  │
│  │  │  "User Story: As   │  │  │  │  conflict on notifs.      │  │  │
│  │  │  a user I want to  │  │  │  │  Q: Which is correct?     │  │  │
│  │  │  log in with my    │  │  │  └───────────────────────────┘  │  │
│  │  │  email so that I   │  │  │                                  │  │
│  │  │  can access my     │  │  │  ┌── FindingCard 2 ──────────┐  │  │
│  │  │  dashboard.        │  │  │  │  [Underspecified] [Crit]  │  │  │
│  │  │                    │  │  │  │  Excerpt: "log in with…"  │  │  │
│  │  │  The dashboard     │  │  │  │  Issue: Auth method not   │  │  │
│  │  │  shows recent      │  │  │  │  defined.                 │  │  │
│  │  │  activity. Admins  │  │  │  │  Q: OAuth, password, or   │  │  │
│  │  │  can manage users  │  │  │  │  both?                    │  │  │
│  │  │  and view reports. │  │  │  └───────────────────────────┘  │  │
│  │  │                    │  │  │                                  │  │
│  │  │  Notifications are │  │  │  ┌── FindingCard 3 ──────────┐  │  │
│  │  │  sent after key    │  │  │  │  [Undefined Term] [High]  │  │  │
│  │  │  actions. Users    │  │  │  │  Excerpt: "manage users"  │  │  │
│  │  │  can opt out of    │  │  │  │  Issue: "manage" has no   │  │  │
│  │  │  all emails."      │  │  │  │  definition.              │  │  │
│  │  │                    │  │  │  │  Q: Create, edit, delete, │  │  │
│  │  └────────────────────┘  │  │  │  or suspend?              │  │  │
│  │                          │  │  └───────────────────────────┘  │  │
│  │  (Body/sm, text/secondary│  │                                  │  │
│  │   Code/md for spec text) │  │  ┌── FindingCard 4 ──────────┐  │  │
│  │                          │  │  │  [Scope Gap] [Medium]     │  │  │
│  │                          │  │  │  Excerpt: "Admins can…"   │  │  │
│  │                          │  │  │  Issue: No role boundary  │  │  │
│  │                          │  │  │  defined for admins.      │  │  │
│  │                          │  │  │  Q: Who grants admin      │  │  │
│  │                          │  │  │  access?                  │  │  │
│  │                          │  │  └───────────────────────────┘  │  │
│  └──────────────────────────┘  └──────────────────────────────────┘  │
│                                                                       │
│              [ Analyze your own spec →  ]                             │
│               Primary Button LG, centered, margin-top 48px            │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│                   HOW IT WORKS SECTION                                │
│                   (padding: 80px vertical)                            │
│                                                                       │
│   "How it works"  (Heading/xl, centered)                             │
│   (gap: 48px)                                                         │
│                                                                       │
│   ┌── Step 1 ────────┐  ┌── Step 2 ────────┐  ┌── Step 3 ────────┐  │
│   │  [  1  ]         │  │  [  2  ]         │  │  [  3  ]         │  │
│   │  circle, accent  │  │  circle, accent  │  │  circle, accent  │  │
│   │                  │  │                  │  │                  │  │
│   │  Paste your spec │  │  SpecLens scans  │  │  Fix gaps before │  │
│   │  (Heading/md)    │  │  for issues      │  │  code is written │  │
│   │                  │  │  (Heading/md)    │  │  (Heading/md)    │  │
│   │  Paste or upload │  │  AI finds        │  │  Each finding    │  │
│   │  any PRD, user   │  │  ambiguities,    │  │  comes with a    │  │
│   │  story, or spec  │  │  contradictions, │  │  clarifying      │  │
│   │  document.       │  │  and gaps in     │  │  question to     │  │
│   │  (Body/md,       │  │  seconds.        │  │  resolve it.     │  │
│   │  text/secondary) │  │  (Body/md)       │  │  (Body/md)       │  │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘  │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                               │
└───────────────────────────────────────────────────────────────────────┘
```

### Component Specs — Landing

| Component | Spec |
|---|---|
| Hero badge | Category=Underspecified variant of Badge |
| Hero headline | Display/xl, text/primary, text-center, max-w-[760px] |
| Hero subheadline | Body/lg, text/secondary, text-center, max-w-[600px] |
| CTA row | flex row, gap spacing/4, justify-center |
| Primary CTA | Button Primary LG → href="/analyze" |
| Ghost CTA | Button Ghost LG → smooth scroll to #demo |
| Demo section bg | bg/surface, border-y border/default |
| Spec text box | bg/elevated, radius/lg, p-6, font Code/md, text/secondary, overflow-y-auto max-h-[320px] |
| Finding cards | Static/hardcoded, same FindingCard component as Analyze page |
| How it works step number | 40px circle, bg/accent/default at 15% opacity, border accent/default at 30%, text accent/default, Heading/md |
| Step columns | 3-col grid, gap spacing/8, max-w-[900px] centered |

---

## Screen 02 — Analyze Page

**Purpose:** Main app screen. User pastes spec, triggers analysis, sees findings stream in.

### Layout

```
┌─────────────────────────────── 1440px ───────────────────────────────┐
│  HEADER (sticky)                                                      │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌── LEFT PANEL (40%, max-w 560px) ──┐  ┌── RIGHT PANEL (60%) ────┐ │
│  │  padding: 48px 40px               │  │  padding: 48px 40px     │ │
│  │                                   │  │                         │ │
│  │  "Analyze your spec"              │  │  [Empty / Results /     │ │
│  │  (Heading/xl, text/primary)       │  │   Streaming state]      │ │
│  │                                   │  │                         │ │
│  │  "Paste a PRD, user story, or     │  │  See states below ↓     │ │
│  │  requirements doc to find         │  │                         │ │
│  │  ambiguities before they ship."   │  │                         │ │
│  │  (Body/md, text/secondary)        │  │                         │ │
│  │                                   │  │                         │ │
│  │  ┌── SpecInput ───────────────┐   │  │                         │ │
│  │  │  bg/elevated               │   │  │                         │ │
│  │  │  border border/default     │   │  │                         │ │
│  │  │  radius/lg                 │   │  │                         │ │
│  │  │  padding: 16px             │   │  │                         │ │
│  │  │  min-height: 280px         │   │  │                         │ │
│  │  │                            │   │  │                         │ │
│  │  │  placeholder:              │   │  │                         │ │
│  │  │  "Paste your spec here…    │   │  │                         │ │
│  │  │  PRD, user story, or       │   │  │                         │ │
│  │  │  requirements doc."        │   │  │                         │ │
│  │  │  (Body/md, text/muted)     │   │  │                         │ │
│  │  │                            │   │  │                         │ │
│  │  │                [0 / 50,000]│   │  │                         │ │
│  │  │                Label/md    │   │  │                         │ │
│  │  │                text/muted  │   │  │                         │ │
│  │  └────────────────────────────┘   │  │                         │ │
│  │                                   │  │                         │ │
│  │  ┌── File upload drop zone ────┐  │  │                         │ │
│  │  │  border-dashed border/default│  │  │                         │ │
│  │  │  bg/surface, radius/lg      │  │  │                         │ │
│  │  │  padding: 20px              │  │  │                         │ │
│  │  │  text-center                │  │  │                         │ │
│  │  │                             │  │  │                         │ │
│  │  │  ↑ Upload .md or .txt       │  │  │                         │ │
│  │  │  (Label/md, text/muted)     │  │  │                         │ │
│  │  └─────────────────────────────┘  │  │                         │ │
│  │                                   │  │                         │ │
│  │  [ Analyze spec →  ]              │  │                         │ │
│  │  Button Primary LG, full-width    │  │                         │ │
│  │                                   │  │                         │ │
│  └───────────────────────────────────┘  └─────────────────────────┘ │
│                                                                       │
├───────────────────────────────────────────────────────────────────────┤
│  FOOTER                                                               │
└───────────────────────────────────────────────────────────────────────┘
```

### Right Panel States

**State A — Empty (no spec entered yet)**
```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│              🔍                         │
│   (icon, text/muted, size 40px)         │
│                                         │
│   Your findings will appear here        │
│   (Heading/md, text/secondary, center)  │
│                                         │
│   Paste a spec on the left to begin.    │
│   (Body/md, text/muted, center)         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**State B — Analyzing (streaming in progress)**
```
┌─────────────────────────────────────────┐
│  Analyzing...        [  5 found so far ]│
│  (Label/md, text/muted)  (accent color) │
│                                         │
│  ┌── Shimmer card ─────────────────┐   │
│  │  ░░░░░░░░░░ ░░░░░░              │   │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░       │   │
│  └─────────────────────────────────┘   │
│  (animated pulse, bg/elevated)         │
│                                         │
│  ┌── Real FindingCard (streamed) ──┐   │
│  │  [Contradiction] [High]         │   │
│  │  Excerpt: "…"                   │   │
│  │  Issue text                     │   │
│  │  ❓ Clarifying question         │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**State C — Results complete**
```
┌─────────────────────────────────────────┐
│  8 issues found      Clarity score: 64  │
│  (Label/md, text/secondary)  (accent)   │
│                                         │
│  [ Copy as Markdown ]  [ Analyze again ]│
│  (Ghost SM button)      (Ghost SM)      │
│                                         │
│  ┌── FindingCard ──────────────────┐   │
│  │  [Contradiction] [Critical]     │   │
│  │  "Section 2 says users get…"    │   │  ← excerpt, bg/surface
│  │  Two statements conflict on…    │   │  ← issue
│  │  ❓ Which behavior is correct?  │   │  ← question, accent border-l
│  └─────────────────────────────────┘   │
│                                         │
│  ┌── FindingCard ──────────────────┐   │
│  │  ...                            │   │
│  └─────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

**State D — Daily limit reached (inline banner)**
```
┌─────────────────────────────────────────────────────────┐
│  ⚠  Daily limit reached on shared key.                  │
│     Try again tomorrow — or connect your own free key.  │
│     [ Connect your key → ]  (accent text button)        │
│  bg/elevated, border border/default, radius/lg, p-4     │
└─────────────────────────────────────────────────────────┘
```

### FindingCard Anatomy (detailed)

```
┌─────────────────────────────────────────────────────────────────────┐
│  bg/elevated  ·  border border/default  ·  radius/lg  ·  p-5       │
│                                                                     │
│  ┌─ Header row ─────────────────────────────────────────────────┐  │
│  │  [Category Badge]                          [Severity Badge]  │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌─ Excerpt block ──────────────────────────────────────────────┐  │
│  │  bg/surface  ·  border-l-2 border/strong  ·  p-3  ·  mt-3   │  │
│  │  radius/sm                                                    │  │
│  │  "The exact text from the spec that is ambiguous…"           │  │
│  │  (Body/sm, text/secondary, Code/md font family)              │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Issue text  (Body/md, text/secondary, mt-3)                       │
│  "Why this is a problem — a plain English explanation."             │
│                                                                     │
│  ┌─ Question block ─────────────────────────────────────────────┐  │
│  │  border-l-2  ·  border-accent/default  ·  pl-3  ·  mt-3     │  │
│  │  "❓ The clarifying question to resolve this ambiguity."     │  │
│  │  (Body/md, text/primary, Semi Bold)                          │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Specs — Analyze

| Component | Spec |
|---|---|
| Page split | CSS grid: `grid-cols-[560px_1fr]` lg screens; single col mobile |
| Left panel | `overflow-y-auto`, sticky within viewport |
| SpecInput | `<textarea>` uncontrolled, `resize-none`, auto-grows via JS, max 50,000 chars |
| Char counter | bottom-right of input, `Label/md`, turns `color/error` at >45,000 |
| Upload zone | `<input type="file" accept=".md,.txt">`, drag-and-drop via `onDragOver`/`onDrop` |
| Analyze button | disabled while streaming, shows spinner icon when loading |
| Right panel | `overflow-y-auto`, full viewport height minus header |
| FindingCard | `motion.div` with `initial={{opacity:0, y:8}} animate={{opacity:1, y:0}}` |
| Shimmer cards | 2 placeholder cards, CSS `animate-pulse`, shown only during streaming |
| Copy button | `navigator.clipboard.writeText(markdownOutput)`, flips to "Copied! ✓" 2s |
| Clarity score | Number 0–100, colored: 0–40 error, 41–70 warning, 71–100 success |

---

## Screen 03 — Provider Picker (Sheet)

**Purpose:** Let users switch from the shared key to their own API key.  
**Trigger:** Clicking the ProviderStatusBadge in the header.  
**Implementation:** shadcn `<Sheet side="right" />`, width 480px.

### Layout

```
┌─────────────── 480px sheet (slides in from right) ────────────────┐
│  bg/surface  ·  border-l border/default  ·  full viewport height   │
│                                                                    │
│  ┌── Sheet header ─────────────────────────────────────────────┐  │
│  │  padding: 24px 24px 0                                       │  │
│  │                                                             │  │
│  │  Connect your AI                    [ × close ]            │  │
│  │  (Heading/lg, text/primary)          (Ghost icon btn)       │  │
│  │                                                             │  │
│  │  Free options work great.                                   │  │
│  │  BYOK for unlimited analyses.                               │  │
│  │  (Body/md, text/secondary)                                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ─────────────── divider (border/default) ───────────────────────  │
│                                                                    │
│  ┌── Provider grid (2×2) ──────────────────────────────────────┐  │
│  │  padding: 24px  ·  gap: 12px                                │  │
│  │                                                             │  │
│  │  ┌── ProviderCard: Shared ─────┐  ┌── ProviderCard: Gemini┐│  │
│  │  │  [G] Shared (Free)          │  │  [G] Gemini           ││  │
│  │  │  3 analyses/day             │  │  Free · Get key →     ││  │
│  │  │  No setup needed            │  │                       ││  │
│  │  │  bg/elevated, radius/lg     │  │  bg/elevated          ││  │
│  │  │  ACTIVE: border accent,     │  │  radius/lg            ││  │
│  │  │  accent dot in corner       │  │                       ││  │
│  │  └─────────────────────────────┘  └───────────────────────┘│  │
│  │                                                             │  │
│  │  ┌── ProviderCard: Groq ───────┐  ┌── ProviderCard: Claude┐│  │
│  │  │  [G] Groq                   │  │  [A] Claude           ││  │
│  │  │  Free · Get key →           │  │  Paid · BYOK          ││  │
│  │  │  bg/elevated, radius/lg     │  │  bg/elevated          ││  │
│  │  └─────────────────────────────┘  └───────────────────────┘│  │
│  │                                                             │  │
│  │  ┌── ProviderCard: OpenAI ─────────────────────────────┐   │  │
│  │  │  [O] OpenAI                                         │   │  │
│  │  │  Paid · BYOK                                        │   │  │
│  │  │  bg/elevated, radius/lg                             │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌── API Key Input (shown when non-Shared card selected) ──────┐  │
│  │  padding: 0 24px 24px                                       │  │
│  │                                                             │  │
│  │  Your Gemini API key                                        │  │
│  │  (Label/lg, text/secondary)                                 │  │
│  │                                                             │  │
│  │  ┌─────────────────────────────────────────────────────┐   │  │
│  │  │  type="password"  placeholder="AIza..."             │   │  │
│  │  │  bg/elevated · border border/default · radius/md    │   │  │
│  │  │  p-3 · Body/md · text/primary                       │   │  │
│  │  └─────────────────────────────────────────────────────┘   │  │
│  │                                                             │  │
│  │  Get a free Gemini key at ai.google.dev →                  │  │
│  │  (Label/md, accent color, link)                            │  │
│  │                                                             │  │
│  │  [ Save & Connect ]            [ Disconnect ]              │  │
│  │  Primary Button MD              Ghost Button MD            │  │
│  │  (shown when key entered)       (shown when connected)     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

### ProviderCard Anatomy

```
┌──────────────────────────────────────────┐
│  bg/elevated  ·  radius/lg  ·  p-4       │
│  border border/default  (default state)  │
│  border accent/default  (selected state) │
│  cursor-pointer  ·  hover: bg/hover      │
│                                          │
│  ┌─ Row ─────────────────────────────┐  │
│  │  [Provider logo 24px]  Name       │  │
│  │  (Heading/md, text/primary)       │  │
│  └───────────────────────────────────┘  │
│                                          │
│  Free · No setup  OR  Paid · BYOK        │
│  (Label/md, text/secondary)              │
│                                          │
│  [ACTIVE indicator: accent dot top-right │
│   position: absolute, 8px circle]        │
└──────────────────────────────────────────┘
```

### ProviderStatusBadge (Header) Anatomy

```
┌──────────────────────────────────────────────────────┐
│  Clickable pill button in header                     │
│  bg/elevated  ·  border border/default  ·  radius/md │
│  px-3 py-1.5  ·  hover: bg/hover                     │
│                                                      │
│  [●] Shared · 2 / 3 today                           │
│  dot  label       usage count                        │
│                                                      │
│  dot colors:                                         │
│    Shared key active  → green/500                    │
│    BYOK connected     → accent/default (purple)      │
│    Limit reached      → severity/critical (red)      │
│                                                      │
│  Label: "Shared" / "Gemini" / "Groq" / "Claude" /   │
│         "OpenAI"  (Label/lg, text/primary)           │
│  Usage: "2 / 3 today" (only shown on shared key)     │
│         (Label/md, text/secondary)                   │
└──────────────────────────────────────────────────────┘
```

### Component Specs — Provider Picker

| Component | Spec |
|---|---|
| Sheet | `shadcn <Sheet side="right">`, width 480px, `z-index: 50` |
| Trigger | ProviderStatusBadge click → `setOpen(true)` |
| Provider grid | `grid grid-cols-2 gap-3` |
| ProviderCard active border | `border-2 border-accent` when selected |
| Key input | `type="password"`, `autocomplete="off"`, never `console.log` |
| Save handler | `localStorage.setItem('speclens_provider', JSON.stringify({provider, apiKey}))` |
| Disconnect | `localStorage.removeItem('speclens_provider')`, revert to shared |
| Animation | Sheet slides in via shadcn's built-in Radix transition |

---

## Mobile Responsiveness Notes

| Breakpoint | Change |
|---|---|
| < 1024px (tablet) | Analyze page: stack panels vertically (input top, results bottom) |
| < 768px (mobile) | Hero: reduce Display/xl to Display/lg; hide demo section left panel |
| < 640px (mobile) | Provider sheet: full-width (100vw) instead of 480px |
| All screens | Header: collapse GitHub icon, keep ProviderStatusBadge |

---

## Copy / Content

### Hero headline variants (A/B candidates)
- "Catch every ambiguity before code is written." ← primary
- "Your spec is missing something. Find it before engineering does."
- "Ship features that match intent."

### Empty state messages
- Input empty: "Paste any PRD, user story, or requirements doc — SpecLens finds the gaps."
- Results empty (no findings): "✓ No issues found. This spec looks clear." (green)

### Error messages
- Stream error: "Analysis failed. Check your API key or try again."
- Spec too short (<100 chars): "Paste a longer spec — at least a few sentences work best."
- Rate limit: "You've used today's 3 free analyses. Connect your own key for unlimited."
