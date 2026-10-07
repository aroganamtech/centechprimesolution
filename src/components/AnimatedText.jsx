import { motion } from 'framer-motion';
import { staggerContainer, textReveal, viewport } from '../utils/motion';

/** Masked word reveal. Full text is exposed once via aria-label. `lines` (array) reveals line by line instead. */
export default function AnimatedText({ text, lines, as = 'h2', className = '', delay = 0, immediate = false, accent = [], stagger }) {
  const Tag = motion[as];
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport };
  const units = lines || text.split(' ');
  const full = lines ? lines.join(' ') : text;
  return (
    <Tag className={className} aria-label={full} variants={staggerContainer(stagger ?? (lines ? 0.14 : 0.045), delay)} initial="hidden" {...trigger}>
      {units.map((w, i) => (
        <span key={i} aria-hidden="true" className={`${lines ? 'block' : 'inline-block align-bottom'} overflow-hidden pb-[0.14em] -mb-[0.14em]`}>
          <motion.span variants={textReveal} className={`${lines ? 'block' : 'inline-block'} ${accent.includes(i) ? 'text-brand-glow' : ''}`}>{w}</motion.span>
          {!lines && i < units.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
