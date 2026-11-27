import { getCollection, type CollectionEntry } from 'astro:content';
import { published } from './content.config';

export const locales = ['en', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
	en: {
		langName: 'English',
		siteDescription:
			'0x00 is a vendor-neutral open-source community for compilers, language runtimes, garbage collectors, GPU drivers and AI accelerator toolchains.',
		nav: { home: 'Home', projects: 'Projects', events: 'Events', blog: 'Blog', docs: 'Docs' },
		heroTitle: 'Open systems software, built in the open.',
		heroLede:
			'0x00 is a vendor-neutral open-source community for compilers, language runtimes, garbage collectors, GPU drivers and AI accelerator toolchains. Anyone can use it, anyone can contribute.',
		featured: 'Projects',
		allProjects: 'All projects →',
		latest: 'Latest posts',
		allPosts: 'All posts →',
		readDocs: 'Read the docs →',
		seeCode: 'See the code on GitHub',
		areasTitle: 'What we work on',
		areas: { compiler: 'Compilers', runtime: 'Language runtimes', gc: 'Garbage collectors', gpu: 'GPU drivers', ai: 'AI accelerator toolchains' },
		kinds: { runtime: 'Language runtime', gc: 'Garbage collector', gpu: 'GPU driver', appRuntime: 'App runtime', tooling: 'Developer tools', app: 'Application' },
		allEvents: 'All events →',
		tagline: 'A vendor-neutral open-source community',
		pageEnd: 'This page ends here.',
		nul: 'NUL, the mascot of 0x00: a quarter rest, the silence that numbered notation writes as 0',
		bytesNote: 'On the left, each name as its bytes in hex, with the letter above each byte. Like every C string, it ends in 00: the byte 0x00.',
		bytesNoteShort: 'On the left: each name as its bytes, ending in 00.',
		facts: { kind: 'Kind', language: 'Language', license: 'Licence', topics: 'Topics' },
		moreProjects: 'More projects',
		projectSite: 'Project website',
		skin: 'Style',
		skins: { hardcore: 'Hardcore', color: 'Colour', art: 'Art' },
		projectsTitle: 'Projects',
		projectsLede: 'Everything here is developed in public on GitHub under the 0x00-Community organization.',
		repo: 'Repository',
		blogTitle: 'Blog',
		blogLede: 'News, releases and engineering notes from the community.',
		docsTitle: 'Docs',
		docsLede: 'How the community works and how to take part.',
		eventsTitle: 'Events',
		eventsLede: 'Contests and challenges run in the community. Each one has its own page with the dates, the rules and how to enter.',
		event: {
			tentative: 'Tentative',
			tbd: 'To be announced',
			tabs: { overview: 'Overview', timeline: 'Timeline', enter: 'How to enter', projects: 'Projects', review: 'Review', scoring: 'Scoring & prizes', rules: 'Rules', resources: 'Resources', faq: 'FAQ' },
			register: 'Register',
			seeTimeline: 'See the timeline',
			now: 'Now',
			done: 'Done',
			banned: 'What does not count',
			code: 'Code, license and AI tools',
			rulesFull: 'Read the full rules →',
			prizes: 'Prizes',
			details: 'Details →',
			guide: 'Participant guide',
			onThisPage: 'On this page',
			prevSection: 'Previous',
			nextSection: 'Next',
			whatCounts: 'What counts as a migration',
			questions: 'Four questions before you start',
			support: 'New to Dopame OS? You are covered',
			joinShort: 'Players’ group',
			joinTitle: 'Join the players’ WeChat group',
			joinLede: 'Scan to join: find teammates, get answers, and hear first who got each project running first.',
		},
		notFound: 'This page is not here.',
		notFoundLede: 'The address may be mistyped, or the page may have moved.',
		backHome: '← Back to the home page',
		by: 'by',
		back: '← Back',
		copy: 'Copy',
		copied: 'Copied',
		dateLocale: 'en-US',
	},
	'zh-CN': {
		langName: '简体中文',
		siteDescription: '0x00 是一个厂商中立的开源社区，专注编译器、语言运行时、垃圾回收器、GPU 驱动和 AI 加速器工具链。',
		nav: { home: '首页', projects: '项目', events: '赛事', blog: '博客', docs: '文档' },
		heroTitle: '开放的系统软件，在开放中构建。',
		heroLede:
			'0x00 是一个厂商中立的开源社区，专注编译器、语言运行时、垃圾回收器、GPU 驱动和 AI 加速器工具链。任何人都可以使用，任何人都可以贡献。',
		featured: '项目',
		allProjects: '全部项目 →',
		latest: '最新文章',
		allPosts: '全部文章 →',
		readDocs: '阅读文档 →',
		seeCode: '去 GitHub 看代码',
		areasTitle: '做什么',
		areas: { compiler: '编译器', runtime: '语言运行时', gc: '垃圾回收器', gpu: 'GPU 驱动', ai: 'AI 加速器工具链' },
		kinds: { runtime: '语言运行时', gc: '垃圾回收器', gpu: 'GPU 驱动', appRuntime: '应用运行时', tooling: '开发工具', app: '应用' },
		allEvents: '全部赛事 →',
		tagline: '厂商中立的开源社区',
		pageEnd: '这一页到这里结束。',
		nul: '0x00 的吉祥物 NUL：一个四分休止符，简谱里记作 0',
		bytesNote: '左列是项目名的字节（十六进制写法），上面的小字是它对应的字母。和 C 语言里的字符串一样，每个名字都以 00 结尾，这个字节就是 0x00。',
		bytesNoteShort: '左列：项目名的字节，以 00 结尾。',
		facts: { kind: '类别', language: '语言', license: '许可证', topics: '主题' },
		moreProjects: '其他项目',
		projectSite: '项目网站',
		skin: '风格',
		skins: { hardcore: '硬核', color: '彩色', art: '艺术' },
		projectsTitle: '项目',
		projectsLede: '所有项目都在 GitHub 的 0x00-Community 组织下公开开发。',
		repo: '仓库',
		blogTitle: '博客',
		blogLede: '社区动态、版本发布与工程笔记。',
		docsTitle: '文档',
		docsLede: '社区如何运作，以及如何参与。',
		eventsTitle: '赛事',
		eventsLede: '社区里办的比赛和挑战。每场一页：日期、规则、怎么参加。',
		event: {
			tentative: '暂定',
			tbd: '待公布',
			tabs: { overview: '概览', timeline: '时间线', enter: '怎么参加', projects: '项目', review: '验收', scoring: '计分与奖项', rules: '规则要点', resources: '资源', faq: '常见问题' },
			register: '立即报名',
			seeTimeline: '看时间线',
			now: '进行中',
			done: '已结束',
			banned: '这些做法不算数',
			code: '代码、许可证和 AI 工具',
			rulesFull: '看完整规则 →',
			prizes: '奖项',
			details: '看详情 →',
			guide: '选手指南',
			onThisPage: '本页内容',
			prevSection: '上一节',
			nextSection: '下一节',
			whatCounts: '什么样的迁移才算数',
			questions: '动手之前，先回答四个问题',
			support: '没用过 Dopame OS 也能上场',
			joinShort: '加入选手群',
			joinTitle: '加入选手微信群',
			joinLede: '扫码进群：找队友、看答疑，第一时间看到「首个跑通」播报。',
		},
		notFound: '这个页面不存在。',
		notFoundLede: '可能是地址写错了，也可能是页面挪了地方。',
		backHome: '← 回到首页',
		by: '作者',
		back: '← 返回',
		copy: '复制',
		copied: '已复制',
		dateLocale: 'zh-CN',
	},
} as const;

export const prefix = (locale: Locale) => (locale === 'en' ? '' : `/${locale}`);
export const href = (locale: Locale, path = '/') => `${prefix(locale)}${path}` || '/';

export const localeOf = (pathname: string): Locale => (pathname.startsWith('/zh-CN') ? 'zh-CN' : 'en');

export const switchLocale = (pathname: string, to: Locale) => {
	const bare = pathname.replace(/^\/zh-CN(?=\/|$)/, '') || '/';
	return href(to, bare);
};

// The glob loader lowercases entry ids, so `zh-CN/foo.md` becomes `zh-cn/foo`.
const split = (id: string) => {
	const [dir = '', ...rest] = id.split('/');
	return { locale: locales.find((l) => l.toLowerCase() === dir), slug: rest.join('/') };
};

export const slugOf = (entry: { id: string }) => split(entry.id).slug;

const authorNames = async () =>
	new Map((await getCollection('authors')).map((a) => [a.id, a.data.name] as const));

/** Posts written in this repository plus the published ones from the blogs submodule, newest first. */
export const posts = async (locale: Locale): Promise<Post[]> => {
	const names = await authorNames();
	const local = await getCollection('blog', (e) => split(e.id).locale === locale);
	const community = (
		await getCollection('community', (e) => split(e.id).locale === locale && published.includes(e.data.status))
	).map((e) => ({ ...e, data: { ...e.data, author: e.data.authors.map((id) => names.get(id) ?? id).join(', ') } }));
	return [...local, ...community].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
};

export const docs = async (locale: Locale) =>
	(await getCollection('docs', (e) => split(e.id).locale === locale)).sort((a, b) => a.data.order - b.data.order);

export const formatDate = (locale: Locale, date: Date) =>
	date.toLocaleDateString(ui[locale].dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

export type Post = CollectionEntry<'blog'> | CollectionEntry<'community'>;
export type Doc = CollectionEntry<'docs'>;

/** The participant guide of an event, if it has one in this language. */
export const guide = async (locale: Locale, slug: string) =>
	(await getCollection('guides', (e) => split(e.id).locale === locale && split(e.id).slug === slug))[0];
