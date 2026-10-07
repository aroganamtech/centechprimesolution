import PageBanner from '../components/PageBanner';
import MediaTextSection from '../components/MediaTextSection';
import CinematicSection from '../components/CinematicSection';
import ConsultationForm from '../components/ConsultationForm';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedText from '../components/AnimatedText';
import { Button } from '../components/Button';
import { media } from '../config/media';
import { site } from '../data/site';
import useSEO from '../hooks/useSEO';

export default function About() {
  useSEO('About Us', 'CenTech Prime Solutions: a trusted partner for businesses seeking to thrive in the digital age.');
  return (
    <>
      <PageBanner image={media.banners.about || media.banners.default} title="About Us" crumbs={[['About']]} tagline="A trusted partner for businesses seeking to thrive in the digital age." />

      {/* Layout A */}
      <section className="sec">
        <div className="wrap">
          <MediaTextSection media={{ src: media.photos.about, alt: 'Technology professionals collaborating — illustrative photograph', variant: 'network', aspect: 'aspect-[4/5]' }}>
            <p className="eyebrow">About Us</p>
            <AnimatedText text="Crafting Tailored Solutions" className="h1 mt-5" />
            <ScrollReveal delay={0.15}><p className="t-lead mt-8 text-mute">We focus on understanding our clients&rsquo; unique needs. Every consultation became an opportunity to learn, innovate, and adapt.</p></ScrollReveal>
          </MediaTextSection>
        </div>
      </section>

      {/* Story — Layout D: large headline */}
      <section className="sec bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3">The CenTech Prime Story</p>
          <div className="lg:col-span-9">
            <AnimatedText text="Navigating the Future" className="h1 !text-[clamp(2rem,1.1rem+4vw,4.6rem)]" />
            <ScrollReveal delay={0.15}><p className="t-lead mt-8 max-w-3xl text-mute">CenTech Prime was founded by a group of passionate innovators who aimed to help organizations facing challenges in navigating the fast-paced digital landscape.</p></ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="sec">
        <div className="wrap grid gap-px bg-line md:grid-cols-2">
          {[['Our Vision', 'A Connected Future', site.mission], ['Our Mission', 'Transforming Possibilities', 'We are dedicated to delivering exceptional consultancy services that drive growth and efficiency, ensuring our clients stay ahead in a rapidly evolving marketplace.']].map(([k, t, d], i) => (
            <ScrollReveal key={k} delay={i * 0.1} className="bg-white py-10 md:px-12 md:py-14">
              <p className="eyebrow">{k}</p><h2 className="h2 mt-5">{t}</h2><p className="t-lead mt-5 text-mute">{d}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Layout C — full-screen */}
      <CinematicSection label="Empowering businesses for the future" clip={media.videos.enabler}>
        <p className="eyebrow">Empowering Businesses for the Future</p>
        <AnimatedText text="Technology should be an enabler, not a barrier." className="t-display mt-6 max-w-[16ch] !text-[clamp(2.2rem,1.2rem+4.8vw,5.6rem)]" />
        <ScrollReveal delay={0.25}><p className="t-lead mt-8 max-w-xl text-slate-200">CenTech Prime is a trusted partner for businesses seeking to thrive in the digital age.</p></ScrollReveal>
      </CinematicSection>

      <section className="sec">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6"><p className="eyebrow">Why Choose CenTech Prime?</p><AnimatedText text="Your Partner in Progress" className="h1 mt-5" /></div>
          <ScrollReveal delay={0.15} className="lg:col-span-6 lg:self-end"><p className="t-lead text-mute">Our approach is transparent, strategic, and tailored to each client.</p><div className="mt-8"><Button to="/services">Explore Our Services</Button></div></ScrollReveal>
        </div>
      </section>
      <ConsultationForm />
    </>
  );
}
