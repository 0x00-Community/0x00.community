// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import { embeds } from './src/lib/embeds.ts';

export default defineConfig({
	site: 'https://0x00.community',
	adapter: cloudflare(),
	integrations: [mdx()],
	vite: { plugins: [embeds()] },
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh-CN'],
		routing: { prefixDefaultLocale: false },
	},
});
