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

```
src/layouts/   shared page shell and global styles
src/pages/     routes (index.astro is the home page)
public/        static files copied as-is
wrangler.jsonc Worker configuration
```
