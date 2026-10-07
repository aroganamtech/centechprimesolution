import { Link } from 'react-router-dom';
import AnimatedText from './AnimatedText';
import ScrollReveal from './ScrollReveal';
import Img from './Img';
import { media } from '../config/media';

/** Inner-page hero: dark cinematic poster backdrop, breadcrumb, large editorial title. */
export default function PageBanner({ title, tagline, crumbs = [], children, image = media.banners.default, variant = 'mesh' }) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-900 pb-16 pt-36 text-white md:pb-24 md:pt-44">
      <Img src={image} alt="" variant={variant} sizes="100vw" loading="eager" fetchPriority="high" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/50 to-navy-950/20" aria-hidden="true" />
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-300"><Link to="/" className="link-u">Home</Link>{crumbs.map(([l, t]) => <span key={l}> / {t ? <Link to={t} className="link-u">{l}</Link> : <span aria-current="page">{l}</span>}</span>)}</nav>
        <AnimatedText as="h1" immediate text={title} className="t-display mt-5 max-w-[18ch] !text-[clamp(2.3rem,1.2rem+4.6vw,5.2rem)]" delay={0.1} />
        {tagline && <ScrollReveal delay={0.3}><p className="t-lead mt-6 max-w-2xl text-slate-300">{tagline}</p></ScrollReveal>}
        {children}
      </div>
    </section>
  );
}
