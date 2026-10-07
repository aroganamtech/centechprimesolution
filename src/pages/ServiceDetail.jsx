import { Link, useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Accordion from '../components/Accordion';
import ConsultationForm from '../components/ConsultationForm';
import ParallaxMedia from '../components/ParallaxMedia';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedText from '../components/AnimatedText';
import NotFound from './NotFound';
import { Button } from '../components/Button';
import { media } from '../config/media';
import { bySlug, services } from '../data/site';
import useSEO from '../hooks/useSEO';

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = bySlug[slug];
  useSEO(s?.title ?? 'Not found', s?.intro);
  if (!s) return <NotFound />;
  const others = services.filter((x) => x.slug !== s.slug && !x.placeholder);
  const img1 = s.image || media.serviceImages?.[s.slug];

  return (
    <>
      <PageBanner image={media.serviceImages?.[s.slug] || media.banners.services || media.banners.default} title={s.heroTitle || s.sub} tagline={s.heroSub} crumbs={[['Services', '/services'], [s.title]]} />
      <section className="sec">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow">{s.heroSub || s.title}</p>
            <AnimatedText text={s.importance?.title || s.title} className="h1 mt-5 !text-[clamp(2rem,1.1rem+3.6vw,4rem)]" />
            <ScrollReveal delay={0.15}>
              <p className="t-lead mt-8 text-mute">{s.intro}</p>
              {s.importance && <p className="mt-4 text-mute">{s.importance.text}</p>}
              <div className="mt-8"><Button to="/contact-2">{s.importance ? 'Connect with Us' : 'Talk to Us'}</Button></div>
            </ScrollReveal>
            <div className="mt-14"><ParallaxMedia src={img1} alt={img1 ? `${s.title} illustration` : ''} variant="mesh" seed={s.slug} aspect="aspect-[16/10]" priority /></div>

            <h2 className="h2 mb-8 mt-20 !text-[clamp(1.6rem,1.1rem+2vw,2.6rem)]">What We Offer</h2>
            <Accordion items={s.offerings} detail={(t) => <>Our team delivers <strong className="font-semibold text-navy">{t.toLowerCase()}</strong> tailored to your organisation&rsquo;s goals, systems and risk appetite. <Link className="link-u font-semibold text-brand" to="/contact-2">Talk to us</Link> to scope your requirements.</>} />

            {s.why && (
              <div className="mt-20">
                <h2 className="h2 !text-[clamp(1.6rem,1.1rem+2vw,2.6rem)]">{s.why.title}</h2>
                <ul className="mt-8 grid gap-px bg-line sm:grid-cols-3">{s.why.points.map(([a, b]) => <li key={a} className="bg-white p-6"><h3 className="h3 !text-lg">{a}</h3><p className="mt-2 text-sm text-mute">{b}</p></li>)}</ul>
                <blockquote className="mt-10 border-l-2 border-brand pl-6 font-display text-xl font-semibold leading-snug text-navy md:text-2xl">&ldquo;{s.why.quote}&rdquo;</blockquote>
              </div>
            )}
            {s.future && (
              <div className="mt-20">
                <h2 className="h2 !text-[clamp(1.6rem,1.1rem+2vw,2.6rem)]">{s.future.title}</h2>
                {s.image2 && <div className="mt-8"><ParallaxMedia src={s.image2} alt="" variant="contours" seed="future" aspect="aspect-[16/9]" /></div>}
                <ul className="mt-8 border-t border-navy">{s.future.stats.map((t) => <li key={t} className="flex gap-4 border-b border-line py-4 text-mute"><span aria-hidden="true" className="text-brand">✓</span>{t}</li>)}</ul>
              </div>
            )}
          </div>
          <aside className="lg:col-span-4" aria-label="Other services">
            <div className="bg-paper p-7 lg:sticky lg:top-28">
              <h2 className="t-label text-brand">Our Services</h2>
              <ul className="mt-5">{others.map((o) => <li key={o.slug} className="border-b border-line last:border-0"><Link to={`/service/${o.slug}`} className="group flex items-center justify-between py-3.5 font-display text-sm font-semibold text-navy transition-colors hover:text-brand"><span>{o.nav}</span><span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></Link></li>)}</ul>
            </div>
          </aside>
        </div>
      </section>
      <ConsultationForm />
    </>
  );
}
