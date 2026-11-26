import type { Locale } from '../i18n';

/** What kind of thing a project is: the tag on its card. Labels are in `ui[locale].kinds`. */
export type Kind = 'runtime' | 'gc' | 'gpu' | 'appRuntime' | 'tooling' | 'app';

export interface Project {
	name: string;
	kind: Kind;
	desc: Record<Locale, string>;
	/** The project's own website, linked instead of a detail page here. */
	site?: Record<Locale, string>;
}

export const org = 'https://github.com/0x00-Community';

export const projects: Project[] = [
	{
		name: 'j8',
		kind: 'runtime',
		site: { en: 'https://j8.app238.com/', 'zh-CN': 'https://j8.app238.com/zh-CN/' },
		desc: {
			en: 'A JavaScript engine written from scratch in Rust, layered like V8: an accumulator bytecode interpreter, a JIT that lowers through MLIR to x86-64, and a garbage collector of its own.',
			'zh-CN': '用 Rust 从零编写的 JavaScript 引擎，分层与 V8 相同：累加器字节码解释器、经 MLIR 下降到 x86-64 的 JIT，以及自研的垃圾回收器。',
		},
	},
	{
		name: 'paragc',
		kind: 'gc',
		desc: {
			en: 'A parallel garbage collector for Rust: Immix-style mark-region heap, many mutator threads at once, parallel marking with work stealing and parallel sweeping. Lock-free and Miri-clean.',
			'zh-CN': 'Rust 并行垃圾回收器：Immix 式标记-区域堆，支持多个 mutator 线程同时运行，工作窃取的并行标记与并行清扫，无锁且通过 Miri 检查。',
		},
	},
	{
		name: 'detour',
		kind: 'gpu',
		desc: {
			en: 'A GPU userspace driver written entirely in Rust. Command streams, GPU state and shader machine code are generated through an MLIR pipeline and submitted straight to the kernel driver.',
			'zh-CN': '完全用 Rust 编写的 GPU 用户态驱动。命令流、GPU 状态与着色器机器码都经 MLIR 流水线生成，直接提交给内核驱动。',
		},
	},
	{
		name: 'libacde',
		kind: 'appRuntime',
		desc: {
			en: 'A web runtime for desktop apps, without a browser: V8 for logic, its own DOM, layout and GPU rendering, and system access through acde: modules declared in each app manifest. Standard web APIs, never altered.',
			'zh-CN': '不带浏览器的桌面应用 web 运行时：V8 跑逻辑，自研 DOM、排版与 GPU 绘制，系统能力经应用清单里声明的 acde: 模块提供。坚持标准 web 接口，绝不魔改。',
		},
	},
	{
		name: 'acdev',
		kind: 'tooling',
		desc: {
			en: 'The developer kit for libacde apps: the acdev command line scaffolds projects from framework templates, reloads on save, tests, packages and installs, with a built-in MCP server so coding agents can see and drive the running app.',
			'zh-CN': 'libacde 应用的开发套件：命令行 acdev 用框架模板建项目、保存即刷新、测试、打包与安装，内置 MCP，编码 agent 能直接看到并操作正在运行的应用。',
		},
	},
	{
		name: 'knovid',
		kind: 'app',
		desc: {
			en: 'KnoVid is an AI tool that helps everyday creators make clear, beautiful knowledge videos at a lower cost and with a smoother workflow.',
			'zh-CN': 'KnoVid 知视是一款面向普通创作者的 AI 知识视频创作工具，让更多人用更低的成本、更顺手的流程做出精美易懂的知识视频。',
		},
	},
	{
		name: 'marktext-dopame',
		kind: 'app',
		desc: {
			en: 'A port of MarkText for Dopame OS: a standalone Markdown editor plus an experimental collaborative document core.',
			'zh-CN': '面向 Dopame OS 的 MarkText 移植，包含单机 Markdown 编辑器和实验性文档协作内核。',
		},
	},
];
