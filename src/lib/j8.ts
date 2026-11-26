import type { APIContext } from 'astro';

/** The j8 book moved to its own domain; old /projects/j8/<page> links land on the same page there. /projects/j8/ itself
 *  is j8's project page on this site (pages/projects/j8/index.astro). */
export const J8_SITE = 'https://j8.app238.com';

export const redirectJ8 = ({ url }: APIContext, sitePrefix: string) => {
	const rest = url.pathname.slice(`${sitePrefix}/projects/j8`.length).replace(/^\//, '');
	return new Response(null, { status: 301, headers: { location: `${J8_SITE}${sitePrefix}/${rest}${url.search}` } });
};
