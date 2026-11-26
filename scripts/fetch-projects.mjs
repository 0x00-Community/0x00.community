#!/usr/bin/env node
// Snapshot what GitHub says about each project into src/data/github.json: language, licence and topics, the things a
// project page can show that do not go stale by the day. Run it when a project is added or its repository changes:
//
//     node scripts/fetch-projects.mjs            (GITHUB_TOKEN in the environment lifts the rate limit, optional)
//
// The site never calls GitHub itself; it only reads the snapshot.
import { readFileSync, writeFileSync } from 'node:fs';

const org = '0x00-Community';
const source = readFileSync(new URL('../src/data/projects.ts', import.meta.url), 'utf8');
const names = [...source.matchAll(/^\t\tname: '([^']+)',$/gm)].map((m) => m[1]);
const headers = { accept: 'application/vnd.github+json', 'user-agent': 'site-build' };
if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const repos = {};
for (const name of names) {
	const res = await fetch(`https://api.github.com/repos/${org}/${name}`, { headers });
	if (!res.ok) {
		console.error(`${name}: ${res.status} ${res.statusText}`);
		process.exitCode = 1;
		continue;
	}
	const r = await res.json();
	repos[name] = {
		language: r.language ?? null,
		license: r.license && r.license.spdx_id !== 'NOASSERTION' ? r.license.spdx_id : null,
		topics: r.topics ?? [],
	};
	console.log(`${name}: ${repos[name].language ?? '-'} ${repos[name].license ?? '-'} ${repos[name].topics.join(' ')}`);
}
writeFileSync(new URL('../src/data/github.json', import.meta.url), JSON.stringify({ fetched: new Date().toISOString().slice(0, 10), repos }, null, '\t') + '\n');
