# Eat With Me

A quick prototype matching USC students with compatible dining companions and a recommended restaurant. See `ROADMAP.md` for the full build plan and current status.

## Structure

- `client/` — React + Vite + TypeScript app (the whole UI)
- `server/` — small Express + Socket.io server that powers real-time DM chat (in-memory only, no database)

## Running locally

Two terminals:

```bash
# Terminal 1 — chat server (default port 4000)
cd server
npm install
npm run dev

# Terminal 2 — web app (default port 5173)
cd client
npm install
cp .env.example .env   # only needed once
npm run dev
```

Then open http://localhost:5173. Sign in with any `@usc.edu` email (no real verification — anything ending in `@usc.edu` works), build a profile, and pick a mode to reach the app.

## What's mocked vs. real

- **Real:** UI/UX, the rule-based matchmaking engine, the map (Leaflet + OpenStreetMap, no API key), and DM chat — chat is genuinely real-time over Socket.io.
- **Mocked:** authentication (no email actually sent), the dining-companion pool and restaurants (seed data in `client/src/data`), and payments (the Free/Paid toggle in Profile just flips a local flag).

## Status

All 18 steps of `ROADMAP.md` are complete: design system, nav shell, onboarding, matchmaking, map, real-time chat + streaks, ratings, tier gating, an accessibility/responsive pass, and empty/error-state copy. No hosting was set up, so this is delivered as source rather than a live URL — run it locally with the two commands above.
