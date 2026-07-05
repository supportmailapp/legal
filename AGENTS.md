# AGENTS.md

This file provides guidance to AI coding agents working with code in this repository.

## Astro

STOP: Use the Astro MCP for everything related to the Astro framework. Existing knowledge of Astro is probably outdated.

## Commands

```sh
pnpm dev          # start dev server at localhost:4321
pnpm build        # build to ./dist/
pnpm preview      # preview production build locally
pnpm gen          # regenerate wrangler types (worker-configuration.d.ts)
```

Deploy via Wrangler: `wrangler deploy` (targets Cloudflare Workers, config in `wrangler.jsonc`).

### WSL

STOP: Do not run ANY `pnpm` commands in WSL. Tell user to use Windows Terminal or PowerShell instead.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Architecture

SSR Astro site deployed as a Cloudflare Worker (`@astrojs/cloudflare` adapter). Tailwind v4 via `@tailwindcss/vite`. No React/Vue/Svelte — pure Astro components.

### Content system

**Versioned docs** (`privacy`, `terms`) store files as `src/content/legal/<doc>/<YYYY-MM-DD>.md`. **Static docs** (`imprint`, `licenses`, `right-of-withdrawal`) store a single `src/content/legal/<doc>/index.md`. The content collection (`src/content.config.ts`) uses glob loader; each file requires frontmatter:

```md
---
title: <string>
effectiveDate: <YYYY-MM-DD>
---
```

#### Current document types

| Directory             | Route                  | Description              |
| --------------------- | ---------------------- | ------------------------ |
| `privacy`             | `/privacy`             | Privacy Policy           |
| `terms`               | `/terms`               | Terms of Service         |
| `imprint`             | `/imprint`             | Imprint (§ 5 TMG)        |
| `right-of-withdrawal` | `/right-of-withdrawal` | Right of Withdrawal      |
| `licenses`            | `/licenses`            | Open-source license list |

#### Version history

Historical GitBook source files are archived at `../old_v2/smdocs/<YYYY-MM-DD>/`. Versions present in `src/content/legal/`:

| Date       | Notes                                                       |
| ---------- | ----------------------------------------------------------- |
| 2025-03-08 | Oldest archived version; used `contact@supportmail.dev`     |
| 2025-12-03 | Switched to `contact.lukez@proton.me`                       |
| 2026-02-21 | Added Sentry section to Privacy Policy                      |
| 2026-07-04 | Added blog/comment system sections                          |
| 2026-07-05 | Placeholder — new version in progress (privacy, terms only) |

### Routing

| Route              | File                              | Behaviour                                                       |
| ------------------ | --------------------------------- | --------------------------------------------------------------- |
| `/<doc>`           | `src/pages/[doc]/index.astro`     | Renders latest version; lists older versions for versioned docs |
| `/<doc>/<version>` | `src/pages/[doc]/[version].astro` | Renders specific version (versioned docs only; others 404)      |

`<doc>` matches a subdirectory name under `src/content/legal/`. `<version>` matches the filename stem (e.g. `2026-07-04`).

Only `privacy` and `terms` are **versioned** — they show a version sidebar and support `/<doc>/<version>` routes. All other doc types (`imprint`, `licenses`, `right-of-withdrawal`) are **static** — latest file only, no version UI, `/<doc>/<version>` returns 404.

To add a new **static** doc type: create `src/content/legal/<new-doc>/index.md`. To add a new **versioned** doc type: create dated `.md` files and add the name to `VERSIONED_DOCS` in both `src/pages/[doc]/index.astro` and `src/pages/[doc]/[version].astro`. To publish a new version of a versioned doc, add a dated `.md` file — the index page auto-promotes the newest.

### Layout & navigation

`src/layouts/LegalLayout.astro` renders all doc pages. Nav bar shows:

- Desktop (`lg+`): horizontal links for each doc type
- Mobile (below `lg`): `<select>` dropdown with `onchange` navigation

Versions sidebar is shown on desktop left; on mobile it appears below the article.

### Styles

Single global stylesheet at `src/styles/global.css` (imported per-page). Pages use Tailwind Typography (`prose dark:prose-invert`) for document rendering.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
