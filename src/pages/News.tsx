import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Bookmark,
  BriefcaseBusiness,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  GraduationCap,
  Image as ImageIcon,
  Newspaper,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { NEWS } from '../data/portfolioData';

type FilterType =
  | 'All'
  | 'Publication'
  | 'Event'
  | 'Academic'
  | 'Award'
  | 'Career';

const FILTERS: FilterType[] = [
  'All',
  'Publication',
  'Event',
  'Academic',
  'Award',
  'Career',
];

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

const CATEGORY_STYLE: Record<
  Exclude<FilterType, 'All'>,
  {
    color: string;
    soft: string;
    icon: typeof Newspaper;
  }
> = {
  Publication: {
    color: ACCENT,
    soft: 'rgba(229,83,61,.09)',
    icon: Newspaper,
  },
  Event: {
    color: '#9A651A',
    soft: 'rgba(240,165,74,.13)',
    icon: Sparkles,
  },
  Academic: {
    color: TEAL,
    soft: 'rgba(29,122,112,.09)',
    icon: GraduationCap,
  },
  Award: {
    color: BLUE,
    soft: 'rgba(37,58,120,.09)',
    icon: Award,
  },
  Career: {
    color: '#6F4A9E',
    soft: 'rgba(111,74,158,.09)',
    icon: BriefcaseBusiness,
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
        <h2 className="news-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
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

function getCategoryMeta(category?: string) {
  if (
    category === 'Publication' ||
    category === 'Event' ||
    category === 'Academic' ||
    category === 'Award' ||
    category === 'Career'
  ) {
    return CATEGORY_STYLE[category];
  }

  return {
    color: MUTED,
    soft: 'rgba(113,111,105,.09)',
    icon: Calendar,
  };
}

function CategoryPill({ category }: { category?: string }) {
  const meta = getCategoryMeta(category);
  const Icon = meta.icon;

  return (
    <span
      className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
      style={{
        backgroundColor: meta.soft,
        border: `1px solid ${meta.color}1F`,
        color: meta.color,
      }}
    >
      <Icon className="h-3.5 w-3.5" />
      {category || 'Update'}
    </span>
  );
}

function NewsCard({
  item,
  index,
  expanded,
  onToggle,
}: {
  item: (typeof NEWS)[number];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const meta = getCategoryMeta(item.category);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <article
      className="news-card overflow-hidden rounded-[28px]"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        boxShadow: '0 20px 54px rgba(20,20,20,.05)',
      }}
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: `linear-gradient(90deg, ${meta.color}, transparent 74%)`,
        }}
      />

      <div
        className={`grid ${
          item.image ? 'lg:grid-cols-[360px_1fr]' : ''
        }`}
      >
        {item.image && (
          <div className="news-image-wrap relative min-h-[240px] overflow-hidden lg:min-h-full">
            <img
              src={item.image}
              alt={item.content}
              className="news-image absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(20,20,20,.34), transparent 62%)',
              }}
            />

            <div
              className="absolute bottom-4 left-4 rounded-xl px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em]"
              style={{
                backgroundColor: 'rgba(255,255,255,.90)',
                border: '1px solid rgba(255,255,255,.72)',
                color: INK,
                WebkitBackdropFilter: 'blur(10px)',
                backdropFilter: 'blur(10px)',
              }}
            >
              Update {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        )}

        <div className="p-5 sm:p-7 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryPill category={item.category} />

                <span
                  className="inline-flex min-h-[30px] items-center gap-1.5 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                  style={{
                    backgroundColor: PAPER,
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </span>
              </div>

              {!item.image && (
                <span
                  className="text-[10px] font-semibold tabular-nums"
                  style={{ color: '#AAA59D' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
            </div>

            <h3 className="max-w-[880px] text-xl font-semibold leading-[1.13] tracking-[-0.03em] sm:text-2xl md:text-[1.75rem]">
              {item.content}
            </h3>

            {item.longContent && (
              <div>
                <button
                  type="button"
                  onClick={onToggle}
                  className="news-expand-button inline-flex min-h-[42px] items-center gap-2 rounded-xl px-3.5 text-xs font-semibold"
                  style={{
                    backgroundColor: PAPER,
                    border: `1px solid ${LINE}`,
                    color: INK,
                  }}
                  aria-expanded={expanded}
                >
                  {expanded ? (
                    <>
                      Show less
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read more
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      initial={
                        reducedMotion
                          ? false
                          : { opacity: 0, height: 0, y: -4 }
                      }
                      animate={{
                        opacity: 1,
                        height: 'auto',
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: -4,
                      }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.28,
                        ease: [0.2, 0.7, 0.2, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div
                        className="mt-4 rounded-[18px] p-4 sm:p-5"
                        style={{
                          background:
                            'linear-gradient(145deg, rgba(255,255,255,.55), rgba(247,245,239,.96))',
                          border: `1px solid ${LINE}`,
                        }}
                      >
                        <p
                          className="text-sm leading-7"
                          style={{ color: MUTED }}
                        >
                          {item.longContent}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {item.link && (
              <div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-primary-action group inline-flex min-h-[46px] items-center gap-2 rounded-xl px-4 text-xs font-semibold"
                  style={{
                    backgroundColor: INK,
                    color: '#fff',
                  }}
                >
                  {item.linkText || 'Open link'}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function News() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [selectedCategory, setSelectedCategory] =
    useState<FilterType>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');

  const featuredItem = NEWS[0];

  const counts = useMemo(() => {
    return FILTERS.reduce(
      (acc, category) => {
        acc[category] =
          category === 'All'
            ? NEWS.length
            : NEWS.filter((item) => item.category === category).length;

        return acc;
      },
      {} as Record<FilterType, number>
    );
  }, []);

  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return NEWS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category === selectedCategory;

      const haystack = [
        item.content,
        item.longContent || '',
        item.category || '',
        item.date,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        normalizedQuery.length === 0 ||
        haystack.includes(normalizedQuery);

      return matchesCategory && matchesSearch;
    });
  }, [query, selectedCategory]);

  const imageCount = useMemo(
    () => NEWS.filter((item) => Boolean(item.image)).length,
    []
  );

  const linkCount = useMemo(
    () => NEWS.filter((item) => Boolean(item.link)).length,
    []
  );

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--news-x', `${x}%`);
      node.style.setProperty('--news-y', `${y}%`);
    };

    node.addEventListener('pointermove', onPointerMove);
    return () => node.removeEventListener('pointermove', onPointerMove);
  }, [reducedMotion]);

  return (
    <main
      className="news-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .news-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .news-display {
          letter-spacing: -0.062em;
        }

        .news-section-title {
          letter-spacing: -0.045em;
        }

        .news-hero {
          --news-x: 78%;
          --news-y: 18%;
        }

        .news-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--news-x) var(--news-y),
              rgba(229,83,61,.11),
              transparent 24%
            );
          opacity: .84;
        }

        .news-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.92), transparent 96%);
        }

        .news-card,
        .news-stat-card {
          transition:
            transform .36s cubic-bezier(.2,.7,.2,1),
            box-shadow .36s ease,
            border-color .3s ease;
        }

        .news-card:hover,
        .news-stat-card:hover {
          transform: translateY(-4px);
          border-color: #D8D1C5;
          box-shadow: 0 24px 60px rgba(20,20,20,.08) !important;
        }

        .news-image {
          transition: transform .75s cubic-bezier(.2,.7,.2,1);
        }

        .news-card:hover .news-image {
          transform: scale(1.025);
        }

        .news-search {
          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .news-search:focus-within {
          border-color: #CFC8BC;
          background-color: #fff;
          box-shadow: 0 10px 30px rgba(20,20,20,.06);
        }

        .news-filter-button {
          transition:
            transform .28s cubic-bezier(.2,.7,.2,1),
            background-color .25s ease,
            color .25s ease,
            border-color .25s ease;
        }

        .news-filter-button:hover {
          transform: translateY(-2px);
        }

        .news-primary-action,
        .news-expand-button {
          -webkit-tap-highlight-color: transparent;
        }

        .news-dark-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .news-dark-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 16% 18%, rgba(229,83,61,.18), transparent 28%),
            radial-gradient(circle at 86% 76%, rgba(29,122,112,.14), transparent 30%);
        }

        @media (min-width: 640px) {
          .news-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .news-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .news-card,
          .news-stat-card,
          .news-image,
          .news-search,
          .news-filter-button {
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
        className="news-hero relative overflow-hidden border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F1ECE3 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="news-grid pointer-events-none absolute inset-0 opacity-70"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="news-page-width relative z-10 grid min-h-[660px] items-center gap-10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
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
                  N
                </span>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                  style={{ color: MUTED }}
                >
                  News & updates
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1 className="news-display max-w-[900px] text-[clamp(3.5rem,8.5vw,7.5rem)] font-semibold leading-[0.84]">
                Milestones,
                <br />
                updates &
                <br />
                <span style={{ color: ACCENT }}>what’s new.</span>
              </h1>
            </Reveal>

            <Reveal delay={105}>
              <p
                className="mt-8 max-w-[660px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                Publications, academic updates, events, awards, and career
                milestones collected in one timeline.
              </p>
            </Reveal>

            <Reveal delay={145}>
              <div className="mt-8 flex flex-wrap gap-2">
                {FILTERS.filter((category) => category !== 'All').map(
                  (category) => {
                    const meta = CATEGORY_STYLE[category];

                    return (
                      <a
                        key={category}
                        href="#news-index"
                        className="inline-flex min-h-[36px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                        style={{
                          backgroundColor: WHITE,
                          border: `1px solid ${LINE}`,
                          color: MUTED,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: meta.color }}
                        />
                        {category} · {counts[category]}
                      </a>
                    );
                  }
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={115} className="md:col-span-5">
            <div
              className="news-dark-card rounded-[28px] p-6 sm:p-8"
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
                    Timeline snapshot
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Updates at a glance
                  </h2>
                </div>

                <Newspaper className="h-5 w-5" style={{ color: AMBER }} />
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  ['Updates', NEWS.length],
                  ['With image', imageCount],
                  ['With link', linkCount],
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

              <a
                href="#news-index"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold"
              >
                Browse updates
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED UPDATE                                                  */}
      {/* ================================================================ */}
      {featuredItem && (
        <section className="news-page-width py-20 md:py-24">
          <Reveal>
            <SectionHeader
              number="01"
              eyebrow="Featured update"
              title="The latest item gets more room."
              description="The first item in your NEWS data is treated as the featured update."
            />
          </Reveal>

          <Reveal delay={70}>
            <div
              className="news-dark-card mt-8 grid overflow-hidden rounded-[30px] lg:grid-cols-[.95fr_1.05fr]"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #24231F 100%)',
                color: '#fff',
                boxShadow: '0 28px 74px rgba(20,20,20,.14)',
              }}
            >
              <div
                className="relative min-h-[320px] overflow-hidden"
                style={{
                  borderBottom: '1px solid rgba(255,255,255,.10)',
                }}
              >
                {featuredItem.image ? (
                  <>
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.content}
                      className="absolute inset-0 h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(20,20,20,.66), rgba(20,20,20,.08))',
                      }}
                    />
                  </>
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background:
                        'linear-gradient(145deg, #1D1D1A 0%, #2D2B26 100%)',
                    }}
                  >
                    <ImageIcon
                      className="h-10 w-10"
                      style={{ color: 'rgba(255,255,255,.18)' }}
                    />
                  </div>
                )}

                <div className="absolute bottom-5 left-5">
                  <CategoryPill category={featuredItem.category} />
                </div>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: 'rgba(255,255,255,.38)' }}
                  >
                    {featuredItem.date}
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-4xl">
                    {featuredItem.content}
                  </h3>

                  {featuredItem.longContent && (
                    <p
                      className="mt-5 text-sm leading-7"
                      style={{ color: 'rgba(255,255,255,.54)' }}
                    >
                      {featuredItem.longContent}
                    </p>
                  )}
                </div>

                {featuredItem.link && (
                  <a
                    href={featuredItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex min-h-[46px] w-fit items-center gap-2 rounded-xl px-4 text-xs font-semibold"
                    style={{
                      backgroundColor: '#fff',
                      color: INK,
                    }}
                  >
                    {featuredItem.linkText || 'Open update'}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ================================================================ */}
      {/* FILTER + INDEX                                                   */}
      {/* ================================================================ */}
      <section
        id="news-index"
        className="border-y py-20 md:py-28"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="news-page-width">
          <Reveal>
            <SectionHeader
              number="02"
              eyebrow="Update index"
              title="Search and filter the timeline."
              description="Everything below comes directly from NEWS."
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
                  className="news-search flex min-h-[48px] w-full items-center gap-3 rounded-xl px-4 xl:max-w-[460px]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.66)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <Search
                    className="h-4 w-4 shrink-0"
                    style={{ color: MUTED }}
                  />

                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search updates…"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    style={{ color: INK }}
                    aria-label="Search updates"
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
                  {FILTERS.map((category) => {
                    const active = selectedCategory === category;
                    const meta =
                      category === 'All'
                        ? { color: INK }
                        : CATEGORY_STYLE[category];

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className="news-filter-button inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 text-[10px] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          backgroundColor: active ? INK : WHITE,
                          border: `1px solid ${active ? INK : LINE}`,
                          color: active ? '#fff' : MUTED,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            backgroundColor: active ? '#fff' : meta.color,
                          }}
                        />
                        {category}
                        <span
                          className="text-[9px]"
                          style={{
                            color: active
                              ? 'rgba(255,255,255,.55)'
                              : '#AAA59D',
                          }}
                        >
                          {counts[category]}
                        </span>
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
                  Showing {filteredNews.length} of {NEWS.length}
                </p>

                <div
                  className="inline-flex items-center gap-1.5 text-[10px] font-semibold"
                  style={{ color: MUTED }}
                >
                  <Filter className="h-3.5 w-3.5" />
                  {selectedCategory}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-7 space-y-5">
            {filteredNews.length > 0 ? (
              filteredNews.map((item, index) => (
                <Reveal key={item.id} delay={Math.min(index * 45, 220)}>
                  <NewsCard
                    item={item}
                    index={NEWS.findIndex(
                      (newsItem) => newsItem.id === item.id
                    )}
                    expanded={Boolean(expandedIds[item.id])}
                    onToggle={() =>
                      setExpandedIds((previous) => ({
                        ...previous,
                        [item.id]: !previous[item.id],
                      }))
                    }
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
                  <Bookmark
                    className="mx-auto h-7 w-7"
                    style={{ color: MUTED }}
                  />

                  <h3 className="mt-4 text-xl font-semibold">
                    No matching update
                  </h3>

                  <p className="mt-2 text-sm" style={{ color: MUTED }}>
                    Try another keyword or reset the category filter.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
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
        </div>
      </section>

      {/* ================================================================ */}
      {/* CATEGORY SNAPSHOT                                                */}
      {/* ================================================================ */}
      <section className="news-page-width py-20 md:py-24">
        <Reveal>
          <SectionHeader
            number="03"
            eyebrow="Categories"
            title="What the timeline contains."
            description="Category counts are calculated from the current NEWS data."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {FILTERS.filter((category) => category !== 'All').map(
            (category, index) => {
              const meta = CATEGORY_STYLE[category];
              const Icon = meta.icon;

              return (
                <Reveal key={category} delay={index * 45}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(category);
                      document
                        .getElementById('news-index')
                        ?.scrollIntoView({
                          behavior: reducedMotion ? 'auto' : 'smooth',
                        });
                    }}
                    className="news-stat-card flex min-h-[130px] w-full flex-col justify-between rounded-[22px] p-5 text-left"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: meta.soft,
                          color: meta.color,
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </span>

                      <span className="text-2xl font-semibold tracking-[-0.04em]">
                        {counts[category]}
                      </span>
                    </div>

                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      {category}
                    </p>
                  </button>
                </Reveal>
              );
            }
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/* END STRIP                                                        */}
      {/* ================================================================ */}
      <section
        className="border-t"
        style={{ borderColor: LINE, backgroundColor: PAPER_2 }}
      >
        <div className="news-page-width grid sm:grid-cols-3">
          <a
            href="#/research"
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
                Research
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
                Explore
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Projects
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/contact"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Next
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Contact
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
