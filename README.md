# 0x00.community

English | [简体中文](README.zh-CN.md)

Website of the [0x00 Community](https://github.com/0x00-Community), built with [Astro](https://astro.build) and deployed as a [Cloudflare Worker](https://developers.cloudflare.com/workers/) (static assets + `@astrojs/cloudflare`).

## Brand

Logos, favicons and the social banner come from the 0x00 brand kit (hardcore edition: dot matrix with a red terminator). The wordmark and the micro mark are inlined as `src/components/Wordmark.astro` and `src/components/Mark.astro`, colored through the `--dot-on`, `--dot-off` and `--terminator` tokens so they follow the light and dark themes.

## Development

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Start the dev server at `localhost:4321` |
| `bun run build` | Build to `./dist/` |
| `bun run preview` | Preview the build in the local Workers runtime |
| `bun run deploy` | Build and deploy with `wrangler deploy` |
| `bun run generate-types` | Regenerate `worker-configuration.d.ts` from `wrangler.jsonc` |

## Layout

The site is bilingual: English at the root, Simplified Chinese under `/zh-CN/`.

```
src/content/blog/<locale>/    blog posts (Markdown, one folder per language)
src/content/docs/<locale>/    docs pages (Markdown, `order` sets the sidebar order)
src/content/covenant/<locale>/ community covenant, one file per version (`/covenant/LICENSE4project/` shows the latest, `/covenant/LICENSE4project/<version>/` a fixed one)
src/data/projects.ts          project list with descriptions in both languages
src/components/               page bodies shared by both languages
src/pages/, src/pages/zh-CN/  thin routes per language
src/lib/j8.ts                 301 from /projects/j8/ to the j8 site (j8.app238.com)
wrangler.jsonc                Worker configuration
```

The j8 book has its own domain, [j8.app238.com](https://j8.app238.com/) (Worker `j8-mdbook`, source in the j8 repository's `mdbook/`). `/projects/j8/<path>` (and `/zh-CN/projects/j8/<path>`) answer with a 301 to the same path there, and the project lists link to it directly.

Deploying requires `CLOUDFLARE_ACCOUNT_ID` to point at the account that owns the `0x00.community` zone.
