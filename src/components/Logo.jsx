import { useState } from 'react';
import { Link } from 'react-router-dom';
import { site } from '../data/site';

/**
 * The official CenTech Prime Solutions logo (site.logoWhite) - the only brand mark in the header.
 * It is never redrawn as text. If the image file cannot load, the project's own icon (/favicon.svg) is shown
 * and the name stays available to screen readers.
 */
export default function Logo({ className = 'h-12 lg:h-14' }) {
  const [failed, setFailed] = useState(false);
  return (
    <Link to="/" aria-label="CenTech Prime Solutions home" className="inline-flex shrink-0 items-center">
      {failed ? (
        <img src="/favicon.svg" alt="CenTech Prime Solutions" className="h-10 w-10 object-contain" />
      ) : (
        <img src={site.logoWhite} alt="CenTech Prime Solutions" width="1024" height="432" decoding="async" fetchpriority="high" onError={() => setFailed(true)} className={`${className} w-auto max-w-none object-contain transition-[height] duration-500`} />
      )}
    </Link>
  );
}
