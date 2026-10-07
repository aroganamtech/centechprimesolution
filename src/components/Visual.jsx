import { useMemo } from 'react';
import { rng } from '../utils/seed';
const W = 800, H = 600;

function Network({ r }) {
  const nodes = Array.from({ length: 34 }, () => ({ x: 40 + r() * (W - 80), y: 40 + r() * (H - 80), s: 1.8 + r() * 3.2, d: r() * 4 }));
  const edges = [];
  nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => { const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 150) edges.push([a, b, d]); }));
  return <g>{edges.map(([a, b, d], i) => <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity={0.5 - d / 400} />)}{nodes.map((n, i) => <circle key={i} cx={n.x} cy={n.y} r={n.s} fill={i % 7 === 0 ? 'var(--accent)' : 'currentColor'} style={{ animation: `pulse-node ${3 + n.d}s ease-in-out ${n.d}s infinite` }} />)}</g>;
}
function Contours({ r }) {
  const cx = 250 + r() * 300, cy = 200 + r() * 200;
  return <g fill="none">{Array.from({ length: 16 }, (_, i) => { const rad = 28 + i * 24; const pts = Array.from({ length: 48 }, (_, k) => { const a = (k / 48) * Math.PI * 2; const w = 1 + 0.16 * Math.sin(a * 3 + i * 0.45) + 0.08 * Math.cos(a * 5 - i * 0.3); return [cx + Math.cos(a) * rad * w * 1.35, cy + Math.sin(a) * rad * w]; }); return <path key={i} d={`M${pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join('L')}Z`} strokeOpacity={0.62 - i * 0.032} stroke={i === 5 ? 'var(--accent)' : 'currentColor'} />; })}</g>;
}
function Blocks({ r }) {
  const cols = 10, rows = 7, cw = W / cols, ch = H / rows;
  return <g>{Array.from({ length: cols * rows }, (_, i) => { const x = (i % cols) * cw, y = Math.floor(i / cols) * ch, v = r(); if (v < 0.5) return null; const a = v > 0.94; return <rect key={i} x={x + 6} y={y + 6} width={cw - 12} height={ch - 12} fill={a ? 'var(--accent)' : 'currentColor'} fillOpacity={a ? 0.9 : 0.04 + (v - 0.5) * 0.4} stroke="currentColor" strokeOpacity=".18" />; })}</g>;
}
function Orbits({ r }) {
  const cx = W / 2, cy = H / 2;
  return <g fill="none" stroke="currentColor">{[70, 130, 195, 260, 330].map((rad, i) => { const a = r() * Math.PI * 2; return <g key={i}><ellipse cx={cx} cy={cy} rx={rad * 1.25} ry={rad * 0.62} strokeOpacity=".35" transform={`rotate(${-18 + i * 6} ${cx} ${cy})`} strokeDasharray={i % 2 ? '2 6' : undefined} /><circle cx={cx + Math.cos(a) * rad * 1.1} cy={cy + Math.sin(a) * rad * 0.55} r={3 + i * 0.6} fill={i === 2 ? 'var(--accent)' : 'currentColor'} stroke="none" /></g>; })}<circle cx={cx} cy={cy} r="14" fill="var(--accent)" stroke="none" /></g>;
}
function Bars({ r }) {
  const n = 28, bw = W / n;
  return <g>{Array.from({ length: n }, (_, i) => { const h = 60 + (Math.sin(i / 3.2) * 0.5 + 0.5) * 300 * (0.5 + r() * 0.5); return <rect key={i} x={i * bw + 5} y={H - h - 40} width={bw - 10} height={h} fill={i === 19 ? 'var(--accent)' : 'currentColor'} fillOpacity={i === 19 ? 1 : 0.1 + (i / n) * 0.25} />; })}<line x1="0" y1={H - 40} x2={W} y2={H - 40} stroke="currentColor" strokeOpacity=".5" /></g>;
}
function Mesh({ r }) {
  const cols = 14, rows = 10;
  const pts = Array.from({ length: rows + 1 }, (_, j) => Array.from({ length: cols + 1 }, (_, i) => [(i / cols) * W + Math.sin(j * 0.7 + i * 0.35) * 22 + (r() - 0.5) * 6, (j / rows) * H + Math.cos(i * 0.5 + j * 0.3) * 22 + (r() - 0.5) * 6 - i * 4]));
  return <g fill="none" stroke="currentColor" strokeOpacity=".35">{pts.map((row, j) => <polyline key={'r' + j} points={row.map((p) => p.join(',')).join(' ')} />)}{pts[0].map((_, i) => <polyline key={'c' + i} points={pts.map((row) => row[i].join(',')).join(' ')} />)}{pts.flat().filter((_, i) => i % 23 === 0).map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="4" fill="var(--accent)" stroke="none" />)}</g>;
}
const map = { network: Network, contours: Contours, blocks: Blocks, orbits: Orbits, bars: Bars, mesh: Mesh };

/** Generated technology visual — used as an always-available fallback when a photo is missing. */
export default function Visual({ variant = 'network', seed = variant, className = '', label }) {
  const Comp = map[variant] || Network;
  const content = useMemo(() => <Comp r={rng(seed)} />, [Comp, seed]);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} className={`h-full w-full text-white ${className}`} style={{ '--accent': '#8fa8ff' }}>
      {content}
    </svg>
  );
}
