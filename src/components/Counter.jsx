import { useEffect, useRef, useState } from 'react';
export default function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setN(value); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduce || value === 0) { setN(value); return; }
      const t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / 1500, 1); setN(Math.round(value * p)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{String(n).padStart(2, '0')}{suffix}</span>;
}
