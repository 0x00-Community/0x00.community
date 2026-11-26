# 0x00.community

[English](README.md) | 简体中文

[0x00 开源社区](https://github.com/0x00-Foundation)官网，使用 [Astro](https://astro.build) 构建，部署为 [Cloudflare Worker](https://developers.cloudflare.com/workers/)（静态资源 + `@astrojs/cloudflare`）。

## 品牌

标志、网站图标和社交横幅来自 0x00 品牌资产包（硬核版：点阵 + 红色终止符）。横版字标和小标内联为 `src/components/Wordmark.astro` 与 `src/components/Mark.astro`，通过 `--dot-on`、`--dot-off`、`--terminator` 三个色值上色，随深浅色主题切换。

## 开发

社区文章来自 [blogs](https://github.com/0x00-Community/blogs) 仓库，以 `blogs` submodule 的形式检出。克隆时用 `git clone --recurse-submodules`，已有的克隆运行 `git submodule update --init`；`git submodule update --remote blogs` 拉取新文章。

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
src/content/blog/<locale>/    本仓库里写的博客（Markdown，每种语言一个目录）
blogs/                        submodule：blogs 仓库；status 为 staged、release、archive 的文章会显示
src/lib/embeds.ts             把这些文章里的 ![[refs/...]] 嵌入展开成代码块
src/content/docs/<locale>/    文档（Markdown，`order` 决定侧栏顺序）
src/data/projects.ts          项目列表，含两种语言的简介
src/components/               两种语言共用的页面主体
src/pages/, src/pages/zh-CN/  每种语言的薄路由
src/lib/j8.ts                 /projects/j8/<页面> 301 到 j8 站点（j8.app238.com）
wrangler.jsonc                Worker 配置
```

j8 之书有自己的域名 [j8.app238.com](https://j8.app238.com/zh-CN/)（Worker `j8-mdbook`，源码在 j8 仓库的 `mdbook/`）。`/projects/j8/` 是 j8 在本站的项目页，和其他项目一样，页内有按钮去 j8 之书；更深的路径（`/projects/j8/<路径>`、`/zh-CN/projects/j8/<路径>`）以 301 跳到那边的同一路径。

每次推送 `main` 都会自动部署（`.github/workflows/deploy.yml`）：用 Node 构建，应用 `migrations/<数据库名>/` 里的 D1 迁移，再 `wrangler deploy`。需要仓库 secret `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`，后者是拥有 `0x00.community` zone 的账号；手动部署也要用这个账号。
