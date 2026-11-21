# 0x00.community

[English](README.md) | 简体中文

[0x00 开源社区](https://github.com/0x00-Community)官网，使用 [Astro](https://astro.build) 构建，部署为 [Cloudflare Worker](https://developers.cloudflare.com/workers/)（静态资源 + `@astrojs/cloudflare`）。

## 开发

| 命令 | 作用 |
| --- | --- |
| `bun install` | 安装依赖 |
| `bun run dev` | 启动开发服务器 `localhost:4321` |
| `bun run build` | 构建到 `./dist/` |
| `bun run preview` | 在本地 Workers 运行时预览构建产物 |
| `bun run deploy` | 构建并 `wrangler deploy` 部署 |
| `bun run generate-types` | 按 `wrangler.jsonc` 重新生成 `worker-configuration.d.ts` |

## 目录

站点中英双语：英文在根路径，简体中文在 `/zh-CN/` 下。

```
src/content/blog/<locale>/    博客（Markdown，每种语言一个目录）
src/content/docs/<locale>/    文档（Markdown，`order` 决定侧栏顺序）
src/data/projects.ts          项目列表，含两种语言的简介
src/components/               两种语言共用的页面主体
src/pages/, src/pages/zh-CN/  每种语言的薄路由
src/lib/book.ts               /projects/j8/ -> j8 之书 Worker 的反向代理
wrangler.jsonc                Worker 配置
```

`/projects/j8/`（及 `/zh-CN/projects/j8/`）不是静态页面，而是通过服务绑定 `J8_BOOK` 代理到 `j8-mdbook` Worker。本地试用需要构建后把两个 Worker 一起跑：

```sh
bun run build
bunx wrangler dev -c dist/server/wrangler.json -c ../j8/mdbook/wrangler.jsonc
```

部署时 `CLOUDFLARE_ACCOUNT_ID` 要指向拥有 `0x00.community` zone 的账号。
