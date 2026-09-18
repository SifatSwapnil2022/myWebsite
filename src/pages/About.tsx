import { JSX, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Camera,
  Check,
  Compass,
  Copy,
  ExternalLink,
  GraduationCap,
  Languages,
  MapPin,
  Sparkles,
  Target,
} from 'lucide-react';
import {
  SKILL_GROUPS,
  AWARDS,
  LANGUAGES,
  EXTRA_ACTIVITIES,
  HOBBIES,
} from '../data/portfolioData';

const INK = '#141414';
const PAPER = '#F7F5EF';
const PAPER_2 = '#EFEAE1';
const WHITE = '#FFFFFF';
const MUTED = '#716F69';
const LINE = '#E3DED4';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';

const GOOGLE_MAPS_API_KEY = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

type EducationItem = {
  id: string;
  date: string;
  credential: string;
  institution: string;
  shortInstitution: string;
  location: string;
  mapQuery: string;
  logo: string;
  accent: string;
  details?: string;
};

const EDUCATION: EducationItem[] = [
  {
    id: 'ssc',
    date: 'May 2017',
    credential: 'Secondary School Certificate (SSC)',
    institution: 'Narinda Government High School',
    shortInstitution: 'NGHS',
    location: 'Narinda, Dhaka 1100, Bangladesh',
    mapQuery: 'Narinda Government High School, Narinda, Dhaka, Bangladesh',
    logo: '/files/narinda-government-high-school.jpeg',
    accent: '#9D342E',
  },
  {
    id: 'hsc',
    date: 'June 2019',
    credential: 'Higher Secondary Certificate (HSC)',
    institution: 'Birshreshtha Munshi Abdur Rouf Public College',
    shortInstitution: 'BMARPC',
    location: 'Peelkhana, BGB Headquarters, Dhaka, Bangladesh',
    mapQuery:
      'Birshreshtha Munshi Abdur Rouf Public College, Peelkhana, Dhaka, Bangladesh',
    logo: '/files/birshreshtha-munshi-abdur-rouf-public-college.png',
    accent: '#D89A15',
  },
  {
    id: 'bsc',
    date: 'December 2025',
    credential: 'B.Sc. in Computer Science & Engineering',
    institution: 'East West University',
    shortInstitution: 'EWU',
    location:
      'A/2, Jahurul Islam Avenue, Jahurul Islam City, Aftabnagar, Dhaka-1212, Bangladesh',
    mapQuery: 'East West University, Aftabnagar, Dhaka, Bangladesh',
    logo: '/files/east-west-university.png',
    accent: '#253A78',
    details:
      'Specialization: Data Science and Intelligent Systems · CGPA 3.70/4.00',
  },
];

const RESEARCH_INTERESTS = [
  {
    index: '01',
    title: 'Computer Vision',
    desc: 'Visual learning for images, video, and real-world perception.',
  },
  {
    index: '02',
    title: 'Machine Learning',
    desc: 'Models that learn from data and generalize beyond the training set.',
  },
  {
    index: '03',
    title: 'Robotics & Autonomy',
    desc: 'Intelligent systems that connect perception, reasoning, and action.',
  },
  {
    index: '04',
    title: 'Trustworthy AI',
    desc: 'Reliable and interpretable systems for practical use.',
  },
  {
    index: '05',
    title: 'Human–Computer Interaction',
    desc: 'Interfaces and intelligent tools that remain usable for people.',
  },
];

const COURSEWORK = [
  'Data Structures & Algorithms',
  'Analysis of Algorithms',
  'Artificial Intelligence',
  'Machine Learning',
  'Data Mining',
  'Computer Vision',
  'Digital Image Processing',
  'Operating Systems',
  'Database Management Systems',
  'Internet of Things',
  'Microprocessors & Microcontrollers',
  'Software Engineering',
  'Linear Algebra',
  'Probability & Statistics',
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
        <h2 className="about-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
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

function mapSrc(query: string) {
  return GOOGLE_MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
        query
      )}&zoom=15`
    : `https://www.google.com/maps?q=${encodeURIComponent(
        query
      )}&z=15&output=embed`;
}

function EducationMap({
  item,
  compact = false,
}: {
  item: EducationItem;
  compact?: boolean;
}) {
  return (
    <div
      className="education-map relative overflow-hidden rounded-[20px]"
      style={{
        height: compact ? 190 : 230,
        backgroundColor: PAPER_2,
        border: `1px solid ${LINE}`,
      }}
    >
      <iframe
        title={`${item.institution} location`}
        src={mapSrc(item.mapQuery)}
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
        className="education-map-badge pointer-events-none absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl px-3 py-2.5"
        style={{
          backgroundColor: 'rgba(255,255,255,.92)',
          border: '1px solid rgba(255,255,255,.75)',
          boxShadow: '0 10px 24px rgba(20,20,20,.10)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `${item.accent}12`,
            color: item.accent,
          }}
        >
          <MapPin className="h-4 w-4" />
        </span>

        <p className="line-clamp-2 text-[10px] font-semibold leading-4">
          {item.location}
        </p>
      </div>
    </div>
  );
}

function EducationCard({
  item,
  index,
}: {
  item: EducationItem;
  index: number;
}) {
  return (
    <Reveal delay={index * 70}>
      <article
        className="education-card relative overflow-hidden rounded-[28px]"
        style={{
          backgroundColor: WHITE,
          border: `1px solid ${LINE}`,
          boxShadow: '0 20px 55px rgba(20,20,20,.055)',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[3px] w-full"
          style={{
            background: `linear-gradient(90deg, ${item.accent}, transparent 72%)`,
          }}
        />

        <div className="grid gap-0 lg:grid-cols-[1fr_350px]">
          <div className="p-5 sm:p-7 md:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div
                className="education-logo-shell flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[22px] p-3 sm:h-28 sm:w-28"
                style={{
                  backgroundColor: '#fff',
                  border: `1px solid ${LINE}`,
                  boxShadow: '0 12px 28px rgba(20,20,20,.08)',
                }}
              >
                <img
                  src={item.logo}
                  alt={`${item.institution} logo`}
                  className="max-h-full max-w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{
                      backgroundColor: `${item.accent}10`,
                      border: `1px solid ${item.accent}1F`,
                      color: item.accent,
                    }}
                  >
                    {item.date}
                  </span>

                  <span
                    className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{
                      backgroundColor: PAPER,
                      border: `1px solid ${LINE}`,
                      color: MUTED,
                    }}
                  >
                    {item.shortInstitution}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold leading-[1.04] tracking-[-0.035em] md:text-3xl">
                  {item.credential}
                </h3>

                <p className="mt-3 text-base font-semibold" style={{ color: item.accent }}>
                  {item.institution}
                </p>

                <div className="mt-5 flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: MUTED }} />
                  <p className="text-sm leading-6" style={{ color: MUTED }}>
                    {item.location}
                  </p>
                </div>

                {item.details && (
                  <div
                    className="mt-5 rounded-xl px-4 py-3 text-sm leading-6"
                    style={{
                      backgroundColor: PAPER,
                      border: `1px solid ${LINE}`,
                      color: MUTED,
                    }}
                  >
                    {item.details}
                  </div>
                )}

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    item.mapQuery
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-fine-link mt-6 inline-flex items-center gap-2 text-xs font-semibold"
                >
                  Open location
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div
            className="border-t p-4 lg:border-l lg:border-t-0"
            style={{ borderColor: LINE, backgroundColor: PAPER }}
          >
            <EducationMap item={item} compact />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function LanguageBar({
  lang,
}: {
  lang: { label: string; level: string; width: string };
}) {
  const reducedMotion = usePrefersReducedMotion();
  const pct = parseInt(lang.width, 10) || 0;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold">{lang.label}</span>
        <span className="text-xs font-semibold" style={{ color: TEAL }}>
          {lang.level}
        </span>
      </div>

      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full"
        style={{ backgroundColor: '#DED8CD' }}
        role="progressbar"
        aria-label={`${lang.label} proficiency`}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${ACCENT}, ${AMBER})`,
          }}
          initial={reducedMotion ? false : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.85 }}
        />
      </div>
    </div>
  );
}

function HobbyIcon({ name }: { name: string }) {
  const cls = 'h-5 w-5';

  const map: Record<string, JSX.Element> = {
    Compass: <Compass className={cls} />,
    BookOpen: <BookOpen className={cls} />,
    Camera: <Camera className={cls} />,
  };

  return map[name] ?? <Sparkles className={cls} />;
}

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const awardsCount = useMemo(() => AWARDS.length, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const handlePointer = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--about-x', `${x}%`);
      node.style.setProperty('--about-y', `${y}%`);
    };

    node.addEventListener('pointermove', handlePointer);
    return () => node.removeEventListener('pointermove', handlePointer);
  }, [reducedMotion]);

  return (
    <main
      className="about-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .about-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .about-display {
          letter-spacing: -0.062em;
        }

        .about-section-title {
          letter-spacing: -0.045em;
        }

        .about-hero {
          --about-x: 78%;
          --about-y: 18%;
        }

        .about-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--about-x) var(--about-y),
              rgba(229,83,61,.11),
              transparent 24%
            );
          opacity: .85;
        }

        .about-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.92), transparent 96%);
        }

        .about-fine-link {
          position: relative;
          width: fit-content;
        }

        .about-fine-link::after {
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

        .about-fine-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .research-interest-card,
        .skill-card,
        .activity-card,
        .hobby-card,
        .award-card {
          transition:
            transform .34s cubic-bezier(.2,.7,.2,1),
            box-shadow .34s ease,
            border-color .28s ease;
        }

        .research-interest-card:hover,
        .skill-card:hover,
        .activity-card:hover,
        .hobby-card:hover,
        .award-card:hover {
          transform: translateY(-4px);
          border-color: #D7D0C4;
          box-shadow: 0 18px 42px rgba(20,20,20,.07);
        }

        .education-card {
          transition:
            transform .38s cubic-bezier(.2,.7,.2,1),
            box-shadow .38s ease;
        }

        .education-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 28px 70px rgba(20,20,20,.09) !important;
        }

        .education-logo-shell img {
          transition: transform .5s cubic-bezier(.2,.7,.2,1);
        }

        .education-card:hover .education-logo-shell img {
          transform: scale(1.05);
        }

        .education-map iframe {
          filter: grayscale(1) saturate(.45) contrast(.93) brightness(1.04);
          transition:
            filter .6s ease,
            transform .7s cubic-bezier(.2,.7,.2,1);
        }

        .education-map:hover iframe {
          filter: grayscale(.15) saturate(.8) contrast(.97) brightness(1);
          transform: scale(1.01);
        }

        @supports not ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
          .education-map-badge {
            background-color: rgba(255,255,255,.98) !important;
          }
        }

        @media (min-width: 640px) {
          .about-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .about-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .research-interest-card,
          .skill-card,
          .activity-card,
          .hobby-card,
          .award-card,
          .education-card,
          .education-logo-shell img,
          .education-map iframe,
          .about-fine-link::after {
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
        className="about-hero relative overflow-hidden border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F1ECE3 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="about-grid pointer-events-none absolute inset-0 opacity-70"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="about-page-width relative z-10 grid min-h-[650px] items-center gap-10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
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
                  A
                </span>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                  style={{ color: MUTED }}
                >
                  About
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1 className="about-display max-w-[880px] text-[clamp(3.4rem,8vw,7.2rem)] font-semibold leading-[0.84]">
                Background,
                <br />
                research &
                <br />
                <span style={{ color: ACCENT }}>where I started.</span>
              </h1>
            </Reveal>

            <Reveal delay={105}>
              <p
                className="mt-8 max-w-[650px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                I studied Computer Science and Engineering at East West
                University and work across machine learning, computer vision,
                multimodal learning, and intelligent systems.
              </p>
            </Reveal>

            <Reveal delay={145}>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  'Computer Vision',
                  'Machine Learning',
                  'Robotics',
                  'Trustworthy AI',
                  'HCI',
                ].map((item, index) => (
                  <span
                    key={item}
                    className="inline-flex min-h-[34px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                    style={{
                      backgroundColor:
                        index === 0 ? 'rgba(229,83,61,.09)' : WHITE,
                      border: `1px solid ${
                        index === 0 ? 'rgba(229,83,61,.15)' : LINE
                      }`,
                      color: index === 0 ? ACCENT : MUTED,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={115} className="md:col-span-5">
            <div
              className="relative overflow-hidden rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                color: '#fff',
                boxShadow: '0 28px 75px rgba(20,20,20,.16)',
              }}
            >
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-52 w-52 rounded-full blur-[80px]"
                style={{ backgroundColor: 'rgba(229,83,61,.22)' }}
              />

              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full blur-[90px]"
                style={{ backgroundColor: 'rgba(29,122,112,.16)' }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.17em]"
                    style={{ color: 'rgba(255,255,255,.42)' }}
                  >
                    Research directions
                  </p>

                  <Sparkles className="h-4 w-4" style={{ color: AMBER }} />
                </div>

                <div className="mt-6 space-y-1">
                  {RESEARCH_INTERESTS.map((item) => (
                    <div
                      key={item.title}
                      className="grid grid-cols-[32px_1fr] gap-3 border-b py-4"
                      style={{ borderColor: 'rgba(255,255,255,.08)' }}
                    >
                      <span
                        className="text-[9px] font-semibold tabular-nums"
                        style={{ color: 'rgba(255,255,255,.34)' }}
                      >
                        {item.index}
                      </span>

                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p
                          className="mt-1 text-xs leading-5"
                          style={{ color: 'rgba(255,255,255,.48)' }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#education"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold"
                >
                  Education journey
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* EDUCATION                                                        */}
      {/* ================================================================ */}
      <section id="education" className="about-page-width py-20 md:py-28">
        <Reveal>
          <SectionHeader
            number="01"
            eyebrow="Education"
            title="Three stages. One academic journey."
            description="From school in Old Dhaka to a B.Sc. in Computer Science and Engineering."
          />
        </Reveal>

        <div className="relative mt-10 space-y-6">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[23px] top-8 hidden w-px lg:block"
            style={{
              background:
                'linear-gradient(to bottom, #9D342E, #D89A15 48%, #253A78)',
            }}
          />

          {EDUCATION.map((item, index) => (
            <div key={item.id} className="relative lg:pl-16">
              <span
                aria-hidden="true"
                className="absolute left-[17px] top-10 z-10 hidden h-3 w-3 rounded-full ring-8 lg:block"
                style={{
                  backgroundColor: item.accent,
                  boxShadow: `0 0 0 8px ${PAPER}`,
                }}
              />
              <EducationCard item={item} index={index} />
            </div>
          ))}
        </div>

        <Reveal delay={160}>
          <div
            className="mt-7 grid gap-3 rounded-[24px] p-5 sm:grid-cols-3"
            style={{
              backgroundColor: PAPER_2,
              border: `1px solid ${LINE}`,
            }}
          >
            {EDUCATION.map((item, index) => (
              <a
                key={item.id}
                href={`#education`}
                className="group flex min-h-[62px] items-center justify-between rounded-xl px-4"
                style={{
                  backgroundColor: index === 2 ? WHITE : 'rgba(255,255,255,.48)',
                  border: `1px solid ${LINE}`,
                }}
              >
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.13em]"
                    style={{ color: item.accent }}
                  >
                    {item.date}
                  </p>
                  <p className="mt-1 text-xs font-semibold">
                    {item.shortInstitution}
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ================================================================ */}
      {/* COURSEWORK + SKILLS                                              */}
      {/* ================================================================ */}
      <section
        className="border-y py-20 md:py-28"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="about-page-width">
          <Reveal>
            <SectionHeader
              number="02"
              eyebrow="Technical profile"
              title="Coursework, tools, and frameworks."
              description="A compact view of the technical areas represented in the portfolio."
            />
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <div
                className="h-full rounded-[28px] p-6 sm:p-8"
                style={{
                  background:
                    'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                  color: '#fff',
                  boxShadow: '0 22px 58px rgba(20,20,20,.13)',
                }}
              >
                <div className="flex items-center justify-between">
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,.40)' }}
                  >
                    Relevant coursework
                  </p>

                  <BookOpen className="h-4 w-4" style={{ color: AMBER }} />
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="rounded-xl px-3 py-2 text-[10px] font-medium"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.06)',
                        border: '1px solid rgba(255,255,255,.10)',
                        color: 'rgba(255,255,255,.70)',
                      }}
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {SKILL_GROUPS.map((group, index) => (
                <Reveal key={group.title} delay={index * 45}>
                  <div
                    className="skill-card h-full rounded-[22px] p-5"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.14em]">
                        {group.title}
                      </h3>

                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor:
                            [ACCENT, TEAL, AMBER, '#253A78'][index % 4],
                        }}
                      />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: PAPER,
                            border: `1px solid ${LINE}`,
                            color: MUTED,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TEACHING + LEADERSHIP                                            */}
      {/* ================================================================ */}
      <section className="about-page-width py-20 md:py-28">
        <Reveal>
          <SectionHeader
            number="03"
            eyebrow="Beyond coursework"
            title="Teaching, leadership, and community."
            description="Activities already represented in the portfolio data."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {EXTRA_ACTIVITIES.map((activity, index) => (
            <Reveal key={activity.id} delay={index * 55}>
              <article
                className="activity-card flex h-full flex-col rounded-[24px] p-6"
                style={{
                  backgroundColor: WHITE,
                  border: `1px solid ${LINE}`,
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-11 min-w-11 items-center justify-center rounded-xl px-2 text-[10px] font-bold"
                    style={{
                      backgroundColor:
                        index % 3 === 0
                          ? 'rgba(229,83,61,.09)'
                          : index % 3 === 1
                            ? 'rgba(29,122,112,.09)'
                            : 'rgba(240,165,74,.12)',
                      color:
                        index % 3 === 0
                          ? ACCENT
                          : index % 3 === 1
                            ? TEAL
                            : '#95631A',
                    }}
                  >
                    {activity.organization
                      .split(' ')
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join('')
                      .toUpperCase()}
                  </span>

                  <span
                    className="rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: PAPER,
                      border: `1px solid ${LINE}`,
                      color: MUTED,
                    }}
                  >
                    {activity.badge}
                  </span>
                </div>

                <div className="mt-5 flex-1">
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">
                    {activity.role}
                  </h3>

                  <p className="mt-2 text-sm font-semibold" style={{ color: TEAL }}>
                    {activity.organization}
                  </p>

                  <p className="mt-1 text-[10px]" style={{ color: MUTED }}>
                    {activity.period}
                  </p>

                  <p className="mt-4 text-sm leading-7" style={{ color: MUTED }}>
                    {activity.description}
                  </p>

                  {activity.bullets && (
                    <ul className="mt-4 space-y-2">
                      {activity.bullets.map((bullet: string, bulletIndex: number) => (
                        <li
                          key={bulletIndex}
                          className="flex items-start gap-2 text-xs leading-5"
                          style={{ color: MUTED }}
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: AMBER }}
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================================================================ */}
      {/* INTERESTS / LANGUAGES / AWARDS                                  */}
      {/* ================================================================ */}
      <section
        className="border-t py-20 md:py-28"
        style={{
          borderColor: LINE,
          backgroundColor: PAPER_2,
        }}
      >
        <div className="about-page-width">
          <Reveal>
            <SectionHeader
              number="04"
              eyebrow="Outside the lab"
              title="Interests, languages, and recognition."
              description={`${awardsCount} honor${awardsCount === 1 ? '' : 's'} currently listed in the portfolio.`}
            />
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {HOBBIES.map((hobby, index) => (
                <Reveal key={hobby.name} delay={index * 45}>
                  <article
                    className="hobby-card h-full rounded-[22px] p-5"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: PAPER,
                          border: `1px solid ${LINE}`,
                          color: ACCENT,
                        }}
                      >
                        <HobbyIcon name={hobby.iconName} />
                      </span>

                      <span
                        className="text-[9px] font-semibold uppercase tracking-[0.13em]"
                        style={{ color: MUTED }}
                      >
                        {hobby.category}
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-semibold">{hobby.name}</h3>
                    <p className="mt-2 text-sm leading-6" style={{ color: MUTED }}>
                      {hobby.description}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <div className="space-y-6 lg:col-span-5">
              <Reveal>
                <div
                  className="rounded-[24px] p-6"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: 'rgba(229,83,61,.09)',
                        color: ACCENT,
                      }}
                    >
                      <Languages className="h-5 w-5" />
                    </span>

                    <div>
                      <p
                        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Communication
                      </p>
                      <h3 className="mt-1 text-lg font-semibold">Languages</h3>
                    </div>
                  </div>

                  <div className="mt-6 space-y-6">
                    {LANGUAGES.map((lang) => (
                      <LanguageBar key={lang.label} lang={lang} />
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="space-y-3">
                {AWARDS.map((award, index) => (
                  <Reveal key={award.title} delay={index * 45}>
                    <article
                      className="award-card flex items-start gap-4 rounded-[20px] p-5"
                      style={{
                        backgroundColor: WHITE,
                        border: `1px solid ${LINE}`,
                      }}
                    >
                      <span className="text-2xl">{award.icon}</span>

                      <div>
                        <h3 className="text-sm font-semibold">{award.title}</h3>
                        <p
                          className="mt-1 text-xs leading-5"
                          style={{ color: MUTED }}
                        >
                          {award.sub}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* END STRIP                                                        */}
      {/* ================================================================ */}
      <section
        className="border-t"
        style={{ borderColor: LINE, backgroundColor: PAPER }}
      >
        <div className="about-page-width grid sm:grid-cols-3">
          <a
            href="#/experience"
            className="group flex min-h-[76px] items-center justify-between px-4 sm:border-r"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Continue
              </span>
              <span className="mt-1 block text-sm font-semibold">Experience</span>
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
