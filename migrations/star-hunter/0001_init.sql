-- Star Hunter registration: one row per person, teams of 1-4 joined by a 6-character code.
CREATE TABLE teams (
	id INTEGER PRIMARY KEY,
	code TEXT NOT NULL UNIQUE,
	name TEXT NOT NULL UNIQUE COLLATE NOCASE,
	created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE entrants (
	id INTEGER PRIMARY KEY,
	email TEXT NOT NULL UNIQUE COLLATE NOCASE,
	name TEXT NOT NULL,
	github TEXT NOT NULL UNIQUE COLLATE NOCASE,
	status TEXT NOT NULL CHECK (status IN ('student', 'work', 'other')),
	org TEXT NOT NULL DEFAULT '',
	contact TEXT NOT NULL DEFAULT '',
	minor INTEGER NOT NULL DEFAULT 0,
	team_id INTEGER REFERENCES teams (id),
	captain INTEGER NOT NULL DEFAULT 0,
	locale TEXT NOT NULL,
	ip TEXT NOT NULL DEFAULT '',
	created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX entrants_team ON entrants (team_id);
