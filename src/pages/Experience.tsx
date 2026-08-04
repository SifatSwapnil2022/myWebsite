import React from 'react';
import { Mail, ExternalLink, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

// Deterministic accent color per company, drawn from a small optimistic palette
const LOGO_PALETTE = [
  { bg: '#FF5A3C', fg: '#FFFFFF' }, // coral
  { bg: '#0F6E63', fg: '#FFFFFF' }, // teal
  { bg: '#16192B', fg: '#FFC94A' }, // ink with amber
  { bg: '#FFC94A', fg: '#16192B' }, // amber
];

function getInitials(name = '') {
  const words = name.replace(/[().]/g, '').split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getLogoColors(name = '') {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return LOGO_PALETTE[sum % LOGO_PALETTE.length];
}

export default function Experience() {
  return (
    <div className="space-y-20 py-12 animate-fade-in" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .display-font { font-family: 'Space Grotesk', sans-serif; }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,90,60,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(255,90,60,0); }
        }
      `}</style>

      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#FF5A3C] uppercase mb-3">
          <span className="w-6 h-px bg-[#FF5A3C]" />
          Research & professional experience
        </div>
        <h1 className="display-font text-4xl md:text-6xl font-bold text-[#16192B] leading-[1.05]">
          Where I've worked
        </h1>
        <p className="text-[#16192B]/60 text-base md:text-lg max-w-xl leading-relaxed mt-5">
          A timeline of research assistantships and academic work, from my undergraduate degree onward.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* connecting pulse line */}
        <div
          className="absolute left-[27px] top-3 bottom-3 w-[2px] hidden md:block"
          style={{ background: 'linear-gradient(to bottom, #FF5A3C, #FFC94A)' }}
        />

        <div className="space-y-16">
          {EXPERIENCES.map((exp, i) => {
            const logo = getLogoColors(exp.company);
            return (
              <div key={exp.id} className="relative md:pl-20">
                {/* node */}
                <div
                  className="hidden md:flex absolute left-0 top-1 w-14 h-14 rounded-2xl items-center justify-center font-bold text-lg shrink-0 z-10"
                  style={{
                    backgroundColor: logo.bg,
                    color: logo.fg,
                    animation: i === 0 ? 'pulse-dot 2.4s infinite' : 'none',
                  }}
                >
                  {getInitials(exp.company)}
                </div>

                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4 md:hidden">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ backgroundColor: logo.bg, color: logo.fg }}
                      >
                        {getInitials(exp.company)}
                      </div>
                    </div>
                    <div>
                      <h2 className="display-font text-2xl md:text-3xl font-bold text-[#16192B] leading-tight">
                        {exp.role}
                      </h2>
                      <p className="text-base font-semibold mt-1" style={{ color: logo.bg === '#FFC94A' ? '#8A6300' : logo.bg }}>
                        {exp.company}
                      </p>
                      <p className="text-sm text-[#16192B]/45 mt-0.5">
                        {exp.location}
                      </p>
                    </div>

                    <span className="inline-flex items-center bg-[#16192B] text-white text-xs font-semibold tracking-wide px-4 py-2 rounded-full w-fit shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-3">
                    {exp.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[15px] md:text-base text-[#16192B]/80 leading-relaxed"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2.5"
                          style={{ backgroundColor: logo.bg === '#FFC94A' ? '#FFC94A' : logo.bg }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Supervisor */}
                  {exp.supervisor && (
                    <div className="border-l-2 border-[#FFC94A] pl-5 py-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Award className="w-4 h-4 text-[#FF5A3C]" />
                          <span className="text-[11px] font-semibold tracking-widest uppercase text-[#16192B]/45">
                            Supervised by
                          </span>
                        </div>
                        <p className="display-font text-lg font-bold text-[#16192B]">
                          {exp.supervisor.name}
                        </p>
                        <p className="text-sm text-[#16192B]/55">
                          {exp.supervisor.title} · Department of CSE, East West University
                        </p>
                      </div>

                      {exp.supervisor.profileUrl && (
                        <a
                          href={exp.supervisor.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F6E63] hover:text-[#FF5A3C] transition-colors w-fit shrink-0"
                        >
                          Faculty profile
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact */}
      <section
        className="rounded-3xl p-10 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8"
        style={{ backgroundColor: '#16192B' }}
      >
        <div>
          <h3 className="display-font text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#FFC94A]" />
            Let's talk research
          </h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed mt-3 max-w-md">
            I'm currently applying to PhD programs and open to research collaborations.
            Transcript, recommendation letters, and research statement available on request.
          </p>
        </div>
        <a
          href="mailto:mdsifatullahsheikh@gmail.com"
          className="inline-flex items-center gap-2 bg-[#FF5A3C] hover:bg-[#FFC94A] hover:text-[#16192B] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors w-fit shrink-0"
        >
          mdsifatullahsheikh@gmail.com
          <Mail className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
