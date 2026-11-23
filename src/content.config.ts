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

const docs = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		order: z.number(),
	}),
});

const covenant = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/covenant' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		version: z.string(),
		date: z.coerce.date(),
	}),
});

export const collections = { blog, docs, covenant };
