import { ReactNode, useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Local time in Dhaka, updated every 30 s. */
export function useDhakaTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/**
 * The site uses hash routing (#/projects), so in-page anchors can't use #id.
 * This scrolls to an element on the current page instead, and briefly highlights it.
 */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}

/** Reference marker that points at an entry in the publication list on the same page. */
export function Cite({ n, target }: { n: number; target: string }) {
  return (
    <a
      className="cite"
      href="#/research"
      aria-label={`Reference ${n}`}
      onClick={(e) => {
        if (document.getElementById(target)) {
          e.preventDefault();
          scrollToId(target);
        }
      }}
    >
      [{n}]
    </a>
  );
}

export function Ext({ href, children, className = 'link' }: { href: string; children: ReactNode; className?: string }) {
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}
    </a>
  );
}

export function SectionHead({ title, note, id }: { title: string; note?: ReactNode; id?: string }) {
  return (
    <div className="section-head" id={id}>
      <h2 className="h2">{title}</h2>
      {note ? <p>{note}</p> : null}
    </div>
  );
}

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header style={{ marginBottom: 56 }}>
      <h1 className="h1 reveal">{title}</h1>
      {children ? (
        <div className="lede reveal d1" style={{ marginTop: 20, maxWidth: '52ch' }}>
          {children}
        </div>
      ) : null}
    </header>
  );
}

/** Bold the site owner's name inside an author list. */
export function Authors({ list }: { list: string }) {
  const me = 'Md Sifatullah Sheikh';
  const parts = list.split(me);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 ? <b>{me}</b> : null}
        </span>
      ))}
    </>
  );
}

export function copyText(text: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
  return Promise.resolve();
}
