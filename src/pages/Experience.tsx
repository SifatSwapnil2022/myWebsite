import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  Copy,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

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

const GOOGLE_MAPS_API_KEY = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

const LOGO_IMAGES: Record<string, string> = {
  'Syntax Solution Limited': '/files/syntax_solution_limited_logo.jpeg',
  Banglalink: '/files/bangalink.png',
  'East West University': '/files/EWU.png',
};

const COMPANY_ACCENTS = [
  ACCENT,
  TEAL,
  '#253A78',
  AMBER,
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return reduced;
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
        duration: reducedMotion ? 0 : 0.64,
        delay: reducedMotion ? 0 : delay / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div
      className="grid gap-5 border-b pb-6 md:grid-cols-12 md:items-end"
      style={{ borderColor: LINE }}
    >
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
            {number}
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
        <h2 className="experience-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
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

function getInitials(name = '') {
  const words = name.replace(/[().]/g, '').split(' ').filter(Boolean);

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

function CompanyLogo({
  company,
  accent,
  size = 'lg',
}: {
  company: string;
  accent: string;
  size?: 'sm' | 'lg';
}) {
  const [failed, setFailed] = useState(false);
  const src = LOGO_IMAGES[company];
  const showImage = Boolean(src) && !failed;

  const dimension =
    size === 'lg'
      ? 'h-20 w-20 sm:h-24 sm:w-24'
      : 'h-11 w-11';

  return (
    <div
      className={`company-logo flex ${dimension} shrink-0 items-center justify-center overflow-hidden rounded-[20px]`}
      style={{
        backgroundColor: showImage ? WHITE : accent,
        border: `1px solid ${showImage ? LINE : 'transparent'}`,
        boxShadow: '0 12px 28px rgba(20,20,20,.08)',
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={`${company} logo`}
          className="max-h-full max-w-full object-contain p-2"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={size === 'lg' ? 'text-lg font-bold' : 'text-xs font-bold'}
          style={{ color: WHITE }}
        >
          {getInitials(company)}
        </span>
      )}
    </div>
  );
}

function experienceMapSrc(company: string, location: string) {
  const query = `${company}, ${location}`;

  return GOOGLE_MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/search?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
        query
      )}&zoom=13`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        query
      )}&z=13&output=embed`;
}

function ExperienceMap({
  company,
  location,
  accent,
}: {
  company: string;
  location: string;
  accent: string;
}) {
  return (
    <div
      className="experience-map relative overflow-hidden rounded-[22px]"
      style={{
        height: 220,
        backgroundColor: PAPER_2,
        border: `1px solid ${LINE}`,
      }}
    >
      <iframe
        title={`${company} location`}
        src={experienceMapSrc(company, location)}
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
        className="experience-map-badge pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl px-3 py-2.5"
        style={{
          backgroundColor: 'rgba(255,255,255,.92)',
          border: '1px solid rgba(255,255,255,.74)',
          boxShadow: '0 10px 24px rgba(20,20,20,.10)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `${accent}12`,
            color: accent,
          }}
        >
          <MapPin className="h-4 w-4" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-[10px] font-semibold">{company}</p>
          <p
            className="mt-0.5 truncate text-[9px]"
            style={{ color: MUTED }}
          >
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
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
      onClick={handleCopy}
      className="experience-copy inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 text-xs font-semibold"
      style={{
        backgroundColor: 'rgba(255,255,255,.06)',
        border: '1px solid rgba(255,255,255,.11)',
        color: '#fff',
      }}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}

export default function Experience() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const currentExperiences = useMemo(
    () =>
      EXPERIENCES.filter((experience) =>
        /present|current|ongoing/i.test(experience.period)
      ),
    []
  );

  const totalResponsibilities = useMemo(
    () =>
      EXPERIENCES.reduce(
        (total, experience) => total + (experience.bullets?.length || 0),
        0
      ),
    []
  );

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--experience-x', `${x}%`);
      node.style.setProperty('--experience-y', `${y}%`);
    };

    node.addEventListener('pointermove', onPointerMove);
    return () => node.removeEventListener('pointermove', onPointerMove);
  }, [reducedMotion]);

  return (
    <main
      className="experience-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .experience-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .experience-display {
          letter-spacing: -0.062em;
        }

        .experience-section-title {
          letter-spacing: -0.045em;
        }

        .experience-hero {
          --experience-x: 80%;
          --experience-y: 20%;
        }

        .experience-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--experience-x) var(--experience-y),
              rgba(229,83,61,.11),
              transparent 24%
            );
          opacity: .84;
        }

        .experience-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.92), transparent 96%);
        }

        .company-logo img {
          transition: transform .5s cubic-bezier(.2,.7,.2,1);
        }

        .experience-card:hover .company-logo img {
          transform: scale(1.05);
        }

        .experience-card {
          transition:
            transform .38s cubic-bezier(.2,.7,.2,1),
            box-shadow .38s ease,
            border-color .3s ease;
        }

        .experience-card:hover {
          transform: translateY(-5px);
          border-color: #D8D1C5;
          box-shadow: 0 28px 70px rgba(20,20,20,.09) !important;
        }

        .responsibility-card {
          transition:
            transform .3s cubic-bezier(.2,.7,.2,1),
            background-color .25s ease,
            border-color .25s ease;
        }

        .responsibility-card:hover {
          transform: translateY(-3px);
          background-color: #fff;
          border-color: #D8D1C5;
        }

        .experience-map iframe {
          filter: grayscale(1) saturate(.45) contrast(.93) brightness(1.04);
          transition:
            filter .6s ease,
            transform .75s cubic-bezier(.2,.7,.2,1);
        }

        .experience-map:hover iframe {
          filter: grayscale(.15) saturate(.82) contrast(.97) brightness(1);
          transform: scale(1.01);
        }

        .experience-link {
          position: relative;
          width: fit-content;
        }

        .experience-link::after {
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

        .experience-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .experience-dark-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .experience-dark-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 18% 18%, rgba(229,83,61,.18), transparent 28%),
            radial-gradient(circle at 86% 76%, rgba(29,122,112,.14), transparent 30%);
        }

        @supports not ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
          .experience-map-badge {
            background-color: rgba(255,255,255,.98) !important;
          }
        }

        @media (min-width: 640px) {
          .experience-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .experience-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .company-logo img,
          .experience-card,
          .responsibility-card,
          .experience-map iframe,
          .experience-link::after {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section
        ref={heroRef}
        className="experience-hero relative overflow-hidden border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F1ECE3 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="experience-grid pointer-events-none absolute inset-0 opacity-70"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="experience-page-width relative z-10 grid min-h-[650px] items-center gap-10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
          <div className="md:col-span-7">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-semibold"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  E
                </span>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                  style={{ color: MUTED }}
                >
                  Experience
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1 className="experience-display max-w-[880px] text-[clamp(3.5rem,8.4vw,7.4rem)] font-semibold leading-[0.84]">
                Research,
                <br />
                industry &
                <br />
                <span style={{ color: ACCENT }}>teaching.</span>
              </h1>
            </Reveal>

            <Reveal delay={105}>
              <p
                className="mt-8 max-w-[650px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                A timeline of machine learning, research, academic, and
                professional work represented in my portfolio.
              </p>
            </Reveal>

            <Reveal delay={145}>
              <div className="mt-8 grid max-w-[720px] grid-cols-1 gap-3 sm:grid-cols-3">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.60)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    Roles listed
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {EXPERIENCES.length}
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.60)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    Current
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {currentExperiences.length}
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.60)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    Responsibility points
                  </p>
                  <p className="mt-2 text-xl font-semibold">
                    {totalResponsibilities}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={115} className="md:col-span-5">
            <div
              className="experience-dark-card rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                color: '#fff',
                boxShadow: '0 28px 75px rgba(20,20,20,.16)',
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,.40)' }}
                  >
                    Career timeline
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Roles at a glance
                  </h2>
                </div>

                <BriefcaseBusiness className="h-5 w-5" style={{ color: AMBER }} />
              </div>

              <div className="mt-6 space-y-1">
                {EXPERIENCES.map((experience, index) => {
                  const accent =
                    COMPANY_ACCENTS[index % COMPANY_ACCENTS.length];

                  return (
                    <a
                      key={experience.id}
                      href={`#experience-${experience.id}`}
                      className="group grid grid-cols-[42px_1fr_auto] items-center gap-3 border-b py-4"
                      style={{ borderColor: 'rgba(255,255,255,.08)' }}
                    >
                      <CompanyLogo
                        company={experience.company}
                        accent={accent}
                        size="sm"
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {experience.role}
                        </p>
                        <p
                          className="mt-1 truncate text-[10px]"
                          style={{ color: 'rgba(255,255,255,.45)' }}
                        >
                          {experience.company}
                        </p>
                      </div>

                      <ArrowRight className="h-4 w-4 opacity-45 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  );
                })}
              </div>

              <a
                href="#timeline"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold"
              >
                Full timeline
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EXPERIENCE TIMELINE                                              */}
      {/* ================================================================ */}
      <section id="timeline" className="experience-page-width py-20 md:py-28">
        <Reveal>
          <SectionHeader
            number="01"
            eyebrow="Career timeline"
            title="The work, responsibilities, and places."
            description="Each entry uses the role, company, period, location, and responsibilities already stored in the portfolio."
          />
        </Reveal>

        <div className="relative mt-10 space-y-7">
          <div
            aria-hidden="true"
            className="absolute bottom-10 left-[23px] top-10 hidden w-px lg:block"
            style={{
              background:
                'linear-gradient(to bottom, #E5533D, #1D7A70 48%, #253A78)',
            }}
          />

          {EXPERIENCES.map((experience, index) => {
            const accent =
              COMPANY_ACCENTS[index % COMPANY_ACCENTS.length];
            const isCurrent = /present|current|ongoing/i.test(
              experience.period
            );

            return (
              <div
                key={experience.id}
                id={`experience-${experience.id}`}
                className="relative scroll-mt-28 lg:pl-16"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[17px] top-10 z-10 hidden h-3 w-3 rounded-full lg:block"
                  style={{
                    backgroundColor: accent,
                    boxShadow: `0 0 0 8px ${PAPER}`,
                  }}
                />

                <Reveal delay={index * 70}>
                  <article
                    className="experience-card overflow-hidden rounded-[30px]"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                      boxShadow: '0 22px 58px rgba(20,20,20,.055)',
                    }}
                  >
                    <div
                      aria-hidden="true"
                      className="h-[3px] w-full"
                      style={{
                        background: `linear-gradient(90deg, ${accent}, transparent 74%)`,
                      }}
                    />

                    <div className="grid lg:grid-cols-[1fr_360px]">
                      {/* main */}
                      <div className="p-5 sm:p-7 md:p-8">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                          <CompanyLogo
                            company={experience.company}
                            accent={accent}
                            size="lg"
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                                style={{
                                  backgroundColor: `${accent}10`,
                                  border: `1px solid ${accent}1F`,
                                  color: accent,
                                }}
                              >
                                {experience.period}
                              </span>

                              {isCurrent && (
                                <span
                                  className="inline-flex min-h-[30px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                                  style={{
                                    backgroundColor: 'rgba(29,122,112,.08)',
                                    border: '1px solid rgba(29,122,112,.14)',
                                    color: TEAL,
                                  }}
                                >
                                  <span
                                    className="h-1.5 w-1.5 rounded-full"
                                    style={{
                                      backgroundColor: TEAL,
                                      boxShadow:
                                        '0 0 0 5px rgba(29,122,112,.08)',
                                    }}
                                  />
                                  Current
                                </span>
                              )}
                            </div>

                            <h2 className="mt-4 text-2xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-3xl">
                              {experience.role}
                            </h2>

                            <p
                              className="mt-3 text-base font-semibold"
                              style={{ color: accent }}
                            >
                              {experience.company}
                            </p>

                            <div className="mt-4 flex items-start gap-2">
                              <MapPin
                                className="mt-0.5 h-4 w-4 shrink-0"
                                style={{ color: MUTED }}
                              />
                              <p
                                className="text-sm leading-6"
                                style={{ color: MUTED }}
                              >
                                {experience.location}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          className="my-7 h-px"
                          style={{ backgroundColor: LINE }}
                        />

                        <div className="flex items-end justify-between gap-4">
                          <div>
                            <p
                              className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                              style={{ color: MUTED }}
                            >
                              Responsibilities
                            </p>
                            <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                              What I worked on
                            </h3>
                          </div>

                          <span
                            className="hidden rounded-full px-3 py-1.5 text-[9px] font-semibold sm:block"
                            style={{
                              backgroundColor: PAPER,
                              border: `1px solid ${LINE}`,
                              color: MUTED,
                            }}
                          >
                            {experience.bullets.length}{' '}
                            {experience.bullets.length === 1
                              ? 'item'
                              : 'items'}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          {experience.bullets.map((bullet, bulletIndex) => (
                            <motion.div
                              key={bulletIndex}
                              className="responsibility-card rounded-2xl p-4"
                              style={{
                                backgroundColor: PAPER,
                                border: `1px solid ${LINE}`,
                              }}
                              initial={
                                reducedMotion
                                  ? false
                                  : { opacity: 0, y: 10 }
                              }
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, amount: 0.2 }}
                              transition={{
                                delay: reducedMotion
                                  ? 0
                                  : bulletIndex * 0.035,
                                duration: reducedMotion ? 0 : 0.4,
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold"
                                  style={{
                                    backgroundColor: `${accent}10`,
                                    color: accent,
                                  }}
                                >
                                  {String(bulletIndex + 1).padStart(2, '0')}
                                </span>

                                <p
                                  className="text-sm leading-6"
                                  style={{ color: MUTED }}
                                >
                                  {bullet}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {experience.supervisor && (
                          <div
                            className="mt-7 rounded-[20px] p-5"
                            style={{
                              background:
                                'linear-gradient(145deg, rgba(240,165,74,.11), rgba(255,255,255,.72))',
                              border: '1px solid rgba(240,165,74,.18)',
                            }}
                          >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex items-start gap-3">
                                <span
                                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                  style={{
                                    backgroundColor: 'rgba(240,165,74,.13)',
                                    color: '#9A651A',
                                  }}
                                >
                                  <GraduationCap className="h-5 w-5" />
                                </span>

                                <div>
                                  <p
                                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                                    style={{ color: MUTED }}
                                  >
                                    Supervisor
                                  </p>

                                  <p className="mt-1 text-sm font-semibold">
                                    {experience.supervisor.name}
                                  </p>

                                  <p
                                    className="mt-1 text-xs leading-5"
                                    style={{ color: MUTED }}
                                  >
                                    {experience.supervisor.title}
                                  </p>
                                </div>
                              </div>

                              {experience.supervisor.profileUrl && (
                                <a
                                  href={experience.supervisor.profileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="experience-link inline-flex items-center gap-2 text-xs font-semibold"
                                  style={{ color: TEAL }}
                                >
                                  Faculty profile
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* map sidebar */}
                      <aside
                        className="border-t p-4 lg:border-l lg:border-t-0"
                        style={{
                          borderColor: LINE,
                          backgroundColor: PAPER,
                        }}
                      >
                        <div className="lg:sticky lg:top-24">
                          <ExperienceMap
                            company={experience.company}
                            location={experience.location}
                            accent={accent}
                          />

                          <div
                            className="mt-4 rounded-[20px] p-4"
                            style={{
                              backgroundColor: WHITE,
                              border: `1px solid ${LINE}`,
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="flex h-9 w-9 items-center justify-center rounded-xl"
                                style={{
                                  backgroundColor: `${accent}10`,
                                  color: accent,
                                }}
                              >
                                <Building2 className="h-4 w-4" />
                              </span>

                              <div>
                                <p
                                  className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                                  style={{ color: MUTED }}
                                >
                                  Organization
                                </p>
                                <p className="mt-1 text-sm font-semibold">
                                  {experience.company}
                                </p>
                              </div>
                            </div>

                            <div
                              className="mt-4 grid grid-cols-2 gap-3 border-t pt-4"
                              style={{ borderColor: LINE }}
                            >
                              <div>
                                <p
                                  className="text-[9px] uppercase tracking-[0.13em]"
                                  style={{ color: MUTED }}
                                >
                                  Period
                                </p>
                                <p className="mt-1 text-xs font-semibold">
                                  {experience.period}
                                </p>
                              </div>

                              <div>
                                <p
                                  className="text-[9px] uppercase tracking-[0.13em]"
                                  style={{ color: MUTED }}
                                >
                                  Points
                                </p>
                                <p className="mt-1 text-xs font-semibold">
                                  {experience.bullets.length}
                                </p>
                              </div>
                            </div>

                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                `${experience.company}, ${experience.location}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="experience-link mt-5 inline-flex items-center gap-2 text-xs font-semibold"
                            >
                              Open location
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </aside>
                    </div>
                  </article>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================================ */}
      {/* SUMMARY STRIP                                                    */}
      {/* ================================================================ */}
      <section
        className="border-y py-20 md:py-24"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="experience-page-width">
          <Reveal>
            <SectionHeader
              number="02"
              eyebrow="Overview"
              title="A compact view of the timeline."
              description="The cards below are generated directly from the experience entries."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {EXPERIENCES.map((experience, index) => {
              const accent =
                COMPANY_ACCENTS[index % COMPANY_ACCENTS.length];

              return (
                <Reveal key={experience.id} delay={index * 50}>
                  <a
                    href={`#experience-${experience.id}`}
                    className="group block h-full rounded-[24px] p-5"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <CompanyLogo
                        company={experience.company}
                        accent={accent}
                        size="sm"
                      />

                      <span
                        className="rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          backgroundColor: PAPER,
                          border: `1px solid ${LINE}`,
                          color: MUTED,
                        }}
                      >
                        {experience.period}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em]">
                      {experience.role}
                    </h3>

                    <p
                      className="mt-2 text-sm font-semibold"
                      style={{ color: accent }}
                    >
                      {experience.company}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="text-[10px]"
                        style={{ color: MUTED }}
                      >
                        {experience.location}
                      </span>

                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CONTACT                                                          */}
      {/* ================================================================ */}
      <section className="experience-page-width py-20 md:py-28">
        <Reveal>
          <div
            className="experience-dark-card grid overflow-hidden rounded-[30px] md:grid-cols-[1.1fr_.9fr]"
            style={{
              background:
                'linear-gradient(145deg, #171717 0%, #24231F 100%)',
              color: '#fff',
              boxShadow: '0 26px 70px rgba(20,20,20,.14)',
            }}
          >
            <div className="p-6 sm:p-8 md:p-10">
              <p
                className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: 'rgba(255,255,255,.40)' }}
              >
                Contact
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-[.98] tracking-[-0.05em] sm:text-5xl">
                Work,
                <br />
                research,
                <br />
                conversation.
              </h2>

              <p
                className="mt-5 max-w-md text-sm leading-7"
                style={{ color: 'rgba(255,255,255,.54)' }}
              >
                For professional or research-related inquiries, email is the
                simplest way to reach me.
              </p>
            </div>

            <div
              className="flex flex-col justify-center border-t p-6 sm:p-8 md:border-l md:border-t-0 md:p-10"
              style={{ borderColor: 'rgba(255,255,255,.10)' }}
            >
              <a
                href={`mailto:${EMAIL}`}
                className="group flex min-h-[60px] items-center justify-between rounded-2xl px-4"
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

                <Mail className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <div className="mt-3">
                <CopyEmail />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* END STRIP                                                        */}
      {/* ================================================================ */}
      <section
        className="border-t"
        style={{ borderColor: LINE, backgroundColor: PAPER_2 }}
      >
        <div className="experience-page-width grid sm:grid-cols-3">
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
                Previous
              </span>
              <span className="mt-1 block text-sm font-semibold">About</span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/research"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-r sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Continue
              </span>
              <span className="mt-1 block text-sm font-semibold">Research</span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/projects"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Continue
              </span>
              <span className="mt-1 block text-sm font-semibold">Projects</span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
