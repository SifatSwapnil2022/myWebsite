import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { getIcon } from '../components/ProjectModal';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

export default function Projects({ onSelectProject }: ProjectsProps) {
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
            Technical portfolio
          </span>
        </div>
        <h1 className="dsp text-4xl md:text-5xl font-bold leading-tight" style={{ color: INK }}>
          Research systems & <span style={{ color: CORAL }}>applications</span>
        </h1>
        <p className="text-base md:text-lg max-w-2xl leading-relaxed mt-4" style={{ color: `${INK}80` }}>
          Interactive platforms, reproducible computer vision libraries, and production-ready
          full-stack applications.
        </p>
      </div>

      {/* Grid of projects */}
      <div className="grid md:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group rounded-3xl flex flex-col h-full p-6 md:p-8 relative overflow-hidden transition-shadow duration-300 hover:shadow-xl"
            style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
          >
            {/* Sliding accent line on hover */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
              style={{ background: `linear-gradient(to right, ${CORAL}, ${AMBER})` }}
            />

            <div className="flex justify-between items-start mb-6">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${CORAL}14`, color: CORAL }}>
                {getIcon(project.iconName)}
              </div>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${TEAL}14`, color: TEAL }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: TEAL }} />
                {project.metric}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="text-[11px] font-bold tracking-widest uppercase block mb-0.5" style={{ color: CORAL }}>
                  {project.tag}
                </span>
                <h3 className="dsp text-2xl font-bold leading-tight" style={{ color: INK }}>
                  {project.title}
                </h3>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: `${INK}A6` }}>
                {project.description}
              </p>

              {/* Technologies list */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.tech.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-bold px-2.5 py-1 rounded"
                    style={{ backgroundColor: '#fff', border: `1px solid ${INK}14`, color: `${INK}99` }}
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="text-[10px] font-bold px-2 py-1 rounded" style={{ backgroundColor: `${INK}0D`, color: `${INK}66` }}>
                    +{project.tech.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {/* Modal trigger button */}
            <div className="pt-8">
              <button
                onClick={() => onSelectProject(project)}
                className="group/btn w-full py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-200"
                style={{ backgroundColor: INK, color: '#fff' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                More details about the work
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}