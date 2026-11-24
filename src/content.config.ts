import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.coerce.date(),
		author: z.string(),
	}),
});

/** What the blogs repository (the `blogs` submodule) can mark a post as; drafts stay off the site. */
export const statuses = ['draft', 'staged', 'release', 'archive'] as const;
export const published: readonly (typeof statuses)[number][] = ['staged', 'release', 'archive'];

// blogs/blogs/<slug>/index.<lang>.mdx, id `<lang>/<slug>` with the lang lowercased like the glob loader does.
const community = defineCollection({
	loader: glob({
		pattern: '*/index.*.mdx',
		base: './blogs/blogs',
		generateId: ({ entry }) => {
			const [slug, file] = entry.split('/');
			return `${file.slice('index.'.length, -'.mdx'.length).toLowerCase()}/${slug}`;
		},
	}),
	schema: z
		.object({
			title: z.string(),
			date: z.coerce.date(),
			authors: z.array(z.string()),
			tags: z.array(z.string()).optional(),
			summary: z.string(),
			lang: z.string(),
			status: z.enum(statuses),
		})
		.transform((d) => ({ ...d, description: d.summary, author: d.authors.join(', ') })),
});

const authors = defineCollection({
	loader: glob({ pattern: '*.yml', base: './blogs/authors' }),
	schema: z.object({ name: z.string(), github: z.string().optional() }),
});

const docs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

export const collections = { blog, community, authors, docs };
