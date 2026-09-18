# Eat With Me — Prototype Roadmap

**Goal:** a quick, demoable web prototype of the core "find a compatible person + restaurant to eat with" loop, styled to the USC design system, backed by mock/seed data rather than a full production backend.

**Scope for this prototype:** one primary user journey — build a profile → pick a mode → get matched → see a recommended restaurant on a map → message the match → rate the meal afterward. Auth, matching, and payments are simulated with mock logic and seed data so the flow is demoable without live infrastructure (see assumptions below).

**Stack (confirmed):** React + Vite + TypeScript, React Router, Zustand for state, Tailwind CSS for the design tokens, Leaflet + OpenStreetMap for the map (free, no API key), local JSON seed data for users/restaurants/matches, and a small local Socket.io + Express server for **real-time chat** (in-memory message store — no external service or account needed). Everything except chat is mock/local state; chat is genuinely live so two open browser tabs/users see messages instantly. Happy Hour and restaurant partnerships remain out of scope.

---

## Roadmap (18 steps)

1. **Lock MVP scope & user journey** — Confirm the single golden path (profile → mode → match → restaurant → chat → rate) and explicitly defer group/"Happy Hour" meetups, restaurant partnerships, and real payments to post-prototype.
2. **Project scaffolding** — Initialize the React/Vite/TS app, routing, folder structure, linting/formatting, and CI-free local dev script.
3. **Design system setup** — Encode the USC palette (Cardinal #990000, Gold #FFCC00, Rich Black, Gray 70/30, White), Inter typography scale, spacing (8px grid, 12-col layout), and base components (buttons, cards, chips, badges) as reusable tokens/components.
4. **App shell & navigation** — Build the persistent bottom nav (Maps/Explore, Matches, DMs, Groups/Profile) that collapses to a left sidebar ≥768px, with routing between the four sections.
5. **Mock auth & @usc.edu verification** — Simple sign-up/login screen that validates the email domain client-side (no real email delivery yet) and creates a seeded user session.
6. **Profile & preferences flow** — Multi-step form for cuisine, cost, allergies, party size, mood, hobbies; store in mock user state.
7. **Mode selection UI** — Large segmented Casual/Business/Dating selector (not a dropdown), persisted per session and reflected in downstream matching/copy.
8. **Seed data set** — Author a small realistic dataset: ~15–20 mock student profiles and ~10–15 nearby restaurants (with cuisine, price, lat/lng, noise/service attributes) to drive matching and the map.
9. **Matchmaking engine (mock/rule-based)** — Score seeded users by shared cuisine/budget/mode/proximity and return a ranked candidate list; no real-time or live-availability logic needed yet.
10. **Match reveal screen** — "You're matched!" card showing the paired user + a recommended restaurant, with accept/next actions (decline gated to a "Paid" toggle per the tier rules).
11. **Map/Explore view** — Interactive map with Cardinal restaurant pins (Gold for "Happy Hour"/sponsored), clustering, and a bottom-sheet/carousel of nearby restaurant cards with filter chips (cuisine, price, distance, mode).
12. **Messaging (DMs)** — Basic 1:1 chat UI (Cardinal bubbles for self, gray for other) backed by mock in-memory messages, plus a streak counter pinned to the top of the thread.
13. **Streak logic** — Increment/reset a per-match streak based on mock "messaged today" / "ate together" events, surfaced as a badge in chat and matches list.
14. **Post-meal rating flow** — After a mock "mark as met," prompt both sides to rate each other (reliability/communication) and the venue (noise, service, size, would-return), storing results to refine future mock rankings.
15. **Free vs. Paid tier gating** — A simple toggle/mock "upgrade" that shows/hides the decline-match control and ad placeholders vs. an ad-free, gold-tinted "Paid" badge — no real payment processing.
16. **Accessibility & responsive pass** — Verify WCAG AA contrast (Cardinal/Gold pairings), 44×44px touch targets, keyboard/screen-reader support with descriptive labels, reduced-motion handling for streak/match animations, and layout from 360px–1440px+.
17. **Empty/error states & microcopy pass** — Friendly, on-brand copy for no-matches, no-restaurants-nearby, network/mock-data-empty states, matching the warm/casual voice guidelines.
18. **Demo polish & deploy** — Seed a compelling demo scenario, fix visual rough edges, and deploy the prototype (e.g., Vercel/Netlify) with a short walkthrough script for presenting the golden path.

---

## Decisions

- **Backend:** Mock/seed data for everything except chat.
- **Map provider:** Leaflet + OpenStreetMap (free, no API key).
- **Chat:** Real-time via a local Socket.io + Express server.
- **Timeline:** No fixed deadline driving scope.
- **Happy Hour & restaurant partnerships:** Out of scope for this prototype.
