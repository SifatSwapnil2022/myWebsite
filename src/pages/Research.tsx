import { useState } from 'react';
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

export default function Research() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCitation = (pub: Publication) => {
    const citation = `${pub.authors}. "${pub.title}." ${pub.venue}, ${pub.year}.`;
    navigator.clipboard.writeText(citation);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const journals = PUBLICATIONS.filter((p) => p.venueType === 'journal');
  const conferences = PUBLICATIONS.filter((p) => p.venueType === 'conference');
  const datasets = PUBLICATIONS.filter((p) => p.venueType === 'dataset');

  const renderPublicationCard = (pub: Publication, indexNumber: number) => {
    const firstAuthor = isFirstAuthor(pub.authors);
    return (
      <div
        key={pub.id}
        className="rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 md:p-8 flex gap-6"
        style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D` }}
      >
        {/* Citation index number */}
        <div
          className="font-mono text-sm font-bold w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${CORAL}14`, color: CORAL }}
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

            <h3 className="dsp text-lg md:text-xl font-bold leading-snug" style={{ color: INK }}>
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                Publisher link <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={() => copyCitation(pub)}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase px-4 py-2 rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: `${INK}99` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
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
    );
  };

  return (
    <div className="space-y-16 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <span className="block w-0.5 h-5 rounded-full" style={{ background: `linear-gradient(to bottom, ${CORAL}, ${AMBER})` }} />
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: CORAL }}>
            Research index
          </span>
        </div>
        <h1 className="dsp text-4xl md:text-5xl font-bold leading-tight" style={{ color: INK }}>
          Publications & datasets
        </h1>
        <p className="text-base md:text-lg max-w-2xl leading-relaxed mt-4" style={{ color: `${INK}80` }}>
          Journal articles, conference proceedings, and published datasets on machine learning and
          explainable computer vision. Each entry includes a plain-language summary of the contribution.
        </p>
      </div>

      {/* Publications sections */}
      <div className="space-y-12">
        {journals.length > 0 && (
          <PubGroup icon={<BookOpen className="w-5 h-5" style={{ color: CORAL }} />} title="Journal articles">
            {journals.map((pub, idx) => renderPublicationCard(pub, idx + 1))}
          </PubGroup>
        )}

        {conferences.length > 0 && (
          <PubGroup icon={<GraduationCap className="w-5 h-5" style={{ color: CORAL }} />} title="Conference proceedings">
            {conferences.map((pub, idx) => renderPublicationCard(pub, journals.length + idx + 1))}
          </PubGroup>
        )}

        {datasets.length > 0 && (
          <PubGroup icon={<Database className="w-5 h-5" style={{ color: CORAL }} />} title="Published datasets">
            {datasets.map((pub, idx) =>
              renderPublicationCard(pub, journals.length + conferences.length + idx + 1)
            )}
          </PubGroup>
        )}
      </div>

      {/* Scholarly citation advisory */}
      <section
        className="p-6 rounded-2xl flex gap-4 items-start"
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
    </div>
  );
}

function PubGroup({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3" style={{ borderBottom: '1px solid #16192B0D' }}>
        {icon}
        <h2 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#16192B80' }}>
          {title}
        </h2>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}