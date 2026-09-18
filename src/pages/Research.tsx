import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  Copy,
  Database,
  ExternalLink,
  FileText,
  GraduationCap,
  Info,
  Search,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { PUBLICATIONS } from '../data/portfolioData';
import { Publication } from '../types';

const INK = '#141414';
const PAPER = '#F7F5EF';
const PAPER_2 = '#EFEAE1';
const WHITE = '#FFFFFF';
const MUTED = '#716F69';
const LINE = '#E3DED4';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';
const BLUE = '#253A78';

const SCHOLAR_URL =
  'https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ';

const CITATION_STATS = {
  citations: 13,
  hIndex: 2,
  i10Index: 0,
  lastUpdated: 'Aug 2026',
};

const SELF_NAME_PATTERN = /^(Md\.?\s*Sifatullah Sheikh)/i;

type VenueType = 'journal' | 'conference' | 'dataset';
type FilterType = 'all' | VenueType;

const TYPE_META: Record<
  VenueType,
  {
    label: string;
    plural: string;
    accent: string;
    soft: string;
    icon: typeof BookOpen;
  }
> = {
  journal: {
    label: 'Journal',
    plural: 'Journals',
    accent: ACCENT,
    soft: 'rgba(229,83,61,.09)',
    icon: BookOpen,
  },
  conference: {
    label: 'Conference',
    plural: 'Conferences',
    accent: TEAL,
    soft: 'rgba(29,122,112,.09)',
    icon: GraduationCap,
  },
  dataset: {
    label: 'Dataset',
    plural: 'Datasets',
    accent: AMBER,
    soft: 'rgba(240,165,74,.12)',
    icon: Database,
  },
};

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
      viewport={{ once: true, amount: 0.1 }}
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
        <h2 className="research-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
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

function isFirstAuthor(authors: string) {
  return SELF_NAME_PATTERN.test(authors.trim());
}

function highlightSelf(authors: string) {
  return authors
    .split(
      /(\bMd Sifatullah Sheikh\b|\bMd\. Sifatullah Sheikh\b)/
    )
    .map((part, index) => {
      const normalized = part.trim();

      const isSelf =
        normalized === 'Md Sifatullah Sheikh' ||
        normalized === 'Md. Sifatullah Sheikh';

      return isSelf ? (
        <strong key={index} style={{ color: ACCENT }}>
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      );
    });
}

function StatCard({
  value,
  label,
  note,
  accent,
}: {
  value: number;
  label: string;
  note?: string;
  accent: string;
}) {
  return (
    <div
      className="research-stat-card rounded-[22px] p-5"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: MUTED }}
          >
            {label}
          </p>

          <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">
            {value}
          </p>
        </div>

        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{
            backgroundColor: accent,
            boxShadow: `0 0 0 6px ${accent}14`,
          }}
        />
      </div>

      {note && (
        <p className="mt-4 text-[10px]" style={{ color: MUTED }}>
          {note}
        </p>
      )}
    </div>
  );
}

function CopyCitationButton({ pub }: { pub: Publication }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const citation = `${pub.authors}. "${pub.title}." ${pub.venue}, ${pub.year}.`;

    try {
      await navigator.clipboard.writeText(citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="research-action inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 text-xs font-semibold"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        color: INK,
      }}
      aria-label={`Copy citation for ${pub.title}`}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy citation'}
    </button>
  );
}

function PublicationCard({
  pub,
  indexNumber,
}: {
  pub: Publication;
  indexNumber: number;
}) {
  const type: VenueType =
    pub.venueType === 'conference'
      ? 'conference'
      : pub.venueType === 'dataset'
        ? 'dataset'
        : 'journal';

  const meta = TYPE_META[type];
  const Icon = meta.icon;
  const firstAuthor = isFirstAuthor(pub.authors);

  return (
    <article
      id={`publication-${pub.id}`}
      className="publication-card scroll-mt-28 overflow-hidden rounded-[26px]"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        boxShadow: '0 20px 52px rgba(20,20,20,.05)',
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${meta.accent}, transparent 74%)`,
        }}
      />

      <div className="grid lg:grid-cols-[94px_1fr]">
        <div
          className="flex items-start justify-between gap-4 border-b p-5 lg:flex-col lg:justify-start lg:border-b-0 lg:border-r lg:p-6"
          style={{
            borderColor: LINE,
            backgroundColor: PAPER,
          }}
        >
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: meta.soft,
              color: meta.accent,
            }}
          >
            <Icon className="h-5 w-5" />
          </span>

          <span
            className="text-[11px] font-semibold tabular-nums"
            style={{ color: MUTED }}
          >
            {String(indexNumber).padStart(2, '0')}
          </span>
        </div>

        <div className="p-5 sm:p-7 md:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-[840px]">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                  style={{
                    backgroundColor: meta.soft,
                    border: `1px solid ${meta.accent}1F`,
                    color: meta.accent,
                  }}
                >
                  {meta.label}
                </span>

                <span
                  className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                  style={{
                    backgroundColor: PAPER,
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  {pub.year}
                </span>

                {firstAuthor && (
                  <span
                    className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                    style={{
                      backgroundColor: 'rgba(29,122,112,.08)',
                      border: '1px solid rgba(29,122,112,.14)',
                      color: TEAL,
                    }}
                  >
                    <Star className="h-3 w-3" />
                    First author
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-2xl md:text-[1.75rem]">
                {pub.title}
              </h3>

              <p
                className="mt-4 text-sm leading-7"
                style={{ color: MUTED }}
              >
                {highlightSelf(pub.authors)}
              </p>

              <p
                className="mt-2 text-xs font-semibold"
                style={{ color: meta.accent }}
              >
                {pub.venue}
              </p>
            </div>

            <div className="shrink-0">
              <span
                className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: '#AAA59D' }}
              >
                {meta.plural}
              </span>
            </div>
          </div>

          <div
            className="mt-6 rounded-[18px] p-4"
            style={{
              background:
                type === 'dataset'
                  ? 'linear-gradient(145deg, rgba(240,165,74,.10), rgba(247,245,239,.9))'
                  : 'linear-gradient(145deg, rgba(255,255,255,.55), rgba(247,245,239,.95))',
              border: `1px solid ${LINE}`,
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: meta.soft,
                  color: meta.accent,
                }}
              >
                <Sparkles className="h-4 w-4" />
              </span>

              <div>
                <p
                  className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: MUTED }}
                >
                  Why it matters
                </p>
                <p
                  className="mt-2 text-sm leading-7"
                  style={{ color: '#56544F' }}
                >
                  {pub.highlight}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {pub.link && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="research-primary-action group inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 text-xs font-semibold"
                style={{
                  backgroundColor: INK,
                  color: '#fff',
                }}
              >
                Open publication
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}

            <CopyCitationButton pub={pub} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Research() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');

  const journals = useMemo(
    () => PUBLICATIONS.filter((pub) => pub.venueType === 'journal'),
    []
  );

  const conferences = useMemo(
    () => PUBLICATIONS.filter((pub) => pub.venueType === 'conference'),
    []
  );

  const datasets = useMemo(
    () => PUBLICATIONS.filter((pub) => pub.venueType === 'dataset'),
    []
  );

  const filteredPublications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PUBLICATIONS.filter((pub) => {
      const matchesFilter =
        filter === 'all' || pub.venueType === filter;

      const haystack = [
        pub.title,
        pub.authors,
        pub.venue,
        String(pub.year),
        pub.highlight,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        haystack.includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [filter, query]);

  const featuredPublication =
    journals[0] || conferences[0] || datasets[0] || PUBLICATIONS[0];

  const firstAuthorCount = useMemo(
    () => PUBLICATIONS.filter((pub) => isFirstAuthor(pub.authors)).length,
    []
  );

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--research-x', `${x}%`);
      node.style.setProperty('--research-y', `${y}%`);
    };

    node.addEventListener('pointermove', onPointerMove);
    return () => node.removeEventListener('pointermove', onPointerMove);
  }, [reducedMotion]);

  return (
    <main
      className="research-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .research-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .research-display {
          letter-spacing: -0.062em;
        }

        .research-section-title {
          letter-spacing: -0.045em;
        }

        .research-hero {
          --research-x: 78%;
          --research-y: 18%;
        }

        .research-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--research-x) var(--research-y),
              rgba(229,83,61,.11),
              transparent 24%
            );
          opacity: .84;
        }

        .research-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.92), transparent 96%);
        }

        .research-stat-card,
        .publication-card {
          transition:
            transform .36s cubic-bezier(.2,.7,.2,1),
            box-shadow .36s ease,
            border-color .3s ease;
        }

        .research-stat-card:hover,
        .publication-card:hover {
          transform: translateY(-4px);
          border-color: #D8D1C5;
          box-shadow: 0 24px 60px rgba(20,20,20,.08) !important;
        }

        .research-action,
        .research-primary-action {
          -webkit-tap-highlight-color: transparent;
        }

        .research-filter-button {
          transition:
            background-color .25s ease,
            color .25s ease,
            border-color .25s ease,
            transform .28s cubic-bezier(.2,.7,.2,1);
        }

        .research-filter-button:hover {
          transform: translateY(-2px);
        }

        .research-search {
          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .research-search:focus-within {
          border-color: #CFC8BC;
          background-color: #fff;
          box-shadow: 0 10px 30px rgba(20,20,20,.06);
        }

        .research-dark-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .research-dark-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 16% 18%, rgba(229,83,61,.18), transparent 28%),
            radial-gradient(circle at 86% 76%, rgba(29,122,112,.14), transparent 30%);
        }

        .research-publisher-link {
          position: relative;
          width: fit-content;
        }

        .research-publisher-link::after {
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

        .research-publisher-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        @media (min-width: 640px) {
          .research-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .research-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .research-stat-card,
          .publication-card,
          .research-filter-button,
          .research-search,
          .research-publisher-link::after {
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
        className="research-hero relative overflow-hidden border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F1ECE3 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="research-grid pointer-events-none absolute inset-0 opacity-70"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="research-page-width relative z-10 grid min-h-[670px] items-center gap-10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
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
                  R
                </span>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                  style={{ color: MUTED }}
                >
                  Research
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1 className="research-display max-w-[920px] text-[clamp(3.5rem,8.6vw,7.6rem)] font-semibold leading-[0.84]">
                Publications,
                <br />
                datasets &
                <br />
                <span style={{ color: ACCENT }}>research work.</span>
              </h1>
            </Reveal>

            <Reveal delay={105}>
              <p
                className="mt-8 max-w-[680px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                Journal articles, conference proceedings, and published datasets
                represented in my portfolio, with concise contribution summaries
                and direct publication links.
              </p>
            </Reveal>

            <Reveal delay={145}>
              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  ['Journal', journals.length, ACCENT],
                  ['Conference', conferences.length, TEAL],
                  ['Dataset', datasets.length, AMBER],
                ].map(([label, count, color]) => (
                  <a
                    key={String(label)}
                    href="#research-index"
                    className="inline-flex min-h-[36px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                      color: MUTED,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: String(color) }}
                    />
                    {label} · {count}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={115} className="md:col-span-5">
            <div
              className="research-dark-card rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                color: '#fff',
                boxShadow: '0 28px 75px rgba(20,20,20,.16)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,.40)' }}
                  >
                    Google Scholar
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Citation snapshot
                  </h2>
                </div>

                <BarChart3 className="h-5 w-5" style={{ color: AMBER }} />
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  ['Citations', CITATION_STATS.citations],
                  ['h-index', CITATION_STATS.hIndex],
                  ['i10-index', CITATION_STATS.i10Index],
                ].map(([label, value]) => (
                  <div
                    key={String(label)}
                    className="rounded-2xl p-4"
                    style={{
                      backgroundColor: 'rgba(255,255,255,.055)',
                      border: '1px solid rgba(255,255,255,.10)',
                    }}
                  >
                    <p className="text-2xl font-semibold tracking-[-0.04em]">
                      {value}
                    </p>
                    <p
                      className="mt-1 text-[9px] uppercase tracking-[0.12em]"
                      style={{ color: 'rgba(255,255,255,.42)' }}
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 flex items-center justify-between gap-4 border-t pt-5"
                style={{ borderColor: 'rgba(255,255,255,.10)' }}
              >
                <span
                  className="text-[9px] uppercase tracking-[0.13em]"
                  style={{ color: 'rgba(255,255,255,.38)' }}
                >
                  Updated {CITATION_STATS.lastUpdated}
                </span>

                <a
                  href={SCHOLAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-xs font-semibold"
                >
                  Open Scholar
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* RESEARCH SNAPSHOT                                                */}
      {/* ================================================================ */}
      <section className="research-page-width py-20 md:py-24">
        <Reveal>
          <SectionHeader
            number="01"
            eyebrow="Research snapshot"
            title="A quick view before the full index."
            description="Counts below are generated directly from the publications currently stored in the portfolio."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Reveal>
            <StatCard
              value={PUBLICATIONS.length}
              label="Total entries"
              note="Publications + datasets"
              accent={INK}
            />
          </Reveal>

          <Reveal delay={45}>
            <StatCard
              value={journals.length}
              label="Journal articles"
              accent={ACCENT}
            />
          </Reveal>

          <Reveal delay={90}>
            <StatCard
              value={conferences.length}
              label="Conference papers"
              accent={TEAL}
            />
          </Reveal>

          <Reveal delay={135}>
            <StatCard
              value={firstAuthorCount}
              label="First-author entries"
              accent={AMBER}
            />
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED                                                         */}
      {/* ================================================================ */}
      {featuredPublication && (
        <section
          className="border-y py-20 md:py-24"
          style={{
            borderColor: LINE,
            background:
              'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
          }}
        >
          <div className="research-page-width">
            <Reveal>
              <SectionHeader
                number="02"
                eyebrow="Featured"
                title="One publication, presented like a case study."
                description="The full research index follows below."
              />
            </Reveal>

            <Reveal delay={70}>
              <div
                className="research-dark-card mt-8 grid overflow-hidden rounded-[30px] lg:grid-cols-[.78fr_1.22fr]"
                style={{
                  background:
                    'linear-gradient(145deg, #171717 0%, #24231F 100%)',
                  color: '#fff',
                  boxShadow: '0 28px 74px rgba(20,20,20,.14)',
                }}
              >
                <div
                  className="flex min-h-[320px] flex-col justify-between p-6 sm:p-8 md:p-10"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,.10)',
                  }}
                >
                  <div>
                    <span
                      className="inline-flex min-h-[32px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                      style={{
                        backgroundColor: 'rgba(229,83,61,.12)',
                        border: '1px solid rgba(229,83,61,.18)',
                        color: '#FF8C77',
                      }}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      Featured research
                    </span>

                    <p
                      className="mt-6 text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: 'rgba(255,255,255,.38)' }}
                    >
                      {featuredPublication.venue} · {featuredPublication.year}
                    </p>
                  </div>

                  <div>
                    <p
                      className="text-sm leading-7"
                      style={{ color: 'rgba(255,255,255,.54)' }}
                    >
                      {featuredPublication.highlight}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
                  <div>
                    <h3 className="text-3xl font-semibold leading-[1.04] tracking-[-0.04em] sm:text-4xl">
                      {featuredPublication.title}
                    </h3>

                    <p
                      className="mt-5 text-sm leading-7"
                      style={{ color: 'rgba(255,255,255,.52)' }}
                    >
                      {highlightSelf(featuredPublication.authors)}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {featuredPublication.link && (
                      <a
                        href={featuredPublication.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 text-xs font-semibold"
                        style={{
                          backgroundColor: '#fff',
                          color: INK,
                        }}
                      >
                        Open publication
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}

                    <CopyCitationButton pub={featuredPublication} />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/* INDEX + FILTERS                                                  */}
      {/* ================================================================ */}
      <section
        id="research-index"
        className="research-page-width py-20 md:py-28"
      >
        <Reveal>
          <SectionHeader
            number="03"
            eyebrow="Research index"
            title="Search, filter, open, or copy a citation."
            description="The index is generated directly from PUBLICATIONS."
          />
        </Reveal>

        <Reveal delay={55}>
          <div
            className="mt-8 rounded-[24px] p-4 sm:p-5"
            style={{
              backgroundColor: PAPER_2,
              border: `1px solid ${LINE}`,
            }}
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div
                className="research-search flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 xl:max-w-[460px]"
                style={{
                  backgroundColor: 'rgba(255,255,255,.66)',
                  border: `1px solid ${LINE}`,
                }}
              >
                <Search className="h-4 w-4 shrink-0" style={{ color: MUTED }} />

                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, author, venue, year…"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  style={{ color: INK }}
                  aria-label="Search research entries"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" style={{ color: MUTED }} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['all', 'All', INK],
                    ['journal', 'Journal', ACCENT],
                    ['conference', 'Conference', TEAL],
                    ['dataset', 'Dataset', AMBER],
                  ] as Array<[FilterType, string, string]>
                ).map(([value, label, color]) => {
                  const active = filter === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setFilter(value)}
                      className="research-filter-button inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: active ? INK : WHITE,
                        border: `1px solid ${active ? INK : LINE}`,
                        color: active ? '#fff' : MUTED,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: active ? '#fff' : color,
                        }}
                      />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="mt-4 flex items-center justify-between gap-4 border-t pt-4"
              style={{ borderColor: LINE }}
            >
              <p className="text-[10px]" style={{ color: MUTED }}>
                Showing {filteredPublications.length} of {PUBLICATIONS.length}
              </p>

              <a
                href={SCHOLAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="research-publisher-link inline-flex items-center gap-2 text-[10px] font-semibold"
              >
                Google Scholar
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-7 space-y-5">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub, index) => (
              <Reveal key={pub.id} delay={Math.min(index * 40, 200)}>
                <PublicationCard
                  pub={pub}
                  indexNumber={PUBLICATIONS.findIndex(
                    (item) => item.id === pub.id
                  ) + 1}
                />
              </Reveal>
            ))
          ) : (
            <Reveal>
              <div
                className="rounded-[26px] p-8 text-center sm:p-12"
                style={{
                  backgroundColor: WHITE,
                  border: `1px solid ${LINE}`,
                }}
              >
                <Search
                  className="mx-auto h-6 w-6"
                  style={{ color: MUTED }}
                />

                <h3 className="mt-4 text-xl font-semibold">
                  No matching research entry
                </h3>

                <p className="mt-2 text-sm" style={{ color: MUTED }}>
                  Try another keyword or reset the category filter.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFilter('all');
                    setQuery('');
                  }}
                  className="mt-5 inline-flex min-h-[44px] items-center rounded-xl px-4 text-xs font-semibold"
                  style={{
                    backgroundColor: INK,
                    color: '#fff',
                  }}
                >
                  Reset filters
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* SCHOLAR NOTICE                                                   */}
      {/* ================================================================ */}
      <section
        className="border-y py-20 md:py-24"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="research-page-width">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
              <div
                className="research-dark-card rounded-[26px] p-6 sm:p-8"
                style={{
                  background:
                    'linear-gradient(145deg, #171717 0%, #24231F 100%)',
                  color: '#fff',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: 'rgba(255,255,255,.38)' }}
                    >
                      Citation data
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                      Manually synced.
                    </h3>
                  </div>

                  <Info className="h-5 w-5" style={{ color: AMBER }} />
                </div>

                <p
                  className="mt-5 text-sm leading-7"
                  style={{ color: 'rgba(255,255,255,.54)' }}
                >
                  The citation counters shown on this page are manually updated
                  from Google Scholar and are not real-time.
                </p>

                <a
                  href={SCHOLAR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold"
                >
                  Verify on Google Scholar
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div
                className="rounded-[26px] p-6 sm:p-8"
                style={{
                  backgroundColor: WHITE,
                  border: `1px solid ${LINE}`,
                }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: 'rgba(229,83,61,.09)',
                      color: ACCENT,
                    }}
                  >
                    <FileText className="h-5 w-5" />
                  </span>

                  <div>
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      Academic reference note
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      Citation-ready entries
                    </h3>

                    <p
                      className="mt-3 text-sm leading-7"
                      style={{ color: MUTED }}
                    >
                      Each research card can copy a compact citation generated
                      from the author list, title, venue, and year stored in the
                      portfolio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* END STRIP                                                        */}
      {/* ================================================================ */}
      <section
        className="border-t"
        style={{ borderColor: LINE, backgroundColor: PAPER_2 }}
      >
        <div className="research-page-width grid sm:grid-cols-3">
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
                Previous
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Experience
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/projects"
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
              <span className="mt-1 block text-sm font-semibold">
                Projects
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href={SCHOLAR_URL}
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
                External
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Google Scholar
              </span>
            </span>

            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </main>
  );
}
