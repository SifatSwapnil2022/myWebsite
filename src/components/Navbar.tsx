import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowUpRight,
  ChevronRight,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
}

const INK = '#141414';
const PAPER = '#F7F6F2';
const MUTED = '#77756F';
const LINE = '#E7E3DB';
const ACCENT = '#E5533D';
const ACCENT_SOFT = '#F7DED8';
const TEAL = '#1D7A70';

const CV_PATH = '/files/CV_Sifat_Sheikh.pdf';

const NAV_ITEMS = [
  { label: 'About', path: '#/about', index: '01' },
  { label: 'Experience', path: '#/experience', index: '02' },
  { label: 'Research', path: '#/research', index: '03' },
  { label: 'Projects', path: '#/projects', index: '04' },
  { label: 'News', path: '#/news', index: '05' },
  { label: 'Contact', path: '#/contact', index: '06' },
];

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mdsifatullahsheikh',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SifatSwapnil2022',
    icon: Github,
  },
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ',
    icon: GraduationCap,
  },
  {
    label: 'Email',
    href: 'mailto:mdsifatullahsheikh@gmail.com',
    icon: Mail,
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;

      setProgress(total <= 0 ? 0 : Math.min(100, (window.scrollY / total) * 100));
    };

    update();

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date())
      );
    };

    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return <>{time || '--:--'} UTC+6</>;
}

export default function Navbar({ currentPath }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const scrollProgress = useScrollProgress();
  const oldOverflow = useRef('');

  const activePath = useMemo(() => {
    if (!currentPath || currentPath === '#/') return '#/';
    return currentPath;
  }, [currentPath]);

  const isActive = (path: string) => activePath === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      oldOverflow.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = oldOverflow.current;
      document.body.style.touchAction = '';
    }

    return () => {
      document.body.style.overflow = oldOverflow.current;
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --nav-safe-top: env(safe-area-inset-top, 0px);
          --nav-safe-bottom: env(safe-area-inset-bottom, 0px);
        }

        .nav-shell {
          isolation: isolate;
        }

        .nav-glass {
          position: relative;
          overflow: hidden;
        }

        .nav-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 16% 20%, rgba(229,83,61,.10), transparent 26%),
            radial-gradient(circle at 84% 16%, rgba(29,122,112,.08), transparent 24%);
          opacity: .9;
          z-index: -1;
        }

        .nav-brand-mark {
          position: relative;
          overflow: hidden;
        }

        .nav-brand-mark::after {
          content: "";
          position: absolute;
          inset: -35%;
          background: linear-gradient(
            120deg,
            transparent 30%,
            rgba(255,255,255,.28) 48%,
            transparent 65%
          );
          transform: translateX(-120%) rotate(8deg);
          transition: transform .65s cubic-bezier(.2,.7,.2,1);
        }

        .nav-brand:hover .nav-brand-mark::after {
          transform: translateX(120%) rotate(8deg);
        }

        .nav-item {
          position: relative;
          -webkit-tap-highlight-color: transparent;
        }

        .nav-item-label {
          position: relative;
          z-index: 2;
          transition: color .25s ease;
        }

        .nav-hover-dot {
          opacity: 0;
          transform: scale(.6);
          transition: opacity .2s ease, transform .25s cubic-bezier(.2,.7,.2,1);
        }

        .nav-item:hover .nav-hover-dot {
          opacity: 1;
          transform: scale(1);
        }

        .nav-action {
          -webkit-tap-highlight-color: transparent;
        }

        .mobile-menu-surface {
          min-height: 100vh;
          min-height: 100dvh;
          padding-top: var(--nav-safe-top);
          padding-bottom: var(--nav-safe-bottom);
        }

        .mobile-menu-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.9), transparent 92%);
        }

        .mobile-nav-card {
          position: relative;
          overflow: hidden;
        }

        .mobile-nav-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(229,83,61,.08),
            transparent 42%
          );
          opacity: 0;
          transition: opacity .28s ease;
        }

        .mobile-nav-card:hover::before {
          opacity: 1;
        }

        .mobile-nav-number {
          font-variant-numeric: tabular-nums;
        }

        @supports not ((backdrop-filter: blur(14px)) or (-webkit-backdrop-filter: blur(14px))) {
          .nav-backdrop {
            background: rgba(247,246,242,.98) !important;
          }
        }

        @media (max-width: 380px) {
          .nav-mobile-name {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-brand-mark::after,
          .nav-item-label,
          .nav-hover-dot,
          .mobile-nav-card::before {
            transition: none !important;
          }
        }
      `}</style>

      {/* --------------------------------------------------------------- */}
      {/* PAGE PROGRESS                                                   */}
      {/* --------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[100] h-[2px]"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${ACCENT}, #F0A54A, ${TEAL})`,
          transition: reducedMotion ? 'none' : 'width 100ms linear',
        }}
      />

      {/* --------------------------------------------------------------- */}
      {/* DESKTOP / TABLET NAVBAR                                         */}
      {/* --------------------------------------------------------------- */}
      <header
        className="nav-shell fixed inset-x-0 top-0 z-[80] px-3 sm:px-4 md:px-6 lg:px-8"
        style={{
          paddingTop: 'max(10px, env(safe-area-inset-top))',
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <motion.nav
          initial={false}
          animate={{
            y: scrolled ? 0 : 2,
            scale: scrolled ? 0.992 : 1,
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.28,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="nav-glass nav-backdrop mx-auto flex max-w-[1420px] items-center justify-between gap-3"
          style={{
            minHeight: scrolled ? 60 : 70,
            padding: scrolled ? '8px 10px' : '9px 10px',
            backgroundColor: scrolled
              ? 'rgba(247,246,242,.82)'
              : 'rgba(247,246,242,.72)',
            WebkitBackdropFilter: 'blur(18px) saturate(145%)',
            backdropFilter: 'blur(18px) saturate(145%)',
            border: `1px solid ${scrolled ? 'rgba(210,205,195,.82)' : 'rgba(225,221,212,.78)'}`,
            borderRadius: scrolled ? 20 : 24,
            boxShadow: scrolled
              ? '0 16px 45px rgba(20,20,20,.10), inset 0 1px 0 rgba(255,255,255,.72)'
              : '0 10px 34px rgba(20,20,20,.055), inset 0 1px 0 rgba(255,255,255,.64)',
            transition:
              'min-height .28s cubic-bezier(.2,.7,.2,1), border-radius .28s ease, box-shadow .28s ease, border-color .28s ease, background-color .28s ease',
          }}
        >
          {/* BRAND */}
          <a
            href="#/"
            className="nav-brand flex min-w-0 items-center gap-3 rounded-xl px-1.5 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5533D]"
            aria-label="Go to homepage"
          >
            <span
              className="nav-brand-mark flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold tracking-[-0.02em]"
              style={{
                color: '#fff',
                background:
                  'linear-gradient(135deg, #141414 0%, #2D2D2A 60%, #4A3B35 100%)',
                boxShadow:
                  '0 7px 20px rgba(20,20,20,.14), inset 0 1px 0 rgba(255,255,255,.12)',
              }}
            >
              SS
            </span>

            <span className="min-w-0">
              <span className="nav-mobile-name block truncate text-[13px] font-semibold tracking-[-0.02em] sm:text-sm">
                Sifatullah Sheikh
              </span>
              <span
                className="hidden text-[8px] font-medium uppercase tracking-[0.14em] sm:block"
                style={{ color: MUTED }}
              >
                Junior ML Engineer
              </span>
            </span>
          </a>

          {/* DESKTOP NAV */}
          <div
            className="hidden items-center rounded-2xl p-1 xl:flex"
            style={{
              background: 'rgba(255,255,255,.52)',
              border: `1px solid rgba(222,217,207,.86)`,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.7)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onMouseEnter={() => setHoveredItem(item.path)}
                  onMouseLeave={() => setHoveredItem(null)}
                  aria-current={active ? 'page' : undefined}
                  className="nav-item relative flex min-h-[40px] items-center gap-2 rounded-xl px-3.5 text-[11px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5533D]"
                  style={{
                    color: active ? INK : MUTED,
                  }}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-active-nav"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: '#fff',
                        border: `1px solid ${LINE}`,
                        boxShadow:
                          '0 6px 18px rgba(20,20,20,.065), inset 0 1px 0 rgba(255,255,255,.88)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 34,
                      }}
                    />
                  )}

                  <span
                    className="nav-hover-dot relative z-[2] h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor:
                        active || hoveredItem === item.path
                          ? ACCENT
                          : 'rgba(20,20,20,.25)',
                      opacity: active ? 1 : undefined,
                      transform: active ? 'scale(1)' : undefined,
                    }}
                  />

                  <span className="nav-item-label">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <div
              className="hidden items-center gap-2 rounded-full px-3 py-2 lg:flex"
              style={{
                border: `1px solid ${LINE}`,
                background: 'rgba(255,255,255,.46)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: TEAL }}
              />
              <span
                className="text-[9px] font-medium uppercase tracking-[0.12em]"
                style={{ color: MUTED }}
              >
                Dhaka · <LocalTime />
              </span>
            </div>

            <a
              href={CV_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-action group inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5533D]"
              style={{
                background:
                  'linear-gradient(135deg, #161616 0%, #2A2A27 100%)',
                color: '#fff',
                boxShadow:
                  '0 8px 22px rgba(20,20,20,.14), inset 0 1px 0 rgba(255,255,255,.1)',
              }}
            >
              CV
              <Download className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* TABLET / MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="nav-action flex h-11 w-11 shrink-0 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5533D] xl:hidden"
            style={{
              background: 'rgba(255,255,255,.66)',
              border: `1px solid ${LINE}`,
              color: INK,
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.76)',
            }}
            aria-label="Open navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="portfolio-mobile-navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
        </motion.nav>
      </header>

      {/* --------------------------------------------------------------- */}
      {/* MOBILE + TABLET FULL MENU                                       */}
      {/* --------------------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="portfolio-mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.985, y: -8 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.985, y: -8 }
            }
            transition={{
              duration: reducedMotion ? 0.15 : 0.32,
              ease: [0.2, 0.7, 0.2, 1],
            }}
            className="mobile-menu-surface fixed inset-0 z-[95] overflow-hidden"
            style={{
              backgroundColor: PAPER,
              color: INK,
              fontFamily:
                'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            <div
              aria-hidden="true"
              className="mobile-menu-grid pointer-events-none absolute inset-0 opacity-60"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full blur-[100px]"
              style={{ backgroundColor: 'rgba(229,83,61,.12)' }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-24 h-80 w-80 rounded-full blur-[110px]"
              style={{ backgroundColor: 'rgba(29,122,112,.10)' }}
            />

            <div className="relative z-10 flex h-full min-h-0 flex-col">
              {/* MOBILE HEADER */}
              <div
                className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6"
                style={{ borderBottom: `1px solid ${LINE}` }}
              >
                <a
                  href="#/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-[11px] font-bold text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, #141414 0%, #3A3430 100%)',
                    }}
                  >
                    SS
                  </span>

                  <span>
                    <span className="block text-sm font-semibold tracking-[-0.02em]">
                      Sifatullah Sheikh
                    </span>
                    <span
                      className="block text-[8px] uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      Portfolio
                    </span>
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5533D]"
                  style={{
                    backgroundColor: '#fff',
                    border: `1px solid ${LINE}`,
                  }}
                  aria-label="Close navigation"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* MAIN MENU */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-7">
                <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[1.15fr_.85fr]">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <p
                        className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: MUTED }}
                      >
                        Navigate
                      </p>

                      <span
                        className="rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em]"
                        style={{
                          color: TEAL,
                          backgroundColor: 'rgba(29,122,112,.08)',
                          border: '1px solid rgba(29,122,112,.14)',
                        }}
                      >
                        <LocalTime />
                      </span>
                    </div>

                    <motion.div
                      initial="closed"
                      animate="open"
                      variants={{
                        open: {
                          transition: {
                            staggerChildren: reducedMotion ? 0 : 0.045,
                            delayChildren: reducedMotion ? 0 : 0.06,
                          },
                        },
                        closed: {},
                      }}
                    >
                      <motion.a
                        href="#/"
                        onClick={() => setMobileMenuOpen(false)}
                        variants={{
                          open: { opacity: 1, y: 0 },
                          closed: {
                            opacity: 0,
                            y: reducedMotion ? 0 : 12,
                          },
                        }}
                        className="mobile-nav-card group mb-2 flex min-h-[64px] items-center justify-between rounded-2xl px-4"
                        style={{
                          backgroundColor:
                            activePath === '#/' ? '#fff' : 'rgba(255,255,255,.52)',
                          border: `1px solid ${
                            activePath === '#/' ? '#DDD8CF' : LINE
                          }`,
                          boxShadow:
                            activePath === '#/'
                              ? '0 10px 28px rgba(20,20,20,.06)'
                              : 'none',
                        }}
                      >
                        <div className="relative z-10 flex items-center gap-4">
                          <span
                            className="mobile-nav-number text-[10px] font-medium"
                            style={{ color: MUTED }}
                          >
                            00
                          </span>
                          <span className="text-[22px] font-semibold tracking-[-0.035em] sm:text-2xl">
                            Overview
                          </span>
                        </div>

                        <ChevronRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </motion.a>

                      {NAV_ITEMS.map((item) => {
                        const active = isActive(item.path);

                        return (
                          <motion.a
                            key={item.path}
                            href={item.path}
                            onClick={() => setMobileMenuOpen(false)}
                            variants={{
                              open: { opacity: 1, y: 0 },
                              closed: {
                                opacity: 0,
                                y: reducedMotion ? 0 : 12,
                              },
                            }}
                            className="mobile-nav-card group mb-2 flex min-h-[64px] items-center justify-between rounded-2xl px-4"
                            style={{
                              backgroundColor: active
                                ? '#fff'
                                : 'rgba(255,255,255,.52)',
                              border: `1px solid ${
                                active ? '#DDD8CF' : LINE
                              }`,
                              boxShadow: active
                                ? '0 10px 28px rgba(20,20,20,.06)'
                                : 'none',
                            }}
                          >
                            <div className="relative z-10 flex items-center gap-4">
                              <span
                                className="mobile-nav-number text-[10px] font-medium"
                                style={{ color: active ? ACCENT : MUTED }}
                              >
                                {item.index}
                              </span>

                              <span
                                className="text-[22px] font-semibold tracking-[-0.035em] sm:text-2xl"
                                style={{ color: active ? ACCENT : INK }}
                              >
                                {item.label}
                              </span>
                            </div>

                            <ChevronRight
                              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                              style={{ color: active ? ACCENT : INK }}
                            />
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* RIGHT INFO PANEL */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div
                      className="rounded-3xl p-5"
                      style={{
                        background:
                          'linear-gradient(145deg, #171717 0%, #262522 100%)',
                        color: '#fff',
                        boxShadow: '0 18px 42px rgba(20,20,20,.14)',
                      }}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p
                            className="text-[9px] font-medium uppercase tracking-[0.16em]"
                            style={{ color: 'rgba(255,255,255,.46)' }}
                          >
                            Quick access
                          </p>

                          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                            Curriculum Vitae
                          </h3>
                        </div>

                        <Sparkles
                          className="h-5 w-5"
                          style={{ color: '#F0A54A' }}
                        />
                      </div>

                      <p
                        className="mt-3 text-xs leading-6"
                        style={{ color: 'rgba(255,255,255,.58)' }}
                      >
                        My education, work, papers, and projects in one PDF.
                      </p>

                      <a
                        href={CV_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 flex min-h-[46px] items-center justify-between rounded-xl px-4 text-xs font-semibold"
                        style={{
                          backgroundColor: '#fff',
                          color: INK,
                        }}
                      >
                        Open CV
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div
                      className="rounded-3xl p-5"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.62)',
                        border: `1px solid ${LINE}`,
                      }}
                    >
                      <p
                        className="text-[9px] font-medium uppercase tracking-[0.16em]"
                        style={{ color: MUTED }}
                      >
                        Connect
                      </p>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                          <a
                            key={label}
                            href={href}
                            target={
                              href.startsWith('mailto:')
                                ? undefined
                                : '_blank'
                            }
                            rel={
                              href.startsWith('mailto:')
                                ? undefined
                                : 'noopener noreferrer'
                            }
                            className="flex min-h-[48px] items-center gap-2 rounded-xl px-3 text-[11px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
                            style={{
                              backgroundColor: '#fff',
                              border: `1px solid ${LINE}`,
                            }}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </a>
                        ))}
                      </div>

                      <div
                        className="mt-4 flex items-center justify-between border-t pt-4"
                        style={{ borderColor: LINE }}
                      >
                        <div>
                          <p
                            className="text-[9px] uppercase tracking-[0.14em]"
                            style={{ color: MUTED }}
                          >
                            Based in
                          </p>
                          <p className="mt-1 text-xs font-medium">
                            Dhaka, Bangladesh
                          </p>
                        </div>

                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: TEAL,
                            boxShadow: '0 0 0 5px rgba(29,122,112,.08)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM STRIP */}
              <div
                className="shrink-0 px-4 py-3 sm:px-6"
                style={{
                  borderTop: `1px solid ${LINE}`,
                  backgroundColor: 'rgba(247,246,242,.84)',
                  WebkitBackdropFilter: 'blur(12px)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
                  <span
                    className="text-[9px] uppercase tracking-[0.13em]"
                    style={{ color: MUTED }}
                  >
                    Md Sifatullah Sheikh
                  </span>

                  <a
                    href="mailto:mdsifatullahsheikh@gmail.com"
                    className="inline-flex min-h-[44px] items-center gap-2 text-[11px] font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* space reserved for the floating navbar */}
      <div
        aria-hidden="true"
        style={{
          height: 'calc(82px + env(safe-area-inset-top, 0px))',
        }}
      />
    </>
  );
}