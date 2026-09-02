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
| `bun run deploy` | Build + deploy to Cloudflare (`wrangler deploy`) |

## Edit your content

All copy, projects, stats, and links live in **`src/content/site.json`**.

See **[src/content/README.md](src/content/README.md)** for a field-by-field guide. CAD renders live in `public/designs/`; resume and portrait are under `public/`.

## Deploy (Cloudflare)

Git builds run **build**, then **`npx wrangler deploy`**. Keep that deploy command. [`wrangler.toml`](wrangler.toml) points Wrangler at `dist/` via `[assets]`.

| Setting | Value |
|---------|--------|
| Build command | `bun run build` |
| Deploy command | `npx wrangler deploy` |
| `BUN_VERSION` | `1.3.13` |
| `BUN_INSTALL_DEV` | `true` |

Do not use `pages_build_output_dir` in Wrangler — that makes `wrangler deploy` fail with “Missing entry-point”.

Local:

```bash
bun run deploy
```

Requires `wrangler login` once. Project name is `omar-mech`.

## Design

- Dark-only green + purple palette
- Fonts: Instrument Serif, DM Sans, IBM Plex Mono (Google Fonts)
