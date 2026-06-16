# SpecLens — Business Requirements Document (BRD)

**Version:** 1.0  
**Date:** 2026-06-14  
**Status:** Approved

---

## 1. Business Objective

Enable product managers, QA engineers, and engineering leads to catch every ambiguity in a product spec *before a single line of code is written* — automatically, in seconds, for free.

The goal is to reduce rework caused by underspecified requirements, which industry data consistently shows accounts for 30–50% of software defect costs.

---

## 2. Problem Statement

Product specs written by humans contain gaps. Engineers interpret ambiguous requirements differently. QA misses edge cases that were never defined. Stakeholders don't realize the gaps until a bug is filed or a feature ships wrong.

Today's solutions to this problem are:
- **Manual review in meetings** — expensive, inconsistent, doesn't scale
- **QA finding gaps after development** — too late, costly to fix
- **Experience of a senior PM or tech lead** — doesn't scale, not everyone has one
- **Enterprise requirements tools (DOORS, Jama)** — six-figure contracts, require formal process adoption, designed for regulated industries not software product teams

There is no fast, lightweight, AI-powered tool that a PM can use in 30 seconds to catch spec gaps before handoff.

---

## 3. Target Users

| Persona | Role | Primary Use Case |
|---|---|---|
| Product Manager | Writes PRDs and user stories | Sanity-check spec before sharing with engineering |
| QA / Test Engineer | Receives specs to write test cases from | Catch edge cases before development starts |
| Tech Lead / Senior Engineer | Reviews specs in sprint planning | Unblock team by surfacing gaps upfront |
| Solo Builder / Indie Hacker | Writing specs for their own product | Tighten specs before starting development |

---

## 4. Business Goals

1. **Reduce spec rework** — Give teams a tool to catch gaps at the cheapest point in the development cycle (before coding).
2. **Establish open source presence** — Build a credible, production-quality open source AI tool with real-world adoption.
3. **Zero cost to operate** — Leverage free AI tiers (Gemini) and free hosting (Vercel) so the project is sustainable at $0/month.
4. **Enable BYOK scale** — Users who exceed free limits bring their own API key; SpecLens remains free to operate regardless of traffic.

---

## 5. Success Metrics

| Metric | Target (3 months post-launch) |
|---|---|
| GitHub stars | 200+ |
| Monthly active users | 500+ |
| Average analyses per session | 2+ |
| BYOK conversion rate | 15%+ of returning users |
| User-reported "found a real gap" rate | 70%+ (qualitative feedback) |

---

## 6. Constraints

| Constraint | Detail |
|---|---|
| **Cost** | $0 operating cost — no paid APIs, no paid hosting |
| **Privacy** | No user data stored server-side; keys in localStorage only |
| **No auth** | No user accounts or login required |
| **No database** | State lives in browser; no persistence layer |
| **Open source** | MIT license; all code public on GitHub |
| **Timeline** | MVP buildable in a single session |

---

## 7. Assumptions

- Users are comfortable pasting spec text into a web form
- Gemini 2.0 Flash free tier (1500 req/day) is sufficient for shared-key usage at early adoption scale
- Vercel Hobby plan free tier is sufficient for traffic at launch
- Users can obtain a free Gemini or Groq API key in under 2 minutes if they want unlimited usage

---

## 8. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Gemini free tier exhausted by traffic | Medium | Medium | Rate limit per IP; prompt BYOK when limit hit |
| AI output quality inconsistent | Medium | High | Strong system prompt + Zod output validation + curated demo |
| Low adoption due to setup friction | Medium | High | Zero-friction first use (shared key, no signup) |
| Competitor launches similar tool | Low | Medium | Open source moat + speed to market |

---

## 9. Out of Scope (v1)

- User accounts or saved history
- Team collaboration features
- Integrations with Jira, Linear, Confluence, or Notion
- PDF upload and parsing
- Google Docs URL ingestion
- Spec comparison / diff between versions
- Export to formats other than Markdown copy
- Multi-language support (English only for v1)
