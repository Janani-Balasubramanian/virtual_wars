<p align="center"><img src=".github/repository-banner.svg" alt="Election Education Assistant — An interactive civic-learning prototype" width="100%" /></p>

<p align="center"><a href="https://civicwise-election-education.cozy-pike-5708.chatgpt.site">Open live website</a> · <a href="https://github.com/Janani-Balasubramanian">GitHub profile</a></p>

# CivicWise — Election Education

An interactive civic-learning website by Janani for Prompt Wars Virtual 2026, with a standalone public experience and server-side Gemini chat.

## Explore

- Four voter perspectives: first-time, overseas, senior/accessibility, and address change.
- EVM and VVPAT simulation with fictional candidates.
- Document preparation checklists, a sample timeline, and an illustrative booth locator.
- Live educational AI answers; clearly labelled built-in guidance when the service is unavailable.

[Launch CivicWise](https://civicwise-election-education.cozy-pike-5708.chatgpt.site)

## Run locally

Requires Node.js 20.19+ and npm.

```sh
npm install
# Copy .env.example to .env.local, then enter your Gemini key locally.
npm run dev
```

The app opens at http://127.0.0.1:4174. Never put a key in the React component, a VITE_ variable, or a committed file. `.env.local` is ignored. On systems where Node needs operating-system certificate trust, run with `NODE_USE_SYSTEM_CA=1` using a supported Node version.

```sh
node scripts/test-chat.mjs
npm run build
```

The build creates browser assets and a self-contained Cloudflare Workers-compatible entrypoint at `dist/server/index.js`. Production requires the secret `GEMINI_API_KEY`; `GEMINI_MODEL` defaults to `gemini-3.1-flash-lite`. The public deployment uses Sites hosting.

## Chat and privacy

Questions and the selected voter perspective are sent from the server to Google Gemini. Do not enter identity numbers, addresses, or other sensitive information. The app does not implement accounts or store conversations on its server. AI answers may be inaccurate; verify requirements with the [ECI Voters Service Portal](https://voters.eci.gov.in/).

The endpoint validates input, limits message size, rejects cross-origin browser requests, sanitizes provider failures, and applies a basic per-instance request limit. This limit is not a global quota; configure appropriate provider usage limits for public traffic.

## Demo boundaries

This is an independent educational project, not an official election service. Dates, candidates, booth information, and document checks are demonstrations. The locator does not look up your real polling station and the checker does not validate official documents. Use official ECI services for current rules, schedules, registration, and polling locations.

Original shared project reference: [Gemini share](https://share.gemini.google/XM5T37SQkpZh). The public app runs independently of the Gemini sharing page.