import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import VideoBackground from './VideoBackground';
import Img from './Img';

/** Layout C — full-screen video/photo with text overlay and scroll-linked zoom (100% → 106%). */
export default function CinematicSection({ clip, image, variant = 'orbits', align = 'left', minH = 'min-h-[88svh]', children, label, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : ['-4%', '4%']);
  return (
    <section ref={ref} aria-label={label} className={`on-dark relative isolate flex ${minH} items-center overflow-hidden bg-navy-900 text-white ${className}`}>
      <motion.div style={{ scale, y }} className="absolute inset-0 -z-10">
        {clip ? <VideoBackground video={clip.video} poster={clip.poster} posterMobile={clip.posterMobile} label={label ? `${label} video` : undefined} /> : <Img src={image} variant={variant} className="absolute inset-0 h-full w-full object-cover" />}
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-navy-950/35 to-navy-950/55" aria-hidden="true" />
      <div className={`wrap py-24 ${align === 'center' ? 'text-center' : ''}`}>{children}</div>
    </section>
  );
}
