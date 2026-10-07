import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import BlogSidebar from '../components/BlogSidebar';
import ParallaxMedia from '../components/ParallaxMedia';
import ConsultationForm from '../components/ConsultationForm';
import NotFound from './NotFound';
import { media } from '../config/media';
import { posts, fmtDate } from '../data/site';
import useSEO from '../hooks/useSEO';

export default function BlogPost() {
  const { slug } = useParams();
  const idx = posts.findIndex((p) => p.slug === slug);
  const p = posts[idx];
  const [q, setQ] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  useSEO(p?.title ?? 'Not found', p?.excerpt);
  if (!p) return <NotFound />;
  const prev = posts[idx - 1], next = posts[idx + 1];
  return (
    <>
      <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-brand-glow" aria-hidden="true" />
      <PageBanner image={media.posts[p.slug] || media.banners.blog || media.banners.default} title={p.title} crumbs={[['Blog', '/blog'], [p.title]]} tagline={fmtDate(p.date)} />
      <section className="sec">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <article className="lg:col-span-8">
            <ParallaxMedia src={media.posts[p.slug] || p.image} alt="" variant="orbits" seed={p.slug} aspect="aspect-[16/9]" parallax={16} priority />
            <p className="t-lead mt-10 font-medium text-navy">{p.excerpt}</p>
            <div className="mt-8 max-w-[68ch] space-y-6 text-[clamp(1.05rem,1rem+.25vw,1.18rem)] leading-[1.85] text-ink">{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
            <nav aria-label="Post navigation" className="mt-16 grid gap-px bg-line sm:grid-cols-2">
              {prev ? <Link to={`/${prev.slug}`} className="group bg-white py-6 pr-6"><span className="t-label text-brand">← Previous</span><span className="h3 mt-2 block !text-base"><span className="link-u">{prev.title}</span></span></Link> : <span className="bg-white" />}
              {next ? <Link to={`/${next.slug}`} className="group bg-white py-6 sm:pl-6 sm:text-right"><span className="t-label text-brand">Next →</span><span className="h3 mt-2 block !text-base"><span className="link-u">{next.title}</span></span></Link> : <span className="bg-white" />}
            </nav>
          </article>
          <div className="lg:col-span-4"><div className="lg:sticky lg:top-28"><BlogSidebar q={q} setQ={setQ} /></div></div>
        </div>
      </section>
      <ConsultationForm />
    </>
  );
}
