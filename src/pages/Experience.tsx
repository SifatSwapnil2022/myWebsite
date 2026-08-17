import { useEffect, useRef, useState } from 'react';
import { Mail, ExternalLink, Award } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

// Deterministic accent color per company, drawn from a small optimistic palette
const LOGO_PALETTE = [
  { bg: '#FF5A3C', fg: '#FFFFFF' }, // coral
  { bg: '#0F6E63', fg: '#FFFFFF' }, // teal
  { bg: '#16192B', fg: '#FFC94A' }, // ink with amber
  { bg: '#FFC94A', fg: '#16192B' }, // amber
];

// Real company logo images. The key MUST match the `company` string exactly
// as it appears in EXPERIENCES (portfolioData) — case and punctuation
// included — or the lookup silently misses and falls back to initials.
// Files must live in public/files/ (i.e. public/files/syntax-solution-logo.png)
// — you said the 3 images are already at D:\My-Portfolio\public\files, so
// either rename them to the filenames below, or edit these three paths to
// match whatever you actually saved them as.
const LOGO_IMAGES: Record<string, string> = {
  'Syntax Solution Limited': '/files/syntax_solution_limited_logo.jpeg',
  'Banglalink': '/files/bangalink.png',
  'East West University': '/files/EWU.png',
};

function getInitials(name = '') {
  const words = name.replace(/[().]/g, '').split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getLogoColors(name = '') {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return LOGO_PALETTE[sum % LOGO_PALETTE.length];
}

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
        transform: shown ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Company logo badge. Renders the real logo image when one is mapped in
 * LOGO_IMAGES and it loads successfully; otherwise falls back to the
 * colored-initials badge so the layout never shows a broken image icon.
 * `className` controls size, rounding, position, and display (flex/hidden) —
 * this component only adds centering/overflow, never its own display class,
 * so it can't fight a caller's "hidden md:flex" pattern.
 */
function CompanyBadge({
  company,
  bg,
  fg,
  className = '',
  textSizeClass = 'text-lg',
  pulse = false,
}: {
  company: string;
  bg: string;
  fg: string;
  className?: string;
  textSizeClass?: string;
  pulse?: boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const src = LOGO_IMAGES[company];
  const showImage = Boolean(src) && !imgFailed;

  return (
    <div
      className={`${className} items-center justify-center overflow-hidden shrink-0`}
      style={{
        backgroundColor: showImage ? '#ffffff' : bg,
        border: showImage ? '1px solid rgba(22,25,43,0.08)' : undefined,
        animation: pulse ? 'pulse-dot 2.4s infinite' : undefined,
      }}
    >
      {showImage ? (
        <img
          src={src}
          alt={`${company} logo`}
          className="w-full h-full object-contain p-2"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span className={`font-bold ${textSizeClass}`} style={{ color: fg }}>
          {getInitials(company)}
        </span>
      )}
    </div>
  );
}

export default function Experience() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="space-y-16 md:space-y-20 py-8 md:py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .display-font { font-family: 'Space Grotesk', sans-serif; }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,90,60,0.35); }
          50% { box-shadow: 0 0 0 8px rgba(255,90,60,0); }
        }
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
        {/* Ambient drifting blobs — matches Home.tsx / About.tsx / Contact.tsx, disabled under reduced motion */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -right-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[80px]"
          style={{
            backgroundColor: '#FF5A3C0F',
            animation: reducedMotion ? undefined : 'driftA 15s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[80px]"
          style={{
            backgroundColor: '#0F6E630F',
            animation: reducedMotion ? undefined : 'driftB 18s ease-in-out infinite',
          }}
        />

        <Reveal className="relative">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#FF5A3C] uppercase mb-3">
            <span className="w-6 h-px bg-[#FF5A3C]" />
            Research & professional experience
          </div>
          <h1 className="display-font text-3xl sm:text-4xl md:text-6xl font-bold text-[#16192B] leading-[1.05]">
            Where I've worked
          </h1>
          <p className="text-[#16192B]/60 text-base md:text-lg max-w-xl leading-relaxed mt-5">
            A timeline of research assistantships and academic work, from my undergraduate degree onward.
          </p>
        </Reveal>
      </section>

      {/* Timeline */}
      <div className="relative">
        {/* connecting pulse line */}
        <div
          className="absolute left-6.75 top-3 bottom-3 w-0.5 hidden md:block"
          style={{ background: 'linear-gradient(to bottom, #FF5A3C, #FFC94A)' }}
        />

        <div className="space-y-12 md:space-y-16">
          {EXPERIENCES.map((exp, i) => {
            const logo = getLogoColors(exp.company);
            return (
              <Reveal key={exp.id} delay={i * 90}>
                <div className="relative md:pl-20 group">
                  {/* node (desktop) */}
                  <CompanyBadge
                    company={exp.company}
                    bg={logo.bg}
                    fg={logo.fg}
                    className="hidden md:flex absolute left-0 top-1 w-14 h-14 rounded-2xl z-10 transition-transform duration-300 group-hover:scale-105"
                    textSizeClass="text-lg"
                    pulse={i === 0 && !reducedMotion}
                  />

                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex items-start gap-4 md:hidden">
                        <CompanyBadge
                          company={exp.company}
                          bg={logo.bg}
                          fg={logo.fg}
                          className="flex w-11 h-11 rounded-xl"
                          textSizeClass="text-sm"
                        />
                      </div>
                      <div>
                        <h2 className="display-font text-xl sm:text-2xl md:text-3xl font-bold text-[#16192B] leading-tight">
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
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Contact */}
      <Reveal>
        <section
          className="rounded-4xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 transition-all duration-300 hover:shadow-xl"
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
            className="inline-flex items-center justify-center gap-2 bg-[#FF5A3C] hover:bg-[#FFC94A] hover:text-[#16192B] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-fit shrink-0"
          >
            mdsifatullahsheikh@gmail.com
            <Mail className="w-4 h-4" />
          </a>
        </section>
      </Reveal>
    </div>
  );
}