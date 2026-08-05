import { ReactNode, useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, GraduationCap, ArrowUp } from 'lucide-react';

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const INK   = '#16192B';

const RESEARCH_TAGS = [
  'Machine Learning',
  'HCI',
  'Embodied AI',
  'Trustworthy AI',
  'Robotics',
  'Computer Vision',
];

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

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
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
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Footer() {
  const reducedMotion = usePrefersReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative py-12 sm:py-16 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: INK, fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
        @keyframes hairlineShimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      {/* Top hairline — coral to amber, slowly shimmering; a footer-specific
          signature rather than reusing the ambient-blob motif from other pages */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          backgroundImage: `linear-gradient(to right, ${CORAL}, ${AMBER}, ${CORAL}, ${AMBER})`,
          backgroundSize: '200% 100%',
          animation: reducedMotion ? undefined : 'hairlineShimmer 6s linear infinite',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Top row: brand + tags */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Reveal>
            <div className="dsp text-xl sm:text-2xl font-bold text-white flex items-center gap-1">
              <span>Md Sifatullah Sheikh</span>
              <span style={{ color: CORAL }}>.</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mt-3 max-w-sm">
              CSE graduate and aspiring PhD student, applying for Fall 2027 programs.
            </p>
          </Reveal>

          <Reveal delay={100} className="md:text-right">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-white/35 mb-3">
              Research areas
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {RESEARCH_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: 'rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${CORAL}66`;
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.backgroundColor = 'rgba(255,90,60,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />

        {/* Bottom row: socials + location + copyright */}
        <Reveal delay={160}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-1">
                <li>
                  <a
                    href="https://github.com/SifatSwapnil2022"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub profile"
                    aria-label="Visit GitHub profile"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16192B]"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,90,60,0.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/mdsifatullahsheikh"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn profile"
                    aria-label="Visit LinkedIn profile"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16192B]"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,90,60,0.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Google Scholar profile"
                    aria-label="Visit Google Scholar profile"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16192B]"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,90,60,0.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <GraduationCap className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:mdsifatullahsheikh@gmail.com"
                    title="Email inbox"
                    aria-label="Send an email"
                    className="group flex items-center justify-center w-10 h-10 rounded-xl text-white/55 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16192B]"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,90,60,0.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: AMBER }}
                aria-hidden="true"
              />
              Dhaka, Bangladesh · Open to collaboration
            </div>

            <div className="flex items-center gap-6">
              <p className="text-xs text-white/30">
                © {new Date().getFullYear()} Md Sifatullah Sheikh
              </p>
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll back to top of the page"
                className="group flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white transition-colors duration-200 rounded-full px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16192B]"
              >
                Back to top
                <ArrowUp
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}