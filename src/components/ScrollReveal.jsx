import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewport } from '../utils/motion';
export default function ScrollReveal({ children, variants = fadeUp, delay = 0, as = 'div', className = '', stagger, ...rest }) {
  const Tag = motion[as] || motion.div;
  return <Tag className={className} variants={stagger ? staggerContainer(stagger, delay) : variants} initial="hidden" whileInView="show" viewport={viewport} transition={!stagger && delay ? { delay } : undefined} {...rest}>{children}</Tag>;
}
ScrollReveal.Item = function Item({ children, variants = fadeUp, as = 'div', className = '', ...rest }) {
  const Tag = motion[as] || motion.div;
  return <Tag className={className} variants={variants} {...rest}>{children}</Tag>;
};
