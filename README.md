# 0x00.community

English | [简体中文](README.zh-CN.md)

Website of the [0x00 Community](https://github.com/0x00-Community), built with [Astro](https://astro.build) and deployed as a [Cloudflare Worker](https://developers.cloudflare.com/workers/) (static assets + `@astrojs/cloudflare`).

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
src/data/projects.ts          project list with descriptions in both languages
src/components/               page bodies shared by both languages
src/pages/, src/pages/zh-CN/  thin routes per language
src/lib/book.ts               reverse proxy for /projects/j8/ -> the j8 book Worker
wrangler.jsonc                Worker configuration
```

`/projects/j8/` (and `/zh-CN/projects/j8/`) is not a static page: it is proxied to the `j8-mdbook` Worker through the `J8_BOOK` service binding. To try it locally, build and run both Workers together:

```sh
bun run build
bunx wrangler dev -c dist/server/wrangler.json -c ../j8/mdbook/wrangler.jsonc
```

Deploying requires `CLOUDFLARE_ACCOUNT_ID` to point at the account that owns the `0x00.community` zone.
