import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Img from './Img';
import { imageReveal, viewport } from '../utils/motion';

/** Photo with clip-path reveal + subtle parallax + hover zoom. Falls back to a generated visual. */
export default function ParallaxMedia({ src, alt = '', variant = 'network', seed, aspect = 'aspect-[4/3]', parallax = 28, className = '', priority = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-parallax, parallax]);
  return (
    <motion.div ref={ref} variants={imageReveal} initial="hidden" whileInView="show" viewport={viewport} className={`group relative overflow-hidden bg-navy-900 ${aspect} ${className}`}>
      <motion.div style={{ y, scale: 1.14 }} className="absolute inset-0 transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.04]">
        <Img src={src} alt={alt} variant={variant} seed={seed} className="h-full w-full object-cover" loading={priority ? 'eager' : 'lazy'} />
      </motion.div>
    </motion.div>
  );
}
