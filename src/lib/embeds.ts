import { readFileSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import type { Plugin } from 'vite';

/** Posts of the blogs submodule: blogs/blogs/<slug>/index.<lang>.mdx */
const POST = /\/blogs\/blogs\/[^/]+\/index\.[^/]+\.mdx$/;
/** An Obsidian embed on a line of its own: ![[refs/relay.rs]], or a line range of it: ![[refs/relay.rs#L10-L20]] */
const EMBED = /^!\[\[(refs\/[^\]|#]+)(?:#L(\d+)-L(\d+))?\]\]$/gm;

const LANG: Record<string, string> = { '.rs': 'rust', '.go': 'go', '.py': 'python', '.ts': 'ts', '.js': 'js', '.sh': 'sh' };

/** Lines `from`..=`to` (1-based) with their common indentation removed. */
const excerpt = (code: string, from: number, to: number) => {
	const lines = code.split('\n').slice(from - 1, to);
	const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)![0].length));
	return lines.map((l) => l.slice(indent)).join('\n');
};

/** A fenced code block that cannot be closed early by backticks inside `code`. */
const fence = (code: string, lang: string) => {
	const ticks = '`'.repeat(Math.max(3, ...[...code.matchAll(/`+/g)].map((m) => m[0].length + 1)));
	return `${ticks}${lang}\n${code.replace(/\n$/, '')}\n${ticks}`;
};

/**
 * Expands `![[refs/...]]` embeds (whole files or `#Lfrom-Lto` ranges) in the blogs submodule into code blocks before MDX compiles the post,
 * so it works whatever markdown processor the MDX integration uses.
 */
export const embeds = (): Plugin => ({
	name: '0x00:blog-embeds',
	enforce: 'pre',
	transform(code, id) {
		const path = id.split('?')[0];
		if (!POST.test(path)) return;
		// The page renders the title itself, so drop the post's own top-level heading.
		return code.replace(/^# .*\n/m, '').replace(EMBED, (_, ref: string, from?: string, to?: string) => {
			const file = join(dirname(path), ref);
			this.addWatchFile(file);
			const source = readFileSync(file, 'utf8');
			return fence(from && to ? excerpt(source, Number(from), Number(to)) : source, LANG[extname(ref)] ?? '');
		});
	},
});
