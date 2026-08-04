import { JSX, useEffect, useRef, useState } from 'react';
import {
  Award,
  Target,
  Languages,
  BookOpen,
  Camera,
  Compass,
  Globe,
  Sparkles,
  GraduationCap,
  FlaskConical,
  Users,
} from 'lucide-react';
import { SKILL_GROUPS, AWARDS, LANGUAGES, EXTRA_ACTIVITIES, HOBBIES } from '../data/portfolioData';

/* ─── Shared design tokens (matches Experience.jsx) ─────────────────────── */
const CORAL  = '#FF5A3C';
const AMBER  = '#FFC94A';
const TEAL   = '#0F6E63';
const INK    = '#16192B';
const PAPER  = '#FAFAF7';

const LOGO_PALETTE = [
  { bg: CORAL,  fg: '#FFFFFF' },
  { bg: TEAL,   fg: '#FFFFFF' },
  { bg: INK,    fg: AMBER     },
  { bg: AMBER,  fg: INK       },
];

function getInitials(name = '') {
  const words = name.replace(/[().]/g, '').split(' ').filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
function logoColors(name = '') {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return LOGO_PALETTE[sum % LOGO_PALETTE.length];
}

/* ─── Section label — coral slash + caps eyebrow ────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span
        className="block w-0.5 h-5 rounded-full"
        style={{ background: `linear-gradient(to bottom, ${CORAL}, ${AMBER})` }}
      />
      <span
        className="text-[11px] font-bold tracking-[0.2em] uppercase"
        style={{ color: CORAL }}
      >
        {children}
      </span>
    </div>
  );
}

/* ─── Reduced motion hook ────────────────────────────────────────────────── */
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

/* ─── Scroll-in reveal (simple opacity + translate, no 3D) ──────────────── */
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

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Language bar ───────────────────────────────────────────────────────── */
function LanguageBar({ lang }: { lang: { label: string; level: string; width: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pct = parseInt(lang.width, 10) || 0;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-base font-semibold" style={{ color: INK }}>{lang.label}</span>
        <span className="text-sm font-bold" style={{ color: TEAL }}>{lang.level}</span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: `${INK}14` }}
        role="progressbar"
        aria-label={`${lang.label} proficiency`}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          style={{
            width: visible ? `${pct}%` : '0%',
            background: `linear-gradient(to right, ${CORAL}, ${AMBER})`,
            transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="h-full rounded-full"
        />
      </div>
    </div>
  );
}

/* ─── Hobby icon map ─────────────────────────────────────────────────────── */
function HobbyIcon({ name }: { name: string }) {
  const cls = 'w-5 h-5';
  const style = { color: CORAL };
  const map: Record<string, JSX.Element> = {
    Compass:  <Compass  className={cls} style={style} />,
    BookOpen: <BookOpen className={cls} style={style} />,
    Camera:   <Camera   className={cls} style={style} />,
    Globe:    <Globe    className={cls} style={style} />,
  };
  return map[name] ?? <Sparkles className={cls} style={style} />;
}

/* ─── Research interest data ─────────────────────────────────────────────── */
/* ─── Research interest data ─────────────────────────────────────────────── */
const RESEARCH_INTERESTS = [
  { title: 'Computer Vision', desc: 'Teaching machines to see — from recognizing patterns in images to understanding full scenes and video.' },
  { title: 'Machine Learning', desc: 'Building models that learn from data and generalize well to new, real-world situations.' },
  { title: 'Robotics', desc: 'Designing agents that sense, reason, and act in the physical world, not just on a screen.' },
  { title: 'Trustworthy AI', desc: 'Making AI systems safer, fairer, and easier to understand and audit before they\'re deployed.' },
  { title: 'Human-Computer Interaction (HCI)', desc: 'Designing intuitive systems that make intelligent technology genuinely usable for people.' },
];

const COURSEWORK = [
  'Data Structures & Algorithms', 'Analysis of Algorithms',
  'Artificial Intelligence', 'Machine Learning',
  'Data Mining', 'Computer Vision',
  'Digital Image Processing', 'Operating Systems',
  'Database Management Systems', 'Internet of Things',
  'Microprocessors & Microcontrollers', 'Software Engineering',
  'Linear Algebra', 'Probability & Statistics',
];

/* ═══════════════════════════════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════════════════════════════ */
export default function About() {
  return (
    <div className="space-y-24 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* ── 1. Hero bio ─────────────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-6">
  <SectionLabel>About</SectionLabel>
  <h1
    className="dsp text-4xl md:text-5xl font-bold leading-[1.05]"
    style={{ color: INK }}
  >
    Prospective PhD student in machine learning, computer vision, and intelligent systems.
  </h1>
  <div className="space-y-4 text-base md:text-lg leading-relaxed" style={{ color: `${INK}99` }}>
    <p>
      I completed my B.Sc. in Computer Science and Engineering at East West University, Dhaka,
      with a strong interest in machine learning, computer vision, and human-centered intelligent systems.
    </p>
    <p>
      During my final year, I worked on research in synthetic media detection, which strengthened my
      interest in trustworthy AI, model interpretability, and robust visual learning. My research
      experience has also shaped my broader interest in large language models, embodied AI, and
      software engineering for scalable intelligent systems.
    </p>
    <p>
      I am now applying to PhD programs to further explore machine learning, human-computer interaction,
      embodied AI, large language models, and computer vision in both foundational and applied settings.
    </p>
  </div>
</div>

        {/* Research interests card */}
        <div className="lg:col-span-2">
          <div
            className="rounded-3xl p-8 border space-y-6"
            style={{ background: PAPER, borderColor: `${INK}0D` }}
          >
            <h3 className="dsp text-xl font-bold flex items-center gap-2.5" style={{ color: INK }}>
              <Target className="w-5 h-5" style={{ color: CORAL }} />
              Areas of interest
            </h3>
            <ul className="space-y-4">
              {RESEARCH_INTERESTS.map((r, i) => (
                <li key={r.title} className="flex items-start gap-3">
                  <span
                    className="dsp shrink-0 w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: [CORAL, TEAL, AMBER, INK][i % 4], color: i === 2 ? INK : '#fff' }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: INK }}>{r.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: `${INK}80` }}>{r.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 2. Education ────────────────────────────────────────────────── */}
      <Reveal>
        <section className="space-y-8">
          <div>
            <SectionLabel>Education</SectionLabel>
            <h2 className="dsp text-3xl font-bold" style={{ color: INK }}>Academic background</h2>
          </div>

          <div
            className="rounded-3xl border p-8 md:p-10 flex flex-col md:flex-row gap-8 md:items-start"
            style={{ background: PAPER, borderColor: `${INK}0D` }}
          >
            {/* Logo badge */}
            <div className="shrink-0">
              {(() => {
                const c = logoColors('East West University');
                return (
                  <div
                    className="dsp w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold"
                    style={{ backgroundColor: c.bg, color: c.fg }}
                  >
                    EWU
                  </div>
                );
              })()}
            </div>

            <div className="flex-1 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="dsp text-2xl font-bold" style={{ color: INK }}>B.Sc. in Computer Science & Engineering</h3>
                  <p className="text-base font-semibold mt-1" style={{ color: TEAL }}>East West University — Dhaka, Bangladesh</p>
                  <p className="text-sm mt-0.5" style={{ color: `${INK}55` }}>
                    Specialization: Data Science and Intelligent Systems · CGPA 3.70/4.00 · Dean's List
                  </p>
                </div>
                <span
                  className="dsp inline-block text-xs font-bold tracking-wide px-4 py-2 rounded-full shrink-0 w-fit"
                  style={{ backgroundColor: INK, color: AMBER }}
                >
                  Graduated Jan 2026
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: `${INK}50` }}>
                  Relevant coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((c) => (
                    <span
                      key={c}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border"
                      style={{
                        backgroundColor: '#fff',
                        borderColor: `${INK}14`,
                        color: `${INK}CC`,
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── 3. Technical skills ─────────────────────────────────────────── */}
      <Reveal>
        <section className="space-y-8">
          <div>
            <SectionLabel>Skills</SectionLabel>
            <h2 className="dsp text-3xl font-bold" style={{ color: INK }}>Tools & frameworks</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_GROUPS.map((group, i) => {
              const accent = [CORAL, TEAL, AMBER, INK, CORAL, TEAL][i % 6];
              const accentText = accent === AMBER ? INK : '#fff';
              return (
                <Reveal key={group.title} delay={i * 60}>
                  <div
                    className="rounded-2xl border p-6 space-y-4 h-full"
                    style={{ background: PAPER, borderColor: `${INK}0D` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                      <h3
                        className="text-xs font-bold tracking-[0.18em] uppercase"
                        style={{ color: `${INK}80` }}
                      >
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-sm font-medium px-3 py-1.5 rounded-lg border"
                          style={{
                            backgroundColor: '#fff',
                            borderColor: `${INK}14`,
                            color: `${INK}CC`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      </Reveal>

      {/* ── 4. Teaching & extra-curriculars ─────────────────────────────── */}
      <section className="space-y-8">
        <Reveal>
          <div>
            <SectionLabel>Beyond the lab</SectionLabel>
            <h2 className="dsp text-3xl font-bold" style={{ color: INK }}>Teaching & leadership</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {EXTRA_ACTIVITIES.map((act, i) => {
            const c = logoColors(act.organization);
            return (
              <Reveal key={act.id} delay={i * 80}>
                <div
                  className="rounded-2xl border p-6 space-y-5 h-full flex flex-col"
                  style={{ background: PAPER, borderColor: `${INK}0D` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Org logo badge */}
                    <div
                      className="dsp w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: c.bg, color: c.fg }}
                    >
                      {getInitials(act.organization)}
                    </div>
                    <span
                      className="text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shrink-0"
                      style={{ backgroundColor: `${CORAL}14`, color: CORAL }}
                    >
                      {act.badge}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="dsp text-lg font-bold leading-snug" style={{ color: INK }}>
                      {act.role}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: TEAL }}>{act.organization}</p>
                    <p className="text-xs" style={{ color: `${INK}50` }}>{act.period}</p>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: `${INK}80` }}>
                    {act.description}
                  </p>

                  {act.bullets && (
                    <ul className="space-y-2">
                      {act.bullets.map((b: string, bi: number) => (
                        <li key={bi} className="flex items-start gap-2.5 text-sm" style={{ color: `${INK}80` }}>
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                            style={{ backgroundColor: AMBER }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 5. Hobbies ──────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <Reveal>
          <div>
            <SectionLabel>Outside of research</SectionLabel>
            <h2 className="dsp text-3xl font-bold" style={{ color: INK }}>Interests</h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOBBIES.map((hobby, i) => (
            <Reveal key={hobby.name} delay={i * 60}>
              <div
                className="rounded-2xl border p-6 space-y-4 h-full"
                style={{ background: PAPER, borderColor: `${INK}0D` }}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#fff', boxShadow: `0 1px 4px ${INK}14` }}
                  >
                    <HobbyIcon name={hobby.iconName} />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: `${INK}45` }}
                  >
                    {hobby.category}
                  </span>
                </div>
                <div>
                  <h4 className="dsp text-base font-bold" style={{ color: INK }}>{hobby.name}</h4>
                  <p className="text-sm leading-relaxed mt-1.5" style={{ color: `${INK}75` }}>
                    {hobby.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. Languages + Awards ───────────────────────────────────────── */}
      <Reveal>
        <section className="grid md:grid-cols-2 gap-10 pt-4">

          {/* Languages */}
          <div
            className="rounded-3xl border p-8 space-y-7"
            style={{ background: PAPER, borderColor: `${INK}0D` }}
          >
            <h3 className="dsp text-2xl font-bold flex items-center gap-2.5" style={{ color: INK }}>
              <Languages className="w-6 h-6" style={{ color: CORAL }} />
              Languages
            </h3>
            <div className="space-y-6">
              {LANGUAGES.map((lang) => (
                <LanguageBar key={lang.label} lang={lang} />
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className="space-y-6">
            <h3 className="dsp text-2xl font-bold flex items-center gap-2.5" style={{ color: INK }}>
              <Award className="w-6 h-6" style={{ color: CORAL }} />
              Honors & awards
            </h3>
            <div className="space-y-4">
              {AWARDS.map((award, i) => (
                <Reveal key={award.title} delay={i * 70}>
                  <div
                    className="flex items-start gap-4 p-5 rounded-2xl border"
                    style={{ background: PAPER, borderColor: `${INK}0D` }}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{award.icon}</span>
                    <div>
                      <h4 className="dsp text-sm font-bold" style={{ color: INK }}>{award.title}</h4>
                      <p className="text-sm leading-relaxed mt-0.5" style={{ color: `${INK}70` }}>
                        {award.sub}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}