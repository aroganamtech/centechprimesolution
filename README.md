# CenTech Prime Solutions — React clone of centechprimesolution.com

Vite 6 · React 19 · React Router · Tailwind 3 (works on Node 20.18+)

    npm install
    npm run dev

Routes mirror the live WordPress URLs: `/`, `/about-4`, `/services`, `/service/:slug` (11 pages), `/solutions`,
`/blog`, `/:post-slug`, `/project/:slug`, `/contact-2`.

- Content & data: `src/data/site.js`
- Images are hot-linked from the original site's media library (with graceful fallbacks). Download them into `public/images` to self-host.
- Forms: no backend. Set `VITE_CONTACT_ENDPOINT` to POST JSON to your API; otherwise the form validates and opens the visitor's email app (mailto).

## Visual upgrade (Phase 2–3)
- Media is centralised in `src/config/media.js` — swap videos/photos there. **The /public/media clips are generated placeholders**, not final footage.
- Video: `VideoBackground` (autoplay, muted, loop, playsInline, poster-first, lazy below the fold, reduced-motion / data-saver aware, pause control).
- Motion: `src/utils/motion.js`, `AnimatedText`, `ScrollReveal`, `ParallaxMedia`, `CinematicSection`, `HeroVideo`.

## Real photography & video
Hand-picked Pexels photos and videos (one per section) are listed in `scripts/media-curated.json`. **No API key needed:**
```powershell
npm run media
```
(optional but recommended: `winget install Gyan.FFmpeg` first, for WebM/AVIF/WebP, mobile cuts and posters.)

This downloads the files into `public/media/{videos,photos}`, writes `src/config/media.generated.json` (read automatically by `src/config/media.js`) and `MEDIA-CREDITS.md`. Swap anything by:
- dropping your own file into `media-source/<slot>.mp4|jpg` (wins over everything), or
- editing/removing an entry in `scripts/media-curated.json` (removed entries fall back to `scripts/media-manifest.json` queries, which need `PEXELS_API_KEY` or `PIXABAY_API_KEY`).
Add `-- --force` to re-download everything.
