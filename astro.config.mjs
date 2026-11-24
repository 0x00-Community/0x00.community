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
	// Dark by default like the site; Base.astro switches code to the light colors under prefers-color-scheme: light.
	markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: 'dark' } },
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh-CN'],
		routing: { prefixDefaultLocale: false },
	},
});
