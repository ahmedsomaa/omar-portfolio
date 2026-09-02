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
| `bun run deploy` | Build + `wrangler pages deploy dist` |

## Edit your content

All copy, projects, stats, and links live in **`src/content/site.json`**.

See **[src/content/README.md](src/content/README.md)** for a field-by-field guide. CAD renders live in `public/designs/`; resume and portrait are under `public/`.

## Deploy (Cloudflare Pages)

This is a **Pages** project. Git builds must install deps, then emit `dist/`. Do **not** set a Deploy command.

| Setting | Value |
|---------|--------|
| Framework preset | Vite |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Deploy command | *(empty — do not use `npx wrangler deploy`)* |
| `BUN_VERSION` | `1.3.13` |
| `BUN_INSTALL_DEV` | `true` |

[`wrangler.toml`](wrangler.toml) sets `pages_build_output_dir = "dist"` so Pages accepts the config file.

`bun run build` runs `bun install --frozen-lockfile`, TypeScript, then Vite — so `tsc` is available even if Pages skips its own install step.

Local:

```bash
bun run deploy
```

## Design

- Dark-only green + purple palette
- Fonts: Instrument Serif, DM Sans, IBM Plex Mono (Google Fonts)
