# Portfolio — Full Project Reference

Written to be self-contained: if you paste this into a brand-new Claude chat
with zero prior context, it should be enough to keep working on this project
intelligently. It explains *why* things are built the way they are, not just
what the code does — that's the part that doesn't survive in the code alone.

---

## 1. What this project is

A personal portfolio site for Abhiram (Gaddam Bhanu Venkata Abhiram) — a
recent B.Tech CSBS grad (2022–2026) working as a freelance full-stack /
GenAI developer, currently job-hunting for fresher full-stack roles in
India. Built in Next.js 14 (App Router), TypeScript, Tailwind, Framer
Motion, and — as of the most recent work — Supabase for content storage.

**Core design principle, stated explicitly at the start and held to
throughout:** the site is split into two zones.

- **Zone A (`/`)** — professional, recruiter-facing. Projects, skills,
  experience, contact. This is the default view; nothing personal appears
  here.
- **Zone B (`/about`)** — personal. Bio, interests, photo, "the journey so
  far." Reached only by an explicit link, never the landing page.

The reasoning: a recruiter skimming for 30 seconds should never accidentally
land on personal-life content before seeing the work. Personal content is
opt-in, not default.

---

## 2. Tech stack

- **Next.js 14, App Router** — file-based routing, Server + Client
  Components mixed deliberately (see §7 on auth).
- **TypeScript** — the entire content model is one typed interface
  (`Content` in `lib/content.ts`), which is the backbone of the whole
  system (see §4).
- **Tailwind CSS** — utility classes throughout; custom design tokens
  layered on top via `tailwind.config.ts`.
- **Framer Motion** — all animation. Used carefully, not decoratively — see
  §8 for the hard lessons learned about *how* to animate without breaking
  layout.
- **Supabase** (added last) — Postgres database for content storage,
  replacing an earlier localStorage-only version. See §9.

---

## 3. Design system — and why it looks the way it does

The site went through **two complete visual redesigns** before landing here,
which is worth knowing because it explains some naming quirks in the code
(e.g., Tailwind color tokens named `ink` and `paper` that don't literally
mean "ink-colored" or "paper-colored" anymore).

### v1 (rejected): dark terminal/build-log theme
Charcoal background, copper/teal accents, monospace-everything, a
terminal-boot-sequence hero, status-dot "build log" language for projects.
**Rejected** — felt generic/cliché, "like watching it on a phone even on a
laptop" (layout wasn't actually using desktop width), and "feels like a
student achievements page, not a freelancer's site."

### v2 (current): warm "notebook paper" theme
Complete palette flip. The Tailwind tokens kept their **names** from v1 but
got new **hex values** — this is why `bg-ink` now renders a warm cream
background instead of dark charcoal, and `text-paper` renders dark ink-blue
text instead of off-white. (This was a deliberate shortcut: flipping hex
values under the same class names meant zero component code needed
renaming — every `bg-ink` class across dozens of files just started
rendering differently.)

**Current palette** (`tailwind.config.ts`):
```
ink:          #fbf4e6   (page background — warm cream)
ink-2:        #f5ead6   (card/panel background)
ink-3:        #eeddb8   (input/deeper well background)
line:         #e2cfa4   (hairline borders)
paper:        #22314f   (primary text — dark ink-blue)
muted:        #5c6f8a   (secondary text)
copper:       #f4a300   (primary accent — marigold)
copper-soft:  #d98c1f   (deeper marigold, small labels)
copper-bright:#ff6b4a   (bright accent — coral)
teal:         #2a9d78   (status: "live")
amber:        #f2b705   (status: "code-complete")
danger:       #d1483c
```

**Typography**: `Caveat` (hand-lettered, display/headlines) + `Work Sans`
(body) + `IBM Plex Mono` (small labels/metadata, used sparingly). Loaded via
`next/font/google` in `app/layout.tsx`.

**Illustration language**: hand-drawn/clay-style, not flat icons. Custom SVG
components with soft radial gradients simulating light/volume
(`components/illustrations/`). Key pieces:
- `DoodleHero.tsx` — an original hanging mascot character  
- `ClayIcons.tsx` / `ClayTilt.tsx` — small interest icons with 3D-tilt
  hover response
- `HandDivider.tsx` — hand-drawn wavy section dividers that draw themselves
  in on scroll (`pathLength` animation)

**Signature interaction language**: things don't just fade in — they tilt,
settle, and respond to the cursor. Cards rotate slightly and straighten on
hover. This "hand-drawn but alive" quality is the actual differentiator the
whole redesign was chasing.

---

## 4. The content model — single source of truth

**`lib/content.ts`** defines one big `Content` TypeScript interface and one
`defaultContent` object implementing it. Every single piece of text, every
project, every skill, every experience entry — it all lives here, typed.

```ts
export interface Content {
  positioning: { targetRoles: string; oneLiner: string };
  hero: { name, preferredName, title, subheadline, ctaLabel, ctaHref,
           badge, poweredBy: string[], photo? };
  skills: SkillCategory[];
  projects: Project[];
  experience: ExperienceEntry[];
  achievements: string[];
  resumeLink: string;
  contact: { email, linkedin, github };
  personal: { originStory, background, whyAI, nonTechInterests,
              includePhoto, journey: JourneyStop[] };
}
```

**Why this pattern matters**: every component reads from this one shape via
`useContent()` (see `lib/ContentContext.tsx`). Nothing is hardcoded in
components. This means the *entire site's content* can be edited from one
place — originally localStorage, now a database (§9) — without touching any
component code.

### Key sub-types worth knowing:
- **`Project`** has a `status: "live" | "code-complete" | "archived"` field
  and an `origin: "freelance" | "personal"` field — both rendered as small
  visible tags. This was a deliberate honesty mechanism: the site never
  claims something is deployed when it isn't, and is upfront about paid
  client work vs. self-initiated projects.
- **`SkillCategory`** has a `story` field (a few sentences of narrative) and
  an optional `proofLink` (usually a `/projects/[id]` case-study link) —
  this powers the hover-expand skill tiles (§8).
- **`ExperienceEntry`** has an optional `images?: string[]` for a
  "photo deck" of work screenshots per role.
- **`JourneyStop`** (in `personal.journey`) powers the hand-drawn timeline
  on the About page.

### The placeholder pattern
Any field expecting an image (`project.image`, `experience.images`,
`hero.photo`) is optional. If unset, the relevant component (`ProjectVisual`,
`PhotoDeck`) renders a clean, honest placeholder — an icon plus text saying
exactly what file path is expected — instead of a broken image or a fake
stock photo. This was intentional: it's better to show "screenshot pending"
than to show nothing or something misleading.

---

## 5. Route map

```
/                      Zone A — hero, skills, projects list, experience,
                        contact
/about                 Zone B — bio, "the journey so far" timeline,
                        interests
/projects/[id]         Full case-study page per project (problem, role,
                        decisions, impact, highlights, prev/next nav)
/admin                 Password-protected content editor
/admin/login           Password sign-in
/api/content            GET (public) / POST (password-protected) — the
                        database read/write endpoint
/api/admin/login        POST — checks password, issues session cookie
/api/admin/logout       POST — clears session cookie
```

---

## 6. Component architecture — the major pieces

- **`Hero.tsx`** — name, title, subheadline, CTA, plus a photo in an
  organic hand-drawn-outline frame with two floating elements: a
  speech-bubble "badge" and a "Powered by" tag card (humanizing details:
  badminton, 2am debugging, free-tier GPU quota anxiety).
- **`SkillsMatrix.tsx`** — an asymmetric bento grid (one big tile, three
  smaller) built as **nested flexbox, not CSS Grid**. This is important —
  see §8.1 for why. Hovering a tile grows it in place (via `flex-grow`,
  never by relocating it) while siblings shrink and collapse to title-only.
- **`ProjectEntry.tsx`** — a list-row component. Hover shows a preview
  panel that scales in from its own center (`transformOrigin: center`),
  overlaying neighboring rows without pushing them. Click navigates to the
  full case study.
- **`ProjectVisual.tsx`** — the screenshot-or-placeholder slot, shared
  between the list preview and the case-study page.
- **`ExperienceScroller.tsx`** — **two entirely separate implementations**
  in one file: a scroll-scrubbed sticky desktop version (`lg:` and up) and
  a plain stacked list for mobile. See §8.2 for why they had to be split.
- **`JourneyMap.tsx`** — hand-drawn vertical path connecting timeline
  waypoints, each with a squiggly connector segment that draws in via
  `pathLength` as you scroll to it.
- **`AchievementsAndContact.tsx`** — small components for the achievements
  list and contact button row.
- **`admin/AdminEditor.tsx`** — the full content-editing UI, tabbed by
  content section, using a generic `ListEditor<T>` component for repeatable
  arrays (projects, skills, experience, achievements).

---

## 7. Authentication and the Server/Client Component split

This matters conceptually, not just as code trivia: **Next.js metadata
exports (`export const metadata = {...}`) only work in Server Components**.
`/admin/login/page.tsx` is a Client Component (`"use client"`, needs
`useState` for the form) — so its `noindex` metadata had to live in a
sibling `layout.tsx` file instead, which *can* be a Server Component.

The admin auth flow, end to end:
1. `/api/admin/login` (Route Handler, runs server-side) checks the
   submitted password against `process.env.ADMIN_PASSWORD` — a secret that
   never reaches the browser.
2. On success, it creates a **stateless, HMAC-signed session token**
   (`lib/adminSession.ts`) and sets it as an `httpOnly` cookie. "Stateless"
   here means: no session table in the database, no server-side session
   store — the token itself encodes an expiry timestamp plus a signature
   (`HMAC-SHA256` of that timestamp, keyed by `ADMIN_SESSION_SECRET`).
   Verifying a token just means recomputing the signature and comparing —
   no database lookup needed.
3. `/admin/page.tsx` is a Server Component that checks this cookie via
   `cookies()` from `next/headers` **before rendering anything** — if
   invalid, `redirect("/admin/login")` happens server-side, so the editor
   UI is never even sent to an unauthenticated browser.
4. `/api/content`'s `POST` handler independently re-checks the same cookie
   — so even someone who found the raw API endpoint and skipped the UI
   entirely still can't write without a valid session.

---

## 8. Hard-won lessons — recurring bug patterns and their real fixes

This section is arguably the most valuable part of this document. Several
bugs recurred across multiple rounds because the *first* fix addressed the
symptom, not the mechanism. Documenting the actual mechanism so it doesn't
get relearned the hard way again:

### 8.1 — CSS Grid row/column tracks are shared; don't let content height drive them
**Symptom**: hovering one small tile in a bento grid caused a completely
unrelated sibling tile's text to stretch vertically and then glitch/vanish.

**Root cause**: CSS Grid auto-sizes rows/columns based on the *tallest*
content across every cell sharing that track. If one cell's content grows
taller (e.g., a hover reveals more text), and it shares a row-track with
sibling cells, the whole row resizes — affecting cells that never changed.

**Fix that actually worked**: switched from CSS Grid to **nested flexbox**,
where the tree shape mirrors the visual layout exactly, and hover only ever
changes `flex-grow` on a tile *and its own ancestor chain* — never anything
sibling to it. Each tile physically stays in the same DOM position forever;
only its own size changes. (An earlier attempt tried swapping *which* tile
occupied a "big slot" via position-swapping — this caused a *worse* bug:
moving a tile out from under the cursor fires `mouseLeave`, which reverts
the swap, which moves it back under the cursor, which re-fires
`mouseEnter` — an infinite flicker loop. Lesson: hover-driven elements
should never change position, only size, or you risk the element leaving
the cursor that's controlling it.)

### 8.2 — Scroll-scrubbed effects tuned for desktop don't degrade gracefully to mobile — don't try to make them
**Symptom**: a sticky, scroll-linked "one experience at a time" viewer
(desktop) caused overlapping, jumbled content on mobile.

**Root cause**: the desktop version relied on a fixed-height (`75vh`)
sticky container with `position: absolute` content slides. On mobile, the
same content (timeline + long bullet lists + a photo deck) stacked in a
single column is *taller* than that fixed box, so it overflowed and
visually collided with itself.

**Fix**: stopped trying to make one implementation serve both screen sizes.
`ExperienceScroller.tsx` now literally contains two separate components —
`DesktopScroller` (unchanged scroll-scrubbing behavior, wrapped in
`hidden lg:block`) and a plain stacked list for mobile
(`flex flex-col lg:hidden`, zero absolute positioning, zero fixed heights).
**Nothing can overlap in the mobile version because nothing shares a box.**
This same fix pattern was applied to `SkillsMatrix` mobile fallback too.

### 8.3 — `flex-1 basis-0 min-h-0` needs a bounded parent, or it collapses
**Symptom**: skill tiles rendered as tiny clipped slivers on mobile, with
"Show more" buttons invisible/unclickable.

**Root cause**: `flex-1 basis-0` distributes *available* space in a
flex container — but the mobile parent had no defined height (it's a
natural auto-height stacked column). With no space to distribute and
`min-h-0` removing the content-based size floor, combined with
`overflow-hidden`, the browser could collapse each tile to near-zero
height, clipping everything below the title.

**Fix**: scoped those sizing classes to `md:` only
(`md:flex-1 md:basis-0 md:min-h-0`), leaving mobile to size naturally
(`w-full`, auto height, content-driven).

### 8.4 — Deep-merge new content fields on load, don't replace wholesale
**Symptom**: adding a new field to the `Content` type (e.g., `hero.badge`)
caused a runtime crash for anyone with old saved data — `Cannot read
properties of undefined (reading 'map')`.

**Root cause**: on load, saved data was replacing the *entire* default
content object, so any field that didn't exist in the old saved shape was
simply `undefined` in the merged result.

**Fix**: `lib/ContentContext.tsx` (localStorage era) implemented a
recursive `deepMerge(defaultContent, savedData)` — any field present in the
current code's defaults but missing from saved data falls back to the
default instead of being `undefined`. This class of bug is structurally
impossible to hit again as long as new fields keep getting added to
`defaultContent` (they will always have *some* value).

### 8.5 — TypeScript generic inference can silently fail; pin it explicitly
**Symptom**: a reusable `ListEditor<T extends { id?: string }>` component
threw a wall of cascading type errors for the `Skills` tab specifically,
even though the component worked fine for Projects/Experience.

**Root cause**: `SkillCategory` has no `id` field at all (unlike `Project`
and `ExperienceEntry`). Even though it's structurally compatible with the
`{ id?: string }` constraint (all fields on the constraint are optional),
TypeScript's inference occasionally fails to lock onto the right concrete
type in JSX generic calls and falls back to the bare constraint type,
breaking every prop that references fields outside that constraint.

**Fix**: explicitly pin the generic at the call site —
`<ListEditor<SkillCategory> items={...} />` instead of letting TypeScript
infer it. Cheap, permanent fix once you know to look for it.

### 8.6 — Hydration mismatches are almost always a *data* problem, not a component bug
**Symptom**: `Hydration failed because the server rendered text didn't
match the client` — pointing at a pure function (`parseStack()`).

**Root cause diagnosis**: since the function was pure (same input always
produces same output), a mismatch could only mean the *input string itself*
differed between server and client — most likely stale data in one of two
diverged project folders, or a leftover localStorage override from before
a content-format change.

**Takeaway**: when a hydration error points at a pure/presentational
component, don't debug the component first — verify the *data* is
identical on both sides (check for duplicate project folders, stale cached
state, or a dev server that needs a hard restart after editing a
widely-imported file).

---

## 9. Database — why Supabase, why this schema, why this security model

**Why Supabase**: Abhiram already uses it across his other real projects
(EAAP, Invoice Assistant, Property Valuation) — no reason to introduce an
unfamiliar tool for a personal site. Free tier is generous, it's Postgres
underneath (no lock-in), and it has Storage too if screenshots ever need to
move off `/public`.

**Why one JSONB row, not normalized tables**: this is a single-admin
personal site with no need for relational queries across content types
(you never need to "find all projects where..." at the database level —
the whole content object is always read/written together). Normalizing
into six-plus tables (projects, skills, experience, etc.) would add
migrations, joins, and multiple CRUD endpoints for zero practical benefit
at this scale. One row, one JSONB column, mirrors exactly how the
localStorage version worked — just swapping *where* the blob lives.

```sql
create table portfolio_content (
  id int primary key default 1,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
```

**Why Row Level Security (RLS) matters here, conceptually**: RLS is
Postgres's built-in mechanism for restricting which rows a given database
role can see/modify. This project's policy is intentionally asymmetric:

```sql
create policy "Public read access" on portfolio_content
  for select using (true);
-- No insert/update policy for the anon role at all.
```

This means the public `anon` key (safe to use anywhere, even
client-exposed) can **only ever `SELECT`**. There's no policy granting
`anon` write access — so even if the anon key leaked, it's read-only by
database-enforced design, not just by convention in application code.

**Why two separate Supabase clients**: `lib/supabasePublic.ts` (anon key,
usable anywhere) vs. `lib/supabaseAdmin.ts` (service-role key, which
**bypasses RLS entirely** — full read/write to everything). The
service-role client is only ever imported inside
`app/api/content/route.ts`'s `POST` handler — a file that runs exclusively
on the server and is never bundled into client-side JavaScript. This is
the actual security boundary: not "we didn't show the key in the UI," but
"the key physically cannot reach the browser because of where it's
imported."

**Why a stateless signed cookie instead of a sessions table**: simplest
thing that's still genuinely secure for one admin user. Avoids needing yet
another table, and avoids Edge-runtime constraints (Next.js middleware
historically only supports Edge runtime, which lacks Node's `crypto`
module — routing the auth check through a Server Component instead of
`middleware.ts` sidesteps that entirely and allows using Node's built-in
`crypto.createHmac`/`timingSafeEqual`).

**What this is *not***: full multi-user auth. If this ever needs more than
one editor with separate logins, that's a real upgrade to Supabase Auth
proper, not a small tweak to the current scheme.

---

## 10. Voice and copywriting — decisions made deliberately

The copy went through real iteration and a few explicit corrections worth
remembering:

- **Own the "recent grad" framing instead of hiding it.** Early hero copy
  tried to sound like a seasoned professional ("I build things people
  actually use") — this was reworked to be honest about being early-career
  ("I graduated a few months ago. I started shipping way before that."),
  because a fresher pretending to sound like a 10-year veteran reads as
  try-hard, while owning the fact plainly reads as self-aware and credible.
- **No jargon-as-proof.** An early hero "stats panel" showed things like
  ".89 F1 on the SROIE OCR benchmark" — meaningless to a non-technical
  reader, and one stat ("0-Day" for a security fix) accidentally implied
  the opposite of what was intended (a 0-day is an *unpatched*
  vulnerability, not a fixed one). Replaced with plain-language,
  universally legible claims.
- **`preferredName` is "Abhiram," not "Gaddam Abhiram" or "Gaddam."**
  "Gaddam" is the family/surname in Indian naming convention — he goes by
  Abhiram. This got reverted accidentally more than once during manual
  edits; worth being deliberate about if touching hero copy again.
- **Every project's `status` and `origin` are stated honestly**, including
  "code-complete, not deployed" for projects that aren't live, and
  "Personal project" vs. "Freelance" tags — the site never overstates.
- **Copyright boundary, enforced repeatedly**: the person twice asked for
  an actual Spider-Man image/asset (once as a reference photo, once as
  their own converted SVG) to be used as a hero decoration. Both times,
  this was declined — Marvel's copyrighted character design can't be used
  regardless of who converted the asset or how casually it's framed. The
  resolution both times was building an **original** character in a
  similar "hanging by a thread" pose but with entirely different design
  elements (round mask vs. angular lens, no web pattern, original color
  palette) — same energy, no IP risk.

---

## 11. Known open items / things still worth doing

- **Global Academy of Embryology** project's `stack` and `impact` fields
  still say `"Not yet specified — update via /admin"` — genuinely unfilled
  since early in the project.
- **Screenshot paths need a casing audit.** At least one mismatch was
  caught (`Eaap-1.png` vs `EAAP-1.png` — different capitalization
  referencing what's presumably the same file). Vercel's filesystem is
  case-sensitive; local macOS development is not, so this class of bug
  won't surface until production.
- **Journey timeline order is unconfirmed.** The sequence Guntur → college
  → 4SightAI internship → EAAP (first freelance) → Asterisks Inc. → now was
  an assumption, not a confirmed fact.
- **No drag-to-reorder in `/admin`** for the journey stops (or most
  arrays) — reordering currently means editing the array order directly in
  `lib/content.ts`, then re-saving through `/admin` so it lands in the
  database.
- **About page life-story expansion was proposed but not fully built.** A
  menu of possible sections was discussed (Roots, How I Think, Beyond the
  Screen, People Who Shaped Me, Fun Facts, Where I'm Headed) — only "The
  journey so far" (the hand-drawn map) was actually selected and built. The
  others remain open if wanted later, but need real personal content from
  Abhiram directly — none of that can be invented.
- **Real screenshots** are still needed for `property-valuation`,
  `invoice-assistant`, and `fraud-detection` — placeholders removed a wrong
  screenshot from those but nothing real has replaced it yet.

---

## 12. If you're picking this up in a new chat

Paste this whole document in, then say what you want to work on. Useful
context to also mention if relevant: whether the Supabase database is
already live and seeded (§9, step 6 of `DATABASE_SETUP.md`), and whether
you're working from a single project folder now or still have the
`Portfolio-1` / `portfolio-2` divergence issue mentioned earlier in this
project's history (worth resolving if not already — it caused several
real bugs from editing the "wrong" copy of a file).