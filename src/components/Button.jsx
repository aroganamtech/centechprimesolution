import { Link } from 'react-router-dom';
export const Arrow = () => (
  <svg className="arrow" width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true"><path d="M1 6h15M11 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" /></svg>
);
const cls = { primary: 'btn', light: 'btn-light', outline: 'btn-outline', ghost: 'btn-ghost' };
export function Button({ to, href, variant = 'primary', arrow = true, children, className = '', ...rest }) {
  const c = `${cls[variant]} ${className}`;
  const inner = <><span>{children}</span>{arrow && <Arrow />}</>;
  if (to) return <Link to={to} className={c} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={c} {...rest}>{inner}</a>;
  return <button className={c} {...rest}>{inner}</button>;
}
export function ArrowLink({ to, children, className = '' }) {
  return <Link to={to} className={`link-arrow ${className}`}><span className="link-u">{children}</span><Arrow /></Link>;
}
