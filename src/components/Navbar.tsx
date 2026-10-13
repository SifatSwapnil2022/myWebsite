import { useEffect, useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import { LINKS, PROFILE } from '../data/portfolioData';

const PAGES = [
  { href: '#/about', label: 'About' },
  { href: '#/research', label: 'Research' },
  { href: '#/projects', label: 'Projects' },
  { href: '#/experience', label: 'Experience' },
  { href: '#/news', label: 'News' },
  { href: '#/contact', label: 'Contact' },
];

export default function Navbar({ currentPath }: { currentPath: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setOpen(false), [currentPath]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isCurrent = (href: string) => (currentPath === href ? 'page' : undefined);

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav-in">
          <a href="#/" className="nav-name" aria-current={currentPath === '#/' ? 'page' : undefined}>
            {PROFILE.name}
          </a>
          <nav className="nav-links" aria-label="Main">
            {PAGES.map((p) => (
              <a key={p.href} href={p.href} aria-current={isCurrent(p.href)}>
                {p.label}
              </a>
            ))}
          </nav>
          <a className="btn ghost nav-cv" href={PROFILE.cv} target="_blank" rel="noreferrer" style={{ height: 38 }}>
            CV <Download aria-hidden />
          </a>
          <button className="nav-menu" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="site-sheet">
            <Menu size={16} aria-hidden /> Menu
          </button>
        </div>
      </header>

      {open && (
        <div className="sheet" id="site-sheet" role="dialog" aria-modal="true" aria-label="Site menu">
          <div className="nav-in">
            <a href="#/" className="nav-name">
              {PROFILE.name}
            </a>
            <button className="nav-menu" onClick={() => setOpen(false)} style={{ display: 'inline-flex' }} autoFocus>
              <X size={16} aria-hidden /> Close
            </button>
          </div>
          <nav aria-label="Main">
            <a href="#/" aria-current={currentPath === '#/' ? 'page' : undefined}>
              Home
            </a>
            {PAGES.map((p) => (
              <a key={p.href} href={p.href} aria-current={isCurrent(p.href)}>
                {p.label}
              </a>
            ))}
          </nav>
          <div className="foot small">
            <a className="btn" href={PROFILE.cv} target="_blank" rel="noreferrer" style={{ justifyContent: 'center' }}>
              Download CV <Download aria-hidden />
            </a>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 8 }}>
              {LINKS.map((l) => (
                <a key={l.label} className="quiet-link" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
