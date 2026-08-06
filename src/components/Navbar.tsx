import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, Download, Github, Linkedin, Mail } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
}

const NAV_ITEMS = [
  { label: 'Overview', path: '#/' },
  { label: 'About', path: '#/about' },
  { label: 'Experience', path: '#/experience' },
  { label: 'Research & Publications', path: '#/research' },
  { label: 'Projects', path: '#/projects' },
  { label: 'News', path: '#/news' },
  { label: 'Contact', path: '#/contact' },
];

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/SifatSwapnil2022', label: 'Visit GitHub profile' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/mdsifatullahsheikh', label: 'Visit LinkedIn profile' },
  { icon: Mail, href: 'mailto:mdsifatullahsheikh@gmail.com', label: 'Send an email' },
];

const CORAL = '#FF5A3C';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

const CV_PATH = '/files/CV_Sifat_Sheikh.pdf';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return reduced;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const isActive = (path: string) => {
    if (path === '#/') {
      return currentPath === '#/' || currentPath === '';
    }
    return currentPath === path;
  };

  // Tighten / elevate the navbar once the user scrolls past the top
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu on Escape for keyboard users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock background scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 md:px-12 transition-all duration-300 ${
          scrolled ? 'h-16 shadow-[0_8px_30px_rgba(22,25,43,0.08)]' : 'h-20'
        }`}
        style={{
          backgroundColor: 'rgba(250,250,247,0.95)',
          borderBottom: scrolled ? `1px solid ${INK}1A` : `1px solid ${INK}0D`,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
          .dsp { font-family: 'Space Grotesk', sans-serif; }
        `}</style>

        <a
          href="#/"
          className="dsp text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1 rounded-sm transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
          style={{ color: INK }}
        >
          <span>Sifatullah</span>
          <span style={{ color: CORAL }}>.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.label}
                href={item.path}
                aria-current={active ? 'page' : undefined}
                className="text-xs font-bold tracking-widest uppercase transition-colors duration-200 relative py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                style={{ color: active ? CORAL : `${INK}99` }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = CORAL; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = `${INK}99`; }}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ backgroundColor: CORAL }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* CV Download button */}
          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
            style={{ backgroundColor: INK, color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
          >
            Resume / CV
            <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
          style={{ color: INK }}
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
          onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Mobile Menu — full-viewport takeover, drops down and covers
          everything below it (including this navbar), Nike/Adidas-style,
          rather than a small panel that leaves the navbar visible above it */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={reducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reducedMotion ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reducedMotion ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={reducedMotion ? { duration: 0.2 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-60 lg:hidden flex flex-col"
            style={{ backgroundColor: PAPER, fontFamily: "'Inter', sans-serif" }}
          >
            {/* Overlay header — logo + close, since this covers the navbar itself */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-20 shrink-0"
              style={{ borderBottom: `1px solid ${INK}0D` }}
            >
              <a
                href="#/"
                onClick={() => setMobileMenuOpen(false)}
                className="dsp text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1"
                style={{ color: INK }}
              >
                <span>Sifatullah</span>
                <span style={{ color: CORAL }}>.</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                style={{ color: INK }}
                aria-label="Close menu"
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${CORAL}14`; e.currentTarget.style.color = CORAL; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = INK; }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links — large, numbered, Nike-style stacked list */}
            <motion.div
              className="flex-1 overflow-y-auto flex flex-col justify-center px-6 sm:px-10 py-8"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: reducedMotion ? 0 : 0.2 } },
                closed: {},
              }}
            >
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.path);
                return (
                  <motion.a
                    key={item.label}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: reducedMotion ? 0 : 24 },
                    }}
                    className="group flex items-baseline gap-4 py-4 sm:py-5 transition-colors duration-200"
                    style={{ borderBottom: `1px solid ${INK}0D` }}
                  >
                    <span
                      className="font-mono text-xs sm:text-sm shrink-0"
                      style={{ color: active ? CORAL : `${INK}40` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="dsp text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-200"
                      style={{ color: active ? CORAL : INK }}
                    >
                      {item.label}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Footer: CV button + socials */}
            <div
              className="px-6 sm:px-10 py-6 sm:py-8 space-y-5 sm:space-y-6 shrink-0"
              style={{ borderTop: `1px solid ${INK}0D` }}
            >
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-full font-bold text-center tracking-widest uppercase text-xs flex items-center justify-center gap-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                style={{ backgroundColor: INK, color: '#fff' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                Download CV / Resume
                <Download className="w-4 h-4" />
              </a>

              <div className="flex justify-center gap-6">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="transition-colors duration-200 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                    style={{ color: `${INK}99` }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = `${INK}99`)}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}