#!/usr/bin/env python3
"""Cut Smiley Sans into the slices under public/fonts/smiley/ and write src/styles/smiley-sans.css.

Why: the whole font is 1.15 MB. Cut by how often characters are used, a page fetches only the slices that hold
characters its headings use, and one "core" slice covers the site's own interface text.

Run it again when the font changes, or when src/i18n.ts gains headings with new characters (the site still works if
you do not: those characters come from the frequency slices instead of the core one).

    python3 -m venv /tmp/ft && /tmp/ft/bin/pip install fonttools brotli
    curl -L -o /tmp/SmileySans-Oblique.ttf.zip https://github.com/atelier-anchor/smiley-sans/releases/download/v2.0.1/smiley-sans-v2.0.1.zip
    unzip -o /tmp/SmileySans-Oblique.ttf.zip SmileySans-Oblique.ttf -d /tmp
    curl -L -o /tmp/noto-sc-400.css https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-sc@5/400.css
    rm -f public/fonts/smiley/*.woff2
    /tmp/ft/bin/python scripts/split-smiley.py /tmp/SmileySans-Oblique.ttf /tmp/noto-sc-400.css public/fonts/smiley src/i18n.ts
    mv public/fonts/smiley/smiley-sans.css src/styles/smiley-sans.css

The second argument is only a table: the unicode ranges Noto Sans SC is served in, which group characters by frequency.
"""
import re, sys, os, hashlib
from fontTools.ttLib import TTFont
from fontTools import subset

src, table, outdir = sys.argv[1], sys.argv[2], sys.argv[3]
cmap = set(TTFont(src).getBestCmap().keys())
css = open(table).read()
groups = []
for m in re.finditer(r'/\* noto-sans-sc-\[?([\w-]+)\]?-400-normal \*/.*?unicode-range:\s*([^;]+);', css, flags=re.S):
    name, rng = m.group(1), m.group(2)
    cps = set()
    for part in rng.split(','):
        part = part.strip().upper().replace('U+', '')
        if '-' in part:
            a, b = part.split('-'); cps.update(range(int(a, 16), int(b, 16) + 1))
        elif '?' in part:
            cps.update(range(int(part.replace('?', '0'), 16), int(part.replace('?', 'F'), 16) + 1))
        else:
            cps.add(int(part, 16))
    groups.append((name, cps))
covered = set()
slices = []
for name, cps in groups:
    have = sorted((cps & cmap) - covered)
    covered.update(have)
    if have: slices.append((name, have))
rest = sorted(cmap - covered)          # 得意黑有、分片表里没有的字，单独一片
if rest: slices.append(('rest', rest))

def ranges(cps):
    out, start, prev = [], cps[0], cps[0]
    for c in cps[1:] + [None]:
        if c is not None and c == prev + 1: prev = c; continue
        out.append(f'U+{start:x}' if start == prev else f'U+{start:x}-{prev:x}')
        if c is not None: start = prev = c
    return ','.join(out)

rules, total = [], 0
for name, cps in slices:
    opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['*']; opts.name_IDs = [1, 2]; opts.notdef_outline = True
    font = subset.load_font(src, opts)
    s = subset.Subsetter(opts); s.populate(unicodes=cps); s.subset(font)
    tmp = os.path.join(outdir, 'tmp.woff2'); subset.save_font(font, tmp, opts)
    data = open(tmp, 'rb').read(); os.remove(tmp)
    fn = f'smiley-sans-{hashlib.sha1(data).hexdigest()[:8]}.woff2'
    open(os.path.join(outdir, fn), 'wb').write(data); total += len(data)
    rules.append((name, len(cps), len(data), fn, ranges(cps)))
with open(os.path.join(outdir, 'smiley-sans.css'), 'w') as f:
    f.write("/* Smiley Sans (得意黑), SIL OFL 1.1, cut into slices by how often characters are used: a page fetches only the\n   slices that hold characters its headings use. The grouping is the one Noto Sans SC is served with. Generated: to\n   rebuild, see the note beside the fonts. */\n")
    for name, n, size, fn, rng in rules:
        f.write(f"@font-face {{ font-family: 'Smiley Sans'; src: url('/fonts/smiley/{fn}') format('woff2'); font-display: swap; unicode-range: {rng}; }}\n")
print('slices', len(rules), 'chars', len(covered | set(rest)), 'of', len(cmap), 'total bytes', total)
sizes = sorted(r[2] for r in rules)
print('slice size min/median/max', sizes[0], sizes[len(sizes)//2], sizes[-1])

# 「核心片」：站点界面文案（src/i18n.ts）里出现的字单独放一片，写在样式表最后面。浏览器对同一个字取最后声明的
# 那一片，所以界面上的固定标题只需要这一个文件；只有文章标题这类动态内容才会去取上面按字频切的片。
if len(sys.argv) > 4:
    text = open(sys.argv[4], encoding='utf-8').read()
    core = sorted({ord(ch) for ch in text if ord(ch) in cmap and (0x20 <= ord(ch) < 0x7f or ord(ch) >= 0x2000)})
    opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = ['*']; opts.name_IDs = [1, 2]; opts.notdef_outline = True
    font = subset.load_font(src, opts)
    s = subset.Subsetter(opts); s.populate(unicodes=core); s.subset(font)
    tmp = os.path.join(outdir, 'tmp.woff2'); subset.save_font(font, tmp, opts)
    data = open(tmp, 'rb').read(); os.remove(tmp)
    fn = 'smiley-sans-core.woff2'
    open(os.path.join(outdir, fn), 'wb').write(data)
    with open(os.path.join(outdir, 'smiley-sans.css'), 'a') as f:
        f.write("/* the characters of the site's own interface text (src/i18n.ts), declared last so they win: one small file\n   covers every fixed heading */\n")
        f.write(f"@font-face {{ font-family: 'Smiley Sans'; src: url('/fonts/smiley/{fn}') format('woff2'); font-display: swap; unicode-range: {ranges(core)}; }}\n")
    print('core chars', len(core), 'bytes', len(data))
