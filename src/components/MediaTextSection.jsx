import ParallaxMedia from './ParallaxMedia';
const span = { 5: ['lg:col-span-5', 'lg:col-span-7'], 6: ['lg:col-span-6', 'lg:col-span-6'], 7: ['lg:col-span-7', 'lg:col-span-5'] };
/** Layout A / B — large photo + text side by side. `reverse` puts the media on the right. */
export default function MediaTextSection({ media, reverse = false, children, className = '', mediaCols = 6 }) {
  const [m, t] = span[mediaCols];
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${className}`}>
      <div className={`${m} ${reverse ? 'lg:order-2' : ''}`}><ParallaxMedia {...media} /></div>
      <div className={`${t} ${reverse ? 'lg:order-1' : ''}`}>{children}</div>
    </div>
  );
}
