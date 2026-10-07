// Fills every slot in scripts/media-manifest.json with licensed media, from (in priority order):
//   1. your own files in  media-source/<slot>.(mp4|jpg|...)
//   2. scripts/media-curated.json: hand-picked Pexels assets with direct links - NO API KEY NEEDED (default)
//   3. Pexels   (set PEXELS_API_KEY)   - https://www.pexels.com/api/
//   4. Pixabay  (set PIXABAY_API_KEY)  - https://pixabay.com/api/docs/   (free key, shown once you are logged in)
// Run:  npm run media          (add  -- --force  to re-pick everything)
// Output: public/media/{videos,photos}/...  src/config/media.generated.json  MEDIA-CREDITS.md
// The website reads media.generated.json automatically; a failed slot simply keeps its fallback.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, statSync, copyFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = join(root, 'public', 'media'), vDir = join(pub, 'videos'), pDir = join(pub, 'photos');
const srcDir = join(root, 'media-source');
const genFile = join(root, 'src', 'config', 'media.generated.json');
const FORCE = process.argv.includes('--force');
const PLACEHOLDER_KEY = /^(MY_KEY|YOUR_KEY|xxxx?|your[-_ ]?key.*|paste.*)$/i;
const clean = (k) => (k && !PLACEHOLDER_KEY.test(k.trim()) ? k.trim() : null);
const PEXELS_KEY = clean(process.env.PEXELS_API_KEY), PIXABAY_KEY = clean(process.env.PIXABAY_API_KEY);
if ((process.env.PEXELS_API_KEY && !PEXELS_KEY) || (process.env.PIXABAY_API_KEY && !PIXABAY_KEY)) console.warn('An API key is still placeholder text - ignoring it.');
mkdirSync(vDir, { recursive: true }); mkdirSync(pDir, { recursive: true }); mkdirSync(srcDir, { recursive: true });

const manifest = JSON.parse(readFileSync(process.env.MEDIA_MANIFEST || join(root, 'scripts', 'media-manifest.json'), 'utf8'));
let curated = { photos: {}, videos: {} };
try { curated = { ...curated, ...JSON.parse(readFileSync(process.env.MEDIA_CURATED || join(root, 'scripts', 'media-curated.json'), 'utf8')) }; } catch {}
let gen = { photos: {}, videos: {} };
try { gen = { photos: {}, videos: {}, ...JSON.parse(readFileSync(genFile, 'utf8')) }; } catch {}
gen.meta ||= { credits: {} }; gen.meta.credits ||= {};
const credits = gen.meta.credits;
const used = new Set(Object.values(credits).map((c) => `${c.provider}:${c.kind}:${c.id}`));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJson = async (url, headers = {}) => {
  for (let i = 0; i < 3; i++) {
    const r = await fetch(url, { headers });
    if (r.status === 429) { await sleep(5000 * (i + 1)); continue; }
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }
  throw new Error('rate limited');
};
const save = async (url, file) => {
  let last;
  for (let i = 0; i < 3; i++) {
    try { const r = await fetch(url); if (!r.ok) throw new Error(`download HTTP ${r.status}`); writeFileSync(file, Buffer.from(await r.arrayBuffer())); return; }
    catch (e) { last = e; await sleep(1500 * (i + 1)); }
  }
  throw last;
};
const hasFfmpeg = (() => { try { execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' }); return true; } catch { return false; } })();
const ff = (...a) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-nostdin', ...a]);
const tryFf = (...a) => { try { ff(...a); return true; } catch { return false; } };
const ok = (f) => existsSync(f) && statSync(f).size > 0;
const web = (f) => '/' + f.slice(join(root, 'public').length + 1).replaceAll('\\', '/');
const STOP = new Set(['and', 'the', 'of', 'a', 'in', 'on', 'with', 'for', 'to']);
const words = (s) => String(s || '').toLowerCase().split(/[^a-z0-9]+/).filter((w) => w && !STOP.has(w));
const score = (query, text) => { const q = words(query); const t = new Set(words(text)); return q.length ? q.filter((w) => t.has(w) || [...t].some((x) => x.startsWith(w.slice(0, 5)))).length / q.length : 0; };

// ---------- providers: each returns normalised candidates ----------
const pexels = PEXELS_KEY && {
  name: 'Pexels', license: 'Pexels License (https://www.pexels.com/license/)', delay: 250,
  api: (p) => getJson((process.env.PEXELS_API_BASE || 'https://api.pexels.com') + p, { Authorization: PEXELS_KEY }),
  async check() { await this.api('/v1/search?query=technology&per_page=1'); },
  photo: (p) => ({ id: p.id, page: p.url, alt: `${p.alt || ''} ${p.url}`, width: p.width, height: p.height, creator: p.photographer, creatorUrl: p.photographer_url, url: p.src.large2x || p.src.large || p.src.original }),
  video: (v) => ({ id: v.id, page: v.url, alt: v.url, width: v.width, height: v.height, duration: v.duration, creator: v.user?.name, creatorUrl: v.user?.url, poster: v.image, files: (v.video_files || []).filter((f) => f.file_type === 'video/mp4' && f.width).map((f) => ({ width: f.width, link: f.link })) }),
  async getPhoto(id) { return this.photo(await this.api(`/v1/photos/${id}`)); },
  async getVideo(id) { return this.video(await this.api(`/videos/videos/${id}`)); },
  async photos(q) { return ((await this.api(`/v1/search?query=${encodeURIComponent(q)}&orientation=landscape&size=large&per_page=30`)).photos || []).map(this.photo); },
  async videos(q) { return ((await this.api(`/videos/search?query=${encodeURIComponent(q)}&orientation=landscape&size=medium&per_page=30`)).videos || []).map(this.video); },
};
const pixabay = PIXABAY_KEY && {
  name: 'Pixabay', license: 'Pixabay Content License (https://pixabay.com/service/license-summary/)', delay: 800,
  api: (p) => getJson(`${process.env.PIXABAY_API_BASE || 'https://pixabay.com'}${p}${p.includes('?') ? '&' : '?'}key=${PIXABAY_KEY}`),
  async check() { await this.api('/api/?q=technology&per_page=3'); },
  photo: (h) => ({ id: h.id, page: h.pageURL, alt: h.tags, width: h.imageWidth, height: h.imageHeight, creator: h.user, creatorUrl: `https://pixabay.com/users/${h.user}-${h.user_id}/`, url: h.fullHDURL || h.largeImageURL }),
  video: (h) => { const r = h.videos || {}; const files = ['large', 'medium', 'small', 'tiny'].map((k) => r[k]).filter((f) => f?.url && f.width); const best = files[0] || {}; return { id: h.id, page: h.pageURL, alt: h.tags, width: best.width || 0, height: best.height || 1, duration: h.duration, creator: h.user, creatorUrl: `https://pixabay.com/users/${h.user}-${h.user_id}/`, poster: (r.large?.thumbnail || r.medium?.thumbnail || null), files: files.map((f) => ({ width: f.width, link: f.url })) }; },
  async getPhoto(id) { const r = await this.api(`/api/?id=${id}`); if (!r.hits?.[0]) throw new Error('not found'); return this.photo(r.hits[0]); },
  async getVideo(id) { const r = await this.api(`/api/videos/?id=${id}`); if (!r.hits?.[0]) throw new Error('not found'); return this.video(r.hits[0]); },
  async photos(q) { return ((await this.api(`/api/?q=${encodeURIComponent(q.slice(0, 100))}&image_type=photo&orientation=horizontal&min_width=1900&safesearch=true&per_page=50`)).hits || []).map(this.photo); },
  async videos(q) { return ((await this.api(`/api/videos/?q=${encodeURIComponent(q.slice(0, 100))}&video_type=film&safesearch=true&per_page=50`)).hits || []).map(this.video); },
};
// Pinned pexelsId only applies to Pexels. Use Pexels first when both keys exist.
const providers = [pexels, pixabay].filter(Boolean);

// ---------- local files ----------
const VEXT = ['.mp4', '.mov', '.webm', '.m4v'], PEXT = ['.jpg', '.jpeg', '.png', '.webp'];
const findLocal = (name, exts) => { for (const e of exts) for (const c of [e, e.toUpperCase()]) { const f = join(srcDir, name + c); if (existsSync(f)) return f; } return null; };
const localCredit = (name) => { try { const [creator, page, lic] = readFileSync(join(srcDir, `${name}.credit.txt`), 'utf8').split('|').map((s) => s.trim()); return { creator: creator || 'Provided by site owner', page: page || '(local file)', license: lic || 'Supplied by site owner - confirm licence' }; } catch { return { creator: 'Provided by site owner', page: '(local file)', license: 'Supplied by site owner - confirm licence' }; } };

// ---------- pick ----------
async function pick(kind, spec, prov) {
  const get = kind === 'photos' ? 'getPhoto' : 'getVideo';
  if (spec.pexelsId && prov.name === 'Pexels') { try { return { ...(await prov[get](spec.pexelsId)), _q: `pinned id ${spec.pexelsId}` }; } catch (e) { console.warn(`  pinned ${spec.pexelsId} unavailable (${e.message}); searching instead`); } }
  for (const q of [spec.query, spec.fallbackQuery].filter(Boolean)) {
    const list = await prov[kind](q);
    const good = list.filter((c) => !used.has(`${prov.name}:${kind === 'photos' ? 'photo' : 'video'}:${c.id}`) && (kind === 'photos'
      ? c.width >= 1900 && c.width / c.height >= 1.3 && c.width / c.height <= 2.2
      : c.width >= c.height * 1.5 && c.duration >= 6 && c.duration <= 60 && c.files.some((f) => f.width >= 1280)))
      .map((c) => ({ c, s: score(q, c.alt) * 3 + (kind === 'photos' ? (c.width >= 3000 ? 0.3 : 0) : (c.duration >= 8 && c.duration <= 25 ? 0.4 : 0)) })).sort((a, b) => b.s - a.s);
    if (good.length) return { ...good[0].c, _q: q };
  }
  return null;
}

// ---------- processing (shared by API + local) ----------
function processPhoto(name, raw, ext, meta) {
  const base = join(pDir, name);
  const entry = { width: 1600, alt: '', sources: [] };
  if (hasFfmpeg) {
    const rs = (w, e, ...enc) => { const f = `${base}-${w}.${e}`; return tryFf('-i', raw, '-vf', `scale='min(${w},iw)':-2`, '-frames:v', '1', ...enc, f) && ok(f) ? f : null; };
    const sizes = [800, 1600];
    const avif = sizes.map((w) => [w, rs(w, 'avif', '-c:v', 'libaom-av1', '-crf', '34', '-cpu-used', '8', '-still-picture', '1')]).filter(([, f]) => f);
    const webp = sizes.map((w) => [w, rs(w, 'webp', '-c:v', 'libwebp', '-quality', '78')]).filter(([, f]) => f);
    const jpg = rs(1600, 'jpg', '-q:v', '4');
    if (avif.length === 2) entry.sources.push({ type: 'image/avif', srcSet: avif.map(([w, f]) => `${web(f)} ${w}w`).join(', ') });
    if (webp.length === 2) entry.sources.push({ type: 'image/webp', srcSet: webp.map(([w, f]) => `${web(f)} ${w}w`).join(', ') });
    if (jpg) entry.src = web(jpg);
  }
  if (!entry.src) { const f = `${base}${ext}`; copyFileSync(raw, f); entry.src = web(f); }
  rmSync(raw, { force: true });
  gen.photos[name] = entry;
  credits[name] = { ...meta, kind: 'photo', type: 'photo', files: [entry.src, ...entry.sources.flatMap((s) => s.srcSet.split(', ').map((x) => x.split(' ')[0]))].join(', ') };
}

function processVideo(name, hd, sd, posterRaw, meta) {
  const base = join(vDir, name), e = { video: {}, poster: null, posterMobile: null };
  if (hasFfmpeg) {
    const T = ['-t', '12', '-an', '-sn'];
    const enc264 = (w, k, out) => tryFf('-i', hd, ...T, '-vf', `scale='min(${w},iw)':-2,fps=30`, '-c:v', 'libx264', '-preset', 'medium', '-crf', '28', '-maxrate', `${k}k`, '-bufsize', `${k * 2}k`, '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out) && ok(out);
    const encVp9 = (w, k, out) => tryFf('-i', hd, ...T, '-vf', `scale='min(${w},iw)':-2,fps=30`, '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', `${k}k`, '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4', out) && ok(out);
    if (enc264(1920, 2000, `${base}.mp4`)) e.video.mp4 = web(`${base}.mp4`);
    if (encVp9(1920, 1800, `${base}.webm`)) e.video.webm = web(`${base}.webm`);
    if (enc264(720, 900, `${base}-mobile.mp4`)) e.video.mobileMp4 = web(`${base}-mobile.mp4`);
    if (encVp9(720, 800, `${base}-mobile.webm`)) e.video.mobileWebm = web(`${base}-mobile.webm`);
    const pSrcs = [['-ss', '1', '-i', hd], ...(posterRaw && ok(posterRaw) ? [['-i', posterRaw]] : [])];
    const pSrc = pSrcs.find((a) => tryFf(...a, '-frames:v', '1', '-vf', "scale='min(1920,iw)':-2", '-q:v', '6', `${base}-poster.jpg`)) || null;
    if (pSrc && ok(`${base}-poster.jpg`)) e.poster = web(`${base}-poster.jpg`);
    if (pSrc && tryFf(...pSrc, '-frames:v', '1', '-vf', 'scale=720:-2', '-q:v', '6', `${base}-poster-mobile.jpg`)) e.posterMobile = web(`${base}-poster-mobile.jpg`);
  }
  if (!e.video.mp4) { // no ffmpeg / encode failed: keep original files
    const ext = extname(hd) || '.mp4';
    copyFileSync(hd, `${base}${ext}`); e.video[ext === '.webm' ? 'webm' : 'mp4'] = web(`${base}${ext}`);
    if (sd && sd !== hd) { copyFileSync(sd, `${base}-mobile${ext}`); e.video[ext === '.webm' ? 'mobileWebm' : 'mobileMp4'] = web(`${base}-mobile${ext}`); }
  }
  if (!e.poster && posterRaw && ok(posterRaw)) { copyFileSync(posterRaw, `${base}-poster.jpg`); e.poster = web(`${base}-poster.jpg`); }
  if (!e.poster) { e.poster = '/media/hero-poster.jpg'; console.warn(`  (no poster for ${name}: install ffmpeg to extract one; using the placeholder poster)`); }
  e.posterMobile ||= e.poster;
  e.video.mobileMp4 ||= e.video.mp4; if (!e.video.mp4 && e.video.webm) e.video.mp4 = undefined;
  for (const f of [hd, sd, posterRaw]) if (f && f.includes('.src')) rmSync(f, { force: true });
  gen.videos[name] = e;
  credits[name] = { ...meta, kind: 'video', type: 'video', files: [...Object.values(e.video), e.poster].filter(Boolean).join(', ') };
}

async function fromApi(kind, name, spec) {
  let lastErr = null;
  for (const prov of providers) {
    try {
      const c = await pick(kind, spec, prov);
      if (!c) { lastErr = new Error(`no suitable ${prov.name} result`); continue; }
      const meta = { provider: prov.name, id: c.id, page: c.page, creator: c.creator, creatorUrl: c.creatorUrl, query: c._q, license: prov.license };
      if (kind === 'photos') {
        const raw = join(pDir, `${name}.src.jpg`); await save(c.url, raw); processPhoto(name, raw, '.jpg', meta);
      } else {
        const fs = c.files.filter((f) => f.width <= 1920).sort((a, b) => b.width - a.width);
        const hdF = fs.find((f) => f.width >= 1280) || fs[0]; if (!hdF) throw new Error('no usable rendition');
        const sdF = [...fs].reverse().find((f) => f.width >= 540) || hdF;
        const hd = join(vDir, `${name}.src.mp4`); await save(hdF.link, hd);
        let sd = hd; if (!hasFfmpeg && sdF.link !== hdF.link) { sd = join(vDir, `${name}-mobile.src.mp4`); await save(sdF.link, sd); }
        let poster = null; if (c.poster) { poster = join(vDir, `${name}-poster.src.jpg`); await save(c.poster, poster).catch(() => { poster = null; }); }
        processVideo(name, hd, sd, poster, meta);
      }
      used.add(`${prov.name}:${kind === 'photos' ? 'photo' : 'video'}:${c.id}`);
      return `${prov.name}: ${c.page}`;
    } catch (e) { lastErr = e; }
  }
  throw lastErr || new Error('no provider');
}

async function fromCurated(kind, name, c) {
  const meta = { provider: c.provider || 'Pexels', id: c.id, page: c.page, creator: c.creator, creatorUrl: c.creatorUrl, query: `hand-picked: ${c.desc || ''}`.trim(), license: 'Pexels License (https://www.pexels.com/license/)' };
  if (kind === 'photos') { const raw = join(pDir, `${name}.src.jpg`); await save(c.url, raw); processPhoto(name, raw, '.jpg', meta); }
  else {
    // Without ffmpeg we cannot shrink anything, so use the lighter 960p file everywhere except the hero.
    const hdLink = hasFfmpeg || name === 'hero' ? c.hd : (c.sd || c.hd);
    const hd = join(vDir, `${name}.src.mp4`); await save(hdLink, hd);
    let sd = hd; if (!hasFfmpeg && c.sd && c.sd !== hdLink) { sd = join(vDir, `${name}-mobile.src.mp4`); await save(c.sd, sd); }
    let poster = null; if (c.poster) { poster = join(vDir, `${name}-poster.src.jpg`); await save(c.poster, poster).catch(() => { poster = null; }); }
    processVideo(name, hd, sd, poster, meta);
  }
  return `Pexels (hand-picked): ${c.page}`;
}

function fromLocal(kind, name, file) {
  const meta = { provider: 'Local file', id: name, ...localCredit(name), query: '(supplied file)' };
  if (kind === 'photos') { const raw = join(pDir, `${name}.src${extname(file)}`); copyFileSync(file, raw); processPhoto(name, raw, extname(file).toLowerCase(), meta); }
  else processVideo(name, file, null, null, meta); // original left untouched in media-source
  return `local ${file}`;
}

const have = (kind, name) => {
  const e = gen[kind][name]; if (!e || FORCE) return false;
  const files = kind === 'photos' ? [e.src] : [e.video?.mp4 || e.video?.webm, e.poster];
  return files.every((f) => f && (f.startsWith('/media/hero') || ok(join(root, 'public', f))));
};

// ---------- main ----------
const localFiles = readdirSync(srcDir).filter((f) => !/^readme|\.credit\.txt$/i.test(f));
if (!providers.length && !localFiles.length && !Object.keys(curated.videos).length && !Object.keys(curated.photos).length) {
  console.error(`No media source available. Pick one:
  A) Pexels key  (new keys are sometimes paused)  https://www.pexels.com/api/   ->  $env:PEXELS_API_KEY="..."
  B) Pixabay key (free, instant after login)      https://pixabay.com/api/docs/ ->  $env:PIXABAY_API_KEY="..."
  C) No key: put your own files in media-source/ (see media-source/README.md)
Then run: npm run media`);
  process.exit(1);
}
for (const p of [...providers]) {
  try { await p.check(); console.log(`${p.name}: key OK`); }
  catch (e) { console.error(`${p.name}: ${/40[0-3]/.test(e.message) ? 'API key rejected (' + e.message + ') - copy it again exactly from the provider page' : 'cannot reach API: ' + e.message}`); providers.splice(providers.indexOf(p), 1); }
}
console.log(hasFfmpeg ? 'ffmpeg found: optimized formats will be generated.' : 'ffmpeg not found: originals will be used. Optional: winget install Gyan.FFmpeg, then reopen PowerShell.');

if (FORCE) { gen.photos = {}; gen.videos = {}; for (const k of Object.keys(credits)) delete credits[k]; used.clear(); }
const summary = { ok: [], failed: [], reused: [] };
for (const kind of ['videos', 'photos']) {
  for (const [name, spec] of Object.entries(manifest[kind])) {
    const local = findLocal(name, kind === 'videos' ? VEXT : PEXT);
    const localDone = credits[name]?.provider === 'Local file';
    if (have(kind, name) && (!local || localDone)) { summary.reused.push(name); continue; }
    try {
      const cur = curated[kind]?.[name];
      const u = local ? fromLocal(kind, name, local) : cur ? await fromCurated(kind, name, cur) : (providers.length ? await fromApi(kind, name, spec) : (() => { throw new Error('no provider and no local file'); })());
      summary.ok.push(name); console.log(`  ok   ${kind}/${name}  ${u}`);
      if (!local && !cur) await sleep(Math.max(...providers.map((p) => p.delay), 0));
    } catch (err) { summary.failed.push(name); delete gen[kind][name]; console.warn(`  FAIL ${kind}/${name}: ${err.message}  (fallback kept)`); }
    writeFileSync(genFile, JSON.stringify(gen, null, 2));
  }
}
writeFileSync(genFile, JSON.stringify(gen, null, 2));

const rows = Object.entries(credits).filter(([n, c]) => gen[c.kind === 'video' ? 'videos' : 'photos'][n]).sort(([, a], [, b]) => a.kind.localeCompare(b.kind));
const cell = (s) => String(s ?? '').replaceAll('|', '/');
writeFileSync(join(root, 'MEDIA-CREDITS.md'), ['# Media credits', '',
  'All photography and video on this site comes from third-party sources (Pexels, Pixabay, or files supplied by the site owner) and is **not CenTech Prime Solution\'s own work** unless the row says it was supplied by the site owner.',
  'Pexels and Pixabay licences allow free commercial use without attribution (credited here as courtesy). Do not sell unaltered copies, use as a trademark/logo, or imply endorsement by the people shown.',
  'Imagery is illustrative; it does not imply CenTech is based in, or affiliated with, any particular country.', '',
  '| Slot | Media type | Files (public/) | Source page | Creator | Provider | Search query | Licence |', '|---|---|---|---|---|---|---|---|',
  ...rows.map(([n, c]) => `| ${n} | ${c.type} | ${cell(c.files)} | ${cell(c.page)} | ${c.creatorUrl ? `[${cell(c.creator)}](${c.creatorUrl})` : cell(c.creator)} | ${cell(c.provider)} | ${cell(c.query)} | ${cell(c.license)} |`), ''].join('\n'));
console.log(`\nDone. downloaded ${summary.ok.length}, reused ${summary.reused.length}, failed ${summary.failed.length}${summary.failed.length ? ' (' + summary.failed.join(', ') + ')' : ''}.`);
console.log('Vite hot-reloads media.generated.json. Review MEDIA-CREDITS.md and open each source page to confirm the picks.');
