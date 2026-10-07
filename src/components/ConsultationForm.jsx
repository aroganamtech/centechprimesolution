import { useState } from 'react';
import { consultOptions, site } from '../data/site';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT; // optional: POST JSON to your API / form service
const empty = { service: '', name: '', email: '', phone: '', message: '' };

export default function ConsultationForm({ title = 'Get A Free Consultation', sub = 'Drop us a line! We are here to answer your questions 24/7', dark = false }) {
  const [v, setV] = useState(empty);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle');
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); if (err[k]) setErr({ ...err, [k]: '' }); };

  const submit = async (e) => {
    e.preventDefault();
    const f = {};
    if (!v.service) f.service = 'Please choose an option.';
    if (v.name.trim().length < 2) f.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) f.email = 'Please enter a valid email address.';
    if (v.message.trim().length < 5) f.message = 'Please enter a short message.';
    setErr(f);
    if (Object.keys(f).length) return;
    if (!ENDPOINT) {
      const body = `Service: ${v.service}\nName: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '-'}\n\n${v.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Consultation request: ' + v.service)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }
    setStatus('sending');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(v) });
      if (!r.ok) throw new Error();
      setStatus('sent'); setV(empty);
    } catch { setStatus('error'); }
  };

  const E = ({ k }) => err[k] ? <p id={`${k}-err`} role="alert" className="mt-1 text-sm text-red-600">{err[k]}</p> : null;
  const bad = (k) => ({ 'aria-invalid': !!err[k], 'aria-describedby': err[k] ? `${k}-err` : undefined });

  return (
    <section className="bg-brand-light sec" aria-label="Free consultation">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 className="h2">{title}</h2>
          <p className="mt-4 text-mute">{sub}</p>
          <p className="mt-6 text-sm">Or email us at <a className="font-semibold text-brand hover:underline" href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
        <div className="lg:col-span-7">
          {status === 'sent' || status === 'mailto' ? (
            <div role="status" className="border border-brand bg-white p-8">
              <h3 className="h3">{status === 'sent' ? 'Thank you! Your message has been sent.' : 'Your email app should now be open.'}</h3>
              <p className="mt-3 text-mute">{status === 'sent' ? 'We will get back to you shortly.' : 'Your message is prepared but not yet sent — press send in your email app.'}</p>
              <button type="button" className="mt-5 text-sm font-semibold text-brand hover:underline" onClick={() => { setStatus('idle'); setV(empty); }}>Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="service" className="sr-only">Service</label>
                <select id="service" value={v.service} onChange={set('service')} className="field" {...bad('service')}>
                  <option value="">—Please choose an option—</option>
                  {consultOptions.map((o) => <option key={o}>{o}</option>)}
                </select><E k="service" />
              </div>
              <div><label htmlFor="name" className="sr-only">Your name</label><input id="name" autoComplete="name" placeholder="Your Name" value={v.name} onChange={set('name')} className="field" {...bad('name')} /><E k="name" /></div>
              <div><label htmlFor="email" className="sr-only">Your email</label><input id="email" type="email" autoComplete="email" placeholder="Your Email" value={v.email} onChange={set('email')} className="field" {...bad('email')} /><E k="email" /></div>
              <div className="sm:col-span-2"><label htmlFor="phone" className="sr-only">Phone</label><input id="phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" value={v.phone} onChange={set('phone')} className="field" /></div>
              <div className="sm:col-span-2"><label htmlFor="message" className="sr-only">Message</label><textarea id="message" rows={4} placeholder="Your Message" value={v.message} onChange={set('message')} className="field resize-none" {...bad('message')} /><E k="message" /></div>
              {status === 'error' && <p role="alert" className="sm:col-span-2 text-sm text-red-600">Sorry, something went wrong. Please try again or email {site.email}.</p>}
              <div className="sm:col-span-2"><button type="submit" disabled={status === 'sending'} className="btn">{status === 'sending' ? 'Sending…' : 'Submit'}</button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
