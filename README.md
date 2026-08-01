# WayCode Dashboard

Build a premium, high-fidelity, mobile-responsive Progressive Web Application (PWA) frontend dashboard called "WayCode". The design must feature a modern, ultra-clean dark mode aesthetic inspired by premium AI platforms like Google Gemini. 

Color Palette (Derived from Logo):

- Primary Background & Surfaces: Dark Black/Deep Charcoal (#0b0c10, #1f2833)

- Accents & Primary Brand Color: Vibrant Cyber Blue (#0073e6)

- Typography & Icons: Stark White (#ffffff) and muted slate-gray (#94a3b8) for secondary text.

Key Interface Pages & Layouts to Create:

1. Setup / Authentication Screen (Clean & Focused):

- A minimal login screen containing the "WayCode" logo placeholder.

- Strictly include ONLY a single, high-contrast "Sign in with GitHub" button styled with the vibrant blue accent and a GitHub icon. 

- Eliminate all standard email/password input fields to emphasize a strict OAuth loop.

- Show a subtle sub-text element indicating gateway connectivity state: "Connected to Gateway: Waiting for active daemon handshake..."

2. Main Project Dashboard Interface (Mobile-First Optimization):

- Collapsible Sidebar: Create a toggleable, sleek left sidebar that lists active GitHub repositories vertically (e.g., 'nextjs-supabase-ecommerce', 'django-backend-api'). On mobile screens, this sidebar must gracefully collapse completely behind a hamburger menu to preserve viewport real estate.

- Intent Canvas (Central Work Area): A beautifully designed, spacious AI prompt input text field. It should include clear placeholder text: "Enter your functional intent... (e.g., Build an admin dashboard page connected to Supabase)". It must have a clean "Run Feature Prompt" action button aligned to the bottom right of the input box.

- Asynchronous Log & Telemetry Panel: A scrollable console area below the input box showing simulated live status updates with clean system tags. Include indicators like:

  * [AGENT]: Cloning target repository... (Spinner icon)

  * [TERMINAL]: Sub-task compilation executing successfully.

  * [WHATSAPP]: Notification payload prepared.

3. Mobile Code Review Panel (Interactive Component):

- A component inside the dashboard that renders a simulated Git code diff showing lines added (in soft green) or removed (in soft red).

- Below the diff, place two large, tactile action control buttons: a primary "Approve & Deploy" button (Vibrant Blue) and a secondary "Reject & Refine" button (Muted Charcoal).

Ensure smooth transitions, micro-animations for button presses, mock state changes when switching repositories, and a clean typography scale optimized specifically for readability on smartphones while in transit.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/28926fce-0454-410b-9354-f87654898583).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
