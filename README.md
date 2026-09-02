# Omar Abu Qahf — Portfolio

Dark-mode engineering portfolio for Omar Abu Qahf (Product Development · ELARABY Group), built with React 19, Tailwind CSS 4, and Vite.

**New here?** See **[docs/getting-started.md](docs/getting-started.md)** for install, content edits, and Cloudflare Pages deploy.

## Stack

- React 19 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Bun
- Static deploy → Cloudflare Pages

## Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun run dev` | Dev server (port 8080) |
| `bun run build` | Production build → `dist/` |
| `bun run preview` | Preview production build |
| `bun run deploy` | Build + deploy to Cloudflare Pages (Wrangler) |

## Edit your content

All copy, projects, stats, and links live in **`src/content/site.json`**.

See **[src/content/README.md](src/content/README.md)** for a field-by-field guide. CAD renders live in `public/designs/`; resume and portrait are under `public/`.

## Deploy (Cloudflare Pages)

### Option A — Git integration (recommended)

1. Push this repo to GitHub (already: `ahmedsomaa/omar-portfolio`).
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:

| Setting | Value |
|---------|--------|
| Framework preset | Vite |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Root directory | `/` (default) |

4. Environment variables (Settings → Environment variables):

| Variable | Value |
|----------|--------|
| `BUN_VERSION` | `1.3.13` |
| `BUN_INSTALL_DEV` | `true` |

5. Save and deploy. Every push to `main` publishes production; PRs get preview URLs.

If the build image runs npm instead of Bun, set `SKIP_DEPENDENCY_INSTALL=true` and use:

```bash
bun install && bun run build
```

as the build command (`.bun-version` pins Bun when available).

### Option B — Wrangler CLI

```bash
bun run deploy
```

Requires `wrangler login` once. Project name matches [`wrangler.toml`](wrangler.toml) (`omar-portfolio`).

## Design

- Dark-only green + purple palette
- Fonts: Instrument Serif, DM Sans, IBM Plex Mono (Google Fonts)
