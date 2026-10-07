import { useParams } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import ConsultationForm from '../components/ConsultationForm';
import ParallaxMedia from '../components/ParallaxMedia';
import ScrollReveal from '../components/ScrollReveal';
import NotFound from './NotFound';
import { media } from '../config/media';
import { projects } from '../data/site';
import useSEO from '../hooks/useSEO';

const info = [['Location', '7 Lake Street, London'], ['Client', 'wpOceans'], ['Consultant', 'Harry Johnson'], ['Project Type', 'Investment planning'], ['Duration', '6 Month'], ['Completion Date', '15 Apr 2024'], ['Category', 'IT, Company']];

export default function Project() {
  const { slug } = useParams();
  const p = projects.find((x) => x.slug === slug);
  useSEO(p?.title ?? 'Not found');
  if (!p) return <NotFound />;
  return (
    <>
      <PageBanner image={media.projects[p.slug] || media.banners.default} title={p.title} tagline={p.cat} crumbs={[['Case Studies'], [p.title]]} />
      <section className="sec">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ParallaxMedia src={media.projects[p.slug] || p.image} alt={`${p.title} project`} variant="mesh" seed={p.slug} aspect="aspect-[16/10]" priority />
            <ScrollReveal>
              <h2 className="h2 mt-14 !text-[clamp(1.6rem,1.1rem+2vw,2.6rem)]">About {p.title}</h2>
              <p className="t-lead mt-5 text-mute">Detailed case-study copy for this engagement is placeholder text on the live site. Replace this block with the real project overview, strategy, approach, goals and results.</p>
            </ScrollReveal>
            {['Strategies', 'Our Approach', 'Received Goals', 'Results'].map((h) => <ScrollReveal key={h} as="section"><h2 className="h3 mt-12 border-t border-line pt-8">{h}</h2><p className="mt-3 text-mute">Content to be provided.</p></ScrollReveal>)}
          </div>
          <aside className="lg:col-span-4" aria-label="Project information">
            <dl className="bg-paper p-7 lg:sticky lg:top-28">
              {info.map(([k, v]) => <div key={k} className="flex justify-between gap-4 border-b border-line py-3.5 text-sm last:border-0"><dt className="font-display font-semibold text-navy">{k}</dt><dd className="text-right text-mute">{v}</dd></div>)}
            </dl>
          </aside>
        </div>
      </section>
      <ConsultationForm title="Have project in mind? Let's discuss" sub="Get in touch with us to see how we can help you with your project" />
    </>
  );
}
