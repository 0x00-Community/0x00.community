# 0x00.community

[English](README.md) | 简体中文

[0x00 开源社区](https://github.com/0x00-Community)官网，使用 [Astro](https://astro.build) 构建，部署为 [Cloudflare Worker](https://developers.cloudflare.com/workers/)（静态资源 + `@astrojs/cloudflare`）。

## 品牌

标志、网站图标和社交横幅来自 0x00 品牌资产包（硬核版：点阵 + 红色终止符）。横版字标和小标内联为 `src/components/Wordmark.astro` 与 `src/components/Mark.astro`，通过 `--dot-on`、`--dot-off`、`--terminator` 三个色值上色，随深浅色主题切换。

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
src/content/covenant/<locale>/ 社区公约，每个版本一个文件（`/covenant/LICENSE4project/` 显示最新版，`/covenant/LICENSE4project/<版本>/` 是固定版本）
src/data/projects.ts          项目列表，含两种语言的简介
src/components/               两种语言共用的页面主体
src/pages/, src/pages/zh-CN/  每种语言的薄路由
src/lib/j8.ts                 /projects/j8/ 301 到 j8 站点（j8.app238.com）
wrangler.jsonc                Worker 配置
```

j8 之书有自己的域名 [j8.app238.com](https://j8.app238.com/zh-CN/)（Worker `j8-mdbook`，源码在 j8 仓库的 `mdbook/`）。`/projects/j8/<路径>`（及 `/zh-CN/projects/j8/<路径>`）以 301 跳到那边的同一路径，项目列表直接链过去。

部署时 `CLOUDFLARE_ACCOUNT_ID` 要指向拥有 `0x00.community` zone 的账号。
