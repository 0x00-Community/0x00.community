import type { Locale } from '../i18n';

/** A string in every language of the site. */
export type L = Record<Locale, string>;

/**
 * How settled a fact is in the organizers' source of truth (for Star Hunter: the Feishu page «Star Hunter 基本信息表»).
 * `tentative` is their 【暂定】: shown with a tag. `tbd` is their 【还在定】: the page says "to be announced" instead of a
 * value. Nothing here is decided by this site: when a row changes there, change it here the same day.
 */
export type State = 'fixed' | 'tentative' | 'tbd';

export interface Fact {
	label: L;
	value?: L;
	state?: State;
}

export interface Phase {
	id: string;
	name: L;
	what: L;
	when: L;
	/** First and last day, Beijing time (UTC+8): the page marks the phases that are running today. */
	start: string;
	end: string;
	state?: State;
}

export interface Point {
	title: L;
	body: L;
	state?: State;
}

export interface Event {
	slug: string;
	name: string;
	fullName: L;
	tagline: L;
	summary: L;
	host: L;
	/**
	 * The banner drawn for the event: the page's title as a picture, in each language, wide (1600×720) and upright
	 * (800×1000, for a phone). The files are in public/events/. Without one the page sets the name in type.
	 */
	banner?: { alt: L; wide: L; tall: L };
	/** Where teams sign up, claim, submit and see the leaderboard: the contest's own site. Empty until it is public. */
	registerUrl: string;
	registerNote: L;
	/** The frozen rules, once they are public. */
	rulesUrl: string;
	rulesNote: L;
	facts: Fact[];
	criteria: Point[];
	criteriaNote: L;
	phases: Phase[];
	steps: Point[];
	projects: Point[];
	review: Point[];
	scoring: Point[];
	prizes: Point[];
	banned: Point[];
	code: Point[];
	resources: { title: L; body: L; href?: L }[];
	faq: { q: L; a: L; state?: State }[];
	/**
	 * The page's own pitch, in the words of the announcement: a headline and the question the event asks. Copy, not
	 * facts; without it the page opens with the summary.
	 */
	pitch?: { title: L; lede: L };
	/** What a migration makes you work out before you start: copy from the announcement. */
	questions?: Point[];
	/** What the organizers give every team, gathered from the facts above (steps, resources) so a newcomer sees it first. */
	support?: Point[];
	/** The players' WeChat group: a QR code in public/events/. */
	group?: { src: string; alt: L };
}

export const starHunter: Event = {
	slug: 'star-hunter',
	name: 'Star Hunter',
	fullName: { en: 'The Thousand-Star Migration Challenge', 'zh-CN': '千星项目迁移挑战赛' },
	tagline: { en: 'Hunt a star. Bring it home.', 'zh-CN': '猎一颗千星，让它在 Dopame OS 上再亮一次。' },
	summary: {
		en: 'Migrate an open-source project with a thousand GitHub stars or more to Dopame OS: package its web front end and back end as a Dopame OS app that installs and opens on Dopame OS, with the core features of the original all working.',
		'zh-CN':
			'把 GitHub 上一千星以上的开源项目迁移到 Dopame OS：把项目的网页前端和后端打包成 Dopame OS 应用，在 Dopame OS 上装得上、打得开，原项目的核心功能都能用。',
	},
	host: { en: 'Hosted by 0x00, co-branded with BoHack', 'zh-CN': '0x00 主办，BoHack 联名' },
	banner: {
		alt: {
			en: 'Star Hunter, the Thousand-Star Migration Challenge. Starts December 1, fully online. Register now.',
			'zh-CN': 'Star Hunter 千星项目迁移挑战赛，12 月 1 日开赛，全程线上。立即报名。',
		},
		wide: { en: '/events/star-hunter.en.svg', 'zh-CN': '/events/star-hunter.zh-CN.svg' },
		tall: { en: '/events/star-hunter.en.tall.svg', 'zh-CN': '/events/star-hunter.zh-CN.tall.svg' },
	},
	registerUrl: '',
	registerNote: { en: 'Registration opens November 27', 'zh-CN': '报名入口 11 月 27 日开放' },
	rulesUrl: '',
	rulesNote: {
		en: 'This page is a summary. The full rules are published on November 30 (tentative); where the two differ, the rules win.',
		'zh-CN': '本页是摘要。完整规则 11 月 30 日公布（暂定），两处不一样时以公布的规则为准。',
	},
	facts: [
		{ label: { en: 'Format', 'zh-CN': '形式' }, value: { en: 'Fully online', 'zh-CN': '全程线上' } },
		{ label: { en: 'Main round', 'zh-CN': '正式赛' }, value: { en: 'Dec 1 – Dec 7, 2026, closing at 23:59:59', 'zh-CN': '2026 年 12 月 1 日 – 12 月 7 日 23:59:59' } },
		{ label: { en: 'Entry', 'zh-CN': '参赛' }, value: { en: 'Individual: one person, no teams', 'zh-CN': '一人参赛，不组队' } },
		{ label: { en: 'Who can enter', 'zh-CN': '谁能参加' }, value: { en: 'Anyone aged 13 or over: students and professionals', 'zh-CN': '13 岁以上谁都能报，学生、在职都可以' } },
		{ label: { en: 'Prizes', 'zh-CN': '奖金' }, state: 'tbd' },
		{ label: { en: 'Time zone', 'zh-CN': '时区' }, value: { en: 'Beijing time (UTC+8)', 'zh-CN': '北京时间' }, state: 'tentative' },
	],
	pitch: {
		title: { en: 'Hunt a star, bring it to Dopame OS', 'zh-CN': '猎一颗千星，迁进 Dopame OS' },
		lede: {
			en: 'The open-source projects you have starred run on your own machine after a git clone and an install. Take that machine away: on a fresh, clean Dopame OS, with the front end and the back end packaged and every core feature working, does the project still stand?',
			'zh-CN':
				'你 Star 过的开源项目，在自己电脑上 git clone、装好依赖就能跑。把熟悉的本机环境抽走，放进一台全新、干净的 Dopame OS，前后端完整打包、核心功能逐项跑通，它还站得住吗？',
		},
	},
	questions: [
		{
			title: { en: 'Why does it run the way it does?', 'zh-CN': '它为什么这样运行？' },
			body: { en: 'Its entry points, its processes, and how the front end talks to the back end.', 'zh-CN': '看清启动入口、进程模型，以及前后端之间怎么通信。' },
		},
		{
			title: { en: 'What does it really depend on?', 'zh-CN': '它真正依赖了什么？' },
			body: { en: 'Which runtimes, system libraries and outside services it needs, and which are only habit.', 'zh-CN': '分清核心运行时、系统库和外部服务，哪些是必需，哪些只是习惯。' },
		},
		{
			title: { en: 'Do its assumptions still hold?', 'zh-CN': '技术假设变了，还成立吗？' },
			body: { en: 'With new system boundaries and a new way to package, look again at what it took for granted.', 'zh-CN': '运行边界和打包方式变了，重新审视原来默认的前提。' },
		},
		{
			title: { en: 'Can it ship without your machine?', 'zh-CN': '离开本机，还能独立交付吗？' },
			body: { en: 'Gather the front end, the back end and what they need into an app that works on a fresh system.', 'zh-CN': '把前后端和运行依赖收拢，做成在全新系统里装上就能用的应用。' },
		},
	],
	support: [
		{
			title: { en: 'Build on your own computer', 'zh-CN': '在自己电脑上开发' },
			body: {
				en: 'Install the acdev command line tool and you can build: macOS, Linux and Windows all work. acdev dev opens your app in a window and reloads it as you save.',
				'zh-CN': '装好 acdev 命令行工具就能开发，macOS、Linux、Windows 都支持；acdev dev 打开窗口运行应用，改完代码自动刷新。',
			},
		},
		{
			title: { en: 'A warm-up round', 'zh-CN': '热身赛' },
			body: { en: 'Nov 27 – 29: everyone migrates the same small project and goes through claiming a repository, building, submitting and review once.', 'zh-CN': '11/27 – 11/29，所有人迁移同一个指定的小项目，把领取仓库、开发、提交、验收走一遍。' },
		},
		{
			title: { en: 'A workshop', 'zh-CN': 'Workshop' },
			body: { en: 'One session on Nov 28 on the whole path, from claiming a repository to submitting and review, recorded.', 'zh-CN': '11 月 28 日一场，讲从领取仓库到提交、验收的完整流程，留录播。' },
			state: 'tentative',
		},
		{
			title: { en: 'Docs and answers', 'zh-CN': '文档和答疑' },
			body: { en: 'The participant guide, the acdev install guide and the app docs; technical questions answered in the open by the organizers’ engineers.', 'zh-CN': '选手指南、acdev 安装文档和应用开发文档；技术问题由主办方的工程师公开答。' },
		},
	],
	group: { src: '/events/star-hunter-group.png', alt: { en: 'QR code of the Star Hunter players’ WeChat group', 'zh-CN': 'Star Hunter 选手微信群二维码' } },
	criteria: [
		{
			title: { en: 'Fully packaged', 'zh-CN': '完整打包' },
			body: {
				en: 'The web front end and the back end both go into the app and run on Dopame OS. A shell around a remote website does not count.',
				'zh-CN': '网页前端和后端都装进这个应用、在 Dopame OS 上跑。只套远程网页的壳不算。',
			},
		},
		{
			title: { en: 'Runs on its own', 'zh-CN': '独立运行' },
			body: {
				en: 'On a freshly installed Dopame OS with nothing on it but your app. Working on your own machine is not enough.',
				'zh-CN': '在一台刚装好的干净 Dopame OS 上，只装你交的应用。在自己的开发机上能用不算数。',
			},
		},
		{
			title: { en: 'Features complete', 'zh-CN': '功能完整' },
			body: {
				en: 'Every project has a core feature checklist, such as "sign up and log in" or "create, edit and delete a note". Every item on it has to work.',
				'zh-CN': '每个项目有一份核心功能清单，比如「能注册登录」「能新建、编辑、删除一篇笔记」。清单上的每一项都能用。',
			},
		},
	],
	criteriaNote: {
		en: 'A migration counts only when all three hold.',
		'zh-CN': '三条都做到才算迁移成功。',
	},
	phases: [
		{
			id: 'signup',
			name: { en: 'Registration', 'zh-CN': '报名' },
			what: { en: 'Fill in the registration form. You enter alone; there are no teams.', 'zh-CN': '填报名表。一人参赛，不组队。' },
			when: { en: 'Nov 27 (Fri) – Nov 30 (Mon) 23:59', 'zh-CN': '11/27（周五）– 11/30（周一）23:59' },
			start: '2026-11-27',
			end: '2026-11-30',
			state: 'tentative',
		},
		{
			id: 'warmup',
			name: { en: 'Warm-up round', 'zh-CN': '热身赛' },
			what: {
				en: 'Everyone migrates the same small project, to go through claiming a repository, building, submitting and review once.',
				'zh-CN': '每人迁移同一个指定的小项目，把领仓库、开发、提交、验收走一遍。',
			},
			when: { en: 'Nov 27 (Fri) – Nov 29 (Sun) 23:59', 'zh-CN': '11/27（周五）– 11/29（周日）23:59' },
			start: '2026-11-27',
			end: '2026-11-29',
		},
		{
			id: 'main',
			name: { en: 'Main round', 'zh-CN': '正式赛' },
			what: {
				en: 'Claiming opens on the first day. Claim a project, migrate it, submit.',
				'zh-CN': '第一天是开赛日，这天开放认领。认领项目、迁移、提交。',
			},
			when: { en: 'Dec 1 (Tue) – Dec 7 (Mon)', 'zh-CN': '12/1（周二）– 12/7（周一）' },
			start: '2026-12-01',
			end: '2026-12-07',
		},
		{
			id: 'review',
			name: { en: 'Review', 'zh-CN': '截止验收' },
			what: {
				en: 'Each submission is installed on a clean Dopame OS and checked against its core feature checklist, then reviewed by people.',
				'zh-CN': '在干净的验收环境里逐项验核心功能，再人工复核。',
			},
			when: { en: 'Dec 8 (Tue) – Dec 10 (Thu)', 'zh-CN': '12/8（周二）– 12/10（周四）' },
			start: '2026-12-08',
			end: '2026-12-10',
			state: 'tentative',
		},
		{
			id: 'finals',
			name: { en: 'Finals', 'zh-CN': '决赛展示' },
			what: { en: 'Shortlisted entrants demo their apps on Dopame OS and answer the judges, online.', 'zh-CN': '入围的选手线上演示和答辩。' },
			when: { en: 'Dec 11 (Fri)', 'zh-CN': '12/11（周五）' },
			start: '2026-12-11',
			end: '2026-12-11',
			state: 'tentative',
		},
		{
			id: 'results',
			name: { en: 'Results', 'zh-CN': '公布结果' },
			what: { en: 'Rankings and winners are announced.', 'zh-CN': '公布名次和获奖名单。' },
			when: { en: 'Dec 11 (Fri)', 'zh-CN': '12/11（周五）' },
			start: '2026-12-11',
			end: '2026-12-11',
			state: 'tentative',
		},
		{
			id: 'payout',
			name: { en: 'Prizes paid', 'zh-CN': '领奖' },
			what: { en: 'Winners fill in the payout form themselves; prizes are paid within two weeks of the results.', 'zh-CN': '获奖人自己填领奖表，公布结果后 2 周内发完。' },
			when: { en: 'Dec 11 (Fri) – Dec 25 (Fri)', 'zh-CN': '12/11（周五）– 12/25（周五）' },
			start: '2026-12-11',
			end: '2026-12-25',
			state: 'tentative',
		},
	],
	steps: [
		{
			title: { en: 'Register', 'zh-CN': '报名' },
			body: {
				en: 'Fill in the registration form; the link goes on this page when registration opens. You enter alone, with your own GitHub account.',
				'zh-CN': '填报名表，报名入口开放后放在本页。一人参赛，不组队；领仓库、推代码都用你自己的 GitHub 账号。',
			},
			state: 'tentative',
		},
		{
			title: { en: 'Claim a repository, install acdev', 'zh-CN': '领仓库、装 acdev' },
			body: {
				en: 'Each app gets a public repository in the 0x00-Migration organization on GitHub. Build on your own computer with acdev (macOS, Linux and Windows); every push runs the checks and the build. The participant guide has the steps.',
				'zh-CN': '每个应用在 GitHub 的 0x00-Migration 组织下领一个公开仓库；在自己电脑上装好 acdev 开发（macOS、Linux、Windows 都支持），每次推送都会自动检查和构建。步骤见选手指南。',
			},
		},
		{
			title: { en: 'Play the warm-up', 'zh-CN': '打热身赛' },
			body: {
				en: 'One small project, the same for everyone: the whole path from repository to review, before the clock starts.',
				'zh-CN': '所有人迁移同一个指定的小项目，在正式赛之前把整条路走通一遍。',
			},
		},
		{
			title: { en: 'Claim a project', 'zh-CN': '认领项目' },
			body: {
				en: 'Claiming opens on December 1. Every project is claimed before it is worked on, and belongs to one person at a time.',
				'zh-CN': '12 月 1 日开赛日开放认领。所有项目都要先认领再做，一个项目同一时间只归一人。',
			},
		},
		{
			title: { en: 'Migrate and submit', 'zh-CN': '迁移、提交' },
			body: {
				en: 'Pushing to your own repository in 0x00-Migration is the submission; there is nothing else to hand in. At the deadline the last commit pushed to each repository is recorded and the repository becomes read-only; review uses that version only (tentative).',
				'zh-CN': '推到自己在 0x00-Migration 的仓库就是提交，不用另外交。截止时记下每个仓库截止前最后一次推送的提交号，仓库改成只读；验收和复核只认这一版（暂定）。',
			},
			state: 'tentative',
		},
		{
			title: { en: 'Review, finals, results', 'zh-CN': '验收、决赛展示、公布结果' },
			body: {
				en: 'Submissions are reviewed on a clean Dopame OS. Shortlisted entrants demo online, then the rankings are announced.',
				'zh-CN': '作品在干净的验收环境里验收；入围的选手线上演示和答辩，之后公布名次。',
			},
		},
	],
	projects: [
		{
			title: { en: 'Which projects', 'zh-CN': '项目范围' },
			body: { en: 'Open-source projects on GitHub with a thousand stars or more.', 'zh-CN': 'GitHub 上一千星以上的开源项目。' },
		},
		{
			title: { en: 'The recommended list', 'zh-CN': '推荐清单' },
			body: {
				en: 'Every project is claimed from one list: projects picked by the organizers, plus projects nominated by participants and approved. Each entry states its difficulty tier and its core feature checklist. First version on November 29, final on November 30.',
				'zh-CN': '所有项目都从推荐清单里认领：主办方给的项目，加上选手提名、审核通过的项目。每个项目写明难度档和核心功能清单。11 月 29 日公开第一版，11 月 30 日定版。',
			},
			state: 'tentative',
		},
		{
			title: { en: 'Nominate one', 'zh-CN': '提名' },
			body: {
				en: 'You can nominate a GitHub project with a thousand stars or more; once approved it joins the list. Nominations run November 27 – 29.',
				'zh-CN': '选手可以提名 GitHub 上一千星以上的开源项目，审核通过后进清单。11 月 27 日开放提名，11 月 29 日截止。',
			},
			state: 'tentative',
		},
		{
			title: { en: 'Claims that stall', 'zh-CN': '放回清单' },
			body: {
				en: 'A claimed project with no progress for a while goes back on the list for someone else. How long, and what counts as progress, comes with the rules.',
				'zh-CN': '认领后一段时间没有进展，项目放回清单，别人可以认领。多少天、「进展」看什么，随规则公布。',
			},
		},
	],
	review: [
		{
			title: { en: 'A clean machine', 'zh-CN': '干净的验收环境' },
			body: {
				en: 'Review happens on a freshly installed Dopame OS with only your submitted app on it.',
				'zh-CN': '验收在一台刚装好的干净 Dopame OS 上做，只装你交的应用。',
			},
		},
		{
			title: { en: 'Item by item', 'zh-CN': '逐项验' },
			body: {
				en: 'Automatic checks first, then a person uses the app against the core feature checklist one item at a time, then a second review by people.',
				'zh-CN': '有自动检查，也有人在验收环境里对着核心功能清单一项一项用，最后再人工复核。',
			},
		},
		{
			title: { en: 'One fixed version', 'zh-CN': '只认一版' },
			body: {
				en: 'The last commit pushed to each repository before the deadline is recorded; review rebuilds the app from that commit and ignores the CI results and packages in the repository.',
				'zh-CN': '截止时记下每个仓库截止前最后一次推送的提交号；验收时按这个提交号重新打包，不认仓库里自动检查的结果和打好的包。',
			},
			state: 'tentative',
		},
	],
	scoring: [
		{
			title: { en: 'Project points', 'zh-CN': '项目分' },
			body: {
				en: 'Each project that passes review scores by difficulty tier. Tiers look at stars, code size and how many dependencies it has.',
				'zh-CN': '每个通过验收的项目按难度分档给分，分档看星数、代码量、依赖多少。',
			},
		},
		{
			title: { en: 'Judge points', 'zh-CN': '评委分' },
			body: { en: 'Judges then score completeness and quality.', 'zh-CN': '评委再看完成度和质量打分。' },
		},
		{
			title: { en: 'Ranking', 'zh-CN': '总分和名次' },
			body: {
				en: 'Entrants are ranked by total score; there are no special awards this time. Tiers, points per tier and how the two scores combine come with the rules.',
				'zh-CN': '按总分排名，这一届不设单项奖。分几档、每档几分、两种分怎么合成总分，随规则公布。',
			},
		},
	],
	prizes: [
		{ title: { en: 'Awards and amounts', 'zh-CN': '奖项、名额和金额' }, body: { en: '', 'zh-CN': '' }, state: 'tbd' },
		{ title: { en: 'Special awards', 'zh-CN': '单项奖' }, body: { en: 'None this time.', 'zh-CN': '这一届不设。' } },
		{
			title: { en: 'Who pays', 'zh-CN': '谁发奖金' },
			body: {
				en: 'Prizes are paid directly to the winners by the organizers, with individual income tax withheld.',
				'zh-CN': '奖金由主办方直接发给获奖选手，代扣个税。',
			},
		},
	],
	// (what does not count: filled in from the rules once they are public; the page shows the list when there is one)
	banned: [],
	code: [
		{
			title: { en: 'The code is yours', 'zh-CN': '代码和应用归选手' },
			body: {
				en: 'The migrated code and the app belong to you. By registering you agree that the organizers may list and distribute apps that pass review.',
				'zh-CN': '迁移后的代码和应用归选手；报名时写明主办方可以收录、分发通过验收的应用。',
			},
		},
		{
			title: { en: "The original license still applies", 'zh-CN': '守原项目的许可证' },
			body: {
				en: "Keep the original project's license and attribution; publish your changes under that license.",
				'zh-CN': '保留原项目的许可证和署名，改动按原项目的许可证公开。',
			},
		},
		{ title: { en: 'AI tools', 'zh-CN': 'AI 工具' }, body: { en: 'Allowed. Say in your repository which AI tools you used; do not paste unpublished development documents into outside AI tools.', 'zh-CN': '准用。在仓库说明里写明用了哪些 AI 工具；没公开的开发文档不要贴给外部 AI 工具。' } },
	],
	resources: [
		{
			title: { en: 'Participant guide', 'zh-CN': '选手指南' },
			body: {
				en: 'Claim a repository for your app, install acdev, develop and push.',
				'zh-CN': '给应用领取仓库、安装 acdev、开发和提交。',
			},
			href: { en: '/events/star-hunter/guide/', 'zh-CN': '/zh-CN/events/star-hunter/guide/' },
		},
		{
			title: { en: 'Dopame OS', 'zh-CN': 'Dopame OS' },
			body: { en: 'What you are migrating to.', 'zh-CN': '要迁移到的系统。' },
			href: { en: 'https://dopame.ai/en/', 'zh-CN': 'https://dopame.ai/zh/' },
		},
		{
			title: { en: 'acdev, the developer kit', 'zh-CN': 'acdev 开发工具' },
			body: { en: 'Create, run, test and package a Dopame OS app.', 'zh-CN': '新建、运行、测试、打包 Dopame OS 应用。' },
			href: { en: 'https://dopame.ai/en/acde', 'zh-CN': 'https://dopame.ai/zh/acde' },
		},
		{
			title: { en: 'App development docs', 'zh-CN': '应用开发文档' },
			body: { en: 'How to package an app and what it must satisfy.', 'zh-CN': '怎么打包成 Dopame OS 应用、应用要满足什么要求。' },
			href: { en: 'https://docs.dopame.ai/en/', 'zh-CN': 'https://docs.dopame.ai/zh/' },
		},
		{
			title: { en: 'Workshop', 'zh-CN': 'Workshop' },
			body: {
				en: 'One session during the warm-up, on November 28 (tentative): repository, building, submission, review. Recorded.',
				'zh-CN': '只办一场，11 月 28 日热身赛期间（暂定）：讲领仓库、开发、提交、验收，留录播。',
			},
		},
		{
			title: { en: 'Questions', 'zh-CN': '答疑' },
			body: {
				en: "Technical questions are answered in public by the organizers' engineers, and collected into an FAQ that is updated daily, so everyone gets the same answer. How to join comes with registration.",
				'zh-CN': '技术问题由主办方的工程师公开答，并补进每天更新的「常见问题」，答案对每个人都一样。怎么进群随报名公布。',
			},
		},
	],
	faq: [
		{
			q: { en: 'Who can take part?', 'zh-CN': '谁能参加？' },
			a: {
				en: 'Anyone aged 13 or over: students and working professionals alike. If you are under 18 you need a signed consent form from a guardian.',
				'zh-CN': '13 岁以上谁都能报，在校学生、在职的人都可以；未满 18 岁的要交监护人同意书。',
			},
		},
		{
			q: { en: 'Do I have to be somewhere?', 'zh-CN': '要到现场吗？' },
			a: {
				en: 'No. Registration, repositories, the warm-up, submission, review, Q&A, the workshop, the finals, the results and the payout are all online.',
				'zh-CN': '不用。报名、领仓库、热身赛、提交、验收、答疑、workshop、决赛展示、公布结果、领奖都在线上。',
			},
		},
		{
			q: { en: 'I do not have a machine running Dopame OS.', 'zh-CN': '我没有装 Dopame OS 的机器怎么办？' },
			a: {
				en: 'You do not need one. You build on your own computer with acdev (macOS, Linux and Windows); review is done on a clean Dopame OS on the organizers’ side.',
				'zh-CN': '不需要。在自己电脑上装好 acdev 就能开发（macOS、Linux、Windows 都支持），验收由主办方在干净的 Dopame OS 上做。',
			},
		},
		{
			q: { en: 'Can I enter as a team?', 'zh-CN': '能组队吗？' },
			a: { en: 'No. Everyone enters alone this time.', 'zh-CN': '不能。这一届一人参赛，不组队。' },
			state: 'tentative',
		},
		{
			q: { en: 'What if the project I claimed cannot be migrated?', 'zh-CN': '认领后发现迁移不了怎么办？' },
			a: {
				en: 'For example because it needs something Dopame OS does not have yet. Whether a clear write-up of why earns points, and how to give the project up, come with the rules.',
				'zh-CN': '比如要用的能力 Dopame OS 还没有。写清做不了的原因给不给分、怎么放弃，随规则公布。',
			},
		},
		{
			q: { en: 'Who owns what I build?', 'zh-CN': '做出来的东西归谁？' },
			a: {
				en: "You do. The original project's license still applies, and the organizers may list and distribute apps that pass review.",
				'zh-CN': '归选手。迁移后的代码照样要守原项目的开源许可证；主办方可以收录、分发通过验收的应用。',
			},
		},
		{
			q: { en: 'Is there an entry fee? May I use AI tools?', 'zh-CN': '收报名费吗？能用 AI 工具吗？' },
			a: {
				en: 'No entry fee. AI tools are allowed; say in your repository which ones you used, and do not paste unpublished development documents into outside AI tools.',
				'zh-CN': '不收报名费。能用 AI 工具，在仓库说明里写明用了哪些；没公开的开发文档不要贴给外部 AI 工具。',
			},
		},
	],
};

/** Newest first. */
export const events: Event[] = [starHunter];
