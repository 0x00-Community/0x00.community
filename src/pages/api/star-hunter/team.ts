import type { APIRoute } from 'astro';
import { teamInfo } from '../../../lib/register';

export const prerender = false;
export const GET: APIRoute = (ctx) => teamInfo(ctx);
