import { env } from 'cloudflare:workers';
import type { APIContext } from 'astro';

/**
 * Reverse proxy for the j8 book (Worker `j8-mdbook`, bound as J8_BOOK).
 * The English book lives at the book's root and the Chinese one under /zh-CN/,
 * so `<site prefix>/projects/j8/<rest>` maps to `<site prefix>/<rest>` on the book.
 * The book's links are relative; only redirects and the 404 page's <base> carry absolute paths.
 */
export const proxyBook = async ({ request, url }: APIContext, sitePrefix: string) => {
	const mount = `${sitePrefix}/projects/j8`;
	if (url.pathname === mount) return new Response(null, { status: 308, headers: { location: `${mount}/${url.search}` } });

	const upstream = new URL(request.url);
	upstream.pathname = `${sitePrefix}/${url.pathname.slice(mount.length + 1)}`;
	const res = await env.J8_BOOK.fetch(new Request(upstream, request));

	const toSite = (path: string) => (path.startsWith(`${sitePrefix}/`) || sitePrefix === '' ? `${mount}${path.slice(sitePrefix.length)}` : path);

	const headers = new Headers(res.headers);
	const location = headers.get('location');
	if (location) {
		const target = new URL(location, upstream);
		if (target.host === upstream.host) headers.set('location', `${toSite(target.pathname)}${target.search}${target.hash}`);
	}
	const out = new Response(res.body, { status: res.status, statusText: res.statusText, headers });
	if (!headers.get('content-type')?.startsWith('text/html')) return out;

	return new HTMLRewriter()
		.on('base[href]', {
			element(el) {
				const href = el.getAttribute('href');
				if (href?.startsWith('/')) el.setAttribute('href', toSite(href));
			},
		})
		.transform(out);
};
