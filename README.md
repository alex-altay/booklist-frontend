# BookList — a reading diary

<!-- TODO Остановился здесь. Теперь сделай видео и скриншоты и запости -->

**Live at &nbsp;[mybooklist.info](https://mybooklist.info)** · Vue 3 · TypeScript · Webauthn · Passkeys only

A private reading diary. You record what you read — dates, a rating, your impressions — and the app turns years of that record into statistics about your own reading habits.

Built the first version in 2017 and have been writing in it ever since. This is the rewrite (2026): same data, entirely new application.

#### Scroll on main page

<video src="https://github.com/user-attachments/assets/5caabf41-bf9f-41d8-9f64-a14f2450d10a"></video>

#### Parallax on slides

<video src="https://github.com/user-attachments/assets/aec439e5-0530-43a9-8bc7-cb887dfa244c"></video>

#### Screenshot of stats page

<img alt="Image" src="https://github.com/user-attachments/assets/52375734-8d76-44df-b49d-7fee64e39e95" />

## Why it exists

Recording impressions is easy, the payoff comes years later. Once a list is long enough, it stops being a list and starts being data: how much you actually read in a year, whether the pace is rising or falling, which languages slow you down, which books quietly took two years to finish.

## Stack

|               |                                                      |
| ------------- | ---------------------------------------------------- |
| Framework     | Vue 3.5                                              |
| Language      | TypeScript                                           |
| Auth          | WebAuthn — no passwords, only Face ID or fingerprint |
| Routing       | Vue Router 4, meta-based auth guards                 |
| Validation    | Zod 4 at every API boundary                          |
| State         | Pinia 3                                              |
| Styling       | Tailwind 4, reka-ui / shadcn-vue primitives          |
| Charts        | Unovis                                               |
| Build & serve | Vite, Caddy 2 on Railway                             |

Roughly 3,700 lines of application code. `src/components/ui/` is shadcn-vue and excluded from that count.

## Decisions worth explaining

**Passkeys and nothing else.** Sign-in is Face ID or a fingerprint. There is no password to choose, store, reset, or leak, and no third-party identity provider in the path. Anything else for this project is more protecting less.

**A strict Content-Security-Policy.** `connect-src` is limited to this app's own API origin, so a compromised dependency running inside the page cannot ship the access token anywhere else.

**The scroll orchestration is hand-written.** On the landing page the scroll direction changes — down, then sideways across three panels, then down again — driven by one sticky container and a scroll-progress ratio. No Lenis, no ScrollTrigger, no ScrollMagic.

GSAP is a dependency, and it is used deliberately in two places where writing my own would have been worse: the SVG morph on the 404 page, and the rolling digits on the stats page. Writing my own scroll was worth it. Writing my own SVG morphing would not have been.

**Motion is opt-out.** `prefers-reduced-motion: reduce` disables the parallax and the heading animation and swaps the layered illustrations for static ones.

## What is in it

- **Landing** — scroll-direction changes, hover parallax, SVG morph on the 404 page
- **Books** — add, read and edit entries; filter by rating, category, language, status and year, paginated
- **Stats** — total read, books per year by language, rating distribution, longest books, time spent, reading speed, and a random quote from your own notes

## Measurements

Google PageSpeed Insights, landing page: **Performance 100**, **Best Practices 100**, **Accessibility 95**. The landing loads in under a second with every image and animation.

<img alt="Image" src="https://github.com/user-attachments/assets/1ca8b8c6-f258-4474-95c9-c67e8bfe8c8a" />

## Local development

```bash
npm install
npm run dev         # deployed API
npm run dev-local   # backend running on localhost
```

```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

Built by Vite into `dist/` and served by Caddy on Railway. Caddy handles SPA routing (`try_files`), gzip, the health check, and the security headers including the CSP above.

`API_ORIGIN` must be set per environment — scheme and host, no trailing slash. It has no default on purpose, so staging and production cannot silently inherit each other's backend.

See [`Caddyfile`](./Caddyfile) — it is commented.
