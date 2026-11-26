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
		},
		by: 'by',
		back: '← Back',
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
		},
		by: '作者',
		back: '← 返回',
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
