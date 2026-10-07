import { sidebar, fmtDate } from '../data/site';
export default function BlogSidebar({ q, setQ }) {
  const h = 'text-lg font-semibold text-navy border-b border-line pb-3';
  return (
    <aside aria-label="Blog sidebar" className="space-y-10">
      {setQ && (
        <div><h2 className={h}>Search</h2>
          <form role="search" onSubmit={(e) => e.preventDefault()} className="mt-4"><label htmlFor="bsearch" className="sr-only">Search posts</label>
            <input id="bsearch" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search…" className="field" /></form></div>
      )}
      <div><h2 className={h}>Recent Posts</h2>
        <ul className="mt-4 space-y-4">{sidebar.recent.map((p) => <li key={p.title}><p className="text-sm font-medium text-navy">{p.title}</p><time dateTime={p.date} className="text-xs text-mute">{fmtDate(p.date)}</time></li>)}</ul></div>
      <div><h2 className={h}>Categories</h2>
        <ul className="mt-4 space-y-2 text-sm text-mute">{sidebar.categories.map((c) => <li key={c}>{c}</li>)}</ul></div>
      <div><h2 className={h}>Tags</h2>
        <ul className="mt-4 flex flex-wrap gap-2">{sidebar.tags.map((c) => <li key={c} className="border border-line px-3 py-1 text-xs text-mute">{c}</li>)}</ul></div>
    </aside>
  );
}
