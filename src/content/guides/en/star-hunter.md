---
title: Participant guide
description: Claim a repository, install acdev, build and submit a Dopame app.
---

You build an app on Dopame. For each app we give you a public repository in the GitHub organization [0x00-Migration](https://github.com/0x00-Migration). You push your code there, and reviewers check it by hand.

A Dopame app is a web page (HTML, CSS, JS; React, Vue and other frameworks work too) running in the Dopame runtime. System features (files, windows and so on) are called through the `acde:*` modules. Most existing web apps move over with a few changes.

## What you need

- A personal GitHub account (not an organization account)
- [Bun](https://bun.sh) 1.4 or newer
- The acdev command-line tool, for macOS (Apple silicon, Intel), Linux x86_64 and Windows x64

## 1. Claim a repository

1. Open the [claim page](https://github.com/0x00-Migration/enroll/issues/new/choose) and choose "领取仓库" (claim a repository).
2. Fill in the **app name**: lowercase letters, digits and `-`, at most 40 characters, for example `markdown-editor`. It cannot be changed after the claim.
3. Tick the confirmation and click **Create**. Do not change the issue title.

Within a minute or two a bot replies in the issue. Your repository is:

```text
https://github.com/0x00-Migration/app-<app name>-<your GitHub username>
```

Claim once per app: each app gets its own repository.

## 2. Accept the invitation

The bot's reply has an invitation link (`<repository URL>/invitations`), which is also sent to your GitHub email. Accepting it gives you write access to the repository. The invitation is valid for 7 days; if it expires, open another claim issue. Your repository and code stay as they are.

## 3. Install acdev

macOS / Linux:

```sh
curl -fsSL https://pkgs.dopame.ai/acdev/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://pkgs.dopame.ai/acdev/install.ps1 | iex
```

Then **open a new terminal** and run `acdev doctor` to check your setup. See the [install docs](https://docs.dopame.ai/en/start/install/).

## 4. Develop

```sh
git clone https://github.com/0x00-Migration/app-<app name>-<your username>.git
cd app-<app name>-<your username>
bun install
acdev dev
```

`acdev dev` opens a window running your app and reloads it whenever you save.

The repository already holds a blank app that runs. Start with `acde.config.jsonc`:

- `id`: the app ID, best the same as the app name (lowercase letters, digits and `-`)
- `label`: the display name
- `icon`: a freedesktop icon name, or an `.svg` / `.png` in the project

The entry point is `index.html`; code goes in `src/`. Docs: [your first app](https://docs.dopame.ai/en/start/first-app/), [project layout](https://docs.dopame.ai/en/start/project/), [all docs](https://docs.dopame.ai/en/).

## 5. Submit

```sh
acdev check   # check locally before you commit
git add -A
git commit -m "..."
git push
```

Every push runs `acdev check` and `acdev build`; see the results on the repository's **Actions** page. The built package can be downloaded from that run's Artifacts. A red cross means it failed: open it, read the log, run the same command locally, fix and push again.

## Rules

- Only you (and the reviewers) can push to your repository. Nobody else can push to yours, and you cannot push to theirs.
- The repository is public. Do not commit passwords, tokens or private keys.
- `main` cannot be force-pushed or deleted; every commit pushed there stays. Other branches are yours to do with as you like.
- When you migrate someone else's open-source project, keep its LICENSE and attribution.
- Review looks at what is on the repository's `main` branch.

## FAQ

**The bot says no repository was created**
The reply gives the reason, usually an invalid app name or a repository name someone else already has. Pick another app name and open a new issue.

**My invitation expired**
Open another claim issue with the same app name and you get a new invitation.

**I changed my GitHub username**
Repositories are tied to your account, not your username. For repositories claimed before the rename, contact the organizers.

**The bot says something went wrong**
Do not submit again. The organizers will look into it and retry.

**CI fails**
Run `acdev check` and `acdev build` locally to see the same errors.
