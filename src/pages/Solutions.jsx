import PageBanner from '../components/PageBanner';
import MediaTextSection from '../components/MediaTextSection';
import ConsultationForm from '../components/ConsultationForm';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedText from '../components/AnimatedText';
import { Button } from '../components/Button';
import { media } from '../config/media';
import { solutionsPage } from '../data/site';
import useSEO from '../hooks/useSEO';

const vis = ['orbits', 'contours', 'mesh', 'bars'];

export default function Solutions() {
  useSEO('Our Solutions', 'Cloud migration, data analytics, cloud-native development and cloud cost optimisation solutions from CenTech Prime Solutions.');
  return (
    <>
      <PageBanner image={media.banners.solutions || media.banners.default} title="Our Solutions" tagline="Design the Concept of Your Business Idea Now" crumbs={[['Solutions']]} />
      <div className="on-dark bg-navy-900 text-white">
        {solutionsPage.map((s, i) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-16 border-t border-white/10 py-16 md:py-28">
            <div className="wrap">
              <MediaTextSection reverse={i % 2 === 1} mediaCols={7} media={{ src: media.serviceImages?.[s.slug] || media.photos.solutions, alt: '', variant: vis[i], seed: `sol-${s.slug}`, aspect: 'aspect-[16/11]' }}>
                <p className="eyebrow">Solution {String(i + 1).padStart(2, '0')}</p>
                <AnimatedText text={s.title} className="h2 mt-5" />
                <ScrollReveal delay={0.1}>
                  <p className="t-lead mt-6 text-slate-300">{s.intro}</p>
                  <ul className="mt-8 border-t border-white/25">
                    {s.offerings.map((o) => <li key={o} className="group flex gap-4 border-b border-white/10 py-3.5 text-slate-200 transition-all duration-300 hover:translate-x-1.5 hover:text-white"><span className="mt-[.8em] h-px w-4 shrink-0 bg-brand-glow transition-all duration-300 group-hover:w-7" aria-hidden="true" />{o}</li>)}
                  </ul>
                  <div className="mt-8"><Button to={`/service/${s.slug}`} variant="ghost">Learn More<span className="sr-only"> about {s.title}</span></Button></div>
                </ScrollReveal>
              </MediaTextSection>
            </div>
          </section>
        ))}
      </div>
      <ConsultationForm />
    </>
  );
}
