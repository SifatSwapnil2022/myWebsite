import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

const INK = '#141414';
const PAPER = '#F7F6F2';
const MUTED = '#8C8982';
const LINE = 'rgba(255,255,255,.12)';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';

const EMAIL = 'mdsifatullahsheikh@gmail.com';
const CV_PATH = '/files/CV_Sifat_Sheikh.pdf';

const NAV_LINKS = [
  { label: 'Overview', href: '#/' },
  { label: 'About', href: '#/about' },
  { label: 'Experience', href: '#/experience' },
  { label: 'Research', href: '#/research' },
  { label: 'Projects', href: '#/projects' },
  { label: 'News', href: '#/news' },
  { label: 'Contact', href: '#/contact' },
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
    href: `mailto:${EMAIL}`,
    icon: Mail,
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
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

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copyEmail}
      className="footer-copy group inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 text-xs font-semibold"
      style={{
        color: '#fff',
        background: 'rgba(255,255,255,.06)',
        border: '1px solid rgba(255,255,255,.12)',
      }}
      aria-label="Copy email address"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Copy email
        </>
      )}
    </button>
  );
}

export default function Footer() {
  const reducedMotion = usePrefersReducedMotion();

  const year = useMemo(() => new Date().getFullYear(), []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer
      className="footer-pro relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #121212 0%, #171715 46%, #111111 100%)',
        color: '#fff',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        paddingBottom: 'max(28px, env(safe-area-inset-bottom))',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Inter:wght@400;500;600;700&display=swap');

        .footer-pro {
          isolation: isolate;
        }

        .footer-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.9), transparent 95%);
        }

        .footer-display {
          letter-spacing: -0.06em;
        }

        .footer-signature {
          color: ${ACCENT};
          font-family: 'Allura', cursive;
          font-size: clamp(3rem, 6vw, 5.6rem);
          line-height: .8;
          transform: rotate(-4deg);
          transform-origin: left center;
          width: fit-content;
        }

        .footer-ghost {
          font-size: clamp(6rem, 18vw, 16rem);
          line-height: .72;
          font-weight: 700;
          letter-spacing: -.075em;
          color: rgba(255,255,255,.025);
          user-select: none;
          white-space: nowrap;
        }

        .footer-link {
          position: relative;
          width: fit-content;
          color: rgba(255,255,255,.64);
          transition: color .25s ease;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform .3s cubic-bezier(.2,.7,.2,1);
        }

        .footer-link:hover {
          color: #fff;
        }

        .footer-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .footer-social-card {
          position: relative;
          overflow: hidden;
          transition:
            transform .35s cubic-bezier(.2,.7,.2,1),
            background-color .3s ease,
            border-color .3s ease;
        }

        .footer-social-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 0% 0%, rgba(229,83,61,.18), transparent 42%),
            radial-gradient(circle at 100% 100%, rgba(29,122,112,.12), transparent 42%);
          opacity: 0;
          transition: opacity .35s ease;
        }

        .footer-social-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,.22);
          background-color: rgba(255,255,255,.065);
        }

        .footer-social-card:hover::before {
          opacity: 1;
        }

        .footer-nav-row {
          transition:
            padding-left .28s cubic-bezier(.2,.7,.2,1),
            color .25s ease;
        }

        .footer-nav-row:hover {
          padding-left: 9px;
          color: #fff;
        }

        .footer-cta {
          position: relative;
          overflow: hidden;
        }

        .footer-cta::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            120deg,
            transparent 36%,
            rgba(255,255,255,.18) 50%,
            transparent 64%
          );
          transform: translateX(-120%) rotate(8deg);
          transition: transform .75s cubic-bezier(.2,.7,.2,1);
        }

        .footer-cta:hover::after {
          transform: translateX(120%) rotate(8deg);
        }

        .footer-pill {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        @supports not ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
          .footer-pill {
            background: rgba(35,35,33,.98) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-link,
          .footer-link::after,
          .footer-social-card,
          .footer-social-card::before,
          .footer-nav-row,
          .footer-cta::after {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* decorative layers */}
      <div
        aria-hidden="true"
        className="footer-grid pointer-events-none absolute inset-0 opacity-70"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full blur-[120px]"
        style={{ backgroundColor: 'rgba(229,83,61,.14)' }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-24 h-[400px] w-[400px] rounded-full blur-[140px]"
        style={{ backgroundColor: 'rgba(29,122,112,.10)' }}
      />

      <div
        aria-hidden="true"
        className="footer-ghost pointer-events-none absolute bottom-0 right-[-1vw] hidden xl:block"
      >
        SIFAT
      </div>

      <div className="relative z-10 mx-auto max-w-[1420px] px-4 py-10 sm:px-6 md:px-8 md:py-14 lg:px-10 lg:py-16">
        {/* -------------------------------------------------------------- */}
        {/* TOP CTA                                                        */}
        {/* -------------------------------------------------------------- */}
        <motion.section
          initial={
            reducedMotion ? false : { opacity: 0, y: 24 }
          }
          whileInView={
            reducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reducedMotion ? 0 : 0.7,
            ease: [0.2, 0.7, 0.2, 1],
          }}
          className="grid gap-8 border-b pb-10 md:grid-cols-12 md:gap-10 md:pb-14"
          style={{ borderColor: LINE }}
        >
          <div className="md:col-span-8">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span
                className="footer-pill inline-flex min-h-[32px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  background: 'rgba(255,255,255,.055)',
                  border: '1px solid rgba(255,255,255,.10)',
                  color: 'rgba(255,255,255,.72)',
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: TEAL,
                    boxShadow: '0 0 0 5px rgba(29,122,112,.10)',
                  }}
                />
                Dhaka, Bangladesh
              </span>

              <span
                className="footer-pill inline-flex min-h-[32px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                style={{
                  background: 'rgba(255,255,255,.055)',
                  border: '1px solid rgba(255,255,255,.10)',
                  color: 'rgba(255,255,255,.56)',
                }}
              >
                <LocalTime />
              </span>
            </div>

            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,.42)' }}
            >
              Contact
            </p>

            <h2 className="footer-display mt-4 max-w-5xl text-[clamp(3.5rem,9vw,8rem)] font-semibold leading-[0.84]">
              Let’s build
              <br />
              something useful.
            </h2>

            <div className="footer-signature mt-7" aria-label="Sifat">
              Sifat
            </div>
          </div>

          <div className="flex flex-col justify-end md:col-span-4">
            <p
              className="max-w-sm text-sm leading-7"
              style={{ color: 'rgba(255,255,255,.56)' }}
            >
              For research, project, or professional inquiries, you can reach me directly by email.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="footer-cta group mt-7 flex min-h-[56px] items-center justify-between rounded-2xl px-5"
              style={{
                background:
                  'linear-gradient(135deg, #ffffff 0%, #F4F1EB 100%)',
                color: INK,
                boxShadow:
                  '0 16px 35px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.8)',
              }}
            >
              <span className="relative z-10">
                <span
                  className="block text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  Email
                </span>
                <span className="mt-1 block truncate text-sm font-semibold">
                  {EMAIL}
                </span>
              </span>

              <span
                className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: INK,
                  color: '#fff',
                }}
              >
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>

            <div className="mt-3">
              <CopyEmailButton />
            </div>
          </div>
        </motion.section>

        {/* -------------------------------------------------------------- */}
        {/* FEATURE / QUICK LINKS                                          */}
        {/* -------------------------------------------------------------- */}
        <section
          className="grid gap-8 border-b py-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-10 lg:py-12"
          style={{ borderColor: LINE }}
        >
          {/* left */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: 'rgba(255,255,255,.38)' }}
              >
                Quick access
              </p>

              <Sparkles className="h-4 w-4" style={{ color: AMBER }} />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <a
                href={CV_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(255,255,255,.10), rgba(255,255,255,.045))',
                  border: '1px solid rgba(255,255,255,.12)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: 'rgba(255,255,255,.38)' }}
                    >
                      Document
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                      Curriculum Vitae
                    </h3>
                  </div>

                  <Download className="h-5 w-5" style={{ color: AMBER }} />
                </div>

                <p
                  className="mt-4 text-xs leading-6"
                  style={{ color: 'rgba(255,255,255,.52)' }}
                >
                  Education, experience, research, publications, and projects.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold">
                  Open CV
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>

              <a
                href="#/research"
                className="group relative overflow-hidden rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background:
                    'linear-gradient(145deg, rgba(229,83,61,.14), rgba(255,255,255,.04))',
                  border: '1px solid rgba(229,83,61,.18)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: 'rgba(255,255,255,.38)' }}
                    >
                      Selected work
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em]">
                      Research
                    </h3>
                  </div>

                  <ArrowUpRight className="h-5 w-5" style={{ color: ACCENT }} />
                </div>

                <p
                  className="mt-4 text-xs leading-6"
                  style={{ color: 'rgba(255,255,255,.52)' }}
                >
                  Publications and research projects in machine learning and computer vision.
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold">
                  View research
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>
            </div>
          </div>

          {/* right */}
          <div>
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,.38)' }}
            >
              Elsewhere
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="footer-social-card group flex min-h-[76px] items-center justify-between rounded-2xl px-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.045)',
                    border: '1px solid rgba(255,255,255,.10)',
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(255,255,255,.09)',
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="text-sm font-semibold">{label}</span>
                  </span>

                  <ArrowUpRight
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: 'rgba(255,255,255,.46)' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* SITEMAP                                                        */}
        {/* -------------------------------------------------------------- */}
        <section
          className="grid gap-8 border-b py-10 md:grid-cols-12 md:gap-10"
          style={{ borderColor: LINE }}
        >
          <div className="md:col-span-4">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,.38)' }}
            >
              Sitemap
            </p>

            <p
              className="mt-4 max-w-xs text-sm leading-7"
              style={{ color: 'rgba(255,255,255,.48)' }}
            >
              A quick way to move through the portfolio.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="grid sm:grid-cols-2">
              {NAV_LINKS.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="footer-nav-row group flex min-h-[52px] items-center justify-between border-b pr-3 text-sm"
                  style={{
                    borderColor: 'rgba(255,255,255,.08)',
                    color: 'rgba(255,255,255,.62)',
                  }}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className="w-5 text-[9px] font-medium tabular-nums"
                      style={{ color: 'rgba(255,255,255,.28)' }}
                    >
                      {String(index).padStart(2, '0')}
                    </span>
                    <span>{item.label}</span>
                  </span>

                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{ color: 'rgba(255,255,255,.32)' }}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* STATUS / META                                                  */}
        {/* -------------------------------------------------------------- */}
        <section className="grid gap-8 py-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,.055)',
                  border: '1px solid rgba(255,255,255,.10)',
                }}
              >
                <MapPin className="h-4 w-4" />
              </span>

              <div>
                <p
                  className="text-[9px] uppercase tracking-[0.14em]"
                  style={{ color: 'rgba(255,255,255,.34)' }}
                >
                  Based in
                </p>
                <p className="mt-1 text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <p
              className="text-[9px] uppercase tracking-[0.14em]"
              style={{ color: 'rgba(255,255,255,.34)' }}
            >
              Local time
            </p>
            <p className="mt-2 text-sm">
              <LocalTime />
            </p>
          </div>

          <div className="md:col-span-4 md:text-right">
            <button
              type="button"
              onClick={scrollToTop}
              className="group ml-auto inline-flex min-h-[46px] items-center gap-3 rounded-xl px-4 text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(255,255,255,.055)',
                border: '1px solid rgba(255,255,255,.10)',
                color: 'rgba(255,255,255,.78)',
              }}
              aria-label="Back to top"
            >
              Back to top
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  backgroundColor: '#fff',
                  color: INK,
                }}
              >
                <ArrowUp className="h-4 w-4" />
              </span>
            </button>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* COPYRIGHT                                                      */}
        {/* -------------------------------------------------------------- */}
        <div
          className="flex flex-col gap-3 border-t pt-5 text-[9px] uppercase tracking-[0.13em] sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderColor: LINE,
            color: 'rgba(255,255,255,.28)',
          }}
        >
          <span>© {year} Md Sifatullah Sheikh</span>
          <span>Machine Learning · Research · Computer Vision</span>
        </div>
      </div>
    </footer>
  );
}
