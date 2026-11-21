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

```
src/layouts/   公共页面外壳与全局样式
src/pages/     路由（index.astro 为首页）
public/        原样拷贝的静态文件
wrangler.jsonc Worker 配置
```
