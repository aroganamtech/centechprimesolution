import AnimatedText from './AnimatedText';
import ScrollReveal from './ScrollReveal';
export default function SectionHeading({ eyebrow, title, text, as = 'h2', className = '', size = 'h2', maxW = 'max-w-[20ch]' }) {
  return (
    <div className={className}>
      {eyebrow && <ScrollReveal><p className="eyebrow">{eyebrow}</p></ScrollReveal>}
      <AnimatedText as={as} text={title} className={`${size} mt-5 ${maxW}`} />
      {text && <ScrollReveal delay={0.15}><p className="t-lead mt-6 max-w-2xl text-mute [.on-dark_&]:text-slate-300">{text}</p></ScrollReveal>}
    </div>
  );
}
