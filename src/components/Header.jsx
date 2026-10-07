import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { site, menuServices, menuSolutions } from '../data/site';
import { Button } from './Button';
import Logo from './Logo';
import { EASE } from '../utils/motion';

function Dropdown({ label, to, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const out = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', out);
    return () => document.removeEventListener('mousedown', out);
  }, []);
  return (
    <li ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <div className="flex items-center">
        <NavLink to={to} className={({ isActive }) => `nav-u py-3 ${NAV_TEXT} ${isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}>{label}</NavLink>
        <button type="button" aria-label={`${label} submenu`} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="-ml-0.5 p-2 opacity-90 hover:opacity-100">
          <svg width="11" height="7" viewBox="0 0 10 6" className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.25, ease: EASE }}
            className="absolute -left-4 top-full z-50 w-80 border border-white/10 bg-navy-900 py-3 shadow-2xl">
            {items.map((s) => (
              <li key={s.slug}><Link to={`/service/${s.slug}`} onClick={() => setOpen(false)} className="group flex items-center justify-between px-5 py-2.5 text-sm text-slate-200 transition-colors hover:bg-white/5 hover:text-white"><span>{s.nav}</span><span aria-hidden="true" className="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">→</span></Link></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

const NAV_TEXT = 'font-display text-base font-medium tracking-[-.005em] transition-opacity xl:text-[1.0625rem] [text-shadow:0_1px_14px_rgba(0,0,0,.35)]';

export default function Header() {
  const [mob, setMob] = useState(false);
  const [sub, setSub] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setMob(false); setSub(null); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = mob ? 'hidden' : '';
    const k = (e) => e.key === 'Escape' && setMob(false);
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [mob]);
  const solid = scrolled || mob;
  const link = ({ isActive }) => `nav-u py-3 ${NAV_TEXT} ${isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`;

  return (
    <>
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
        className={`on-dark fixed inset-x-0 top-0 z-[60] text-white transition-[background-color,padding,box-shadow] duration-500 ease-premium ${solid ? 'bg-navy-900/95 py-2.5 shadow-[0_1px_0_rgba(255,255,255,.08)] backdrop-blur-md' : 'bg-transparent py-4 lg:py-5'}`}>
        <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[150%] bg-gradient-to-b from-navy-950/70 via-navy-950/30 to-transparent transition-opacity duration-500 ${solid ? 'opacity-0' : 'opacity-100'}`} />
        <div className="wrap flex items-center justify-between gap-6">
          <Logo className={solid ? 'h-10 lg:h-11' : 'h-12 lg:h-14'} />
          <nav aria-label="Primary" className="hidden lg:block lg:flex-1 lg:px-6 xl:px-12">
            <ul className="flex items-center justify-center gap-6 xl:gap-10">
              <li><NavLink to="/" end className={link}>Home</NavLink></li>
              <li><NavLink to="/about-4" className={link}>About</NavLink></li>
              <Dropdown label="Services" to="/services" items={menuServices} />
              <Dropdown label="Solutions" to="/solutions" items={menuSolutions} />
              <li><NavLink to="/blog" className={link}>Blog</NavLink></li>
              <li><NavLink to="/contact-2" className={link}>Contact</NavLink></li>
            </ul>
          </nav>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="link-u hidden py-2 text-xs text-slate-300 hover:text-white 2xl:block">{site.email}</a>
            <Button to="/contact-2" variant="light" className="hidden !min-h-[2.75rem] !px-6 !py-2.5 !text-base sm:inline-flex">Let&rsquo;s Talk</Button>
            <button type="button" className="relative flex h-11 w-11 items-center justify-center lg:hidden" aria-expanded={mob} aria-controls="mobile-menu" aria-label={mob ? 'Close menu' : 'Open menu'} onClick={() => setMob((m) => !m)}>
              <span aria-hidden="true" className="relative block h-3 w-6">
                <span className={`absolute left-0 h-px w-full bg-white transition-all duration-300 ${mob ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 h-px w-full bg-white transition-opacity ${mob ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 h-px w-full bg-white transition-all duration-300 ${mob ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mob && (
          <motion.nav id="mobile-menu" aria-label="Mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="on-dark fixed inset-0 z-[55] overflow-y-auto bg-navy-900 px-[var(--gutter)] pb-10 pt-24 text-white lg:hidden">
            <ul>
              {[['Home', '/'], ['About', '/about-4'], ['Services', '/services', menuServices], ['Solutions', '/solutions', menuSolutions], ['Blog', '/blog'], ['Contact', '/contact-2']].map(([l, t, items], i) => (
                <motion.li key={t} className="border-b border-white/10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: EASE }}>
                  <div className="flex items-center justify-between">
                    <Link to={t} className="block flex-1 py-4 font-display text-[clamp(1.7rem,7vw,2.4rem)] font-bold tracking-tight">{l}</Link>
                    {items && <button type="button" className="p-3" aria-expanded={sub === l} aria-label={`${l} submenu`} onClick={() => setSub(sub === l ? null : l)}><svg width="14" height="9" viewBox="0 0 10 6" className={`transition-transform ${sub === l ? 'rotate-180' : ''}`} aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg></button>}
                  </div>
                  {items && sub === l && <ul className="mb-4 space-y-1 border-l border-brand-glow pl-4">{items.map((s) => <li key={s.slug}><Link to={`/service/${s.slug}`} className="block py-2 text-sm text-slate-300">{s.nav}</Link></li>)}</ul>}
                </motion.li>
              ))}
            </ul>
            <div className="mt-10"><Button to="/contact-2" className="w-full">Let&rsquo;s Talk</Button></div>
            <a href={`mailto:${site.email}`} className="mt-6 block text-sm text-slate-300">{site.email}</a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
