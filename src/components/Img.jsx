import { useEffect, useState } from 'react';
import Visual from './Visual';

/**
 * Photo with a guaranteed fallback chain. `src` is either a URL string or a downloaded-media object
 * { src, sources:[{type, srcSet}] } (AVIF/WebP at 800w/1600w + JPEG) from config/media.js.
 * If the file is missing or fails, a generated visual fills the same box — never a broken image.
 */
export default function Img({ src, alt = '', className = '', variant = 'network', seed, sizes = '(min-width: 1024px) 60vw, 100vw', ...rest }) {
  const file = src && typeof src === 'object' ? src.src : src;
  const [failed, setFailed] = useState(!file);
  useEffect(() => setFailed(!file), [file]);
  if (failed) return <div role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} className={`overflow-hidden bg-navy-900 ${className}`}><Visual variant={variant} seed={seed || file || variant} /></div>;
  const img = <img src={file} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} className={className} {...rest} />;
  if (src && typeof src === 'object' && src.sources?.length) {
    return <picture>{src.sources.map((s) => <source key={s.type} type={s.type} srcSet={s.srcSet} sizes={sizes} />)}{img}</picture>;
  }
  return img;
}
