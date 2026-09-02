# How to update your portfolio

You only need to edit **one file** to change your name, bio, projects, stats, and links:

## `src/content/site.json`

Save the file — the dev server reloads automatically.

### Quick edits

| What to change | JSON path |
|----------------|-----------|
| Name, email, socials | `profile` |
| Hero headline & stats | `hero` |
| Proof counters | `impact.stats` |
| Projects | `projects` (each key is a project id) |
| About bio | `about` |
| Education & papers | `credentials.items` |
| Contact section | `contact` |
| Engineering challenge | `challenge` |

### Images

1. Add photos to `public/images/` or `public/designs/`
2. Update the filename in `site.json` (e.g. `profile.portrait`, `projects.*.image`)

- Files in `public/images/` can use a bare filename (e.g. `"hero-portrait.jpg"`).
- Files elsewhere under `public/` need a leading `/` (e.g. `"/omar-portrait.jpg"`, `"/designs/FULL DRUM DESIGN.png"`).

Placeholder files use `.svg` — replace with `.jpg` or `.png` and update the path in JSON.

**Key images:**

- `/omar-portrait.jpg` — hero portrait
- `about.svg` (or a real photo) — about section
- `/designs/…` — project CAD renders and compare slider
- Each project's `image` and `gallery` entries

### CV

Set `profile.cvUrl` to your PDF path, e.g. `/Omar_Abu_Qahf___Resume.pdf` (file in `public/`).

### Optional fields

Leave empty to hide: `profile.email`, `profile.phone`, `profile.whatsapp`, `profile.linkedIn`, `profile.cvUrl`, project `video`, `cad`.

### Do not edit

React components (`src/components/`), CSS (`src/styles/`), or hooks — unless you want layout changes.
