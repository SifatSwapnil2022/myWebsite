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

export default function Navbar({ currentPath }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md flex items-center justify-between px-6 md:px-12 transition-all duration-300 ${
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
        className="dsp text-2xl font-bold tracking-tight flex items-center gap-1 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
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
              className="text-xs font-bold tracking-widest uppercase transition-colors relative py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
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
          href="/files/CV_Sifat_Sheikh.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-colors duration-200 inline-flex items-center gap-2 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
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
        className="lg:hidden p-2 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
        style={{ color: INK }}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
        onMouseEnter={(e) => (e.currentTarget.style.color = CORAL)}
        onMouseLeave={(e) => (e.currentTarget.style.color = INK)}
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 top-20 z-40 lg:hidden flex flex-col justify-between p-8"
            style={{ backgroundColor: PAPER, borderTop: `1px solid ${INK}0D`, fontFamily: "'Inter', sans-serif" }}
          >
            <motion.div
              className="flex flex-col gap-6"
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: {},
              }}
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.path);
                return (
                  <motion.a
                    key={item.label}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -16 },
                    }}
                    className="dsp text-2xl font-bold tracking-tight transition-colors py-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C]"
                    style={{ color: active ? CORAL : INK }}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </motion.div>

            <div className="pt-8 space-y-6" style={{ borderTop: `1px solid ${INK}0D` }}>
              <a
                href="/resume.pdf"
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
                    className="transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
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
    </nav>
  );
}