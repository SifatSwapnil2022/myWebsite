import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Copy,
  Check,
  FileDown,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { PROJECTS, NEWS } from '../data/portfolioData';
import { getIcon } from '../components/ProjectModal';

const INK = '#141414';
const PAPER = '#F7F5EF';
const PAPER_2 = '#EFEAE1';
const WHITE = '#FFFFFF';
const MUTED = '#716F69';
const LINE = '#E3DED4';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';

const EMAIL = 'mdsifatullahsheikh@gmail.com';
const CV_PATH = '/files/CV_Sifat_Sheikh.pdf';

const GOOGLE_MAPS_API_KEY = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

const GOOGLE_MAP_SRC = GOOGLE_MAPS_API_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=Dhaka%2CBangladesh&zoom=11&maptype=roadmap`
  : 'https://www.google.com/maps?q=Dhaka%2C%20Bangladesh&z=11&output=embed';

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
    href: 'https://scholar.google.com/citations?user=7m3g1cEAAAAJ',
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

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
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

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reducedMotion ? 0 : 0.66,
        delay: reducedMotion ? 0 : delay / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  index,
  eyebrow,
  title,
  description,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="grid gap-5 border-b pb-6 md:grid-cols-12 md:items-end" style={{ borderColor: LINE }}>
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-semibold tabular-nums"
            style={{
              backgroundColor: WHITE,
              border: `1px solid ${LINE}`,
              color: MUTED,
            }}
          >
            {index}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: MUTED }}
          >
            {eyebrow}
          </span>
        </div>
      </div>

      <div className="md:col-span-6">
        <h2 className="home-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
          {title}
        </h2>
      </div>

      {description && (
        <div className="md:col-span-3">
          <p className="text-sm leading-6" style={{ color: MUTED }}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

function BankStyleSignature() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="signature-demo"
      aria-label="Stylized Sifat signature"
      title="Stylized signature wordmark"
    >
      <svg
        viewBox="0 0 270 92"
        className="block h-auto w-[190px] sm:w-[220px]"
        role="img"
        aria-label="Sifat signature"
      >
        <g transform="translate(4 2) rotate(-4 120 40) skewX(-8)">
          <text
            x="8"
            y="58"
            fontFamily="'Allura', cursive"
            fontSize="64"
            fill={INK}
            style={{ letterSpacing: '-1px' }}
          >
            Sifat
          </text>

          <motion.path
            d="M28 70 C72 79, 128 79, 203 67 C222 64, 238 66, 251 71"
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.86 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 1.1,
              delay: reducedMotion ? 0 : 0.35,
              ease: [0.2, 0.7, 0.2, 1],
            }}
          />

          <motion.path
            d="M171 72 C205 90, 239 88, 260 75"
            fill="none"
            stroke={INK}
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity="0.58"
            initial={reducedMotion ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: reducedMotion ? 0 : 0.9,
              delay: reducedMotion ? 0 : 0.6,
            }}
          />
        </g>
      </svg>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="home-mini-action inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 text-xs font-semibold"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        color: INK,
      }}
      aria-label="Copy email address"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}

function GoogleMapCard() {
  return (
    <div
      className="home-map relative overflow-hidden rounded-[26px]"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        boxShadow: '0 22px 60px rgba(20,20,20,.06)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: 'clamp(300px, 38vw, 430px)' }}
      >
        <iframe
          title="Dhaka, Bangladesh — Google Maps"
          src={GOOGLE_MAP_SRC}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            border: 0,
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{
            background:
              'linear-gradient(to bottom, rgba(247,245,239,.74), transparent)',
          }}
        />

        <div
          className="home-map-badge absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl px-4 py-3"
          style={{
            backgroundColor: 'rgba(255,255,255,.90)',
            border: '1px solid rgba(255,255,255,.72)',
            boxShadow: '0 12px 30px rgba(20,20,20,.10)',
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              backgroundColor: 'rgba(229,83,61,.10)',
              color: ACCENT,
            }}
          >
            <MapPin className="h-4 w-4" />
          </span>
          <div>
            <p
              className="text-[9px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              Based in
            </p>
            <p className="mt-0.5 text-sm font-semibold">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 divide-x" style={{ borderTop: `1px solid ${LINE}`, borderColor: LINE }}>
        <div className="p-4">
          <p className="text-[9px] uppercase tracking-[0.14em]" style={{ color: MUTED }}>
            Local time
          </p>
          <p className="mt-1.5 text-sm font-semibold">
            <LocalTime />
          </p>
        </div>

        <div className="p-4">
          <p className="text-[9px] uppercase tracking-[0.14em]" style={{ color: MUTED }}>
            Map
          </p>
          <p className="mt-1.5 text-sm font-semibold">Google Maps</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const featuredProject = PROJECTS[0];
  const secondaryProjects = PROJECTS.slice(1, 3);
  const latestNews = NEWS.slice(0, 3);

  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const projectCount = useMemo(() => PROJECTS.length, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--spot-x', `${x}%`);
      node.style.setProperty('--spot-y', `${y}%`);
    };

    node.addEventListener('pointermove', onMove);
    return () => node.removeEventListener('pointermove', onMove);
  }, [reducedMotion]);

  return (
    <main
      className="home-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --home-safe-bottom: env(safe-area-inset-bottom, 0px);
        }

        .home-pro {
          isolation: isolate;
        }

        .home-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .home-display {
          letter-spacing: -0.065em;
        }

        .home-section-title {
          letter-spacing: -0.045em;
        }

        .home-hero {
          --spot-x: 76%;
          --spot-y: 18%;
          position: relative;
        }

        .home-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--spot-x) var(--spot-y),
              rgba(229,83,61,.11),
              transparent 23%
            );
          opacity: .8;
          z-index: 0;
        }

        .home-soft-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.9), transparent 94%);
        }

        .home-hero-photo {
          transition:
            transform .65s cubic-bezier(.2,.7,.2,1),
            filter .45s ease;
        }

        .home-photo-shell:hover .home-hero-photo {
          transform: scale(1.018);
        }

        .home-photo-shell {
          position: relative;
        }

        .home-photo-shell::after {
          content: "";
          position: absolute;
          inset: 12px -12px -12px 12px;
          border: 1px solid ${LINE};
          border-radius: 24px;
          z-index: -1;
        }

        .home-primary-link {
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }

        .home-primary-link::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            120deg,
            transparent 38%,
            rgba(255,255,255,.18) 50%,
            transparent 62%
          );
          transform: translateX(-120%) rotate(8deg);
          transition: transform .72s cubic-bezier(.2,.7,.2,1);
        }

        .home-primary-link:hover::after {
          transform: translateX(120%) rotate(8deg);
        }

        .home-secondary-link {
          position: relative;
          width: fit-content;
        }

        .home-secondary-link::after {
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

        .home-secondary-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .home-quick-card {
          transition:
            transform .35s cubic-bezier(.2,.7,.2,1),
            box-shadow .35s ease,
            border-color .3s ease;
        }

        .home-quick-card:hover {
          transform: translateY(-4px);
          border-color: #D8D1C5;
          box-shadow: 0 16px 36px rgba(20,20,20,.07);
        }

        .home-research-image,
        .home-project-image {
          transition: transform .8s cubic-bezier(.2,.7,.2,1);
        }

        .home-research-card:hover .home-research-image,
        .home-project-card:hover .home-project-image {
          transform: scale(1.025);
        }

        .home-project-card {
          transition:
            transform .38s cubic-bezier(.2,.7,.2,1),
            box-shadow .35s ease;
        }

        .home-project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 50px rgba(20,20,20,.08);
        }

        .home-news-row {
          transition:
            padding-left .3s cubic-bezier(.2,.7,.2,1),
            background-color .25s ease;
        }

        .home-news-row:hover {
          padding-left: 10px;
          background: rgba(255,255,255,.56);
        }

        .home-social-card {
          transition:
            transform .3s cubic-bezier(.2,.7,.2,1),
            background-color .25s ease,
            box-shadow .3s ease;
        }

        .home-social-card:hover {
          transform: translateY(-3px);
          background: #fff;
          box-shadow: 0 14px 32px rgba(20,20,20,.06);
        }

        .home-map iframe {
          filter: grayscale(1) saturate(.45) contrast(.92) brightness(1.03);
          transition:
            filter .6s ease,
            transform .8s cubic-bezier(.2,.7,.2,1);
        }

        .home-map:hover iframe {
          filter: grayscale(.2) saturate(.8) contrast(.96) brightness(1);
          transform: scale(1.008);
        }

        .home-dark-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .home-dark-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 15% 18%, rgba(229,83,61,.18), transparent 28%),
            radial-gradient(circle at 86% 78%, rgba(29,122,112,.14), transparent 30%);
        }

        .signature-demo {
          width: fit-content;
          transform-origin: left center;
        }

        @supports not ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
          .home-map-badge {
            background-color: rgba(255,255,255,.98) !important;
          }
        }

        @media (min-width: 640px) {
          .home-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .home-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (max-width: 390px) {
          .home-display {
            letter-spacing: -0.055em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-hero-photo,
          .home-primary-link::after,
          .home-secondary-link::after,
          .home-quick-card,
          .home-research-image,
          .home-project-image,
          .home-project-card,
          .home-news-row,
          .home-social-card,
          .home-map iframe {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ================================================================= */}
      {/* HERO                                                              */}
      {/* ================================================================= */}
      <section
        ref={heroRef}
        className="home-hero relative border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F5F1E9 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="home-soft-grid pointer-events-none absolute inset-0 opacity-75"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="home-page-width relative z-10 grid min-h-[760px] items-center gap-12 py-12 md:grid-cols-12 md:gap-8 md:py-16 lg:min-h-[820px] lg:py-20">
          {/* hero copy */}
          <div className="md:col-span-8 lg:col-span-8">
            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex min-h-[34px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.15em]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.66)',
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: TEAL,
                      boxShadow: '0 0 0 5px rgba(29,122,112,.08)',
                    }}
                  />
                  ML Engineer · Researcher
                </span>

                <span
                  className="inline-flex min-h-[34px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.46)',
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  <Clock3 className="h-3.5 w-3.5" />
                  <LocalTime />
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1
                className="home-display max-w-[920px] text-[clamp(3.6rem,9vw,8rem)] font-semibold leading-[0.82]"
                style={{ color: INK }}
              >
                Md Sifatullah
                <br />
                Sheikh
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-5">
                <BankStyleSignature />
              </div>
            </Reveal>

            <Reveal delay={145}>
              <p
                className="mt-8 max-w-[620px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                Computer science graduate working on computer vision, multimodal
                learning, and machine learning research.
              </p>
            </Reveal>

            <Reveal delay={185}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#/research"
                  className="home-primary-link group inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl px-5 text-xs font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, #151515 0%, #2B2926 100%)',
                    color: '#fff',
                    boxShadow:
                      '0 12px 30px rgba(20,20,20,.14), inset 0 1px 0 rgba(255,255,255,.10)',
                  }}
                >
                  <span className="relative z-10">Explore research</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href="#/projects"
                  className="home-mini-action inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl px-5 text-xs font-semibold"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                    color: INK,
                  }}
                >
                  Selected projects
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-mini-action inline-flex min-h-[50px] items-center justify-center gap-2 rounded-2xl px-5 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.52)',
                    border: `1px solid ${LINE}`,
                    color: INK,
                  }}
                >
                  <FileDown className="h-4 w-4" />
                  CV
                </a>
              </div>
            </Reveal>

            <Reveal delay={225}>
              <div className="mt-10 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['Focus', 'Computer Vision'],
                  ['Based in', 'Dhaka, Bangladesh'],
                  ['Work', 'Research + Engineering'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="home-quick-card rounded-2xl p-4"
                    style={{
                      backgroundColor: 'rgba(255,255,255,.58)',
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* portrait */}
          <div className="md:col-span-4 lg:col-span-4">
            <Reveal delay={130}>
              <div className="ml-auto w-full max-w-[300px] md:max-w-[250px] lg:max-w-[285px]">
                <div className="home-photo-shell">
                  <div
                    className="overflow-hidden rounded-[24px]"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                      boxShadow: '0 24px 70px rgba(20,20,20,.09)',
                    }}
                  >
                    <img
                      src="/files/profile.png"
                      alt="Md Sifatullah Sheikh"
                      className="home-hero-photo aspect-[4/5] h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      Location
                    </p>
                    <p className="mt-1 text-xs font-semibold">
                      Dhaka, Bangladesh
                    </p>
                  </div>

                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: 'rgba(229,83,61,.09)',
                      color: ACCENT,
                      border: '1px solid rgba(229,83,61,.12)',
                    }}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {SOCIAL_LINKS.slice(0, 4).map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={
                        href.startsWith('mailto:')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="home-social-card flex min-h-[46px] items-center gap-2 rounded-xl px-3 text-[10px] font-semibold"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.58)',
                        border: `1px solid ${LINE}`,
                        color: MUTED,
                      }}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* section index */}
        <div
          className="home-page-width relative z-10 grid border-t sm:grid-cols-4"
          style={{ borderColor: LINE }}
        >
          {[
            ['01', 'Research', '#research-home'],
            ['02', 'Projects', '#projects-home'],
            ['03', 'Recent', '#recent-home'],
            ['04', 'Location', '#location-home'],
          ].map(([index, label, href]) => (
            <a
              key={label}
              href={href}
              className="group flex min-h-[64px] items-center justify-between px-4 text-xs font-semibold sm:border-l sm:first:border-l-0"
              style={{
                borderColor: LINE,
                color: MUTED,
              }}
            >
              <span>
                <span className="mr-3 text-[9px]" style={{ color: '#AAA59D' }}>
                  {index}
                </span>
                {label}
              </span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* RESEARCH                                                          */}
      {/* ================================================================= */}
      <section id="research-home" className="home-page-width py-20 md:py-28">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="Selected research"
            title="Research presented as work, not a wall of text."
            description="A concise view of one publication, with the full research archive one click away."
          />
        </Reveal>

        <Reveal delay={70}>
          <div
            className="home-dark-card home-research-card mt-8 grid overflow-hidden rounded-[30px] lg:grid-cols-[1.14fr_.86fr]"
            style={{
              background:
                'linear-gradient(145deg, #171717 0%, #23221F 100%)',
              color: '#fff',
              boxShadow: '0 26px 70px rgba(20,20,20,.14)',
            }}
          >
            <div className="relative min-h-[330px] overflow-hidden sm:min-h-[410px]">
              <img
                src="/files/framework.png"
                alt="DeFaX architecture framework"
                className="home-research-image absolute inset-0 h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(20,20,20,.12), rgba(20,20,20,.42))',
                }}
              />

              <div
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em]"
                style={{
                  backgroundColor: 'rgba(20,20,20,.58)',
                  border: '1px solid rgba(255,255,255,.14)',
                  WebkitBackdropFilter: 'blur(10px)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                IEEE Access · 2025
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,.46)' }}
                  >
                    Featured publication
                  </p>
                </div>

                <h3 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em]">
                  DeFaX: A Cross-Attention Fusion Framework for Robust and
                  Explainable Deepfake Detection
                </h3>

                <p
                  className="mt-5 text-sm leading-7"
                  style={{ color: 'rgba(255,255,255,.58)' }}
                >
                  Deepfake detection using cross-attention fusion with Grad-CAM
                  and LIME based explainability.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://ieeexplore.ieee.org/abstract/document/11303744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 text-xs font-semibold"
                  style={{
                    backgroundColor: '#fff',
                    color: INK,
                  }}
                >
                  View publication
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="#/research"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(255,255,255,.12)',
                    color: '#fff',
                  }}
                >
                  All research
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================================================= */}
      {/* PROJECTS                                                          */}
      {/* ================================================================= */}
      <section
        id="projects-home"
        className="border-y py-20 md:py-28"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="home-page-width">
          <Reveal>
            <SectionHeader
              index="02"
              eyebrow="Selected projects"
              title="A small project shelf instead of a résumé grid."
              description={`${projectCount} project${projectCount === 1 ? '' : 's'} currently in the portfolio.`}
            />
          </Reveal>

          <Reveal delay={60}>
            <a
              href="#/projects"
              className="home-project-card group mt-8 grid overflow-hidden rounded-[28px] lg:grid-cols-[1.08fr_.92fr]"
              style={{
                backgroundColor: WHITE,
                border: `1px solid ${LINE}`,
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="home-project-image aspect-[16/10] h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col justify-between border-t p-6 lg:border-l lg:border-t-0 lg:p-9">
                <div>
                  <div
                    className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: MUTED }}
                  >
                    {getIcon(featuredProject.iconName)}
                    {featuredProject.tag}
                  </div>

                  <h3 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em]">
                    {featuredProject.title}
                  </h3>

                  <p
                    className="mt-5 text-sm leading-7"
                    style={{
                      color: MUTED,
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {featuredProject.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredProject.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.11em]"
                        style={{
                          backgroundColor: PAPER,
                          border: `1px solid ${LINE}`,
                          color: MUTED,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-semibold">Open project</span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    style={{
                      backgroundColor: INK,
                      color: '#fff',
                    }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>

          {secondaryProjects.length > 0 && (
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {secondaryProjects.map((project, index) => (
                <Reveal key={project.id} delay={100 + index * 55}>
                  <a
                    href="#/projects"
                    className="home-project-card group block overflow-hidden rounded-[24px]"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="home-project-image aspect-[16/9] w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex items-end justify-between gap-6 p-5 sm:p-6">
                      <div>
                        <p
                          className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                          style={{ color: MUTED }}
                        >
                          {project.tag}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold tracking-[-0.025em]">
                          {project.title}
                        </h4>
                      </div>

                      <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal delay={120}>
            <div className="mt-7 flex justify-end">
              <a
                href="#/projects"
                className="home-secondary-link inline-flex items-center gap-2 text-xs font-semibold"
              >
                View all projects
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* RECENT                                                            */}
      {/* ================================================================= */}
      <section id="recent-home" className="home-page-width py-20 md:py-28">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="Recent"
            title="Updates without turning the homepage into another CV."
            description="A short timeline of recent academic, research, and professional activity."
          />
        </Reveal>

        <div className="mt-6">
          {latestNews.map((item, index) => (
            <Reveal key={item.id} delay={index * 50}>
              <div
                className="home-news-row grid gap-4 border-b py-6 md:grid-cols-12 md:items-start md:gap-8"
                style={{ borderColor: LINE }}
              >
                <div className="md:col-span-3">
                  <span
                    className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                      color: MUTED,
                    }}
                  >
                    {item.date}
                  </span>
                </div>

                <p className="max-w-[840px] text-sm leading-7 md:col-span-8">
                  {item.content}
                </p>

                <div className="hidden justify-end md:col-span-1 md:flex">
                  <span
                    className="text-[10px] tabular-nums"
                    style={{ color: '#AAA59D' }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={90}>
          <div className="mt-7 flex justify-end">
            <a
              href="#/news"
              className="home-secondary-link inline-flex items-center gap-2 text-xs font-semibold"
            >
              Full timeline
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ================================================================= */}
      {/* LOCATION + CONTACT                                                */}
      {/* ================================================================= */}
      <section
        id="location-home"
        className="border-t py-20 md:py-28"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #EFEAE1 100%)',
        }}
      >
        <div className="home-page-width">
          <Reveal>
            <SectionHeader
              index="04"
              eyebrow="Location & contact"
              title="Dhaka is home base."
              description="Google Maps, local time, email, and the main places to find my work."
            />
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
            <Reveal>
              <GoogleMapCard />
            </Reveal>

            <Reveal delay={70}>
              <div
                className="home-dark-card flex h-full min-h-[430px] flex-col justify-between rounded-[26px] p-6 sm:p-8"
                style={{
                  background:
                    'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                  color: '#fff',
                  boxShadow: '0 22px 60px rgba(20,20,20,.12)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: 'rgba(255,255,255,.40)' }}
                    >
                      Contact
                    </p>

                    <Sparkles className="h-4 w-4" style={{ color: AMBER }} />
                  </div>

                  <h3 className="mt-5 text-4xl font-semibold leading-[.98] tracking-[-0.05em] sm:text-5xl">
                    Keep it simple.
                    <br />
                    Email works.
                  </h3>

                  <p
                    className="mt-5 max-w-sm text-sm leading-7"
                    style={{ color: 'rgba(255,255,255,.54)' }}
                  >
                    For research, project, or professional inquiries, email is the
                    most direct way to reach me.
                  </p>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="group mt-7 flex min-h-[58px] items-center justify-between rounded-2xl px-4"
                    style={{
                      backgroundColor: '#fff',
                      color: INK,
                    }}
                  >
                    <span className="min-w-0">
                      <span
                        className="block text-[9px] font-semibold uppercase tracking-[0.13em]"
                        style={{ color: MUTED }}
                      >
                        Email
                      </span>
                      <span className="mt-1 block truncate text-sm font-semibold">
                        {EMAIL}
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <div className="mt-3">
                    <CopyEmail />
                  </div>
                </div>

                <div
                  className="mt-8 grid grid-cols-2 gap-2 border-t pt-5"
                  style={{ borderColor: 'rgba(255,255,255,.10)' }}
                >
                  {SOCIAL_LINKS.slice(0, 4).map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={
                        href.startsWith('mailto:')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="group flex min-h-[48px] items-center justify-between rounded-xl px-3 text-[10px] font-semibold"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.055)',
                        border: '1px solid rgba(255,255,255,.09)',
                        color: 'rgba(255,255,255,.70)',
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-45 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PRE-FOOTER STRIP                                                  */}
      {/* ================================================================= */}
      <section
        className="border-t"
        style={{
          borderColor: LINE,
          backgroundColor: PAPER_2,
          paddingBottom: 'max(0px, var(--home-safe-bottom))',
        }}
      >
        <div className="home-page-width grid sm:grid-cols-3">
          <a
            href="#/about"
            className="group flex min-h-[76px] items-center justify-between px-4 sm:border-r"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                More
              </span>
              <span className="mt-1 block text-sm font-semibold">About</span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/experience"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-r sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                More
              </span>
              <span className="mt-1 block text-sm font-semibold">Experience</span>
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href={CV_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Document
              </span>
              <span className="mt-1 block text-sm font-semibold">Open CV</span>
            </span>
            <FileDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>
      </section>
    </main>
  );
}
