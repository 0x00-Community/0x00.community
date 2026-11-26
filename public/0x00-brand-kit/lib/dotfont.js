// 0X00 硬核版点阵系统：5×7 字库、排版、SVG 输出。
// 浏览器（品牌手册页、动画页）和 Node（build.js）共用这一份。

const COLORS = {
  dark: { bg: '#0B0B0B', on: '#EDEDE6', off: '#262624', red: '#FF4A1C' },
  light: { bg: '#F2F0EA', on: '#111110', off: '#D9D6CC', red: '#FF4A1C' },
};

// 点距 14、点半径 5（半径 = 点距 × 0.357）
const PITCH = 14;
const RADIUS = 5;

const G = (rows) => rows.split(' ');

// 数字 0 带斜线，字母 O 不带，避免混淆。
const FONT = {
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
  ',': G('00 00 00 00 00 01 10'),
  ':': G('0 0 1 0 1 0 0'),
  '!': G('1 1 1 1 1 0 1'),
  '?': G('01110 10001 00001 00010 00100 00000 00100'),
  '-': G('0000 0000 0000 1111 0000 0000 0000'),
  '_': G('00000 00000 00000 00000 00000 00000 11111'),
  '/': G('00001 00010 00010 00100 01000 01000 10000'),
  '\\': G('10000 01000 01000 00100 00010 00010 00001'),
  '+': G('00000 00100 00100 11111 00100 00100 00000'),
  '#': G('01010 01010 11111 01010 11111 01010 01010'),
  "'": G('1 1 0 0 0 0 0'),
  '(': G('001 010 100 100 100 010 001'),
  ')': G('100 010 001 001 001 010 100'),
};

const UNKNOWN = G('11111 10001 10001 10001 10001 10001 11111');

function glyph(ch) {
  return FONT[ch] ?? FONT[ch.toUpperCase()] ?? UNKNOWN;
}

function textWidth(text) {
  const chars = [...text];
  return chars.reduce((w, ch) => w + glyph(ch)[0].length, 0) + Math.max(0, chars.length - 1);
}

/**
 * 排版：返回整块点阵。
 * cells[r][c] = { s: 'on' | 'off' | 'red', order }
 *   off = 被“挖掉”的字形点；order = 书写顺序（按行、按列），动画用。
 * 终止符（红点）放在最后一行最后一个字后面：空一列，落在基线那一行。
 */
function layout(lines, opts = {}) {
  const m = { l: 2, r: 2, t: 2, b: 2, ...(opts.margin || {}) };
  const lineGap = opts.lineGap ?? 1;
  const terminator = opts.terminator !== false;
  const widths = lines.map(textWidth);
  const last = lines.length - 1;
  const inner = Math.max(...widths.map((w, i) => w + (terminator && i === last ? 2 : 0)));
  const cols = m.l + inner + m.r;
  const rows = m.t + lines.length * 7 + (lines.length - 1) * lineGap + m.b;
  const cells = Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ s: 'on', order: -1 })));
  let writeCol = 0;
  let red = null;
  lines.forEach((line, li) => {
    const top = m.t + li * (7 + lineGap);
    let x = m.l;
    [...line].forEach((ch, ci) => {
      const g = glyph(ch);
      const w = g[0].length;
      for (let gc = 0; gc < w; gc++) {
        for (let gr = 0; gr < 7; gr++) {
          if (g[gr][gc] === '1') cells[top + gr][x + gc] = { s: 'off', order: writeCol };
        }
        writeCol++;
      }
      x += w + (ci < line.length - 1 ? 1 : 0);
    });
    if (terminator && li === last) {
      red = { r: top + 6, c: x + 1 };
      cells[red.r][red.c] = { s: 'red', order: writeCol };
    }
  });
  return { cols, rows, cells, red, writeCols: writeCol };
}

/** 3×3 终止符小图标：八个亮点，右下角是红点。 */
function microMark() {
  const cells = Array.from({ length: 3 }, (_, r) =>
    Array.from({ length: 3 }, (_, c) => ({ s: r === 2 && c === 2 ? 'red' : 'on', order: -1 })));
  return { cols: 3, rows: 3, cells, red: { r: 2, c: 2 }, writeCols: 0 };
}

/**
 * 输出 SVG。
 * theme: 'dark' | 'light'
 * plate: true = 带底板（深色/纸色底）；false = 透明底，只有点。
 * pad: 底板外额外留白（单位：点距）。
 */
function toSVG(grid, { theme = 'dark', plate = true, pad = 0, title = '0X00' } = {}) {
  const c = COLORS[theme];
  const P = PITCH;
  const W = (grid.cols + pad * 2) * P;
  const H = (grid.rows + pad * 2) * P;
  const fill = { on: c.on, off: c.off, red: c.red };
  const parts = [];
  // 同色的点合并成一个 path，文件更小
  for (const state of ['on', 'off', 'red']) {
    let d = '';
    grid.cells.forEach((row, r) => row.forEach((cell, col) => {
      if (cell.s !== state) return;
      const cx = (col + pad + 0.5) * P;
      const cy = (r + pad + 0.5) * P;
      d += `M${cx - RADIUS} ${cy}a${RADIUS} ${RADIUS} 0 1 0 ${RADIUS * 2} 0a${RADIUS} ${RADIUS} 0 1 0 ${-RADIUS * 2} 0`;
    }));
    if (!d) continue;
    const opacity = !plate && state === 'off' ? ' fill-opacity="0.18"' : '';
    const color = !plate && state === 'off' ? c.on : fill[state];
    parts.push(`<path fill="${color}"${opacity} d="${d}"/>`);
  }
  const bg = plate ? `<rect width="${W}" height="${H}" fill="${c.bg}"/>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><title>${title}</title>${bg}${parts.join('')}</svg>\n`;
}

/** 品牌里用到的几种标准排法 */
const PRESETS = {
  horizontal: () => layout(['0X00']),
  long: () => layout(['0X00 STUDIO']),
  square: () => layout(['0X', '00'], { margin: { l: 3, r: 3, t: 2, b: 2 } }),
  micro: () => microMark(),
};
