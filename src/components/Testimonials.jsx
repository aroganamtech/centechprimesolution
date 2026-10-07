import { useEffect, useState } from 'react';
import { testimonials, img } from '../data/site';
import Img from './Img';

const Stars = () => (
  <span role="img" aria-label="Rated 4 out of 5" className="flex gap-0.5 text-amber-500">
    {[1, 2, 3, 4, 5].map((i) => <svg key={i} width="16" height="16" viewBox="0 0 20 20" aria-hidden="true" fill={i <= 4 ? 'currentColor' : '#d6dae3'}><path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" /></svg>)}
  </span>
);

export default function Testimonials() {
  const [per, setPer] = useState(3);
  const [i, setI] = useState(0);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    const f = () => setPer(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 700 ? 2 : 1);
    f(); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f);
  }, []);
  const max = testimonials.length - per;
  useEffect(() => { if (i > max) setI(max); }, [max, i]);
  useEffect(() => {
    if (pause || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x >= max ? 0 : x + 1)), 6000);
    return () => clearInterval(t);
  }, [pause, max]);

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Client testimonials" onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} onFocus={() => setPause(true)} onBlur={() => setPause(false)}>
      <div className="overflow-hidden">
        <ul className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${i * (100 / per)}%)` }} aria-live={pause ? 'polite' : 'off'}>
          {testimonials.map((t, k) => (
            <li key={t.title} className="shrink-0 px-3" style={{ width: `${100 / per}%` }} aria-hidden={k < i || k >= i + per}>
              <figure className="flex h-full flex-col border border-line bg-white p-7">
                <div className="flex items-center justify-between"><Img src={img.quote} alt="" className="h-8 w-auto" /><Stars /></div>
                <h3 className="h3 mt-5">{t.title}</h3>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-mute">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4 text-sm"><Img src={img.user} alt="" className="h-10 w-10 rounded-full bg-slate-200 object-cover" /><span className="font-medium text-navy">Client</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => setI(i <= 0 ? max : i - 1)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center border border-line hover:border-brand hover:text-brand">‹</button>
        <div className="flex gap-2">{Array.from({ length: max + 1 }, (_, k) => <button key={k} type="button" onClick={() => setI(k)} aria-label={`Go to slide ${k + 1}`} aria-current={k === i} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-brand' : 'w-2 bg-slate-300'}`} />)}</div>
        <button type="button" onClick={() => setI(i >= max ? 0 : i + 1)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center border border-line hover:border-brand hover:text-brand">›</button>
      </div>
    </div>
  );
}
