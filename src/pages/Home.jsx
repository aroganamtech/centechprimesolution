import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroVideo from '../components/HeroVideo';
import CinematicSection from '../components/CinematicSection';
import MediaTextSection from '../components/MediaTextSection';
import ParallaxMedia from '../components/ParallaxMedia';
import SectionHeading from '../components/SectionHeading';
import AnimatedText from '../components/AnimatedText';
import ScrollReveal from '../components/ScrollReveal';
import Testimonials from '../components/Testimonials';
import ConsultationForm from '../components/ConsultationForm';
import Img from '../components/Img';
import { Button, ArrowLink, Arrow } from '../components/Button';
import { media } from '../config/media';
import { homeCards, offeringCards, projects, posts, fmtDate } from '../data/site';
import { fadeUp, staggerContainer, viewport } from '../utils/motion';
import useSEO from '../hooks/useSEO';

const variants = ['mesh', 'orbits', 'contours', 'bars'];

export default function Home() {
  useSEO(null, 'Your trusted partner in technology and business consulting, delivering next-generation solutions to elevate your success.');
  const [feature, ...rest] = posts;
  return (
    <>
      <HeroVideo />

      {/* What we do — Layout B (text + large photo) — Light */}
      <section id="intro" className="sec scroll-mt-16">
        <div className="wrap">
          <MediaTextSection reverse mediaCols={6} media={{ src: media.photos.intro, alt: 'CenTech Prime consultants collaborating on a technology project', variant: 'network', aspect: 'aspect-[4/5]' }}>
            <p className="eyebrow">About Company</p>
            <AnimatedText text="What We Do" className="h1 mt-5" />
            <ScrollReveal delay={0.15}>
              <p className="t-lead mt-8 text-mute">At CenTech Prime, we specialize in bridging technology with strategy, offering a comprehensive range of IT and non-IT services tailored to your needs. Whether you&rsquo;re looking to enhance your IT infrastructure, migrate to the cloud, streamline operations, or secure your business, we&rsquo;ve got you covered.</p>
              <p className="mt-8 border-l-2 border-brand pl-5 font-display text-xl font-bold text-navy">Award Winning<span className="mt-1 block text-sm font-normal text-mute">We have a history of successfully delivering IT solutions to a great diverse clientele, from startups to established enterprises.</span></p>
              <div className="mt-10"><Button to="/about-4" variant="outline">About Us</Button></div>
            </ScrollReveal>
          </MediaTextSection>
        </div>
      </section>

      {/* Statement over full-screen media — Layout C — Dark */}
      <CinematicSection label="Our approach" clip={media.videos.services}>
        <p className="eyebrow">CenTech Prime Solutions</p>
        <AnimatedText text="We Are Focused. We Are Passionate. We Love What We Do." className="t-display mt-6 max-w-[16ch] !text-[clamp(2.3rem,1.2rem+5.2vw,6rem)]" />
        <ScrollReveal delay={0.3} className="mt-10"><Button to="/services" variant="ghost">Explore Services</Button></ScrollReveal>
      </CinematicSection>

      {/* Services overview — numbered editorial list — Light */}
      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Services" title="Technology and business consulting, end to end." />
          <motion.ul variants={staggerContainer(0.07)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 border-t border-navy lg:mt-20">
            {homeCards.map((s, i) => (
              <motion.li key={s.slug} variants={fadeUp} className="group relative border-b border-line">
                <Link to={`/service/${s.slug}`} className="grid items-baseline gap-x-8 gap-y-2 py-7 md:grid-cols-12 md:py-9">
                  <span className="font-display text-sm font-semibold tabular-nums text-brand md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-[clamp(1.6rem,1.1rem+2vw,3rem)] font-bold leading-tight tracking-tight text-navy transition-transform duration-500 ease-premium group-hover:translate-x-2 md:col-span-9">{s.card}</h3>
                  <span aria-hidden="true" className="hidden justify-self-end text-brand transition-transform duration-500 ease-premium group-hover:translate-x-1 md:col-span-2 md:block"><Arrow /></span>
                </Link>
                <span aria-hidden="true" className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-700 ease-premium group-hover:scale-x-100" />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Offerings — alternating large media + text (Layouts A/B) — Neutral */}
      <section className="sec bg-paper">
        <div className="wrap">
          <SectionHeading eyebrow="Our Services and Offerings" title="Four ways we move your business forward." />
          <div className="mt-16 space-y-24 lg:mt-24 lg:space-y-32">
            {offeringCards.map((c, i) => (
              <MediaTextSection key={c.n} reverse={i % 2 === 1} mediaCols={7} media={{ src: media.serviceImages[c.slug], alt: `${c.title} — illustrative photograph`, variant: variants[i], seed: c.slug, aspect: 'aspect-[16/11]' }}>
                <p className="font-display text-[clamp(3.5rem,2rem+6vw,7rem)] font-extrabold leading-none tracking-tighter text-brand/20" aria-hidden="true">{c.n}</p>
                <h3 className="h2 -mt-1 !text-[clamp(1.6rem,1.1rem+2vw,2.8rem)] md:-mt-2">{c.title}</h3>
                <p className="mt-3 font-display text-sm font-semibold text-brand">{c.sub}</p>
                <p className="t-lead mt-5 text-mute">{c.text}</p>
                <div className="mt-8"><ArrowLink to={`/service/${c.slug}`}>Learn More<span className="sr-only"> about {c.title}</span></ArrowLink></div>
              </MediaTextSection>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies — Light */}
      <section className="sec">
        <div className="wrap">
          <SectionHeading eyebrow="Case Studies" title="Our Latest Case Studies" />
          <motion.ul variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {projects.map((p, i) => (
              <motion.li key={p.slug} variants={fadeUp}>
                <Link to={`/project/${p.slug}`} className="group block">
                  <div className="overflow-hidden bg-navy-900"><Img src={media.projects[p.slug] || p.image} alt={`${p.title} case study`} variant={variants[i]} seed={p.slug} className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105" /></div>
                  <p className="t-label mt-5 text-brand">{p.cat}</p>
                  <h3 className="h3 mt-2"><span className="link-u">{p.title}</span></h3>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* The CenTech Advantage — full-screen research-style media — Dark */}
      <CinematicSection label="The CenTech Advantage" clip={media.videos.research} minH="min-h-[100svh]">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Why Choose Us?</p>
            <AnimatedText text="The CenTech Advantage" className="t-display mt-6 !text-[clamp(2.3rem,1.2rem+5vw,5.8rem)]" />
            <ScrollReveal delay={0.2}>
              <p className="t-lead mt-8 max-w-xl text-slate-200">Partner with us to turn your technology and business strategies into powerful assets. With a focus on scalability, innovation, and security, we craft tailored solutions that deliver tangible results.</p>
              <div className="mt-10"><Button to="/contact-2" variant="primary">Let&rsquo;s Start Your Transformation</Button></div>
            </ScrollReveal>
          </div>
          <ScrollReveal stagger={0.12} className="space-y-0 lg:col-span-5 lg:self-end">
            {['92% of clients express high satisfaction with our services.', '200+ cloud migrations have been successfully completed.', '40% improvement in efficiency for IT infrastructure clients.', '85% of clients improve decision-making using our data solutions.'].map((t) => (
              <ScrollReveal.Item key={t} as="p" className="border-t border-white/25 py-5 font-display text-lg font-semibold leading-snug">{t}</ScrollReveal.Item>
            ))}
          </ScrollReveal>
        </div>
      </CinematicSection>

      {/* Testimonials — Light */}
      <section className="sec bg-paper">
        <div className="wrap">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" text="See how we've helped businesses thrive across industries." />
            <ArrowLink to="/contact-2">Contact Us Today!</ArrowLink>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Transform — full-bleed CTA with video — Dark */}
      <CinematicSection label="Transform your business" clip={media.videos.cta} align="center" minH="min-h-[80svh]">
        <p className="eyebrow">Start today</p>
        <AnimatedText text="Transform Your Business Today" className="t-display mx-auto mt-6 max-w-[14ch] !text-[clamp(2.4rem,1.2rem+5.4vw,6.2rem)]" />
        <ScrollReveal delay={0.25}>
          <p className="t-lead mx-auto mt-8 max-w-2xl text-slate-200">Whether you&rsquo;re a startup or an established enterprise, CenTech Prime is here to help you navigate the complexities of technology and business processes.</p>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 text-left text-sm text-slate-200 sm:grid-cols-3">
            {['88% of businesses achieve faster time-to-market using cloud solutions.', '99% reduction in threat incidents reported by cybersecurity clients.', '250+ companies have optimized operations through non-IT consultancy.'].map((t) => <li key={t} className="border-t border-white/30 pt-3">{t}</li>)}
          </ul>
          <div className="mt-10"><Button to="/contact-2">Let&rsquo;s Start Your Transformation</Button></div>
        </ScrollReveal>
      </CinematicSection>

      <ConsultationForm />

      {/* News — featured + cards — Light */}
      <section className="sec">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><SectionHeading eyebrow="Blog" title="Our Latest News" /><ArrowLink to="/blog">View all posts</ArrowLink></div>
          <ScrollReveal className="mt-14 border-b border-line pb-14">
            <Link to={`/${feature.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
              <div className="overflow-hidden bg-navy-900 lg:col-span-7"><Img src={media.posts[feature.slug] || feature.image} alt="" variant="orbits" className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105" /></div>
              <div className="lg:col-span-5"><p className="t-label text-brand">Featured · <time dateTime={feature.date}>{fmtDate(feature.date)}</time></p><h3 className="h2 mt-4 !text-[clamp(1.6rem,1.1rem+2vw,2.8rem)]"><span className="link-u">{feature.title}</span></h3><p className="t-lead mt-4 text-mute">{feature.excerpt}</p></div>
            </Link>
          </ScrollReveal>
          <motion.ul variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <motion.li key={p.slug} variants={fadeUp}>
                <Link to={`/${p.slug}`} className="group block">
                  <div className="overflow-hidden bg-navy-900"><Img src={media.posts[p.slug] || p.image} alt="" variant={variants[i % 4]} seed={p.slug} className="aspect-[3/2] w-full object-cover transition-transform duration-[900ms] ease-premium group-hover:scale-105" /></div>
                  <time dateTime={p.date} className="t-label mt-5 block text-mute">{fmtDate(p.date)}</time>
                  <h3 className="h3 mt-2"><span className="link-u">{p.title}</span></h3>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
