import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Copy, Check, Info, BookOpen, GraduationCap, Database, Star } from 'lucide-react';
import { PUBLICATIONS } from '../data/portfolioData';
import { Publication } from '../types';

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

const SELF_NAME_PATTERN = /^(Md\.?\s*Sifatullah Sheikh)/i;

function isFirstAuthor(authors: string) {
  return SELF_NAME_PATTERN.test(authors.trim());
}

// One accent per venue type, drawn from the existing four-color palette —
// gives each section its own identity without introducing new hues.
type VenueType = 'journal' | 'conference' | 'dataset';
const TYPE_ACCENT: Record<VenueType, { accent: string; bg: string; text: string }> = {
  journal:    { accent: CORAL, bg: `${CORAL}14`, text: CORAL },
  conference: { accent: TEAL,  bg: `${TEAL}14`,  text: TEAL },
  dataset:    { accent: AMBER, bg: `${AMBER}25`, text: '#8A6300' }, // darker gold for contrast on light amber
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

export default function Research() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const copyCitation = (pub: Publication) => {
    const citation = `${pub.authors}. "${pub.title}." ${pub.venue}, ${pub.year}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const journals = PUBLICATIONS.filter((p) => p.venueType === 'journal');
  const conferences = PUBLICATIONS.filter((p) => p.venueType === 'conference');
  const datasets = PUBLICATIONS.filter((p) => p.venueType === 'dataset');

  const renderPublicationCard = (pub: Publication, indexNumber: number, delay: number) => {
    const firstAuthor = isFirstAuthor(pub.authors);
    const type = (pub.venueType as VenueType) in TYPE_ACCENT ? (pub.venueType as VenueType) : 'journal';
    const { accent, bg, text } = TYPE_ACCENT[type];

    return (
      <Reveal key={pub.id} delay={delay}>
        <div
          className="rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-5 sm:p-6 md:p-8 flex gap-4 sm:gap-6"
          style={{ backgroundColor: '#fff', borderTop: `1px solid ${INK}0D`, borderRight: `1px solid ${INK}0D`, borderBottom: `1px solid ${INK}0D`, borderLeft: `4px solid ${accent}` }}
        >
          {/* Citation index number — colored per venue type */}
          <div
            className="font-mono text-xs sm:text-sm font-bold w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: bg, color: text }}
          >
            [{indexNumber}]
          </div>

          {/* Publication content */}
          <div className="space-y-4 flex-1 min-w-0">
            <div className="space-y-2.5">
              {/* Badges: first-author + year, so the status is visible before the title */}
              <div className="flex flex-wrap items-center gap-2">
                {firstAuthor && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${TEAL}14`, color: TEAL }}
                  >
                    <Star className="w-3 h-3" /> First author
                  </span>
                )}
                <span className="text-xs font-semibold" style={{ color: `${INK}55` }}>
                  {pub.venue} · {pub.year}
                </span>
              </div>

              <h3 className="dsp text-base sm:text-lg md:text-xl font-bold leading-snug" style={{ color: INK }}>
                {pub.title}
              </h3>

              {/* Author list — self bolded, no underline (avoids implying it's a link) */}
              <p className="text-sm leading-relaxed" style={{ color: `${INK}80` }}>
                {pub.authors.split(/(\bMd Sifatullah Sheikh\b|\bMd\. Sifatullah Sheikh\b)/).map((part, i) => {
                  const isSifat = part.trim() === 'Md Sifatullah Sheikh' || part.trim() === 'Md. Sifatullah Sheikh';
                  return isSifat ? (
                    <strong key={i} style={{ color: CORAL }}>{part}</strong>
                  ) : (
                    <span key={i}>{part}</span>
                  );
                })}
              </p>
            </div>

            {/* Plain-language contribution callout — left accent bar, no italics, clear label */}
            <div
              className="text-sm leading-relaxed p-4 rounded-xl"
              style={{ backgroundColor: PAPER, borderLeft: `3px solid ${AMBER}`, color: `${INK}B3` }}
            >
              <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#8A6300' }}>
                Why it matters
              </p>
              {pub.highlight}
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {pub.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-4 py-2 rounded-lg transition-colors duration-200"
                  style={{ backgroundColor: INK, color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                >
                  Publisher link <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => copyCitation(pub)}
                className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-4 py-2 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: `${INK}99` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = `${INK}99`; }}
              >
                {copiedId === pub.id ? (
                  <><Check className="w-3.5 h-3.5" style={{ color: TEAL }} /> Copied</>
                ) : (
                  <><Copy className="w-3.5 h-3.5" /> Copy citation</>
                )}
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    );
  };

  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
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
        {/* Ambient drifting blobs — matches Home/About/Contact/Experience/News, disabled under reduced motion */}
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
            backgroundColor: `${AMBER}0F`,
            animation: reducedMotion ? undefined : 'driftB 18s ease-in-out infinite',
          }}
        />

        <Reveal className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-0.5 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${CORAL}, ${AMBER})` }} />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: CORAL }}>
              Research index
            </span>
          </div>
          <h1 className="dsp text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: INK }}>
            Publications & datasets
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mt-4" style={{ color: `${INK}80` }}>
            Journal articles, conference proceedings, and published datasets on machine learning and
            explainable computer vision. Each entry includes a plain-language summary of the contribution.
          </p>
        </Reveal>
      </section>

      {/* Publications sections */}
      <div className="space-y-12">
        {journals.length > 0 && (
          <PubGroup icon={<BookOpen className="w-5 h-5" style={{ color: CORAL }} />} title="Journal articles" accent={CORAL}>
            {journals.map((pub, idx) => renderPublicationCard(pub, idx + 1, idx * 70))}
          </PubGroup>
        )}

        {conferences.length > 0 && (
          <PubGroup icon={<GraduationCap className="w-5 h-5" style={{ color: TEAL }} />} title="Conference proceedings" accent={TEAL}>
            {conferences.map((pub, idx) => renderPublicationCard(pub, journals.length + idx + 1, idx * 70))}
          </PubGroup>
        )}

        {datasets.length > 0 && (
          <PubGroup icon={<Database className="w-5 h-5" style={{ color: '#8A6300' }} />} title="Published datasets" accent={AMBER}>
            {datasets.map((pub, idx) =>
              renderPublicationCard(pub, journals.length + conferences.length + idx + 1, idx * 70)
            )}
          </PubGroup>
        )}
      </div>

      {/* Scholarly citation advisory */}
      <Reveal>
        <section
          className="p-5 sm:p-6 rounded-2xl flex gap-4 items-start transition-shadow duration-300 hover:shadow-md"
          style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
        >
          <Info className="w-5 h-5 shrink-0 mt-0.5" style={{ color: CORAL }} />
          <div className="space-y-1">
            <h4 className="dsp text-sm font-bold" style={{ color: INK }}>Academic reference notice</h4>
            <p className="text-sm leading-relaxed" style={{ color: `${INK}80` }}>
              All listed citations follow standard academic formatting. For preprint access or dataset
              files, feel free to request them by email.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

function PubGroup({
  icon,
  title,
  accent,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <Reveal>
        <div
          className="flex items-center gap-3 pb-3"
          style={{ borderBottom: '2px solid transparent', borderImage: `linear-gradient(to right, ${accent}55, transparent) 1` }}
        >
          {icon}
          <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#16192B80' }}>
            {title}
          </h2>
        </div>
      </Reveal>
      <div className="space-y-6">{children}</div>
    </div>
  );
}