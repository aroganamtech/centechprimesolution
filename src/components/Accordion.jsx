import { useState } from 'react';
export default function Accordion({ items, detail }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-navy">
      {items.map((t, i) => (
        <div key={t} className="border-b border-line">
          <h3>
            <button type="button" id={`acc-b-${i}`} aria-expanded={open === i} aria-controls={`acc-p-${i}`} onClick={() => setOpen(open === i ? -1 : i)} className="group flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-navy transition-colors hover:text-brand md:text-xl">
              <span className="flex gap-4"><span className="text-sm font-semibold tabular-nums text-brand">{String(i + 1).padStart(2, '0')}</span>{t}</span>
              <span aria-hidden="true" className={`relative block h-4 w-4 shrink-0 text-brand`}><i className="absolute left-0 top-1/2 h-px w-full bg-current" /><i className={`absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 ${open === i ? 'scale-y-0' : ''}`} /></span>
            </button>
          </h3>
          <div id={`acc-p-${i}`} role="region" aria-labelledby={`acc-b-${i}`} hidden={open !== i} className="pb-6 pl-9 text-mute">{detail(t)}</div>
        </div>
      ))}
    </div>
  );
}
