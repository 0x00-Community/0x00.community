import type { APIRoute } from 'astro';
import { redirectJ8 } from '../../../../lib/j8';

export const prerender = false;
export const ALL: APIRoute = (ctx) => redirectJ8(ctx, '/zh-CN');
