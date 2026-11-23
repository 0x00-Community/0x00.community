import { getCollection, type CollectionEntry } from 'astro:content';

export const locales = ['en', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

export const ui = {
	en: {
		langName: 'English',
		siteDescription:
			'0x00 is a vendor-neutral open-source community for compilers, language runtimes, garbage collectors, GPU drivers and AI accelerator toolchains.',
		nav: { home: 'Home', projects: 'Projects', blog: 'Blog', docs: 'Docs' },
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
		by: 'by',
		covenantVersion: 'Version',
		covenantLatest: 'Latest version',
		covenantEffective: 'Effective',
		back: '← Back',
		dateLocale: 'en-US',
	},
	'zh-CN': {
		langName: '简体中文',
		siteDescription: '0x00 是一个厂商中立的开源社区，专注编译器、语言运行时、垃圾回收器、GPU 驱动和 AI 加速器工具链。',
		nav: { home: '首页', projects: '项目', blog: '博客', docs: '文档' },
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
		by: '作者',
		covenantVersion: '版本',
		covenantLatest: '最新版本',
		covenantEffective: '生效日期',
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

export const posts = async (locale: Locale) =>
	(await getCollection('blog', (e) => split(e.id).locale === locale)).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);

export const docs = async (locale: Locale) =>
	(await getCollection('docs', (e) => split(e.id).locale === locale)).sort((a, b) => a.data.order - b.data.order);

const versionKey = (v: string) => v.split('.').map(Number);
const newer = (a: string, b: string) => {
	const [x, y] = [versionKey(a), versionKey(b)];
	const i = x.findIndex((n, k) => n !== (y[k] ?? 0));
	return i < 0 ? y.length - x.length : (y[i] ?? 0) - x[i]!;
};

export const covenants = async (locale: Locale) =>
	(await getCollection('covenant', (e) => split(e.id).locale === locale)).sort((a, b) =>
		newer(a.data.version, b.data.version),
	);

export const formatDate = (locale: Locale, date: Date) =>
	date.toLocaleDateString(ui[locale].dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

export type Post = CollectionEntry<'blog'>;
export type Doc = CollectionEntry<'docs'>;
export type Covenant = CollectionEntry<'covenant'>;
