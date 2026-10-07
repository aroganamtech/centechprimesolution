import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import AnimatedText from './AnimatedText';
import { Button } from './Button';
import { media } from '../config/media';
import { EASE } from '../utils/motion';

/**
 * Cinematic hero. Timeline (ms): 0 media fades in · 500 nav · 1000 eyebrow · 1500 headline lines · 2200 description · 2700 CTAs.
 * Existing CenTech hero copy is preserved verbatim.
 */
const SLIDE_MS = 9000;

/** Rotating multi-video hero (Slalom-style): crossfades through the clips in media.heroSlides, with progress bars and a pause control. */
function useHeroSlides() {
  const slides = media.heroSlides;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seen, setSeen] = useState(() => new Set([0]));
  const [cycle, setCycle] = useState(0); // restarts the timer/progress bar on manual change
  const stopped = paused || reduce;

  const go = (i) => { setActive(i); setCycle((c) => c + 1); };
  useEffect(() => { setSeen((s) => (s.has(active) ? s : new Set(s).add(active))); }, [active]);
  useEffect(() => {
    if (stopped) return undefined;
    const t = setTimeout(() => go((active + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active, cycle, stopped, slides.length]);
  // Pause the rotation while the tab is hidden.
  useEffect(() => {
    const onVis = () => document.hidden && setCycle((c) => c + 1);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const next = (active + 1) % slides.length;
  const background = (
      <div className="absolute inset-0">
        {slides.map((sl, i) => (
          <div key={sl.label} aria-hidden={i !== active} className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${i === active ? 'z-[1] opacity-100' : 'opacity-0'}`}>
            <VideoBackground eager={i === 0} enabled={seen.has(i) || i === next} hold={i !== active || stopped} control={false}
              video={sl.clip.video} poster={sl.clip.poster} posterMobile={sl.clip.posterMobile} label={`${sl.label} video`} />
          </div>
        ))}
      </div>
  );
  const controls = (
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 md:bottom-8">
        <div className="wrap flex items-end justify-end">
          <div className="pointer-events-auto flex flex-col items-end gap-3">
            <div className="hidden text-right font-display text-[.7rem] font-semibold uppercase tracking-[.2em] text-white/80 sm:block" aria-live="polite">
              <AnimatePresence mode="wait"><motion.span key={active} className="inline-block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35 }}>
                {String(active + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} &nbsp;·&nbsp; {slides[active].label}
              </motion.span></AnimatePresence>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2" role="group" aria-label="Choose hero video">
                {slides.map((sl, i) => (
                  <button key={sl.label} type="button" onClick={() => go(i)} aria-label={`Show video ${i + 1}: ${sl.label}`} aria-current={i === active} className="group flex h-11 w-10 items-center sm:w-14">
                    <span className="relative block h-[3px] w-full overflow-hidden bg-white/30 transition-[height] group-hover:h-[5px]">
                      <span key={`${i}-${i === active ? cycle : 0}`} className="absolute inset-y-0 left-0 block bg-white"
                        style={i < active ? { width: '100%' } : i === active ? { width: stopped ? '100%' : undefined, animation: stopped ? 'none' : `hero-progress ${SLIDE_MS}ms linear forwards` } : { width: 0 }} />
                    </span>
                  </button>
                ))}
              </div>
              {!reduce && (
                <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} aria-label={paused ? 'Play hero videos' : 'Pause hero videos'}
                  className="flex h-11 w-11 items-center justify-center border border-white/30 bg-navy-950/40 text-white backdrop-blur transition-colors hover:bg-white hover:text-navy">
                  <span aria-hidden="true" className="flex gap-[3px]">{paused ? <i className="ml-0.5 block h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-current" /> : <><i className="h-3 w-[3px] bg-current" /><i className="h-3 w-[3px] bg-current" /></>}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
  );
  return [background, controls];
}

export default function HeroVideo() {
  const [slidesBg, slidesControls] = useHeroSlides();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : 0.15]);
  const up = (delay) => ({ initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } });

  return (
    <section ref={ref} aria-label="Introduction" className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-900 text-white">
      <motion.div style={{ y }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="absolute inset-x-0 -top-[4%] -z-10 h-[108%]">
        {slidesBg}
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/85 via-navy-950/45 to-navy-950/10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden="true" />

      <motion.div style={{ y: textY, opacity: fade }} className="wrap flex flex-1 flex-col justify-center pb-32 pt-36 md:pb-28 md:pt-44">
        <AnimatedText as="h1" immediate delay={1.5} stagger={0.18} lines={['Innovation', 'Transformation', 'Excellence']} className="t-display" />
        <motion.p {...up(2.2)} className="t-lead mt-8 max-w-xl text-slate-200">
          Your trusted partner in technology and business consulting, delivering next-generation solutions to elevate your success.
        </motion.p>
        <motion.p {...up(2.3)} className="mt-3 max-w-xl text-slate-300">Let&rsquo;s build a smarter, more efficient future together. Explore our services today!</motion.p>
        <motion.div {...up(2.7)} className="mt-10 flex flex-wrap gap-4">
          <Button to="/contact-2" variant="primary">Get Started</Button>
          <Button to="/services" variant="ghost">Explore Services</Button>
        </motion.div>
      </motion.div>

      {slidesControls}
      <motion.a href="#intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1, duration: 0.8 }} aria-label="Scroll to content"
        className="absolute bottom-8 left-[var(--gutter)] flex items-center gap-4 font-display text-[.7rem] font-semibold uppercase tracking-[.2em] text-white/75 hover:text-white">
        <span className="relative block h-12 w-px overflow-hidden bg-white/25" aria-hidden="true"><span className="absolute inset-0 bg-white" style={{ animation: 'scroll-cue 2.2s var(--ease) infinite' }} /></span>
        Scroll
      </motion.a>
    </section>
  );
}
