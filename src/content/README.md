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

1. Add photos to `public/images/`
2. Update the filename in `site.json` (e.g. `profile.portrait`, `projects.sensory.image`)

Placeholder files use `.svg` — replace with `.jpg` or `.png` and update the path in JSON.

**Key images:**

- `hero-portrait.svg` — main portrait
- `about.svg` — about section photo
- `compare-cad.svg` / `compare-built.svg` — CAD vs built slider
- Each project's `image` and `gallery` entries

### CV

Set `profile.cvUrl` to your PDF path, e.g. `/cv/Omar_Ismail_CV.pdf` (put the PDF in `public/cv/`).

### Optional fields

Leave empty to hide: `profile.email`, `profile.phone`, `profile.whatsapp`, `profile.linkedIn`, `profile.cvUrl`, project `video`, `cad`.

### Do not edit

React components (`src/components/`), CSS (`src/styles/`), or hooks — unless you want layout changes.
