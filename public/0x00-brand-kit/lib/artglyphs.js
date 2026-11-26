// 0X00 艺术版几何：在 Major Mono Display（OFL）字形上还原的笔画骨架。
// 单位是字体单位（1000/em），y 轴向上。每个字都用两条闭合线圈表示，方便互相变形：
//   0  = 上半圈 U（弧 + 斜线）+ 下半圈 D（弧 + 斜线），两圈共用中间那道斜线
//   X  = 沙漏的上三角 T + 下三角 B，两个三角共用腰部的交点
// 变形：0 沿斜线方向压扁成 /；沙漏的 “/” 留下当斜线，“\” 从腰部撑开成跑道两边。

const STROKE = 36.5;      // 字体笔画粗细（0 是 36，X 是 37）
const ADVANCE = 740;      // 等宽字的步进
const MITER = 2.4;        // 斜接上限：沙漏的直角能保持尖角，压扁的 0 两头不会冒刺

const C1 = [370, 220];           // 0 下半圆圆心
const C2 = [370, 475];           // 0 上半圆圆心
const R = 217;                   // 跑道中线半径（外 235，内 199）
const CENTER = [370, 347.5];
const SLASH = [353, 431];        // 0 里斜线的方向（原字形里斜线两端的连线）
const SL = Math.hypot(...SLASH);
const DIR = [SLASH[0] / SL, SLASH[1] / SL];
const NRM = [-DIR[1], DIR[0]];

// 斜线和跑道中线的交点：从中心沿 DIR 走 S 远
const S = (() => {
  // |c + s·d − C2| = R，取正根
  const ox = CENTER[0] - C2[0];
  const oy = CENTER[1] - C2[1];
  const b = 2 * (ox * DIR[0] + oy * DIR[1]);
  const c = ox * ox + oy * oy - R * R;
  return (-b + Math.sqrt(b * b - 4 * c)) / 2;
})();
const PU = [CENTER[0] + S * DIR[0], CENTER[1] + S * DIR[1]]; // 斜线右上端
const PL = [CENTER[0] - S * DIR[0], CENTER[1] - S * DIR[1]]; // 斜线左下端
const ANG_U = Math.atan2(PU[1] - C2[1], PU[0] - C2[0]);       // 在上半圆上的角度
const ANG_L = Math.atan2(PL[1] - C1[1], PL[0] - C1[0]) + Math.PI * 2; // 在下半圆上的角度

const N_ARC = 90, N_SIDE = 70, N_CHORD = 50;

function arc(c, a0, a1, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    out.push([c[0] + R * Math.cos(a), c[1] + R * Math.sin(a)]);
  }
  return out;
}
function line(p, q, n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push([p[0] + ((q[0] - p[0]) * i) / n, p[1] + ((q[1] - p[1]) * i) / n]);
  return out;
}
// 沿“上圆弧 → 左边竖线 → 下圆弧”走，按弧长均匀取 n 个点
function side(fromAng, toAng, leftSide, n) {
  const x = leftSide ? C1[0] - R : C1[0] + R;
  const pieces = leftSide
    ? [{ len: R * (Math.PI - fromAng), at: (t) => [C2[0] + R * Math.cos(fromAng + t), C2[1] + R * Math.sin(fromAng + t)] },
       { len: C2[1] - C1[1], at: (t) => [x, C2[1] - t] },
       { len: R * (toAng - Math.PI), at: (t) => [C1[0] + R * Math.cos(Math.PI + t / R), C1[1] + R * Math.sin(Math.PI + t / R)] }]
    : [{ len: R * (Math.PI * 2 - fromAng), at: (t) => [C1[0] + R * Math.cos(fromAng + t), C1[1] + R * Math.sin(fromAng + t)] },
       { len: C2[1] - C1[1], at: (t) => [x, C1[1] + t] },
       { len: R * toAng, at: (t) => [C2[0] + R * Math.cos(t / R), C2[1] + R * Math.sin(t / R)] }];
  // 第一段用角度参数，统一换成弧长参数
  pieces[0].at = leftSide
    ? (t) => [C2[0] + R * Math.cos(fromAng + t / R), C2[1] + R * Math.sin(fromAng + t / R)]
    : (t) => [C1[0] + R * Math.cos(fromAng + t / R), C1[1] + R * Math.sin(fromAng + t / R)];
  const total = pieces.reduce((s, p) => s + p.len, 0);
  const out = [];
  for (let i = 0; i < n; i++) {
    let d = (total * i) / n;
    for (const p of pieces) {
      if (d <= p.len || p === pieces[pieces.length - 1]) { out.push(p.at(Math.min(d, p.len))); break; }
      d -= p.len;
    }
  }
  return out;
}

/** 0：上半圈 U、下半圈 D */
function zeroLoops() {
  const leftTop = Math.PI - ANG_U;           // 和 PU 左右对称的点，在上半圆上
  const rightBottom = Math.PI * 3 - ANG_L;   // 和 PL 左右对称的点，在下半圆上
  const U = [
    ...arc(C2, ANG_U, leftTop, N_ARC),            // 顶部弧，从右往左
    ...side(leftTop, ANG_L, true, N_SIDE),        // 左边，往下走到斜线左下端
    ...line(PL, PU, N_CHORD),                     // 斜线，往右上回到起点
  ];
  const D = [
    ...arc(C1, ANG_L, rightBottom, N_ARC),        // 底部弧，从左往右
    ...side(rightBottom, ANG_U, false, N_SIDE),   // 右边，往上走到斜线右上端
    ...line(PU, PL, N_CHORD),                     // 斜线，往左下回到起点
  ];
  return [U, D];
}

// 沙漏 X 的骨架（由原字形轮廓推出的中线），左右对称轴 x = 370.5
const XC = [370.5, 348];
const TL = [112.4, 677.5], TR = [628.6, 677.5], BL = [112.4, 18.5], BR = [628.6, 18.5];

/** X：上三角 T、下三角 B，点数和 0 的两圈一一对应 */
function xLoops() {
  const T = [...line(TR, TL, N_ARC), ...line(TL, XC, N_SIDE), ...line(XC, TR, N_CHORD)];
  const B = [...line(BL, BR, N_ARC), ...line(BR, XC, N_SIDE), ...line(XC, BL, N_CHORD)];
  return [T, B];
}

/** 0 往斜线方向压扁：m=0 是 0，m=1 压成一根 / */
function collapse(loops, m) {
  return loops.map((pts) => pts.map(([x, y]) => {
    const dx = x - CENTER[0], dy = y - CENTER[1];
    const a = dx * DIR[0] + dy * DIR[1];
    const b = (dx * NRM[0] + dy * NRM[1]) * (1 - m);
    return [CENTER[0] + a * DIR[0] + b * NRM[0], CENTER[1] + a * DIR[1] + b * NRM[1]];
  }));
}

/** 两组线圈逐点插值 */
function lerpLoops(a, b, m) {
  return a.map((pts, i) => pts.map((p, j) => [p[0] + (b[i][j][0] - p[0]) * m, p[1] + (b[i][j][1] - p[1]) * m]));
}

const ZERO = zeroLoops();
const X = xLoops();

/** 某一格在相位 m 时的形状。kind: 'zero'（0→/）或 'x'（X→0） */
function glyphAt(kind, m) {
  return kind === 'x' ? lerpLoops(X, ZERO, m) : collapse(ZERO, m);
}

const WORD = ['zero', 'x', 'zero', 'zero'];
const TRACKING = -90;     // 字标收紧的字距（等宽原样太松）

/** 字标：每格的线圈，已平移到各自位置。tracking 是字间额外距离（字体单位） */
function wordAt(m, tracking = TRACKING) {
  return WORD.map((kind, i) => glyphAt(kind, m).map((pts) => pts.map(([x, y]) => [x + i * (ADVANCE + tracking), y])));
}

/** 字标外框（含笔画），两种状态都在这个框里 */
function wordBox(tracking = TRACKING) {
  return { x0: 135, x1: 3 * (ADVANCE + tracking) + 605, y0: -15, y1: 710 };
}

/** 标志：粗的 ∅（随 m 压扁）+ 三条压扁过程的细线（固定不动） */
const HAIR = STROKE * 0.16;
const MARK_BOX = { x0: 135, x1: 605, y0: -15, y1: 710 };
function markAt(m = 0, { hairlines = true } = {}) {
  return {
    bold: [collapse(ZERO, m)],
    hair: hairlines ? [0.25, 0.5, 0.75].map((k) => collapse(ZERO, k)) : [],
  };
}

/** 线圈 → SVG path（y 轴翻转），scale/ox/oy 把字体单位映射到画面 */
function loopsToPath(loopsList, { scale = 1, ox = 0, oy = 0 } = {}) {
  let d = '';
  for (const loops of loopsList) for (const pts of loops) {
    pts.forEach(([x, y], i) => { d += `${i ? 'L' : 'M'}${(ox + x * scale).toFixed(2)} ${(oy - y * scale).toFixed(2)}`; });
    d += 'Z';
  }
  return d;
}

/** 在 canvas 上画（调用前设好 strokeStyle 和变换） */
function strokeLoops(ctx, loopsList, { scale = 1, ox = 0, oy = 0, width = STROKE } = {}) {
  ctx.lineWidth = width * scale;
  ctx.lineJoin = 'miter';
  ctx.miterLimit = MITER;
  ctx.beginPath();
  for (const loops of loopsList) for (const pts of loops) {
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(ox + x * scale, oy - y * scale) : ctx.moveTo(ox + x * scale, oy - y * scale)));
    ctx.closePath();
  }
  ctx.stroke();
}
