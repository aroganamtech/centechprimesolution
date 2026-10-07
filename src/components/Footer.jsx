import { Link } from 'react-router-dom';
import { site } from '../data/site';
import Logo from './Logo';
import { Button, Arrow } from './Button';

export default function Footer() {
  const h = 'font-display text-[.7rem] font-semibold uppercase tracking-[.18em] text-slate-400';
  const l = 'link-u text-[.95rem] text-slate-200 hover:text-white';
  return (
    <footer className="on-dark bg-navy-950 text-slate-300">
      <div className="wrap border-b border-white/10 py-14 md:py-20">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <p className="font-display font-bold leading-tight text-white" style={{ fontSize: 'clamp(1.8rem,1.1rem+3vw,3.6rem)', letterSpacing: '-0.035em' }}>Let&rsquo;s build what&rsquo;s next.</p>
          <Button to="/contact-2" variant="primary">Get a Free Consultation</Button>
        </div>
      </div>
      <div className="wrap grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo className="h-11" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">{site.mission}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {site.social.map((s) => <li key={s.label}><a className={l} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}<span className="sr-only"> (opens in a new tab)</span></a></li>)}
          </ul>
        </div>
        <nav aria-label="Quick links" className="lg:col-span-2">
          <h2 className={h}>Quick Links</h2>
          <ul className="mt-5 space-y-3">{[['Home', '/'], ['About Us', '/about-4'], ['Services', '/services'], ['Solutions', '/solutions'], ['Blog', '/blog'], ['Contact Us', '/contact-2']].map(([a, b]) => <li key={b}><Link className={l} to={b}>{a}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Services" className="lg:col-span-3">
          <h2 className={h}>Services</h2>
          <ul className="mt-5 space-y-3">{[['IT Consultancy', 'it-consultancy-services'], ['Non-IT Consultancy', 'non-it-consultancy-services'], ['Cyber Security', 'cybersecurity-services'], ['Software Development', 'software-development-and-integration-services'], ['IT Infrastructure', 'it-infrastructure-and-support-services']].map(([a, b]) => <li key={b}><Link className={l} to={`/service/${b}`}>{a}</Link></li>)}</ul>
        </nav>
        <div className="lg:col-span-3">
          <h2 className={h}>Contact Us</h2>
          <a className="link-arrow mt-5 text-white" href={`mailto:${site.email}`}><span className="link-u">{site.email}</span><Arrow /></a>
          <ul className="mt-5 space-y-4 text-sm">{site.offices.map((o) => <li key={o.region}><strong className="font-display font-semibold text-white">{o.region}</strong><address className="mt-1 not-italic text-slate-400">{o.address}</address></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="wrap flex flex-col gap-2 py-6 text-sm text-slate-400 sm:flex-row sm:justify-between"><p>Copyright © {new Date().getFullYear()} CenTech Prime Solutions. All Rights Reserved.</p><p>Wavre, Belgium · Trichy, India</p></div></div>
    </footer>
  );
}
