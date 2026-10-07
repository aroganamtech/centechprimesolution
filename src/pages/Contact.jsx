import PageBanner from '../components/PageBanner';
import ConsultationForm from '../components/ConsultationForm';
import ScrollReveal from '../components/ScrollReveal';
import { media } from '../config/media';
import { site } from '../data/site';
import useSEO from '../hooks/useSEO';

export default function Contact() {
  useSEO('Contact Us', 'Contact CenTech Prime Solutions. Offices in Wavre, Belgium and Trichy, India. 24/7 support.');
  return (
    <>
      <PageBanner image={media.banners.contact || media.banners.default} title="Contact Us" tagline="Drop us a line! We are here to answer your questions 24/7" crumbs={[['Contact']]} />
      <section className="sec">
        <ScrollReveal stagger={0.1} className="wrap grid gap-px bg-line md:grid-cols-3">
          <ScrollReveal.Item className="bg-white py-8 md:pr-8"><p className="t-label text-brand">Email</p><a className="link-u mt-4 inline-block break-all font-display text-xl font-semibold text-navy" href={`mailto:${site.email}`}>{site.email}</a><p className="mt-2 text-sm text-mute">24/7 support</p></ScrollReveal.Item>
          {site.offices.map((o) => <ScrollReveal.Item key={o.region} className="bg-white py-8 md:px-8"><p className="t-label text-brand">{o.region}</p><address className="mt-4 text-lg not-italic leading-relaxed text-navy">{o.address}</address></ScrollReveal.Item>)}
        </ScrollReveal>
      </section>
      <ConsultationForm />
    </>
  );
}
