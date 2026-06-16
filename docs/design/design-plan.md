# SpecLens — Figma Design Plan

**Figma File:** https://www.figma.com/design/JMAYJSCkdyU4WtxRX6A3qF  
**File Key:** JMAYJSCkdyU4WtxRX6A3qF  
**Status:** File created, design not yet built  
**Design Direction:** Enterprise dark theme — Linear/Vercel/Raycast aesthetic

---

## Color Tokens

### Primitives Collection (1 mode: Value)
Raw values that semantic tokens alias into.

| Token | Value |
|---|---|
| indigo/400 | #818CF8 |
| indigo/500 | #6366F1 |
| indigo/300 | #A5B4FC |
| purple/400 | #A78BFA |
| purple/500 | #7C6EF7 |
| slate/50 | #F8FAFC |
| slate/100 | #F0F0FF |
| slate/400 | #94A3B8 |
| slate/500 | #64748B |
| slate/600 | #475569 |
| slate/700 | #334155 |
| slate/800 | #1E293B |
| slate/900 | #0F172A |
| zinc/950 | #09090B |
| red/500 | #EF4444 |
| orange/500 | #F97316 |
| amber/500 | #F59E0B |
| yellow/400 | #FACC15 |
| blue/400 | #60A5FA |
| green/500 | #22C55E |
| teal/400 | #2DD4BF |
| pink/400 | #F472B6 |
| white | #FFFFFF |
| black | #000000 |

### Color Collection (1 mode: Dark)
Semantic tokens — all alias Primitives.

| Token | Dark Value | Scope |
|---|---|---|
| color/bg/base | #09090F | FRAME_FILL, SHAPE_FILL |
| color/bg/surface | #111119 | FRAME_FILL, SHAPE_FILL |
| color/bg/elevated | #1B1B2B | FRAME_FILL, SHAPE_FILL |
| color/bg/hover | #22223A | FRAME_FILL, SHAPE_FILL |
| color/border/default | #2A2A42 | STROKE_COLOR |
| color/border/strong | #3D3D5C | STROKE_COLOR |
| color/text/primary | #F0F0FF | TEXT_FILL |
| color/text/secondary | #8892A4 | TEXT_FILL |
| color/text/muted | #4D5568 | TEXT_FILL |
| color/accent/default | #7C6EF7 | FRAME_FILL, SHAPE_FILL |
| color/accent/hover | #9A8EFF | FRAME_FILL, SHAPE_FILL |
| color/accent/foreground | #FFFFFF | TEXT_FILL |
| color/severity/critical | #FF4444 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/severity/high | #FF8C00 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/severity/medium | #E6B800 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/severity/low | #4F9EFF | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/category/underspecified | #A78BFA | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/category/undefined-term | #2DD4BF | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/category/contradiction | #F87171 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/category/edge-case | #FACC15 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/category/assumption | #60A5FA | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/category/scope-gap | #F472B6 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/success | #22C55E | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/warning | #F59E0B | FRAME_FILL, SHAPE_FILL, TEXT_FILL |
| color/error | #EF4444 | FRAME_FILL, SHAPE_FILL, TEXT_FILL |

### Spacing Collection (1 mode: Value)
| Token | Value (px) | Scope |
|---|---|---|
| spacing/1 | 4 | GAP, PADDING |
| spacing/2 | 8 | GAP, PADDING |
| spacing/3 | 12 | GAP, PADDING |
| spacing/4 | 16 | GAP, PADDING |
| spacing/5 | 20 | GAP, PADDING |
| spacing/6 | 24 | GAP, PADDING |
| spacing/8 | 32 | GAP, PADDING |
| spacing/10 | 40 | GAP, PADDING |
| spacing/12 | 48 | GAP, PADDING |
| spacing/16 | 64 | GAP, PADDING |

### Radius Collection (1 mode: Value)
| Token | Value (px) | Scope |
|---|---|---|
| radius/sm | 6 | CORNER_RADIUS |
| radius/md | 8 | CORNER_RADIUS |
| radius/lg | 12 | CORNER_RADIUS |
| radius/xl | 16 | CORNER_RADIUS |
| radius/full | 9999 | CORNER_RADIUS |

---

## Typography (Text Styles)
Font: **Inter**

| Style | Family | Weight | Size | Line Height |
|---|---|---|---|---|
| Display/xl | Inter | Extra Bold | 48px | 1.2 |
| Display/lg | Inter | Bold | 36px | 1.2 |
| Heading/xl | Inter | Bold | 24px | 1.3 |
| Heading/lg | Inter | Semi Bold | 20px | 1.4 |
| Heading/md | Inter | Semi Bold | 16px | 1.4 |
| Body/lg | Inter | Regular | 16px | 1.6 |
| Body/md | Inter | Regular | 14px | 1.6 |
| Body/sm | Inter | Regular | 12px | 1.6 |
| Label/lg | Inter | Medium | 14px | 1.4 |
| Label/md | Inter | Medium | 12px | 1.4 |
| Code/md | JetBrains Mono | Regular | 13px | 1.5 |

---

## Components (v1 scope — 6 components)

### 1. Badge
- **Severity variants:** Critical (red), High (orange), Medium (yellow), Low (blue)
- **Category variants:** 6 types with matching colors (see color tokens)
- Size: SM only
- Style: pill shape (radius/full), colored dot + label

### 2. Button
- **Style variants:** Primary (accent fill), Secondary (surface fill + border), Ghost (transparent)
- **Size variants:** SM (32px h), MD (40px h), LG (48px h)
- **State variants:** Default, Hover, Loading, Disabled
- Total: 3 styles × 3 sizes × 4 states = 36 variants (split into sub-components)

### 3. FindingCard
The core output component.
- Header: Category badge (left) + Severity badge (right)
- Excerpt block: quoted text from spec (code-style background)
- Issue: plain text explanation of why it's ambiguous
- Question: highlighted clarifying question (accent border-left)
- States: Default, Streaming (shimmer/placeholder), Expanded/Collapsed

### 4. ProviderCard
Used in the Provider Picker sheet.
- Provider logo + name + cost label ("Free" or "Paid — BYOK")
- States: Connected (accent border), Disconnected (default border), Active (selected)
- Providers: Gemini, Groq, Claude, OpenAI

### 5. SpecInput
- Large textarea (min 200px height, auto-grows)
- Character count bottom-right (e.g. "2,341 / 50,000")
- File upload drop zone (dashed border on hover)
- States: Empty, Filled, Drag-over, Disabled (while analyzing)

### 6. ProviderStatusBadge
- Always visible in header
- Shows: colored dot + provider name + usage count ("Shared · 2/3 today")
- Clickable → opens Provider Picker sheet
- States: Shared (green dot), BYOK-active (accent dot), Limit-reached (red dot)

---

## Screens (4)

### 01 — Landing
- **Hero:** Large headline "Catch every ambiguity before code is written" + subheading + CTA button
- **Demo section:** Pre-loaded sample spec (left) + 4-5 hardcoded findings (right)
- **How it works:** 3-step explainer (Paste → Analyze → Fix)
- **Footer:** GitHub link + "100% free to start"
- Canvas size: 1440px wide

### 02 — Analyze
- **Left panel:** SpecInput + file upload + Analyze button
- **Right panel:** FindingCard list (streaming in)
- **Header:** ProviderStatusBadge
- **States:** Empty (prompt to paste), Analyzing (shimmer cards), Results (findings list), Error
- Canvas size: 1440px wide

### 03 — Provider Picker (Sheet/Modal)
- Slide-in from right (shadcn Sheet)
- Title: "Connect your AI"
- Subtext: "Free options work great. BYOK for unlimited."
- 2×2 grid of ProviderCards
- Selected provider: API key input field appears below
- Link: "Get free Gemini key →" / "Get free Groq key →"
- Canvas size: 480px wide (sheet width)

### 04 — Limit Reached State
- Inline state within Analyze page (not a separate screen)
- Soft banner below the last finding: "Daily limit reached on shared key. Try again tomorrow — or connect your own free key."
- CTA: "Connect your key →" (opens Provider Picker)

---

## Figma Page Structure

```
🎨 Cover
📐 Foundations
   └── Colors · Typography · Spacing · Radius
─── Components ───
   Badge
   Button
   FindingCard
   ProviderCard
   SpecInput
   ProviderStatusBadge
─── Screens ───
   01 · Landing
   02 · Analyze
   03 · Provider Picker
```

---

## Build Order (Phase 1 → 4)

1. **Phase 1:** Token collections (Primitives → Color → Spacing → Radius)
2. **Phase 1b:** Typography text styles
3. **Phase 2:** Page structure + Foundations documentation page
4. **Phase 3a:** Badge component (simplest, foundational)
5. **Phase 3b:** Button component
6. **Phase 3c:** SpecInput
7. **Phase 3d:** ProviderStatusBadge
8. **Phase 3e:** ProviderCard
9. **Phase 3f:** FindingCard (most complex — depends on Badge)
10. **Phase 4:** Screen compositions (Landing → Analyze → Provider Picker)

---

## Session Resumption Notes

- Figma file already created: `JMAYJSCkdyU4WtxRX6A3qF`
- User authorized via OAuth (no PAT needed)
- Skills needed in new session: `figma:figma-use` + `figma:figma-generate-library`
- Must call `figma:figma-use` skill BEFORE every `use_figma` call
- Must follow Phase 0→1→2→3 order strictly (no skipping)
- NEVER parallelize `use_figma` calls — strictly sequential
- Return ALL created node IDs from every script
- Colors are 0-1 range (not 0-255)
- Inter font style for Semi Bold is "Semi Bold" (with space, not "SemiBold")
