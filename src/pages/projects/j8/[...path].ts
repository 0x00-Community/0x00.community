import type { APIRoute } from 'astro';
import { proxyBook } from '../../../lib/book';

export const prerender = false;
export const ALL: APIRoute = (ctx) => proxyBook(ctx, '');
