// The dot-matrix system of the 0x00 brand kit (hardcore edition, lib/dotfont.js), ported so pages can set any word in
// dots at build time: the 5×7 font, the layout (one empty column between letters, the terminator one column after the
// last letter on the baseline row) and the proportions (pitch 14, radius 5).

const G = (rows: string) => rows.split(' ');

// The digit 0 is slashed, the letter O is not.
const FONT: Record<string, string[]> = {
	'0': G('01110 10001 10011 10101 11001 10001 01110'),
	'1': G('00100 01100 00100 00100 00100 00100 01110'),
	'2': G('01110 10001 00001 00010 00100 01000 11111'),
	'3': G('11111 00010 00100 00010 00001 10001 01110'),
	'4': G('00010 00110 01010 10010 11111 00010 00010'),
	'5': G('11111 10000 11110 00001 00001 10001 01110'),
	'6': G('00110 01000 10000 11110 10001 10001 01110'),
	'7': G('11111 00001 00010 00100 01000 01000 01000'),
	'8': G('01110 10001 10001 01110 10001 10001 01110'),
	'9': G('01110 10001 10001 01111 00001 00010 01100'),
	A: G('01110 10001 10001 11111 10001 10001 10001'),
	B: G('11110 10001 10001 11110 10001 10001 11110'),
	C: G('01110 10001 10000 10000 10000 10001 01110'),
	D: G('11100 10010 10001 10001 10001 10010 11100'),
	E: G('11111 10000 10000 11110 10000 10000 11111'),
	F: G('11111 10000 10000 11110 10000 10000 10000'),
	G: G('01110 10001 10000 10111 10001 10001 01111'),
	H: G('10001 10001 10001 11111 10001 10001 10001'),
	I: G('111 010 010 010 010 010 111'),
	J: G('00111 00010 00010 00010 00010 10010 01100'),
	K: G('10001 10010 10100 11000 10100 10010 10001'),
	L: G('10000 10000 10000 10000 10000 10000 11111'),
	M: G('10001 11011 10101 10101 10001 10001 10001'),
	N: G('10001 10001 11001 10101 10011 10001 10001'),
	O: G('01110 10001 10001 10001 10001 10001 01110'),
	P: G('11110 10001 10001 11110 10000 10000 10000'),
	Q: G('01110 10001 10001 10001 10101 10010 01101'),
	R: G('11110 10001 10001 11110 10100 10010 10001'),
	S: G('01111 10000 10000 01110 00001 00001 11110'),
	T: G('11111 00100 00100 00100 00100 00100 00100'),
	U: G('10001 10001 10001 10001 10001 10001 01110'),
	V: G('10001 10001 10001 10001 10001 01010 00100'),
	W: G('10001 10001 10001 10101 10101 10101 01010'),
	X: G('10001 10001 01010 00100 01010 10001 10001'),
	Y: G('10001 10001 10001 01010 00100 00100 00100'),
	Z: G('11111 00001 00010 00100 01000 10000 11111'),
	' ': G('000 000 000 000 000 000 000'),
	'.': G('0 0 0 0 0 0 1'),
	':': G('0 0 1 0 1 0 0'),
	'!': G('1 1 1 1 1 0 1'),
	'?': G('01110 10001 00001 00010 00100 00000 00100'),
	'-': G('0000 0000 0000 1111 0000 0000 0000'),
	_: G('00000 00000 00000 00000 00000 00000 11111'),
	'/': G('00001 00010 00010 00100 01000 01000 10000'),
};
const UNKNOWN = G('11111 10001 10001 10001 10001 10001 11111');

export const PITCH = 14;
export const RADIUS = 5;

const dot = (col: number, row: number) =>
	`M${col * PITCH + PITCH / 2 - RADIUS} ${row * PITCH + PITCH / 2}a${RADIUS} ${RADIUS} 0 1 0 ${RADIUS * 2} 0a${RADIUS} ${RADIUS} 0 1 0 ${-RADIUS * 2} 0`;

export interface Panel {
	width: number;
	height: number;
	/** Every dot that is not part of a letter, as one path. */
	field: string;
	/** The dots of the letters, one path per column, in writing order. */
	columns: string[];
	/** Centre of the terminator. */
	end: { x: number; y: number };
}

/** Lay a word out on a panel with `margin` dots around it; room for the terminator is always kept. */
export function panel(text: string, margin = 2): Panel {
	const glyphs = [...text.toUpperCase()].map((ch) => FONT[ch] ?? UNKNOWN);
	const inner = glyphs.reduce((w, g) => w + g[0]!.length, 0) + Math.max(0, glyphs.length - 1) + 2;
	const cols = margin * 2 + inner;
	const rows = margin * 2 + 7;
	const lit = new Set<string>();
	const columns: string[] = [];
	let x = margin;
	for (const g of glyphs) {
		for (let c = 0; c < g[0]!.length; c++, x++) {
			let d = '';
			for (let r = 0; r < 7; r++) {
				if (g[r]![c] !== '1') continue;
				lit.add(`${x},${margin + r}`);
				d += dot(x, margin + r);
			}
			if (d) columns.push(d);
		}
		x++;
	}
	const end = { col: x, row: margin + 6 };
	let field = '';
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (!lit.has(`${c},${r}`) && !(c === end.col && r === end.row)) field += dot(c, r);
		}
	}
	return {
		width: cols * PITCH,
		height: rows * PITCH,
		field,
		columns,
		end: { x: end.col * PITCH + PITCH / 2, y: end.row * PITCH + PITCH / 2 },
	};
}

/** 7×7 pictograms for the areas the community works in. */
const ICONS = {
	// an arrow: source in, machine code out
	compiler: '0001000 0000100 0000010 1111111 0000010 0000100 0001000',
	// play: the thing that runs your program
	runtime: '0100000 0110000 0111000 0111100 0111000 0110000 0100000',
	// blocks on a heap, some already reclaimed
	gc: '1101101 1101101 0000000 1100001 1100001 0000000 1101101',
	// the first triangle
	gpu: '0001000 0001000 0010100 0010100 0100010 0100010 1111111',
	// a chip with its pins
	ai: '0101010 1111111 0100010 1101011 0100010 1111111 0101010',
} as const;
export type Icon = keyof typeof ICONS;

export function icon(name: Icon) {
	let on = '';
	let off = '';
	ICONS[name].split(' ').forEach((row, r) =>
		[...row].forEach((bit, c) => {
			if (bit === '1') on += dot(c, r);
			else off += dot(c, r);
		}),
	);
	return { size: 7 * PITCH, on, off };
}
