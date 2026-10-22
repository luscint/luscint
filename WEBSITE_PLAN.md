# Luscint Website — Improvement Plan

*Drafted 2026-10-22, updated with Chad's comments the same day. Companion to the PaCE research site (`../websitePaCE`). Luscint is the commercial branch; PaCE is the academic one.*

---

## 0. Decisions so far (from your comments, 2026-10-22)

| Topic | Decision |
|---|---|
| Satellite | Inside the PaCE research line. No partners. Site should not look "experimental" to buyers (see 2.3 for how we word it honestly). |
| Hypothesis-style copy ("do night lights precede escalation?") | **No.** Dropped. |
| TCD / PaCE | **Do not use TCD's name or logo.** Don't foreground PaCE as the credential. Cite the peer-reviewed paper as a publication only. |
| Open vs. commercial | Site must say clearly that Luscint **goes beyond** the open data: more signals, history, cadence, exposure mapping, SLAs, custom work. |
| IP / data licence | Chad believes they own it. **Still to verify** (see 10) — ERC-funded work at a university often has institutional claims. |
| Audience | Finance first. No named pilot target yet. |
| Team | Just Chad for now → founder-led About page, no team page. |
| Domain | Chad controls the luscint.com registrar. |
| Designer | Yes, approved in principle (options in 7.5). |
| Backtest / headline | Undecided. |

---

## 1. Where we are

**Done in the last session:** maps fixed (keyless Esri tiles, PaCE components), data feed repointed to `conflictlab/Pace-map-risk` (now 2026-09), fake performance chart and mock Demo stats removed, homepage reframed around risk management, Data page rebuilt from PaCE with archive + code examples.

**What the site still is:** a thin marketing shell (home, technology, about, use cases, contact) wrapped around the PaCE forecast viewer. It looks like a research prototype with a corporate header, not a company a bank or reinsurer would sign a contract with.

### Problems still live (ordered by risk)

| # | Problem | Why it matters |
|---|---|---|
| 1 | **Contact form is fake.** `app/contact/page.tsx` just flips a state flag; nothing is sent. | We are losing every enquiry. Fix first. |
| 2 | **Six "case study" pages (`public/pdfs/AICAP_*.html`) contain unsourced figures** (e.g. 20%/30%/45% for asset managers, 85%/70% for governments) under the retired names "AICAP"/"Clairient". They're linked from Use Cases. | Same issue as the fake chart: invented performance claims to financial audiences. Pull them until each number is sourced or removed. |
| 3 | **About page claims** "unprecedented accuracy" and compares us to ViEWS, ICEWS, Control Risks, Dataminr, Maplecroft, S&P. | Unsupported superlative; naming competitors invites scrutiny. ViEWS/ICEWS are academic peers we should *cite*, not claim to match. |
| 4 | **Old brand still in the repo:** company memo and `AICAP_*.md` files say Clairient; `clairient-blue` Tailwind tokens; `services.json` mentions "AICAP forecast accuracy". | Confusing for anyone who sees the repo; sloppy if copy leaks into the site. |
| 5 | **luscint.com doesn't serve the site** (placeholder page at the registrar). Code examples point at `luscint.github.io/luscint`. | Credibility; email deliverability; SEO. |
| 6 | **No evidence section.** No accuracy metrics, no backtest, no benchmark, no sample report. | Finance/insurance buyers will ask for this in the first call. |
| 7 | **No legal basics:** no privacy notice, terms, cookie/analytics policy, "not investment advice" disclaimer. | Required before we market to regulated firms. |
| 8 | **No founder/company story.** | Buyers buy from people; a short, credible founder bio (publications, background) does the job of a team page for now. |

---

## 2. Positioning (decide this first — everything else follows)

### 2.1 One-sentence position
> **Luscint turns early-warning signals of political violence into forecasts that risk teams can act on — months ahead, with quantified uncertainty.**

Keep "forecasts, not alerts" and "interpretable" as the differentiators. Drop "unprecedented accuracy".

### 2.2 The claim: risk reduction, not returns
Agreed in the earlier discussion. Conflict forecasts are a **tail-risk and exposure tool**. Public claims should be:
- early visibility of escalation (lead time in months),
- fewer surprises / smaller drawdowns / better-priced exposure,
- transparent uncertainty.

Not: alpha, "outperform", "proven financial impact". A volatility/drawdown claim becomes publishable **only after a real backtest** (see §6.2).

### 2.3 Generalise the technology: from "conflict model" to "early-warning platform"
We are exploring satellite early-warning signals. The site should be ready to say so **honestly**, without claiming a product that doesn't exist yet.

**Proposed framing — three layers:**

1. **Signal layer** (inputs; pluggable)
   - *Live today:* conflict event history (UCDP), PRIO-GRID cells, country covariates.
   - *Additional signal modules (satellite, market, shipping):* night-time lights, vegetation and crop stress, flood/fire extent, displacement and infrastructure change, market and price data, shipping activity.
     **Wording rule:** present these as modules the platform integrates **on request / in client builds**, not as "experimental" and not as a live standard feed. Buyers want reliable work, and we want the site to sound confident — but we can only say what is true on the day a prospect asks. See "Honesty line" below.
2. **Pattern engine** (the current research: pattern matching / DTW analogues over spatio-temporal histories → forecasts with intervals at h = 1–6 months, country and 0.5° grid).
3. **Delivery layer** (dashboard, API/CSV, monthly reports, exposure mapping for clients).

Why this works commercially: the engine is **signal-agnostic**, so "we add satellite" is an extension of the platform, not a pivot. It also future-proofs the name: Luscint is not tied to "conflict" in the way PaCE (Patterns of Conflict Escalation) is.

**Language rules for satellite and other new signals on the site:**
- **Honesty line (my one push-back).** I'll drop "research" and "experimental" labels, but I won't write copy that says a satellite or market signal is a live, validated part of the forecasts if it isn't yet. Selling a capability that doesn't exist to financial and insurance buyers is the same risk as the fake performance chart, and in regulated sales it can also be a misrepresentation. Wording that is both confident and true: *"Luscint's engine is signal-agnostic. Satellite-derived and market signals can be integrated into client-specific forecasts."* — true as long as we can deliver on request. If you'd rather say "available", the condition is that at least one signal is built, tested and documented first.
- No hypothesis-style copy (agreed).
- Name specific sensors/datasets (Sentinel, VIIRS, MODIS, Landsat…) only once we actually use them.
- **Design-partner programme** for new signals: kept ("Work with us to add the signals that matter to your portfolio").
- Because satellite work sits inside the PaCE research line, results will be published openly; Luscint's commercial value is **integration, reliability, delivery and tailoring**, not secrecy of the science.

### 2.4 Relationship to PaCE — be explicit
Right now the site never explains it. Recommended:
- **Open data (CC BY-NC) is free for research; Luscint goes beyond it.** One clear comparison table on a page called "Open data vs. Luscint": what the free monthly files give you vs. what a Luscint client gets — commercial licence, point-in-time history, higher cadence/custom horizons, additional signal modules, exposure mapping for your holdings or locations, API with SLA, support, bespoke models.
- **No TCD name or logo anywhere** (decided). Credibility comes from the **published method** (cite the JPR 2025 paper as a reference, which is normal scholarly citation) and from showing real forecasts and validation — not from institutional branding.
- Keep "PaCE" off the marketing pages. The Data page can still link to the open data repository, described neutrally ("open research data").
- **Still verify the IP position** (see §10 #1) even though we're not using the name: if ERC/TCD claim rights in the forecasts or code, selling a commercial licence under Luscint would need their agreement. Worth one email to the tech-transfer office or a look at the grant agreement before the first paying customer.

---

## 3. Audiences and what each needs

| Audience | Their question | What we must show | Proof they accept |
|---|---|---|---|
| **Asset managers / hedge funds** (primary) | "Does this reduce my country/sovereign/EM exposure risk before the market reprices?" | Country ranking & escalation flags, 1–6m horizon, uncertainty bands, integration (API/CSV, Bloomberg-friendly formats), point-in-time archive | Out-of-sample backtest vs. simple baselines, event-study of past escalations, drawdown/volatility analysis (§6.2) |
| **Insurers / reinsurers** (SRCC, political violence, trade credit) | "Can I price and accumulate PV/SRCC risk better at location level?" | 0.5° grid (~55 km) risk by month, exposure-at-location lookups, accumulation views, return-period-style language | Calibration of intervals, comparison to existing PV models, loss-event hit rates by region |
| **Governments / NGOs / humanitarian** | "Where do I pre-position resources, and how confident should I be?" | Sub-national forecasts, 6-month horizon, scenario narratives, free/low-cost access, methods transparency | Peer-reviewed method, open data, accuracy against ACLED/UCDP, partnerships |
| **Corporates (supply chain, security)** *(secondary)* | "Which sites/suppliers are exposed?" | Exposure mapping, alerts, report | Case examples |

**Sequence:** lead with finance and insurance on the homepage; give governments/NGOs a distinct, warmer page ("Public-interest access") because it is also a differentiator versus Control Risks/Maplecroft-type vendors.

---

## 4. Information architecture

### Current nav
Technology · Dashboard · Data · Use Cases · Contact

### Proposed nav
**Product ▾** (Platform overview · Country forecasts · Sub-national grid · Exposure mapping · Early-warning signals)
**Solutions ▾** (Asset management · Insurance & reinsurance · Governments & NGOs)
**Evidence ▾** (Methodology · Performance & validation · Publications · Sample report)
**Data & API** · **About ▾** (Company · Open data vs. Luscint · FAQ) · **Request a demo** (button)

### New or reworked pages

| Page | Purpose | Notes / source material |
|---|---|---|
| `/` Home | Positioning, proof points, 3 solution cards, live map teaser, CTA | See §5 |
| `/platform` | Replaces/extends `/technology`: signals → engine → delivery diagram | Include the three-layer model (§2.3) |
| `/signals` (or `/platform#signals`) | "Early-warning signals": conflict data today; satellite programme | Roadmap card, design-partner CTA |
| `/solutions/asset-management`, `/insurance`, `/public-sector` | One page per audience: problem → how Luscint helps → evidence → CTA | Replaces `use-cases` + PDF case studies |
| `/performance` | **Validation page**: metrics, baselines, calibration, backtest | Port from PaCE `public/performance`, `methodology`, `status`; see §6 |
| `/methodology` | Accessible-then-rigorous method write-up | Port/condense from PaCE `methodology` + `glossary` |
| `/sample-report` | Gated or open example of the monthly Forecasting Report | PaCE already produces `ForecastingReport_*.pdf` monthly; adapt and re-brand |
| `/about` | Company, founder bio (Chad), approach, "Open data vs. Luscint" | No team page for now; founder-led is fine and honest. Add advisors later if real. |
| `/faq` | Objection handling: accuracy, data licensing, latency, "not investment advice" | Port from PaCE `faq` |
| `/status` | Data freshness + pipeline health (trust signal) | PaCE already has `status` + `health-check.yml` |
| `/contact` → `/demo` | Working request-a-demo form | See §7.1 |
| `/legal/privacy`, `/legal/terms`, `/legal/disclaimer` | Required | §7.4 |
| `/insights` *(later)* | Monthly commentary, hot-spot notes — SEO + thought leadership | Re-use PaCE report content |

---

## 5. Homepage redesign (content)

Section order:

1. **Hero.** Headline (options below), one-line subhead, two CTAs: *Request a demo* · *Explore live forecasts*. Background: the live country map (as on PaCE home, dimmed) rather than the generic network image — it is our most distinctive asset.
2. **Proof strip.** 4 real numbers: countries covered · months ahead · grid resolution · "peer-reviewed method (JPR 2025)". Later: headline validation metric once §6 is done.
3. **The problem.** Two sentences: conflict risk is mis-priced and discovered late; existing tools are alerts, ratings or opaque scores.
4. **How it works.** Signals → pattern engine → forecasts (the three-layer diagram, §2.3).
5. **Solutions.** Three cards: asset management, insurance, public sector — each with one concrete use and a link.
6. **Live preview.** Embedded mini map + top movers (real data) — "see this month's forecast".
7. **Credibility.** Published-method reference (JPR 2025 citation), data sources named plainly (UCDP, PRIO-GRID), validation numbers once §6 delivers them. No institutional logos. Advisor/partner logos only when real.
8. **Signals teaser.** "Bring your own signals": the engine takes satellite and market inputs on request — design-partner CTA (wording per 2.3).
9. **Final CTA + footer** (legal links, PaCE link, contact).

**Headline options** (pick one; test later):
- "Early warning for political violence — months ahead, not days." *(clear, differentiated)*
- "Forecast conflict risk before it reaches your portfolio." *(finance-first)*
- **Not chosen yet.** Keep "Geopolitical Risk, Quantified" only if we want to stay broad (it implies a number we should back with a validated one).

**Tone:** precise, understated, no superlatives, no stock-photo AI imagery. Show uncertainty openly — it is a feature for sophisticated buyers.

---

## 6. Evidence and credibility (the biggest content gap)

### 6.1 What we can publish now (from existing PaCE material)
- Method summary + peer-reviewed reference (Schincariol, Frank & Chadefaux, JPR 2025).
- Out-of-sample evaluation vs. baselines and interval coverage (PaCE methodology page says these exist — extract the actual numbers and charts).
- Data lineage: UCDP + PRIO-GRID, monthly cadence, versioned archive back to 2018 (we already build the archive).
- `/status` page: last update, data age, pipeline health.
- A real **forecast-vs-observed** chart (replaces the deleted fake one).

### 6.2 What needs new analysis (a small, valuable project)
A **risk-reduction backtest**, run by us, documented transparently:
- *Question:* if an investor reduced exposure to country X when the forecast crossed a threshold, did volatility / max-drawdown / tail loss fall vs. a naive policy?
- *Design:* point-in-time forecasts only (use the archive — no look-ahead), country equity index / sovereign spreads / FX as outcomes, simple threshold rules, report volatility, drawdown, hit/false-alarm rates, with confidence intervals and a clear statement of limits.
- *Publication rule:* publish only if results are robust; otherwise publish the event-study (what happened to markets after escalations were flagged) and calibration instead. Include a standard disclaimer (§7.4).
- Check with compliance/legal counsel before marketing performance-like statements to regulated firms (FCA/SEC/CBI financial-promotion rules).

### 6.3 Sample deliverables (sells better than adjectives)
- One-page **country brief** (auto-generated from the data we already have).
- The monthly **Forecasting Report** (PaCE already produces it).
- A downloadable **sample CSV/API response** with data dictionary.

---

## 7. Design and technical polish

### 7.1 Make it work (week 1)
- **Real contact / demo form.** Options: Formspree / Web3Forms / Netlify-style endpoint (works on static hosting), or a tiny serverless function; send to `contact@luscint.com`, add spam protection, require work email + audience + interest, show real confirmation. Replace "Join waitlist / Coming soon" language everywhere.
- **Custom domain:** point `luscint.com` at GitHub Pages (A/CNAME records at the registrar + `public/CNAME`), enforce HTTPS, set `NEXT_PUBLIC_SITE_URL` and update code-example URLs. Set up `contact@luscint.com` properly (SPF/DKIM/DMARC) so replies don't land in spam.
- Remove/replace the six `AICAP_*` PDFs (§1 #2).

### 7.2 Visual identity (weeks 2–4)
Current look: generic light "SaaS template" with a network background, logo is a dotted sphere.
- **Brand system:** define colour tokens (rename `clairient-*` → `brand-*`), type scale, spacing, one iconography set, one chart style (reuse PaCE's D3/SVG charts with Luscint colours).
- **Hero imagery:** use real product visuals — map, grid heatmap, forecast fan chart — in a polished device-less frame. Satellite imagery (properly licensed / Copernicus open data, with attribution) for the signals section.
- **Charts:** consistent, accessible palettes; always show uncertainty bands; annotate "now".
- **Typography & density:** professional finance sites favour tighter layouts, clear data tables, and restrained motion. Remove typing/pulse animations on headline words (`word-emphasis`, `typing-text`) — they read as gimmicky and cause the spacing glitches we saw.
- **Dashboard framing:** the forecasts pages should look like a product: title bar, "as of" date, export buttons, methodology link, legend explaining what the numbers mean (predicted fatalities, 6-month sum vs. 1-month).
- **Mobile:** PaCE's mobile map handling is ported; test every page at 375 px.
- **Dark footer + consistent CTAs**, favicon/OG images, proper social share cards.
- Consider a short design pass by a freelance designer (brand sheet + 3 key page layouts) — likely the best-value spend for "polished and professional".

### 7.5 Where to find a designer
You need someone with **B2B / fintech / data-visualisation** experience, not a general logo designer. Ways to find one:
- **Dribbble / Behance** — search "fintech dashboard", "risk analytics", "data visualization"; message designers whose portfolio looks like what you want. Good for a one-off brand sheet + key layouts.
- **Contra / Toptal / Upwork** — vetted or reviewed freelancers; filter for fintech or SaaS marketing sites.
- **A small studio** (Dublin/London) that does SaaS/data-product sites — more expensive, better for a full redesign.
- **Referrals:** ask contacts at the funds/insurers you want to sell to whose websites they admire, then find who built them (footer credits).

Brief to give them: this plan §2–§5, 3 reference sites you like, screenshots of the live map/grid, and a fixed deliverable — *brand sheet (colours, type, logo usage), homepage, one solutions page, one dashboard page, in Figma, plus an hour of handover*. Ask for a fixed price and get 2–3 quotes; rates vary widely by region and seniority. As an interim I can do a cleaner pass in code (tokens, spacing, removing gimmick animations) so the designer starts from a tidy base.

### 7.3 Product features to port from PaCE
Priority order (all already built in `websitePaCE`):
1. Country detail pages with fan charts and scenarios (already present in Luscint; verify parity).
2. Methodology, glossary, FAQ pages (content adapted).
3. `/status` + health checks.
4. Reports & newsletters archive + email signup (Mailchimp component exists).
5. Breadcrumbs, sitemap/robots, error/not-found pages (PaCE has them; Luscint lacks `sitemap.ts`, `robots.ts`, `not-found.tsx`).
6. Country-grid downloads per country (`generate-country-grids.js`).
7. Static API export + OpenAPI docs (partly there; keep one source of truth).

**Avoid forking drift:** the two repos now share many files by copy. Decide how to maintain them — options: (a) a shared package/monorepo for map + data components with per-site theming; (b) a documented "port from PaCE" checklist each quarter. Recommend (a) once content stabilises; (b) meanwhile.

### 7.4 Legal, trust, accessibility, SEO
- Privacy policy, terms of use, **"not investment advice / provided as-is"** disclaimer, data licence summary (open CC BY-NC vs. commercial licence).
- Analytics: privacy-friendly (Plausible/Fathom/GA4 with consent) so we can see which solutions pages convert.
- Accessibility: WCAG AA contrast (map legends, grey text), keyboard focus (partially present), alt text, reduced-motion respect.
- SEO: per-page titles/descriptions, Open Graph, `sitemap.xml`, structured data (Organization), meaningful URLs, one H1 per page.
- Performance: lazy-load maps below the fold (PaCE has `LazyVisible`); compress the 146 MB `out/` (grid GeoJSON is heavy — consider gzip'd or per-country tiles).
- Security/ops: add a `health-check` workflow like PaCE's so a failed monthly sync emails us.

---

## 8. Data and commercial model (affects site content)

- **Public tier:** current monthly forecasts, CC BY-NC 4.0, non-commercial. Keep — it's our credibility engine and serves NGOs/academics.
- **Commercial tier (to define):** commercial licence for the same data; point-in-time history; higher cadence; custom horizons; exposure mapping (portfolio, location lists); API with SLA; support; custom models; bespoke satellite-signal pilots.
- The site needs one page ("Access & pricing") that states plainly: *free for research, licensed for commercial use, talk to us*. Pricing can be "contact us" initially, but the tiers should be visible.
- **Check:** CC BY-NC data being sold commercially by the same people who licence it — fine as the rights holder, but the university's ownership/licence must be confirmed (§2.4).
- **Do not publish** client names, pilot results or "early client pilots" claims (current About roadmap item 4) until they are real and cleared.

---

## 9. Phased plan

### Phase 0 — Stop the bleeding (≈ 2–3 days)
- [ ] Working contact/demo form + notification email
- [ ] Remove or unlink `AICAP_*` case-study PDFs; remove "unprecedented accuracy" and competitor "Similar to" list from About
- [ ] Finish brand cleanup (Clairient/AICAP in `services.json`, memo, tokens → `brand-*`)
- [ ] Add legal pages + "not investment advice" footer link
- [ ] Verify first deploy after our push (sync workflow's new archive step) and fix if it failed

### Phase 1 — Credible baseline (≈ 2 weeks)
- [ ] Connect `luscint.com` (DNS, CNAME, HTTPS), set site URL, fix API examples
- [ ] New homepage per §5
- [ ] Nav restructure; `/solutions/*` pages (replace Use Cases)
- [ ] `/methodology`, `/faq`, `/status`, founder-led `/about` (ported + adapted; PaCE/TCD branding removed)
- [ ] Real "forecast vs. observed" chart; sample country brief; sample report page
- [ ] `sitemap`, `robots`, `not-found`, OG images, analytics

### Phase 2 — Evidence and polish (≈ 3–5 weeks)
- [ ] Validation work: calibration + event study; risk-reduction backtest if feasible (§6.2)
- [ ] `/performance` page from real results
- [ ] Brand system + designer pass; chart restyle; remove gimmick animations
- [ ] Signals page ("bring your own signals") with design-partner CTA, worded per 2.3
- [ ] Reports archive + newsletter signup
- [ ] "Open data vs. Luscint" page + access & pricing; commercial-licence text

### Phase 3 — Growth (ongoing)
- [ ] `/insights` monthly commentary (reuse PaCE report content)
- [ ] Exposure-mapping demo (upload a CSV of locations/holdings → risk summary; static/client-side first)
- [ ] First built-and-tested satellite/market signal module → then we can say "available" on the platform page
- [ ] Shared component package with PaCE to stop copy-paste drift
- [ ] Case studies — real ones, with permission and sourced numbers

---

## 10. Open items

| # | Item | Status / next step |
|---|---|---|
| 1 | **IP and commercial data licence** | You think it's yours; **verify** against the ERC grant agreement / TCD IP policy (one email to the tech-transfer office). Needed before the first paid licence, not before the site relaunch. |
| 2 | **Satellite wording** | Agreed direction; one condition — see "Honesty line" in 2.3. Decide whether we build one real signal module first so "available" becomes true. |
| 3 | **First pilot target** | None yet. Finance-first stands. Worth listing ~10 target firms (EM debt, macro funds, specialty political-risk insurers) so the site and outreach match their language. |
| 4 | **Backtest** | Undecided. It's the strongest single piece of evidence we could add, and I can run it from the forecast archive. Sign-off on publishing = you; get a solicitor's view before using performance-like claims with regulated firms. The site works without it in the meantime. |
| 5 | **Headline** | Pick from §5 or propose your own. |
| 6 | **Contact-form service** | Need your choice/account. |
| 7 | **Designer** | Approved; sourcing options in 7.5. |

---

## 11. Quick reference — what to reuse from PaCE

| Need | PaCE file |
|---|---|
| Methodology page | `app/methodology/page.tsx`, `app/glossary/page.tsx` |
| FAQ | `app/faq/page.tsx` |
| Status / health | `app/status/page.tsx`, `.github/workflows/health-check.yml`, `scripts/generate-status.js` |
| Reports & newsletters | `app/reports`, `public/newslettersAndReports/`, `components/MailchimpEmbed.tsx` |
| Team | `app/about/team/page.tsx` |
| SEO plumbing | `app/sitemap.ts`, `app/robots.ts`, `app/not-found.tsx`, `app/error.tsx` |
| Charts | `components/ForecastFanChart.tsx`, `ScenariosChart.tsx`, `DescriptivePlots.tsx`, `TimeSeriesChart.tsx` |
| Per-country grids | `scripts/generate-country-grids.js` |
| Media kit | `app/media-kit/page.tsx` |
