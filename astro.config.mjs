// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
	site: 'https://0x00.community',
	adapter: cloudflare(),
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'zh-CN'],
		routing: { prefixDefaultLocale: false },
	},
});
