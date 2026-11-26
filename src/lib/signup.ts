import type { Event } from '../data/events';

/** How many people a team can have, the captain included. */
export const TEAM_MAX = 4;

/** Registration runs through the event's `signup` phase, whole days in Beijing time. */
export const signupWindow = (event: Event) => {
	const p = event.phases.find((x) => x.id === 'signup');
	if (!p) return undefined;
	return { open: new Date(`${p.start}T00:00:00+08:00`), close: new Date(`${p.end}T23:59:59.999+08:00`) };
};
