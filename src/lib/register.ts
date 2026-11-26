import type { APIContext } from 'astro';
import { env } from 'cloudflare:workers';
import type { Event } from '../data/events';
import { signupWindow, TEAM_MAX } from './signup';

const db = () => (env as unknown as { STAR_HUNTER_DB: D1Database }).STAR_HUNTER_DB;

const json = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

/** `error` is a key the form turns into a sentence in the reader's language. */
const fail = (error: string, status = 400) => json({ ok: false, error }, status);

const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
const newCode = () => Array.from(crypto.getRandomValues(new Uint8Array(6)), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join('');
const normCode = (s: unknown) => String(s ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');

const text = (v: unknown, max: number) => String(v ?? '').trim().replace(/\s+/g, ' ').slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GITHUB = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

const unique = (e: unknown) => {
	const m = String((e as Error)?.message ?? e);
	if (!m.includes('UNIQUE')) return undefined;
	if (m.includes('entrants.email')) return 'emailTaken';
	if (m.includes('entrants.github')) return 'githubTaken';
	if (m.includes('teams.name')) return 'teamNameTaken';
	if (m.includes('teams.code')) return 'retry';
	return 'taken';
};

/** GET ?code=XXXXXX: the team's name and size, so someone joining can see they typed the right code. */
export const teamInfo = async ({ url }: APIContext) => {
	const code = normCode(url.searchParams.get('code'));
	if (code.length !== 6) return fail('codeInvalid');
	const row = await db()
		.prepare('SELECT t.name, COUNT(e.id) AS size FROM teams t LEFT JOIN entrants e ON e.team_id = t.id WHERE t.code = ? GROUP BY t.id')
		.bind(code)
		.first<{ name: string; size: number }>();
	return row ? json({ ok: true, name: row.name, size: row.size, max: TEAM_MAX }) : fail('codeUnknown', 404);
};

export const register = async ({ request, clientAddress }: APIContext, event: Event) => {
	const win = signupWindow(event);
	const now = Date.now();
	if (!win || now < win.open.getTime()) return fail('notOpen', 403);
	if (now > win.close.getTime()) return fail('closed', 403);
	if (Number(request.headers.get('content-length') ?? 0) > 8192) return fail('tooLarge', 413);

	let b: Record<string, unknown>;
	try {
		b = await request.json();
	} catch {
		return fail('badRequest');
	}
	if (text(b.website, 100)) return json({ ok: true, team: null });

	const name = text(b.name, 40);
	const email = text(b.email, 120).toLowerCase();
	const github = text(b.github, 39).replace(/^@/, '');
	const status = String(b.status);
	const org = text(b.org, 80);
	const contact = text(b.contact, 60);
	const minor = b.minor === true ? 1 : 0;
	const locale = b.locale === 'zh-CN' ? 'zh-CN' : 'en';
	const mode = String(b.team);
	const ip = clientAddress ?? '';

	if (!name) return fail('nameMissing');
	if (!EMAIL.test(email)) return fail('emailInvalid');
	if (!GITHUB.test(github)) return fail('githubInvalid');
	if (!['student', 'work', 'other'].includes(status)) return fail('statusMissing');
	if (b.agree !== true) return fail('agreeMissing');

	const insert = (teamSql: string, captain: number) =>
		`INSERT INTO entrants (email, name, github, status, org, contact, minor, team_id, captain, locale, ip) VALUES (?, ?, ?, ?, ?, ?, ?, ${teamSql}, ${captain}, ?, ?)`;
	const person = [email, name, github, status, org, contact, minor];

	try {
		if (mode === 'solo') {
			await db().prepare(insert('NULL', 0)).bind(...person, locale, ip).run();
			return json({ ok: true, team: null });
		}
		if (mode === 'create') {
			const teamName = text(b.teamName, 40);
			if (!teamName) return fail('teamNameMissing');
			for (let i = 0; i < 5; i++) {
				const code = newCode();
				try {
					await db().batch([
						db().prepare('INSERT INTO teams (code, name) VALUES (?, ?)').bind(code, teamName),
						db().prepare(insert('(SELECT id FROM teams WHERE code = ?)', 1)).bind(...person, code, locale, ip),
					]);
					return json({ ok: true, team: { name: teamName, code, size: 1, max: TEAM_MAX } });
				} catch (e) {
					if (unique(e) !== 'retry') throw e;
				}
			}
			return fail('retry', 500);
		}
		if (mode === 'join') {
			const code = normCode(b.code);
			const team = await db().prepare('SELECT id, name FROM teams WHERE code = ?').bind(code).first<{ id: number; name: string }>();
			if (!team) return fail('codeUnknown', 404);
			const r = await db()
				.prepare(
					`INSERT INTO entrants (email, name, github, status, org, contact, minor, team_id, captain, locale, ip)
					 SELECT ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ? WHERE (SELECT COUNT(*) FROM entrants WHERE team_id = ?) < ${TEAM_MAX}`,
				)
				.bind(...person, team.id, locale, ip, team.id)
				.run();
			if (!r.meta.changes) return fail('teamFull', 409);
			const size = await db().prepare('SELECT COUNT(*) AS n FROM entrants WHERE team_id = ?').bind(team.id).first<number>('n');
			return json({ ok: true, team: { name: team.name, code, size, max: TEAM_MAX } });
		}
		return fail('teamMissing');
	} catch (e) {
		const key = unique(e);
		if (key) return fail(key, 409);
		console.error(e);
		return fail('server', 500);
	}
};
