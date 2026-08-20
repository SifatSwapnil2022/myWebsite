import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Calendar, Bookmark, Award, BookOpen, GraduationCap, Sparkles, Filter, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import { NEWS } from '../data/portfolioData';

type FilterType = 'All' | 'Publication' | 'Event' | 'Academic' | 'Award' | 'Career';

const FILTERS: FilterType[] = ['All', 'Publication', 'Event', 'Academic', 'Award', 'Career'];

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

// One accent per category, drawn from the shared palette — not a rainbow.
// Career shares teal with Academic (both are "life milestone" categories
// rather than research output) but is still distinguishable via its own
// icon (Briefcase vs GraduationCap) and label.
const CATEGORY_STYLE: Record<string, { color: string; bg: string }> = {
  Publication: { color: CORAL, bg: `${CORAL}14` },
  Event:       { color: '#8A6300', bg: `${AMBER}25` }, // darker amber for text contrast on the light amber fill
  Academic:    { color: TEAL, bg: `${TEAL}14` },
  Award:       { color: INK, bg: `${INK}0D` },
  Career:      { color: TEAL, bg: `${TEAL}14` },
};

/* ─── Motion primitives (hooks + CSS only, no new dependencies) ─────────── */

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

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const shown = visible || reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<FilterType>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const reducedMotion = usePrefersReducedMotion();

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredNews = NEWS.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const countFor = (cat: FilterType) =>
    cat === 'All' ? NEWS.length : NEWS.filter((n) => n.category === cat).length;

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'Publication': return <BookOpen className="w-3.5 h-3.5" />;
      case 'Event':        return <Sparkles className="w-3.5 h-3.5" />;
      case 'Academic':     return <GraduationCap className="w-3.5 h-3.5" />;
      case 'Award':        return <Award className="w-3.5 h-3.5" />;
      case 'Career':        return <Briefcase className="w-3.5 h-3.5" />;
      default:              return <Calendar className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-10 md:space-y-12 py-8 md:py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes driftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -14px) scale(1.05); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-16px, 12px) scale(1.04); }
        }
      `}</style>

      {/* Header */}
      <section className="relative overflow-hidden rounded-4xl p-2">
        {/* Ambient drifting blobs — matches Home/About/Contact/Experience, disabled under reduced motion */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -right-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[80px]"
          style={{
            backgroundColor: `${CORAL}0F`,
            animation: reducedMotion ? undefined : 'driftA 15s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[80px]"
          style={{
            backgroundColor: `${TEAL}0F`,
            animation: reducedMotion ? undefined : 'driftB 18s ease-in-out infinite',
          }}
        />

        <Reveal className="relative space-y-4">
          <div className="flex items-center gap-3">
            <span
              className="block w-0.5 h-5 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${CORAL}, ${AMBER})` }}
            />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: CORAL }}>
              News
            </span>
          </div>
          <h1 className="dsp text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: INK }}>
            Updates & milestones
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed" style={{ color: `${INK}80` }}>
            Publications, conference presentations, awards, and other academic updates, in one place.
          </p>
        </Reveal>
      </section>

      {/* Category Filters */}
      <Reveal delay={80}>
        <div className="flex flex-wrap items-center gap-2 pb-6" style={{ borderBottom: `1px solid ${INK}0D` }}>
          <div className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mr-2" style={{ color: `${INK}55` }}>
            <Filter className="w-3.5 h-3.5" /> Filter:
          </div>
          {FILTERS.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 hover:-translate-y-0.5"
                style={{
                  backgroundColor: active ? INK : '#fff',
                  color: active ? '#fff' : `${INK}99`,
                  border: `1px solid ${active ? INK : `${INK}1A`}`,
                }}
              >
                {cat === 'All' ? 'All' : `${cat}s`}
                <span className="text-[10px] font-bold" style={{ color: active ? 'rgba(255,255,255,0.55)' : `${INK}45` }}>
                  {countFor(cat)}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* News List */}
      <div className="grid grid-cols-1 gap-8">
        {filteredNews.length > 0 ? (
          filteredNews.map((item, i) => {
            const isExpanded = !!expandedIds[item.id];
            const style = CATEGORY_STYLE[item.category ?? ''] ?? { color: `${INK}80`, bg: `${INK}0D` };
            return (
              <Reveal key={item.id} delay={i * 70}>
                <div
                  className="group rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col md:flex-row"
                  style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D` }}
                >
                  {/* News Image (if exists) */}
                  {item.image && (
                    <div className="w-full md:w-[280px] lg:w-[320px] h-48 sm:h-52 shrink-0 relative overflow-hidden" style={{ backgroundColor: `${INK}0D` }}>
                      <img
                        src={item.image}
                        alt={item.content}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  {/* News Content */}
                  <div className="p-5 sm:p-6 md:p-8 flex-grow flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest flex items-center gap-1" style={{ color: `${INK}50` }}>
                          <Calendar className="w-3 h-3" /> {item.date}
                        </span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5"
                          style={{ backgroundColor: style.bg, color: style.color }}
                        >
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </span>
                      </div>

                      <h3 className="dsp text-lg sm:text-xl md:text-2xl font-bold leading-snug" style={{ color: INK }}>
                        {item.content}
                      </h3>

                      {/* Expandable detailed content block */}
                      {item.longContent && (
                        <div className="space-y-3">
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-xs font-bold transition-colors duration-200 flex items-center gap-1"
                            style={{ color: CORAL }}
                          >
                            {isExpanded ? (
                              <>Show less <ChevronUp className="w-3.5 h-3.5" /></>
                            ) : (
                              <>Read more <ChevronDown className="w-3.5 h-3.5" /></>
                            )}
                          </button>

                          {isExpanded && (
                            <p
                              className="text-sm leading-relaxed p-4 rounded-2xl"
                              style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D`, color: `${INK}99`, animation: 'slideDown 0.25s ease-out' }}
                            >
                              {item.longContent}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Attachment links */}
                    {item.link && (
                      <div className="pt-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-xl transition-colors duration-200 shadow-sm"
                          style={{ backgroundColor: INK, color: '#fff' }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                        >
                          {item.linkText || 'Read paper'} <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })
        ) : (
          <Reveal>
            <div
              className="text-center py-16 rounded-3xl space-y-4"
              style={{ backgroundColor: PAPER, border: `1px dashed ${INK}26` }}
            >
              <Bookmark className="w-8 h-8 mx-auto" style={{ color: `${INK}33` }} />
              <p className="text-sm font-medium" style={{ color: `${INK}80` }}>
                Nothing here yet for this category.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold hover:underline"
                style={{ color: CORAL }}
              >
                Show all updates
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}