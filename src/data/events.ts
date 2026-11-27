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
	registerUrl: 'https://xcnv4iceks69.feishu.cn/share/base/shrcnHUJ4KVMm0clMn8LeSAbXJd',
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
		{ label: { en: 'Rewards', 'zh-CN': '奖励' }, value: { en: 'Worth CNY 50,000 in all', 'zh-CN': '总价值 5 万元' } },
		{ label: { en: 'Time zone', 'zh-CN': '时区' }, value: { en: 'Beijing time (UTC+8)', 'zh-CN': '北京时间' } },
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
			body: { en: 'Nov 27 – 29: everyone migrates the same small project and goes through claiming a repository, building, submitting and review once. It is optional and does not score.', 'zh-CN': '11/27 – 11/29，所有人迁移同一个指定的小项目，把领取仓库、开发、提交、验收走一遍；不打也能进正式赛，不算分。' },
		},
		{
			title: { en: 'A list to pick from', 'zh-CN': '推荐项目清单' },
			body: { en: 'At least 30 projects, out on Nov 29, each with its difficulty tier and a core feature checklist of 3 to 5 items.', 'zh-CN': '11/29 公开，至少 30 个项目，每个写明难度档和 3–5 条核心功能清单。' },
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
			what: { en: 'Fill in the registration form. You enter alone; there are no teams. Registration stays open until the main round closes.', 'zh-CN': '填报名表。一人参赛，不组队；报名开到正式赛截止。' },
			when: { en: 'Nov 27 (Fri) – Dec 7 (Mon) 23:59:59', 'zh-CN': '11/27（周五）– 12/7（周一）23:59:59' },
			start: '2026-11-27',
			end: '2026-12-07',
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
		},
		{
			id: 'finals',
			name: { en: 'Finals', 'zh-CN': '决赛展示' },
			what: { en: 'The top 6 by project points demo their apps on Dopame OS and answer the judges online: 8 minutes of demo, 5 of questions.', 'zh-CN': '按项目分前 6 名进决赛，线上演示 8 分钟、答辩 5 分钟。' },
			when: { en: 'Dec 11 (Fri) 14:00–17:00', 'zh-CN': '12/11（周五）14:00–17:00' },
			start: '2026-12-11',
			end: '2026-12-11',
		},
		{
			id: 'results',
			name: { en: 'Results', 'zh-CN': '公布结果' },
			what: { en: 'Rankings and winners are announced, by notice and email; there is no online ceremony.', 'zh-CN': '公布名次和获奖名单，发公告和邮件；不办线上颁奖。' },
			when: { en: 'Dec 11 (Fri)', 'zh-CN': '12/11（周五）' },
			start: '2026-12-11',
			end: '2026-12-11',
		},
		{
			id: 'payout',
			name: { en: 'Prizes paid', 'zh-CN': '领奖' },
			what: { en: 'Winners fill in the payout form themselves by Dec 18; a form not filled in by then means the prize is given up. Prizes are paid by Dec 25.', 'zh-CN': '获奖人自己填领奖表，表开到 12/18，过期没填算放弃；12/25 前发完。' },
			when: { en: 'Dec 11 (Fri) – Dec 25 (Fri)', 'zh-CN': '12/11（周五）– 12/25（周五）' },
			start: '2026-12-11',
			end: '2026-12-25',
		},
	],
	steps: [
		{
			title: { en: 'Register', 'zh-CN': '报名' },
			body: {
				en: 'Press Register on this page and fill in the form. You enter alone, with your own GitHub account.',
				'zh-CN': '点本页的「立即报名」，填报名表。一人参赛，不组队；领仓库、推代码都用你自己的 GitHub 账号。',
			},
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
				en: 'One small project, the same for everyone: the whole path from repository to review, before the clock starts. It is optional and does not score.',
				'zh-CN': '所有人迁移同一个指定的小项目，在正式赛之前把整条路走通一遍。不打热身赛也能进正式赛，热身赛不算分。',
			},
		},
		{
			title: { en: 'Claim a project', 'zh-CN': '认领项目' },
			body: {
				en: 'Claiming opens on December 1. Every project is claimed before it is worked on, and belongs to one person at a time. You may hold up to 2 at once, with no limit in total.',
				'zh-CN': '12 月 1 日开赛日开放认领。所有项目都要先认领再做，一个项目同一时间只归一人；同时最多领 2 个，一共不限。',
			},
		},
		{
			title: { en: 'Migrate and submit', 'zh-CN': '迁移、提交' },
			body: {
				en: 'Pushing to your own repository in 0x00-Migration is the submission; there is nothing else to hand in. The README on the repository says what you changed and how to check the core features; no demo video is needed. At the deadline the version on main is recorded and the repository becomes read-only; review uses that version only.',
				'zh-CN': '推到自己在 0x00-Migration 的仓库就是提交，不用另外交；仓库首页的 README 写清改了什么、核心功能怎么验，不要求演示视频。截止时记下每个仓库 main 分支上的那一版，仓库改成只读；验收和复核只认这一版。',
			},
		},
		{
			title: { en: 'Review, finals, results', 'zh-CN': '验收、决赛展示、公布结果' },
			body: {
				en: 'Submissions are reviewed on a clean Dopame OS and each entrant gets the result on Dec 10. The top 6 by project points demo online, then the rankings are announced.',
				'zh-CN': '作品在干净的验收环境里验收，12 月 10 日把结果发给本人；按项目分前 6 名进决赛，线上演示和答辩，之后公布名次。',
			},
		},
	],
	projects: [
		{
			title: { en: 'Which projects', 'zh-CN': '项目范围' },
			body: {
							en: 'Open-source projects on GitHub with a thousand stars or more, counted on Dec 1, with a web front end and a back end (command-line-only or front-end-only projects are out). Also out: projects without an open-source license, projects already on Dopame OS, and projects that need special hardware or a paid service to run.',
							'zh-CN': 'GitHub 上一千星以上的开源项目，星数按 12 月 1 日算；要有网页前端和后端，只有命令行或只有前端的不收。没有开源许可证的、已经有人迁到 Dopame OS 的、要专用硬件或付费服务才能跑的，都不收。',
						},
		},
		{
			title: { en: 'The recommended list', 'zh-CN': '推荐清单' },
			body: {
				en: 'Every project is claimed from one list: projects picked by the organizers, plus projects nominated by participants and approved. Each entry states its difficulty tier and a core feature checklist of 3 to 5 items. First version on November 29 with at least 30 projects, final on November 30; no projects are added after December 1.',
				'zh-CN': '所有项目都从推荐清单里认领：主办方给的项目，加上选手提名、审核通过的项目。每个项目写明难度档和 3–5 条核心功能清单。11 月 29 日公开第一版，至少 30 个项目，11 月 30 日定版；12 月 1 日以后不加项目。',
			},
		},
		{
			title: { en: 'Nominate one', 'zh-CN': '提名' },
			body: {
				en: 'Open a "nominate a project" issue in the enroll repository with the project link, its stars, its license, why it should be on the list and a draft core feature checklist. Nominations run November 27 – 29, are answered within 2 days, and approved ones join the list on November 30. Nominating a project does not let you claim it early: everyone claims on December 1.',
				'zh-CN': '在 enroll 仓库开「提名项目」的 issue，交原项目地址、star 数、许可证、推荐理由和核心功能清单草稿。11 月 27 日开放提名，29 日截止，2 天内答复，审过的 30 日进清单。提名的人不能先认领，12 月 1 日跟大家一起领。',
			},
		},
		{
			title: { en: 'Giving a project up', 'zh-CN': '放弃和放回' },
			body: {
				en: 'A project claimed for 5 days without a single push goes back on the list. Claims cannot be handed to someone else. To give one up, open a "give up a project" issue in enroll: as often as you like, but you cannot claim that project again.',
				'zh-CN': '领了 5 天一次都没推过代码，项目放回清单。不能转让给别人；主动放弃在 enroll 开「放弃项目」的 issue，不限次数，但放弃的项目自己不能再领。',
			},
		},
	],
	review: [
		{
			title: { en: 'A clean machine', 'zh-CN': '干净的验收环境' },
			body: {
				en: 'Review happens on a freshly installed Dopame OS with only your submitted app on it, on the Dopame OS version of December 1, which does not change during the main round. You cannot test on the review machine yourself.',
				'zh-CN': '验收在一台刚装好的干净 Dopame OS 上做，只装你交的应用；按 12 月 1 日开赛时的 Dopame OS 版本，正式赛期间不换。正式赛期间不能在验收环境里自测。',
			},
		},
		{
			title: { en: 'Item by item', 'zh-CN': '逐项验' },
			body: {
				en: 'Automatic checks see that the app installs and opens; then two engineers go through the core feature checklist item by item, for every project. A partly working app does not pass. Databases and caches are packaged inside the app; third-party APIs that need your own key are not part of the core features; the review machine is online. A failed review cannot be resubmitted.',
				'zh-CN': '自动检查看装得上、打得开；再由两位工程师对着核心功能清单逐项人工复核，每个项目都看。只有一部分能用的不算通过。数据库、缓存要一起打包进应用；要自己填密钥的第三方接口不算进核心功能；验收时能上网。验收不过不能改了重交。',
			},
		},
		{
			title: { en: 'One fixed version', 'zh-CN': '只认一版' },
			body: {
				en: 'At the deadline the version on main is recorded, by the push time GitHub records; review rebuilds the app from it and ignores the CI results and packages in the repository.',
				'zh-CN': '截止时记下每个仓库 main 分支上的那一版，按 GitHub 记录的推送时间；验收时按这一版重新打包，不认仓库里自动检查的结果和打好的包。',
			},
		},
		{
			title: { en: 'Appeals', 'zh-CN': '申诉' },
			body: {
				en: 'Results go to each entrant on December 10; appeals are open until December 11 at 12:00. Where to send them comes with the notice.',
				'zh-CN': '验收结果 12 月 10 日发给本人，12 月 11 日 12:00 前可以申诉；申诉邮箱随公告公布。',
			},
		},
	],
	scoring: [
		{
			title: { en: 'Project points', 'zh-CN': '项目分' },
			body: {
				en: 'Each project that passes review scores by its difficulty tier: A 30, B 20, C 10. Tiers look at stars, code size and dependencies and come with the list. Your project points are the sum over the projects you pass; a failed migration scores nothing.',
				'zh-CN': '每个通过验收的项目按难度分档给分：A 档 30 分、B 档 20 分、C 档 10 分，分档看星数、代码量、依赖多少，跟推荐清单一起公布。项目分是通过验收的项目按档加起来；迁移不成的项目不给分。',
			},
		},
		{
			title: { en: 'Judge points', 'zh-CN': '评委分' },
			body: { en: 'The top 6 by project points go to the finals, where 3 judges score completeness (20) and quality (20), 40 in all.', 'zh-CN': '按项目分取前 6 名进决赛，3 位评委打完成度 20 分、质量 20 分，满分 40 分。' },
		},
		{
			title: { en: 'Ranking', 'zh-CN': '总分和名次' },
			body: {
				en: 'Finalists rank by total score (project points plus judge points); everyone else by project points. A tie goes to the higher judge score, then stays a tie and the prize is shared. One placing per person; no special awards this time.',
				'zh-CN': '进决赛的按总分（项目分 + 评委分）排，没进决赛的只按项目分排；同分时评委分高的在前，还一样就并列、奖金平分。名次奖每人最多拿一个，这一届不设单项奖。',
			},
		},
	],
	prizes: [
		{
			title: { en: 'Placings', 'zh-CN': '名次奖' },
			body: {
				en: 'First prize 1 × CNY 8,000; second prize 2 × 4,000; third prize 3 × 2,000; merit award 7 × 1,000. First to third go to the 6 finalists by total score, merit awards to the others by project points. One placing per person; a placing with nobody good enough stays empty.',
				'zh-CN': '一等奖 1 名 8,000 元，二等奖 2 名各 4,000 元，三等奖 3 名各 2,000 元，优秀奖 7 名各 1,000 元。一、二、三等奖从进决赛的 6 人里按总分排，优秀奖从没进决赛的人里按项目分排；名次奖每人最多拿一个，没人够格的空着。',
			},
		},
		{
			title: { en: 'Migration award', 'zh-CN': '迁移完成奖' },
			body: {
				en: 'For every project that passes review: tier A CNY 300, B 200, C 100. Each project pays once, to the person who claimed it and passed review; warm-up projects do not count. Up to CNY 10,000 in all: if passed projects add up to more, every award is scaled down by the same ratio.',
				'zh-CN': '每个通过验收的项目都发：A 档 300 元、B 档 200 元、C 档 100 元。同一个项目只发一次，给最终通过验收的认领人；热身赛项目不发。总额封顶 10,000 元，超过时所有人按同一比例缩减。',
			},
		},
		{
			title: { en: 'Best guides', 'zh-CN': '精选攻略奖' },
			body: {
				en: '30 guides: CNY 200 each for a post on X, CNY 100 each for a post on a platform in China (Xiaohongshu, Zhihu, Bilibili, WeChat and so on). X is recommended. It must be your own original post, with pictures or a video, telling a migration, packaging or debugging story on Dopame OS that others can follow, tagged #StarHunter and #0x00Community with a link to this page; the same piece on several platforms counts once; up to 3 per person. Entrants and non-entrants alike. Submit by December 10; picks are announced on December 11.',
				'zh-CN': '30 篇：发在 X 上的每篇 200 元，发在国内平台（小红书、知乎、B 站、公众号等）的每篇 100 元。推荐发在 X。必须是原创的图文或视频，写你在 Dopame OS 上迁移、打包或排错的实际过程，别人照着能复现，带上 #StarHunter 和 #0x00Community 两个话题和本页链接；同一篇发到多个平台只算一次，每人最多 3 篇；参赛和不参赛的人都能拿。12 月 10 日截止提交，12 月 11 日公布。',
			},
		},
		{
			title: { en: 'Star Hunter merch', 'zh-CN': '限定周边' },
			body: {
				en: 'Everyone who gets at least one project through review gets a set; the first to get each project running gets a badge; the first 50 to finish the warm-up get stickers; guide authors and finalists get a set with their prize.',
				'zh-CN': '每个迁成至少一个项目的人一套；每道题「首个跑通」的人加一枚实物徽章；热身赛完成的前 50 人一包贴纸；攻略作者和进决赛的 6 人随奖金寄一套。',
			},
		},
		{
			title: { en: 'Together', 'zh-CN': '可以叠加' },
			body: {
				en: 'The migration award, guide awards and merch come on top of a placing. Every winner also gets an electronic certificate.',
				'zh-CN': '迁移完成奖、精选攻略奖和周边可以和名次奖一起拿。所有获奖者另发电子证书。',
			},
		},
		{ title: { en: 'Special awards', 'zh-CN': '单项奖' }, body: { en: 'None this time.', 'zh-CN': '这一届不设。' } },
		{
			title: { en: 'Who pays', 'zh-CN': '谁发奖金' },
			body: {
				en: 'Prizes are paid directly to the winners by the organizers, with individual income tax withheld. All amounts are before tax.',
				'zh-CN': '奖金由主办方直接发给获奖选手，代扣个税；金额都是税前。',
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
			title: { en: 'Questions', 'zh-CN': '答疑' },
			body: {
				en: "Technical questions are answered in public in the players' group by the organizers' engineers, within 24 hours on working days, and collected into an FAQ that is updated daily, so everyone gets the same answer. Scan the group's QR code on this page to join.",
				'zh-CN': '技术问题由主办方的工程师在选手群里公开答，工作日 24 小时内回复，并补进每天更新的「常见问题」，答案对每个人都一样。扫本页的选手群二维码进群。',
			},
		},
	],
	faq: [
		{
			q: { en: 'Who can take part?', 'zh-CN': '谁能参加？' },
			a: {
				en: 'Anyone aged 13 or over: students and working professionals alike, from anywhere. Dopame staff, and the people who pick the list, review or judge, cannot enter.',
				'zh-CN': '13 岁以上谁都能报，在校学生、在职的人都可以，境外的人也能参加。Dopame 的员工，和挑推荐清单、做验收、当评委的人不能报。',
			},
		},
		{
			q: { en: 'Do I have to be somewhere?', 'zh-CN': '要到现场吗？' },
			a: {
				en: 'No. Registration, repositories, the warm-up, submission, review, Q&A, the finals, the results and the payout are all online.',
				'zh-CN': '不用。报名、领仓库、热身赛、提交、验收、答疑、决赛展示、公布结果、领奖都在线上。',
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
		},
		{
			q: { en: 'What if the project I claimed cannot be migrated?', 'zh-CN': '认领后发现迁移不了怎么办？' },
			a: {
				en: 'A migration that does not get there scores nothing. Give it up with a "give up a project" issue in enroll (you cannot claim it again) and claim another: you may hold 2 at once.',
				'zh-CN': '迁移不成的项目不给分。可以在 enroll 开「放弃项目」的 issue 放弃（放弃的项目自己不能再领），再领别的；同时最多领 2 个。',
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
