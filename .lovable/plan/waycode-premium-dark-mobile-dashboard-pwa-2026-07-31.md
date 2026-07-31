# WayCode — Premium Dark Mobile Dashboard (PWA)

A high-fidelity, mobile-first frontend for WayCode: a strict-OAuth sign-in screen and a project dashboard with an intent prompt, live telemetry log, and a mobile code review panel. Frontend only — all data is simulated mock state.

## Design system

- Backgrounds: `#0b0c10` base, `#1f2833` surfaces/cards, hairline borders slightly lifted from surface.
- Accent: `#0073e6` (buttons, active states, focus rings, spinner).
- Text: `#ffffff` primary, `#94a3b8` secondary; diff green/red as soft muted tokens.
- All values registered as oklch semantic tokens in `src/styles.css` (dark-first). No hardcoded color utilities in components.
- Typography scale tuned for phone readability; monospace only for logs and diffs.
- Motion: subtle press-scale on buttons, sidebar slide, log-line fade-in.
- Uploaded WayCode mark is registered as a CDN asset and used as the logo and favicon-style app icon.

## Screens

**1. `/` — Sign in**
Centered card: logo mark, "WayCode" wordmark, one full-width blue "Sign in with GitHub" button with GitHub icon. No email/password. Below: muted status line "Connected to Gateway: Waiting for active daemon handshake..." with a pulsing dot. Clicking sign-in sets a mock session and routes to the dashboard.

**2. `/dashboard` — Project dashboard**
- **Sidebar**: repo list (`nextjs-supabase-ecommerce`, `django-backend-api`, plus a couple more), active repo highlighted with the accent. Desktop: persistent, collapsible. Mobile: fully offscreen behind a hamburger in the top bar, opens as an overlay drawer.
- **Intent Canvas**: large rounded prompt surface with the specified placeholder and a "Run Feature Prompt" button pinned bottom-right of the box.
- **Telemetry panel**: scrollable console below the input. Running a prompt streams timed mock lines with colored tags `[AGENT]` (with spinner while active), `[TERMINAL]`, `[WHATSAPP]`, timestamps, auto-scroll.
- **Code review panel**: simulated git diff (file header, +/- lines in soft green/red, line numbers, horizontal scroll). Two large tactile buttons: "Approve & Deploy" (blue) and "Reject & Refine" (charcoal). Pressing either sets a resolved state and appends a telemetry line.
- Switching repos resets telemetry/diff to that repo's mock content.

## PWA

Manifest-only installability: `public/manifest.webmanifest` with name, short name, `display: standalone`, theme `#0b0c10`, accent-derived icons, plus manifest/theme-color/apple-touch-icon head tags in `__root.tsx`. No service worker or offline caching (not requested).

## Technical notes

- Routes: rewrite `src/routes/index.tsx` as the sign-in screen; add `src/routes/dashboard.tsx`. Each gets its own `head()` metadata.
- Mock state lives in local React state / a small `src/lib/mock-data.ts`; no backend, no Cloud.
- Components split under `src/components/waycode/`: `Sidebar`, `IntentCanvas`, `TelemetryPanel`, `CodeReviewPanel`, `RepoSwitcher`.
- Dark mode is the only theme; `.dark` applied at the root shell.
- Header rows use the grid + `min-w-0` + `shrink-0` pattern so mobile never clips.
