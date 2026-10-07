import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageBanner from '../components/PageBanner';
import BlogSidebar from '../components/BlogSidebar';
import Img from '../components/Img';
import { media } from '../config/media';
import ScrollReveal from '../components/ScrollReveal';
import { posts, fmtDate } from '../data/site';
import { fadeUp, staggerContainer } from '../utils/motion';
import useSEO from '../hooks/useSEO';

const vis = ['orbits', 'contours', 'mesh', 'bars', 'network', 'blocks'];

export default function Blog() {
  useSEO('Blog', 'News and insights from CenTech Prime Solutions on cloud, data, cybersecurity and digital transformation.');
  const [q, setQ] = useState('');
  const list = useMemo(() => posts.filter((p) => (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase())), [q]);
  const [first, ...rest] = list;
  const showFeature = !q && first;
  const grid = showFeature ? rest : list;
  return (
    <>
      <PageBanner image={media.banners.blog || media.banners.default} title="Blog" tagline="News and insights on technology, cloud, data and security." crumbs={[['Blog']]} />
      <section className="sec">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="sr-only" role="status" aria-live="polite">{list.length} posts shown</p>
            {showFeature && (
              <ScrollReveal className="mb-16 border-b border-line pb-16">
                <article className="group">
                  <Link to={`/${first.slug}`} className="block">
                    <div className="overflow-hidden bg-navy-900"><Img src={media.posts[first.slug] || first.image} alt="" variant="orbits" seed={first.slug} className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105" /></div>
                    <p className="t-label mt-6 text-brand">Featured · <time dateTime={first.date} className="text-mute">{fmtDate(first.date)}</time></p>
                    <h2 className="h2 mt-3 !text-[clamp(1.7rem,1.1rem+2.4vw,3rem)]"><span className="link-u">{first.title}</span></h2>
                    <p className="t-lead mt-4 text-mute">{first.excerpt}</p>
                  </Link>
                </article>
              </ScrollReveal>
            )}
            {grid.length ? (
              <motion.ul key={q} variants={staggerContainer(0.08)} initial="hidden" animate="show" className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
                {grid.map((p, i) => (
                  <motion.li key={p.slug} variants={fadeUp}>
                    <article className="group">
                      <Link to={`/${p.slug}`} className="block">
                        <div className="overflow-hidden bg-navy-900"><Img src={media.posts[p.slug] || p.image} alt="" variant={vis[i % 6]} seed={p.slug} className="aspect-[3/2] w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105" /></div>
                        <time dateTime={p.date} className="t-label mt-5 block text-mute">{fmtDate(p.date)}</time>
                        <h2 className="h3 mt-2"><span className="link-u">{p.title}</span></h2>
                        <p className="mt-3 text-sm text-mute">{p.excerpt}</p>
                      </Link>
                    </article>
                  </motion.li>
                ))}
              </motion.ul>
            ) : !showFeature && <p className="t-lead text-mute">No posts found for &ldquo;{q}&rdquo;.</p>}
          </div>
          <div className="lg:col-span-4"><div className="lg:sticky lg:top-28"><BlogSidebar q={q} setQ={setQ} /></div></div>
        </div>
      </section>
    </>
  );
}
