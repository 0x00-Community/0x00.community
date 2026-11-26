---
title: Star Hunter 选手指南
description: 领取仓库、安装 acdev、开发和提交 Dopame 应用。
order: 4
---

你在 Dopame 上开发应用，我们在 GitHub 组织 [0x00-Migration](https://github.com/0x00-Migration) 下给每个应用分配一个公开仓库。你把代码推到这个仓库，审核员人工审核。

Dopame 应用就是网页（HTML、CSS、JS，也可以用 React、Vue 等框架），跑在 Dopame 的运行时里。系统功能（文件、窗口等）通过 `acde:*` 模块调用。已有的 Web 应用大多改几处就能迁移过来。

## 你需要

- 一个个人 GitHub 账号（组织账号不行）
- [Bun](https://bun.sh) 1.4 或更新
- acdev 命令行工具，支持 macOS（Apple 芯片、Intel）、Linux x86_64、Windows x64

## 1. 领取仓库

1. 打开[领取页面](https://github.com/0x00-Migration/enroll/issues/new/choose)，选「领取仓库」。
2. 填**应用名**：小写字母、数字和 `-`，最多 40 个字符，比如 `markdown-editor`。领取后不能改。
3. 勾选确认，点 **Create**。不要改 issue 标题。

一两分钟内机器人会在 issue 里回复。你的仓库是：

```text
https://github.com/0x00-Migration/app-<应用名>-<你的 GitHub 用户名>
```

做几个应用就领几次，每个应用一个仓库。

## 2. 接受邀请

机器人的回复里有邀请链接（`<仓库地址>/invitations`），也会发到你的 GitHub 邮箱。接受后你就有了这个仓库的写权限。邀请 7 天内有效，过期了重新开一个领取 issue 即可，仓库和代码都不会变。

## 3. 安装 acdev

macOS / Linux：

```sh
curl -fsSL https://pkgs.dopame.ai/acdev/install.sh | sh
```

Windows（PowerShell）：

```powershell
irm https://pkgs.dopame.ai/acdev/install.ps1 | iex
```

装完**新开一个终端**，运行 `acdev doctor` 检查环境。详见[安装文档](https://docs.dopame.ai/zh/start/install/)。

## 4. 开发

```sh
git clone https://github.com/0x00-Migration/app-<应用名>-<你的用户名>.git
cd app-<应用名>-<你的用户名>
bun install
acdev dev
```

`acdev dev` 会打开一个窗口运行你的应用，改了代码保存后自动刷新。

仓库里已经是一个能跑的空白应用。先改 `acde.config.jsonc`：

- `id`：应用 ID，建议和应用名一致（小写字母、数字和 `-`）
- `label`：显示名称
- `icon`：图标，可以是 freedesktop 图标名，也可以是工程里的 `.svg` / `.png`

入口是 `index.html`，代码在 `src/`。文档：[第一个应用](https://docs.dopame.ai/zh/start/first-app/)、[工程结构](https://docs.dopame.ai/zh/start/project/)、[全部文档](https://docs.dopame.ai/zh/)。

## 5. 提交

```sh
acdev check   # 提交前先在本地检查
git add -A
git commit -m "..."
git push
```

每次 push 都会自动运行 `acdev check` 和 `acdev build`，结果在仓库的 **Actions** 页面查看。构建出的安装包可以在那次运行的 Artifacts 里下载。红叉表示没通过，点进去看日志，在本地跑同样的命令修好再推。

## 规则

- 只有你（和审核员）能推送你的仓库，别人推不进来，你也推不到别人的仓库。
- 仓库是公开的。不要提交密码、令牌、私钥。
- `main` 分支不能 force push，也不能删除，推上去的提交都会保留。其他分支随意。
- 迁移别人的开源项目时，保留原项目的 LICENSE 和署名。
- 审核以仓库 `main` 分支上的内容为准。

## 常见问题

**机器人回复「没有创建仓库」**
回复里会写明原因，常见的是应用名不合规，或者这个仓库名已经被别人占用。换个应用名重新开 issue。

**邀请过期了**
重新开一个领取 issue，应用名填同一个，会给你发新邀请。

**改过 GitHub 用户名**
仓库按你的账号（而不是用户名）绑定。改名前领的仓库请联系主办方。

**机器人回复「处理时出错」**
不用重复提交，主办方会处理并重试。

**CI 失败**
在本地运行 `acdev check` 和 `acdev build`，能看到同样的报错。
