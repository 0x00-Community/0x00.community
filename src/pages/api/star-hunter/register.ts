import type { APIRoute } from 'astro';
import { starHunter } from '../../../data/events';
import { register } from '../../../lib/register';

export const prerender = false;
export const POST: APIRoute = (ctx) => register(ctx, starHunter);
