import { useEffect, useRef, useState } from 'react';
import { ArrowRight, GraduationCap, ChevronRight, Linkedin, Github, Mail, FileDown } from 'lucide-react';
import { PROJECTS, NEWS } from '../data/portfolioData';
import { getIcon } from '../components/ProjectModal';

// TODO: replace with your real profile photo.
// Put the image file in src/assets/ (e.g. src/assets/profile.jpg) and update the import below.
// import profilePhoto from '../assets/profile.jpg';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mdsifatullahsheikh', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/SifatSwapnil2022', icon: Github },
  // TODO: replace with your real Google Scholar profile URL
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=REPLACE_ME', icon: GraduationCap },
  { label: 'Email', href: 'mailto:mdsifatullahsheikh@gmail.com', icon: Mail },
];

// FIXED: was "D:/My-Portfolio/files/CV_Sifat_Sheikh.pdf" — a local drive path.
// Browsers cannot resolve D:/ paths; this would 404 for every visitor,
// including you outside this exact machine, and file:// access from an
// http(s):// page is blocked by browsers regardless.
// Must be root-relative, pointing at a file inside your project's public/
// folder, e.g. public/cv/CV_Sifat_Sheikh.pdf.
// NOTE: Navbar.tsx currently links its own CV button to /resume.pdf — make
// sure both files point at the same path, or one "Download CV" button 404s.
const CV_PATH = '/files/CV_Sifat_Sheikh.pdf';

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

const RESEARCH_INTERESTS = [
  'Machine learning systems & AI-enabled autonomy',
  'Computer vision & multimodal AI',
  'Robotics & multi-agent systems',
  'Trustworthy, interpretable AI for real-world decision-making',
];

/* ─── Motion primitives (no new dependencies — hooks + CSS only) ────────── */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/** Fades + lifts a block into place once it scrolls into view. */
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
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
        transform: shown ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Gentle pointer-driven tilt for the hero photo — subtle, capped, disabled under reduced motion. */
function TiltPhoto({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.15s ease-out',
    });
  };

  const handleLeave = () => {
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
      transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...style, willChange: 'transform' }}
      className="transform-3d"
    >
      {children}
    </div>
  );
}

export default function Home() {
  const latestNews = NEWS.slice(0, 2);
  const featuredProject = PROJECTS[0];
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="space-y-16 md:space-y-24 py-8 md:py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
        @keyframes driftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(24px, -18px) scale(1.06); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 16px) scale(1.05); }
        }
        @keyframes softPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.45; }
        }
      `}</style>

      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-4xl md:rounded-4xl p-6 sm:p-10 md:p-16"
        style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
      >
        {/* Ambient drifting gradient blobs — purely decorative, disabled under reduced motion */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 w-72 h-72 md:w-96 md:h-96 rounded-full blur-[90px]"
          style={{
            backgroundColor: `${CORAL}14`,
            animation: reducedMotion ? undefined : 'driftA 14s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-20 w-72 h-72 md:w-104 md:h-104 rounded-full blur-[100px]"
          style={{
            backgroundColor: `${AMBER}14`,
            animation: reducedMotion ? undefined : 'driftB 17s ease-in-out infinite',
          }}
        />

        <div className="relative grid md:grid-cols-5 gap-10 md:gap-12 items-center">
          {/* Text column */}
          <div className="md:col-span-3 space-y-6 md:space-y-7">
            <Reveal>
              <span
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full"
                style={{ backgroundColor: `${CORAL}14`, color: CORAL }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: CORAL,
                    animation: reducedMotion ? undefined : 'softPulse 2.6s ease-in-out infinite',
                  }}
                />
                Open to research collaborations and full-time opportunities.
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="dsp text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]" style={{ color: INK }}>
                Md Sifatullah <span style={{ color: CORAL }}>Sheikh</span>
              </h1>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `${INK}66` }}>
                Computer Science &amp; Engineering graduate · East West University
              </p>
            </Reveal>

            {/* Grounded summary — what I do, what problems it addresses, and the direction I'm headed */}
            <Reveal delay={140}>
              <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: `${INK}99` }}>
               I am a Computer Science graduate and Machine Learning researcher with experience in deep learning, computer vision,
                multimodal AI, and trustworthy AI. My research has addressed real-world problems such as detecting manipulated media.
                 I can develop and evaluate AI models for complex visual and multimodal tasks, with a focus on reliable and interpretable systems.
                  Moving forward, I aim to work on machine learning systems,
                AI-enabled autonomy, and multi-agent systems for safe and intelligent decision-making in real-world environments.  
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <a
                  href="#/research"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-sm hover:-translate-y-0.5 hover:shadow-md group"
                  style={{ backgroundColor: INK, color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                >
                  Publications &amp; patents
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#/about"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = INK; }}
                >
                  Academic background
                </a>
                <a
                  href={CV_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = INK; }}
                >
                  <FileDown className="w-4 h-4" /> Download CV
                </a>
              </div>
            </Reveal>

            {/* Social / contact row */}
            <Reveal delay={220}>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                    style={{ backgroundColor: '#fff', border: `1px solid ${INK}1A`, color: `${INK}99` }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1A`; e.currentTarget.style.color = `${INK}99`; }}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Photo column */}
          <Reveal delay={140} className="md:col-span-2 flex justify-center md:justify-end">
            <TiltPhoto>
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-72 md:h-72">
                <div
                  className="absolute inset-0 rounded-4xl"
                  style={{ border: `2px solid ${CORAL}33` }}
                />
                <div
                  className="absolute inset-0 rounded-4xl overflow-hidden shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: INK, border: `1px solid ${INK}0D` }}
                >
                  {/* FIXED: was "D:\My-Portfolio\files\profile.png" — a local
                      drive path using backslashes, which aren't valid URL path
                      separators at all. Even setting the drive-letter problem
                      aside, this string could never resolve as a URL. Must be
                      root-relative, pointing at a file inside public/, e.g.
                      public/profile.png. Swap the src below for your imported
                      photo once it's in place, e.g. src={profilePhoto}. */}
                  <img
                    src="/files/profile.png"
                    alt="Md Sifatullah Sheikh"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <div
                    className="dsp hidden absolute inset-0 items-center justify-center text-4xl sm:text-5xl font-bold"
                    style={{ color: AMBER }}
                  >
                    SS
                  </div>
                </div>
              </div>
            </TiltPhoto>
          </Reveal>
        </div>
      </section>

      {/* Featured Publication — framed around the problem and why it matters, not just the metrics */}
      <Reveal>
        <section className="grid md:grid-cols-5 gap-10 md:gap-12 items-start">
          <div className="md:col-span-3 space-y-5">
            <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: CORAL }}>
              Featured publication
            </div>
            <h2 className="dsp text-2xl md:text-3xl font-bold leading-tight" style={{ color: INK }}>
              DeFaX: a cross-attention framework for explainable deepfake detection
            </h2>
            <p className="text-sm font-semibold" style={{ color: `${INK}66` }}>
              IEEE Access (SCI, Q1 journal), 2025
            </p>

            {/* Framework diagram */}
            <div
              className="rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
              style={{ backgroundColor: `${INK}0D`, border: `1px solid ${INK}0D` }}
            >
              <img
                src="/files/framework.png"
                alt="DeFaX architecture: Swin Transformer and EfficientNet fused via cross-attention, with Grad-CAM/LIME explainability output"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div
              className="p-5 rounded-xl text-sm leading-relaxed space-y-3"
              style={{ backgroundColor: PAPER, borderLeft: `3px solid ${AMBER}`, color: `${INK}B3` }}
            >
              <p>
                <span className="font-bold" style={{ color: '#8A6300' }}>The problem: </span>
                manipulated video and image content is increasingly hard to tell apart from real
                footage, and misuse — disinformation, fraud, non-consensual imagery — has real costs
                for the people it targets. Detection tools that can't explain their reasoning are hard
                to trust or audit in practice.
              </p>
              <p>
                <span className="font-bold" style={{ color: '#8A6300' }}>The approach: </span>
                DeFaX combines two vision architectures (Swin Transformer and EfficientNet) through a
                cross-attention fusion mechanism, and pairs the detector with Grad-CAM and LIME so a
                reviewer can see which regions of a face the model flagged as manipulated, not just a
                yes/no score.
              </p>
            </div>

            <a
              href="https://ieeexplore.ieee.org/abstract/document/11303744"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-200"
              style={{ color: CORAL }}
            >
              Read the full paper on IEEE Xplore <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div
            className="md:col-span-2 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-md"
            style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
          >
            <div>
              <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: `${INK}50` }}>
                Where I want to take this
              </div>
              <h3 className="dsp text-lg font-bold mb-4" style={{ color: INK }}>PhD research interests</h3>
              <ul className="space-y-3">
                {RESEARCH_INTERESTS.map((area) => (
                  <li key={area} className="flex items-start gap-2.5 text-sm" style={{ color: `${INK}99` }}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: TEAL }} />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#/research"
              className="w-full text-center py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: INK, color: '#fff' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
            >
              All publications
            </a>
          </div>
        </section>
      </Reveal>

      {/* Featured Project */}
      <Reveal>
        <section className="space-y-6 md:space-y-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: CORAL }}>
                Selected work
              </div>
              <h2 className="dsp text-2xl md:text-3xl font-bold" style={{ color: INK }}>Featured project</h2>
            </div>
            <a
              href="#/projects"
              className="text-xs font-bold transition-colors duration-200 flex items-center gap-1"
              style={{ color: CORAL }}
            >
              All projects <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div
            className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D` }}
          >
            <div
              className="w-full md:w-1/3 aspect-4/3 rounded-2xl overflow-hidden shrink-0"
              style={{ backgroundColor: `${INK}0D` }}
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: CORAL }}>
                {getIcon(featuredProject.iconName)} {featuredProject.tag}
              </div>
              <h3 className="dsp text-xl md:text-2xl font-bold" style={{ color: INK }}>{featuredProject.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${INK}99` }}>
                {featuredProject.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.tech.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-bold px-2.5 py-1 rounded"
                    style={{ backgroundColor: PAPER, border: `1px solid ${INK}14`, color: `${INK}80` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href="#/projects"
                  className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: INK, color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                >
                  View project details
                </a>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Latest News */}
      <Reveal>
        <section
          className="rounded-4xl p-6 sm:p-8 md:p-12 space-y-6"
          style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3">
            <div>
              <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: CORAL }}>
                Timeline
              </div>
              <h3 className="dsp text-xl md:text-2xl font-bold" style={{ color: INK }}>Recent updates</h3>
            </div>
            <a
              href="#/news"
              className="text-xs font-bold transition-colors duration-200 flex items-center gap-1"
              style={{ color: CORAL }}
            >
              Full timeline <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-6">
            {latestNews.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <div
                  className="pl-5 py-1 transition-colors duration-200"
                  style={{ borderLeft: `2px solid ${AMBER}` }}
                >
                  <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: `${INK}55` }}>
                    {item.date}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: `${INK}99` }}>{item.content}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}