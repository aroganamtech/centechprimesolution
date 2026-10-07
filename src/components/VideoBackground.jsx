import { useEffect, useRef, useState } from 'react';

const prefersReduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const constrained = () => {
  const c = typeof navigator !== 'undefined' && (navigator.connection || navigator.mozConnection);
  return !!c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''));
};
const isMobile = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;

/**
 * Autoplaying muted looping background video with a guaranteed poster fallback.
 *  - Poster is always rendered first; the video fades in only once it is actually playing.
 *  - No video request is made when: video is null, reduced-motion, data-saver / 2g, or (lazy) section not near viewport.
 *  - If play() is rejected, the file errors, or it stalls, the poster simply stays — never an empty box.
 *  - Mobile gets the smaller source. Offscreen videos are paused to save CPU/battery.
 *  - Pause/Play control (WCAG 2.2.2) is rendered when `control` is true. Audio is never enabled.
 */
export default function VideoBackground({ video, poster, posterMobile, eager = false, enabled = true, hold = false, control = true, controlClass = '', className = '', label = 'background video' }) {
  const wrap = useRef(null);
  const ref = useRef(null);
  const [near, setNear] = useState(eager);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const holdRef = useRef(hold); holdRef.current = hold;
  const [started, setStarted] = useState(false); // reduced-motion users can opt in via the Play button
  const reduced = prefersReduced();
  const blocked = !video || (reduced && !started) || constrained() || failed;
  const [mobile] = useState(isMobile);

  // Lazy: start loading only when near the viewport. Pause when offscreen.
  useEffect(() => {
    const el = wrap.current;
    if (!el || !('IntersectionObserver' in window)) { setNear(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setNear(true);
      const v = ref.current;
      if (v && !blocked) { if (e.isIntersecting && !userPaused && !holdRef.current) v.play().catch(() => {}); else if (!e.isIntersecting) v.pause(); }
    }, { rootMargin: '300px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [blocked, userPaused]);

  // Kick off playback (muted must be set as a property for iOS/Safari autoplay).
  useEffect(() => {
    const v = ref.current;
    if (!v || blocked || !near || !enabled) return;
    v.muted = true; v.defaultMuted = true;
    if (holdRef.current) return;
    const p = v.play();
    if (p && p.catch) p.catch(() => setFailed(true)); // autoplay blocked => keep poster
  }, [near, blocked, enabled]);

  // Carousel support: pause while the slide is not showing (or the carousel is paused), resume when it is.
  useEffect(() => {
    const v = ref.current;
    if (!v || blocked) return;
    if (hold) v.pause(); else if (!userPaused) v.play().catch(() => {});
  }, [hold]);

  const toggle = () => {
    const v = ref.current;
    if (!video) return;
    if (reduced) { setStarted(true); setNear(true); }
    if (userPaused || !playing) { setUserPaused(false); setFailed(false); v?.play().catch(() => setFailed(true)); }
    else { setUserPaused(true); v?.pause(); }
  };

  const src = (webm, mp4) => [webm && <source key="w" src={webm} type="video/webm" />, mp4 && <source key="m" src={mp4} type="video/mp4" />];

  return (
    <div ref={wrap} className={`absolute inset-0 overflow-hidden bg-navy-900 ${className}`}>
      <picture>
        {posterMobile && <source media="(max-width: 767px)" srcSet={posterMobile} />}
        <img src={poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" fetchPriority={eager ? 'high' : 'auto'} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      </picture>
      {video && near && enabled && !failed && !(reduced && !started) && !constrained() && (
        <video ref={ref} key={mobile ? 'm' : 'd'} autoPlay={!hold} muted loop playsInline preload={eager ? 'auto' : 'metadata'} poster={mobile && posterMobile ? posterMobile : poster} aria-hidden="true" tabIndex={-1}
          onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} onStalled={() => !playing && setPlaying(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-0'}`}>
          {mobile ? src(video.mobileWebm, video.mobileMp4) : src(video.webm, video.mp4)}
        </video>
      )}
      {control && video && !failed && !constrained() && (
        <button type="button" onClick={toggle} aria-pressed={!playing} aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className={`on-dark absolute z-20 flex h-11 items-center gap-2 border border-white/30 bg-navy-950/40 px-4 font-display text-xs font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-navy ${controlClass || 'bottom-6 right-[var(--gutter)]'}`}>
          <span aria-hidden="true" className="flex gap-[3px]">{playing ? <><i className="h-3 w-[3px] bg-current" /><i className="h-3 w-[3px] bg-current" /></> : <i className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" />}</span>
          {playing ? 'Pause' : 'Play'}
        </button>
      )}
    </div>
  );
}
