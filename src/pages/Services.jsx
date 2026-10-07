import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import MediaTextSection from '../components/MediaTextSection';
import ConsultationForm from '../components/ConsultationForm';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedText from '../components/AnimatedText';
import { Button } from '../components/Button';
import { media } from '../config/media';
import { services } from '../data/site';
import useSEO from '../hooks/useSEO';

const vis = ['network', 'blocks', 'orbits', 'mesh', 'contours', 'bars'];

export default function Services() {
  useSEO('Services', 'IT and non-IT consultancy, cloud, software, cybersecurity, infrastructure, data and DevOps services from CenTech Prime Solutions.');
  const list = services.filter((s) => !s.placeholder);
  return (
    <>
      <PageBanner image={media.banners.services || media.banners.default} title="Services" tagline="Design the Concept of Your Business Idea Now" crumbs={[['Services']]}>
        <ScrollReveal delay={0.5}>
          <nav aria-label="Jump to a service" className="mt-10 flex max-w-4xl flex-wrap gap-2">
            {list.map((s, i) => <a key={s.slug} href={`#${s.slug}`} className="border border-white/25 px-3 py-2 font-display text-xs font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy">{String(i + 1).padStart(2, '0')} {s.card}</a>)}
          </nav>
        </ScrollReveal>
      </PageBanner>

      {list.map((s, i) => (
        <section key={s.slug} id={s.slug} className={`sec scroll-mt-16 ${i % 2 ? 'bg-paper' : ''}`}>
          <div className="wrap">
            <MediaTextSection reverse={i % 2 === 1} mediaCols={6} media={{ src: media.serviceImages?.[s.slug], alt: media.serviceImages?.[s.slug] ? `${s.title} — illustrative photograph` : '', variant: vis[i % 6], seed: s.slug, aspect: 'aspect-[4/3]' }}>
              <p className="font-display text-[clamp(4rem,2rem+8vw,9rem)] font-extrabold leading-none tracking-tighter text-brand/15" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
              <AnimatedText text={s.title} className="h2 mt-0 max-w-[18ch] md:-mt-2" />
              <ScrollReveal delay={0.1}>
                <p className="t-lead mt-6 text-mute">{s.intro}</p>
                <ul className="mt-8 border-t border-navy">
                  {s.offerings.map((o) => <li key={o} className="group flex gap-4 border-b border-line py-3.5 transition-colors hover:text-brand"><span className="mt-[.8em] h-px w-4 shrink-0 bg-brand transition-all duration-300 group-hover:w-7" aria-hidden="true" />{o}</li>)}
                </ul>
                <div className="mt-8"><Button to={`/service/${s.slug}`}>Learn More<span className="sr-only"> about {s.title}</span></Button></div>
              </ScrollReveal>
            </MediaTextSection>
          </div>
        </section>
      ))}
      <ConsultationForm />
    </>
  );
}
