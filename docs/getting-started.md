# Getting started

How to run Omar’s portfolio locally, build for production, and make your first content edit.

## Prerequisites

| Requirement | Notes |
|-------------|--------|
| **Bun** | Recommended. Project pins `bun@1.3.13` in `package.json`. Install from [bun.sh](https://bun.sh). |
| **Node.js** (optional) | Only if you prefer npm/pnpm instead of Bun. Use Node 20+ for Vite 8. |

Check Bun:

```bash
bun --version
```

## 1. Clone and open the project

```bash
cd /path/to/omar-portfolio
```

If you received a zip, unzip it and `cd` into the folder that contains `package.json`.

## 2. Install dependencies

```bash
bun install
```

This creates `node_modules/` and installs React 19, Vite, Tailwind CSS 4, and TypeScript.

**Using npm instead of Bun:**

```bash
npm install
npm run dev
```

(Replace `bun run …` with `npm run …` in all commands below.)

## 3. Start the dev server

```bash
bun run dev
```

Then open in your browser:

**http://localhost:8080**

The dev server hot-reloads when you save files. Edits to **`src/content/site.json`** update the page without restarting.

To stop the server: `Ctrl+C` in the terminal.

## 4. Production build

```bash
bun run build
```

Output goes to **`dist/`** — static HTML, CSS, and JS ready to deploy.

Check the build locally:

```bash
bun run preview
```

Default preview URL is usually **http://localhost:4173** (Vite prints the exact URL).

## 5. Lint (optional)

```bash
bun run lint
```

Runs oxlint on the codebase.

## Project layout (quick map)

```text
omar-portfolio/
├── docs/                    # Design notes (UX, getting started)
├── public/
│   └── images/              # Photos — paths referenced in site.json
├── src/
│   ├── content/
│   │   ├── site.json        # ← Main content file (edit this)
│   │   └── README.md        # Field-by-field content guide
│   ├── components/          # UI sections (usually don’t edit)
│   ├── styles/              # site.css + enhance.css
│   └── App.tsx              # Page assembly
├── index.html               # Fonts, meta, root mount
├── package.json
└── vite.config.ts           # Dev server port 8080
```

## 6. First content edit

1. Open **`src/content/site.json`**.
2. Change something visible, e.g. `hero.headline` or `profile.name`.
3. Save — the browser should refresh automatically if `bun run dev` is running.

For photos:

1. Add a file to **`public/images/`** (e.g. `hero-portrait.jpg`).
2. Set the path in JSON, e.g. `"portrait": "hero-portrait.jpg"`.

Full content guide: **[src/content/README.md](../src/content/README.md)**

## Common issues

| Problem | Fix |
|---------|-----|
| `bun: command not found` | Install Bun or use `npm install` + `npm run dev`. |
| Port 8080 in use | Stop the other process or change `server.port` in `vite.config.ts`. |
| Blank page after edit | Check the terminal for JSON syntax errors in `site.json` (missing comma, etc.). |
| Images don’t show | Paths in JSON are filenames under `public/images/`, not full URLs (unless you use `http…`). |
| `uv_interface_addresses` error on dev | Dev server is set to `host: "localhost"` in `vite.config.ts` to avoid this on some systems. |

## Deploy

After `bun run build`, upload the contents of **`dist/`** to any static host (Netlify, Cloudflare Pages, Vercel, GitHub Pages, etc.). No server-side runtime required.

Point the host’s publish directory to **`dist`** and use a single-page-app fallback to `index.html` if your host requires it for client-side routing (this site is one page with hash links only, so defaults usually work).

## Related docs

- [Content editing](../src/content/README.md) — `site.json` fields
- [UX recommendations](./ux-recommendations.md) — colors, fonts, section ideas for Omar
