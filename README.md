# SupportMail Legal

Source of [legal.supportmail.dev](https://legal.supportmail.dev): the privacy policy, terms of service, legal notice, right of withdrawal and open-source licenses list for SupportMail.

Static [Astro](https://astro.build) site, deployed to Cloudflare Workers (assets only).

## Documents

Each document lives in `src/content/legal/<doc>/`.

- **Versioned** (`privacy`, `terms`): one file per version, named `<YYYY-MM-DD>.md`. The newest file is shown at `/<doc>`; older ones stay reachable at `/<doc>/<YYYY-MM-DD>`.
- **Static** (`legal-notice`, `right-of-withdrawal`, `licenses`): a single `index.md`.

To publish a new version of the privacy policy or terms, add a new dated file. Do not edit old versions.

## Development

Requires Node 26 and pnpm 12.

| Command        | Action                                   |
| :------------- | :--------------------------------------- |
| `pnpm install` | Install dependencies                     |
| `pnpm dev`     | Start the dev server at `localhost:4321` |
| `pnpm build`   | Build the site to `./dist/`              |
| `pnpm preview` | Preview the build locally                |
| `pnpm format`  | Format with Prettier                     |

## License

- Site code: [MIT](LICENSE)
- Legal documents in `src/content/legal/`: all rights reserved, see [LICENSE-CONTENT](LICENSE-CONTENT)
