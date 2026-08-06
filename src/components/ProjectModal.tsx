import { useEffect, useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  Github,
  Globe,
  Cpu,
  Layers,
  HeartPulse,
  Database,
  GraduationCap,
  ArrowUpRight,
  FileCheck2,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

export const getIcon = (name: string) => {
  switch (name) {
    case 'Cpu': return <Cpu className="w-5 h-5" />;
    case 'Layers': return <Layers className="w-5 h-5" />;
    case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
    case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
    case 'Database': return <Database className="w-5 h-5" />;
    case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
    default: return <Cpu className="w-5 h-5" />;
  }
};

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

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reducedMotion = usePrefersReducedMotion();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock background scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-8 overflow-y-auto ${
        reducedMotion ? '' : 'animate-[fadeIn_0.25s_ease-out]'
      }`}
      style={{ backgroundColor: 'rgba(22,25,43,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
      role="presentation"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes modalIn { from { opacity: 0; transform: translateY(12px) scale(0.98) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className={`w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden relative my-4 sm:my-8 ${
          reducedMotion ? '' : 'animate-[modalIn_0.3s_cubic-bezier(0.16,1,0.3,1)]'
        }`}
        style={{ backgroundColor: PAPER, fontFamily: "'Inter', sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md transition-all duration-300 hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
          style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: INK }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = CORAL; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.9)'; e.currentTarget.style.color = INK; }}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image header */}
        <div className="relative h-48 sm:h-60 md:h-80 overflow-hidden" style={{ backgroundColor: `${INK}0D` }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${PAPER}, transparent 55%)` }}
          />
        </div>

        {/* Details container */}
        <div className="p-5 sm:p-6 md:p-10 -mt-12 sm:-mt-16 relative rounded-t-4xl" style={{ backgroundColor: PAPER }}>
          {/* Headline metadata */}
          <div
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6"
            style={{ borderBottom: `1px solid ${INK}0D` }}
          >
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl shadow-sm shrink-0"
                style={{ backgroundColor: `${CORAL}14`, color: CORAL }}
              >
                {getIcon(project.iconName)}
              </div>
              <div>
                <span
                  className="text-[11px] font-bold tracking-widest uppercase block mb-0.5"
                  style={{ color: CORAL }}
                >
                  {project.tag}
                </span>
                <h3 id="project-modal-title" className="dsp text-2xl sm:text-3xl md:text-4xl font-bold" style={{ color: INK }}>
                  {project.title}
                </h3>
              </div>
            </div>

            <div
              className="px-5 py-3 rounded-2xl shadow-sm flex items-center gap-2.5 w-fit"
              style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D` }}
            >
              <span className="relative flex w-2.5 h-2.5">
                {!reducedMotion && (
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: TEAL }}
                  />
                )}
                <span className="relative inline-flex rounded-full w-2.5 h-2.5" style={{ backgroundColor: TEAL }} />
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: `${INK}55` }}>
                  Status / metric
                </div>
                <div className="text-sm font-semibold" style={{ color: INK }}>{project.metric}</div>
              </div>
            </div>
          </div>

          {/* Grid information */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-8">
            {/* Description and features */}
            <div className="md:col-span-2 space-y-8">
              <section className="space-y-3">
                <h4 className="dsp text-lg font-bold flex items-center gap-2" style={{ color: INK }}>
                  <FileText className="w-4 h-4" style={{ color: CORAL }} />
                  Project overview
                </h4>
                <p className="leading-relaxed text-sm" style={{ color: `${INK}B3` }}>
                  {project.longDescription}
                </p>
              </section>

              <section className="space-y-4">
                <h4 className="dsp text-lg font-bold flex items-center gap-2" style={{ color: INK }}>
                  <CheckCircle2 className="w-4 h-4" style={{ color: CORAL }} />
                  Key architecture & features
                </h4>
                <div className="grid sm:grid-cols-1 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                      style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D`, color: `${INK}B3` }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                        style={{ backgroundColor: [CORAL, TEAL, AMBER][i % 3] }}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar: tech stack + links */}
            <div className="space-y-6">
              <div className="p-5 rounded-2xl shadow-sm space-y-4" style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D` }}>
                <h5 className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: `${INK}55` }}>
                  Technologies used
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: PAPER, border: `1px solid ${INK}14`, color: `${INK}CC` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                  style={{ backgroundColor: INK, color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                >
                  <Github className="w-4 h-4" />
                  View code
                </a>

                {project.paperLink && (
                  <a
                    href={project.paperLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                    style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = INK; }}
                  >
                    <FileCheck2 className="w-4 h-4" />
                    Read the paper
                  </a>
                )}

                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5A3C] focus-visible:ring-offset-2"
                    style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = INK; }}
                  >
                    <Globe className="w-4 h-4" />
                    Visit site
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}