# SpecLens — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** 2026-06-14  
**Status:** Approved

---

## 1. Product Overview

SpecLens is a web-based AI tool that analyzes product specs, PRDs, and user stories for ambiguity. Users paste their spec text, click Analyze, and receive a structured list of findings — each with a category, severity, the exact ambiguous excerpt, why it's a problem, and a clarifying question to resolve it.

---

## 2. User Stories

### Core Flow
- As a PM, I want to paste my PRD text and get back a list of ambiguities so that I can fix gaps before handing off to engineering.
- As a QA engineer, I want to upload a `.md` or `.txt` spec file and see missing edge cases so that I can write complete test cases.
- As a tech lead, I want to see contradictions in a spec flagged automatically so that I don't waste sprint planning time asking obvious questions.

### Provider Management
- As a new user, I want to analyze my first spec without any setup so that I can see value before committing to anything.
- As a power user, I want to connect my own free Gemini or Groq key so that I can run unlimited analyses.
- As a Claude subscriber, I want to paste my Anthropic API key so that I get the best quality analysis.
- As a returning user, I want my API key remembered so that I don't have to re-enter it each session.

### Output & Export
- As a user, I want findings to stream in as they are identified so that the experience feels fast and alive.
- As a PM, I want to copy all findings as Markdown so that I can paste them into my spec doc or Notion.
- As a user, I want to filter findings by severity or category so that I can focus on the most critical gaps first.

---

## 3. Features — MoSCoW Prioritization

### Must Have (MVP)
| # | Feature | Description |
|---|---|---|
| F1 | Spec text input | Large textarea for pasting spec content |
| F2 | File upload | Accept `.md` and `.txt` files |
| F3 | Streaming analysis | Findings stream in one by one as AI identifies them |
| F4 | Structured findings | Each finding shows: category, severity, excerpt, issue description, clarifying question |
| F5 | Shared Gemini key | First 3 analyses/day per IP run on server-side shared key — no setup required |
| F6 | Provider status in header | Always-visible indicator showing current provider and daily usage |
| F7 | Provider picker | Settings panel to add own API key for Gemini, Groq, Claude, or OpenAI |
| F8 | Static demo | Landing page with pre-loaded sample spec and hardcoded example output |
| F9 | Soft usage nudge | After first analysis, display non-blocking banner explaining shared key limits |
| F10 | Copy as Markdown | One-click export of all findings as formatted Markdown |
| F11 | Daily limit message | Friendly "limit reached" message with BYOK option when shared key exhausted |

### Should Have (v1.1)
| # | Feature | Description |
|---|---|---|
| F12 | Severity filter | Filter findings by Critical / High / Medium / Low |
| F13 | Category filter | Filter by ambiguity type (underspecified, contradiction, etc.) |
| F14 | Clarity score | Overall spec clarity score (0–100) shown at top of results |
| F15 | Finding count badge | Summary bar showing counts per category |

### Could Have (v2)
| # | Feature | Description |
|---|---|---|
| F16 | Google Docs URL input | Paste a Docs URL; SpecLens fetches and analyzes (requires OAuth) |
| F17 | Confluence/Notion URL input | Similar to above |
| F18 | History (localStorage) | Store last 5 analyses locally in browser |
| F19 | Finding acknowledgement | Mark individual findings as "resolved" or "won't fix" |

### Won't Have (v1)
- User accounts / login
- Team collaboration
- Jira/Linear integration
- PDF parsing
- Multi-language support
- API for programmatic access

---

## 4. Ambiguity Detection Categories

The AI detects and classifies findings into six categories:

| Category | Definition | Example |
|---|---|---|
| **Underspecified Behavior** | System behavior is described but incomplete — what happens in the failure or edge case is not defined | "The button submits the form" — what happens if submission fails? |
| **Undefined Term** | A term is used that has no clear definition in context | "Admins can manage users" — what does "manage" mean? |
| **Contradiction** | Two statements in the spec imply conflicting behavior | Section 2 says users get email notifications; Section 5 says notifications are opt-in only |
| **Missing Edge Case** | A logical boundary condition is not addressed | User story covers happy path but not what happens when the cart is empty |
| **Implicit Assumption** | The spec assumes a condition that is never stated | "Users log in" — assumes an auth system exists, but none is specified |
| **Scope Gap** | A required actor, permission, or action boundary is undefined | "Users can delete records" — which users? All users? Only owners? |

---

## 5. Severity Levels

| Severity | Definition | Color |
|---|---|---|
| **Critical** | Will cause blocking disagreement or a shipped defect | Red |
| **High** | Likely causes rework or incorrect implementation | Orange |
| **Medium** | Creates confusion or inconsistency that needs resolution | Yellow |
| **Low** | Minor clarity improvement; won't cause major issues | Blue |

---

## 6. Acceptance Criteria

### F1 — Spec Text Input
- [ ] Textarea accepts plain text up to 50,000 characters
- [ ] Character count displayed
- [ ] Pasting via keyboard shortcut works

### F3 — Streaming Analysis
- [ ] First finding appears within 3 seconds of clicking Analyze
- [ ] Each finding renders as a complete card when streamed
- [ ] A loading indicator is visible until the stream completes
- [ ] If the stream errors, a clear error message is shown with retry option

### F5 — Shared Gemini Key
- [ ] First 3 analyses from a given IP per day run without any user action
- [ ] Usage counter tracked server-side in-memory
- [ ] Counter resets at midnight UTC

### F7 — Provider Picker
- [ ] Accessible from settings icon in header
- [ ] Shows four providers: Gemini, Groq, Claude, OpenAI
- [ ] Each provider card shows: name, cost label ("Free" or "Paid — BYOK"), setup link
- [ ] API key input is a password field (masked)
- [ ] Key saved to localStorage on submit
- [ ] Key cleared on "Disconnect" action
- [ ] Active provider shown in header status badge

### F10 — Copy as Markdown
- [ ] Copies all findings in formatted Markdown table
- [ ] Button shows "Copied!" confirmation for 2 seconds

---

## 7. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Time to first finding | < 3 seconds |
| Full analysis time (average spec) | < 15 seconds |
| Mobile responsive | Yes (readable and usable on mobile) |
| Accessibility | WCAG 2.1 AA minimum |
| No analytics that track personal data | Vercel Analytics only (privacy-friendly, no PII) |
| API key security | Never logged, never sent to any server except the AI provider's API |

---

## 8. Screen Inventory

1. **Landing page** — Hero, demo section (static), CTA to analyze own spec
2. **Analyze page** — Input area, file upload, Analyze button, streaming results
3. **Provider picker sheet** — Slide-in panel, provider cards, key input
4. **Header** — Logo, provider status badge, settings icon
5. **Footer** — GitHub link, license, "Built with SpecLens" tagline
