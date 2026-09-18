import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  ChevronRight,
  Code2,
  Filter,
  Layers3,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { getIcon } from '../components/ProjectModal';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

const INK = '#141414';
const PAPER = '#F7F5EF';
const PAPER_2 = '#EFEAE1';
const WHITE = '#FFFFFF';
const MUTED = '#716F69';
const LINE = '#E3DED4';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';
const BLUE = '#253A78';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
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
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.66,
        delay: reducedMotion ? 0 : delay / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div
      className="grid gap-5 border-b pb-6 md:grid-cols-12 md:items-end"
      style={{ borderColor: LINE }}
    >
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-semibold tabular-nums"
            style={{
              backgroundColor: WHITE,
              border: `1px solid ${LINE}`,
              color: MUTED,
            }}
          >
            {number}
          </span>

          <span
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: MUTED }}
          >
            {eyebrow}
          </span>
        </div>
      </div>

      <div className="md:col-span-6">
        <h2 className="projects-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
          {title}
        </h2>
      </div>

      {description && (
        <div className="md:col-span-3">
          <p className="text-sm leading-6" style={{ color: MUTED }}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectMetric({
  metric,
  dark = false,
}: {
  metric?: string;
  dark?: boolean;
}) {
  if (!metric) return null;

  return (
    <span
      className="inline-flex min-h-[32px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
      style={{
        backgroundColor: dark
          ? 'rgba(255,255,255,.08)'
          : 'rgba(29,122,112,.08)',
        border: dark
          ? '1px solid rgba(255,255,255,.12)'
          : '1px solid rgba(29,122,112,.14)',
        color: dark ? '#fff' : TEAL,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: dark ? '#6FE2D1' : TEAL,
          boxShadow: dark
            ? '0 0 0 5px rgba(111,226,209,.08)'
            : '0 0 0 5px rgba(29,122,112,.07)',
        }}
      />
      {metric}
    </span>
  );
}

function TechStack({
  tech,
  limit = 5,
  dark = false,
}: {
  tech: string[];
  limit?: number;
  dark?: boolean;
}) {
  const visible = tech.slice(0, limit);
  const remaining = Math.max(0, tech.length - visible.length);

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((item) => (
        <span
          key={item}
          className="rounded-lg px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
          style={{
            backgroundColor: dark
              ? 'rgba(255,255,255,.06)'
              : PAPER,
            border: dark
              ? '1px solid rgba(255,255,255,.10)'
              : `1px solid ${LINE}`,
            color: dark ? 'rgba(255,255,255,.62)' : MUTED,
          }}
        >
          {item}
        </span>
      ))}

      {remaining > 0 && (
        <span
          className="rounded-lg px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em]"
          style={{
            backgroundColor: dark
              ? 'rgba(255,255,255,.035)'
              : 'rgba(20,20,20,.035)',
            border: dark
              ? '1px solid rgba(255,255,255,.08)'
              : `1px solid ${LINE}`,
            color: dark ? 'rgba(255,255,255,.42)' : MUTED,
          }}
        >
          +{remaining}
        </span>
      )}
    </div>
  );
}

function ProjectVisual({
  project,
  className = '',
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={`project-visual relative overflow-hidden ${className}`}
      style={{ backgroundColor: PAPER_2 }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="project-image h-full w-full object-cover"
        referrerPolicy="no-referrer"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(20,20,20,.20), transparent 56%)',
        }}
      />

      <div
        className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: 'rgba(255,255,255,.92)',
          border: '1px solid rgba(255,255,255,.72)',
          color: INK,
          boxShadow: '0 10px 25px rgba(20,20,20,.10)',
          WebkitBackdropFilter: 'blur(10px)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {getIcon(project.iconName)}
      </div>
    </div>
  );
}

function FeaturedProject({
  project,
  onSelectProject,
}: {
  project: Project;
  onSelectProject: (project: Project) => void;
}) {
  return (
    <article
      className="featured-project overflow-hidden rounded-[32px]"
      style={{
        background:
          'linear-gradient(145deg, #171717 0%, #25231F 100%)',
        color: '#fff',
        boxShadow: '0 30px 80px rgba(20,20,20,.16)',
      }}
    >
      <div className="grid lg:grid-cols-[1.08fr_.92fr]">
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="featured-project-image group relative min-h-[360px] overflow-hidden text-left sm:min-h-[470px] lg:min-h-[590px]"
          aria-label={`Open details for ${project.title}`}
        >
          <img
            src={project.image}
            alt={project.title}
            className="project-image absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(20,20,20,.64) 0%, rgba(20,20,20,.08) 55%, rgba(20,20,20,.04) 100%)',
            }}
          />

          <div
            className="absolute bottom-5 left-5 flex items-center gap-2 rounded-xl px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.13em]"
            style={{
              backgroundColor: 'rgba(20,20,20,.50)',
              border: '1px solid rgba(255,255,255,.14)',
              color: '#fff',
              WebkitBackdropFilter: 'blur(10px)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {getIcon(project.iconName)}
            Featured project
          </div>

          <span
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{
              backgroundColor: 'rgba(255,255,255,.92)',
              color: INK,
              border: '1px solid rgba(255,255,255,.70)',
            }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </button>

        <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-11">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex min-h-[30px] items-center rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.13em]"
                style={{
                  backgroundColor: 'rgba(229,83,61,.12)',
                  border: '1px solid rgba(229,83,61,.18)',
                  color: '#FF8C77',
                }}
              >
                {project.tag}
              </span>

              <ProjectMetric metric={project.metric} dark />
            </div>

            <h2 className="mt-6 text-3xl font-semibold leading-[1.01] tracking-[-0.045em] sm:text-4xl lg:text-5xl">
              {project.title}
            </h2>

            <p
              className="mt-5 text-sm leading-7"
              style={{ color: 'rgba(255,255,255,.56)' }}
            >
              {project.description}
            </p>

            <div className="mt-6">
              <TechStack tech={project.tech} limit={6} dark />
            </div>
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className="project-primary-action group flex min-h-[50px] w-full items-center justify-between rounded-2xl px-4 text-xs font-semibold sm:w-auto sm:min-w-[220px]"
              style={{
                backgroundColor: '#fff',
                color: INK,
              }}
            >
              <span>View project case study</span>

              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: INK,
                  color: '#fff',
                }}
              >
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({
  project,
  index,
  onSelectProject,
}: {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}) {
  const large = index % 5 === 0;

  return (
    <article
      className={`project-card group overflow-hidden rounded-[26px] ${
        large ? 'md:col-span-2' : ''
      }`}
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        boxShadow: '0 18px 50px rgba(20,20,20,.045)',
      }}
    >
      <button
        type="button"
        onClick={() => onSelectProject(project)}
        className="block w-full text-left"
        aria-label={`Open ${project.title}`}
      >
        <ProjectVisual
          project={project}
          className={large ? 'aspect-[16/7]' : 'aspect-[16/10]'}
        />
      </button>

      <div className="flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className="text-[9px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: ACCENT }}
            >
              {project.tag}
            </p>

            <h3 className="mt-2 text-xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-2xl">
              {project.title}
            </h3>
          </div>

          <span
            className="text-[10px] font-semibold tabular-nums"
            style={{ color: '#AAA59D' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p
          className="mt-4 text-sm leading-7"
          style={{
            color: MUTED,
            display: '-webkit-box',
            WebkitLineClamp: large ? 3 : 4,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>

        <div className="mt-5">
          <TechStack tech={project.tech} limit={large ? 6 : 4} />
        </div>

        <div
          className="mt-6 flex items-center justify-between gap-4 border-t pt-5"
          style={{ borderColor: LINE }}
        >
          <ProjectMetric metric={project.metric} />

          <button
            type="button"
            onClick={() => onSelectProject(project)}
            className="group/btn inline-flex min-h-[42px] items-center gap-2 rounded-xl px-3.5 text-xs font-semibold"
            style={{
              backgroundColor: INK,
              color: '#fff',
            }}
          >
            Details
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Projects({
  onSelectProject,
}: ProjectsProps) {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');

  const tags = useMemo(() => {
    return [
      'All',
      ...Array.from(
        new Set(
          PROJECTS.map((project) => project.tag).filter(Boolean)
        )
      ),
    ];
  }, []);

  const technologies = useMemo(() => {
    const counts = new Map<string, number>();

    PROJECTS.forEach((project) => {
      project.tech.forEach((tech) => {
        counts.set(tech, (counts.get(tech) || 0) + 1);
      });
    });

    return [
      'All',
      ...Array.from(counts.entries())
        .sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1];
          return a[0].localeCompare(b[0]);
        })
        .map(([tech]) => tech),
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchesTag =
        selectedTag === 'All' || project.tag === selectedTag;

      const matchesTech =
        selectedTech === 'All' ||
        project.tech.includes(selectedTech);

      const haystack = [
        project.title,
        project.tag,
        project.description,
        project.metric || '',
        project.tech.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery =
        normalizedQuery.length === 0 ||
        haystack.includes(normalizedQuery);

      return matchesTag && matchesTech && matchesQuery;
    });
  }, [query, selectedTag, selectedTech]);

  const featuredProject = PROJECTS[0];

  const totalTech = useMemo(
    () =>
      new Set(PROJECTS.flatMap((project) => project.tech)).size,
    []
  );

  const metricCount = useMemo(
    () => PROJECTS.filter((project) => Boolean(project.metric)).length,
    []
  );

  const resetFilters = () => {
    setQuery('');
    setSelectedTag('All');
    setSelectedTech('All');
  };

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const onPointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--projects-x', `${x}%`);
      node.style.setProperty('--projects-y', `${y}%`);
    };

    node.addEventListener('pointermove', onPointerMove);
    return () => node.removeEventListener('pointermove', onPointerMove);
  }, [reducedMotion]);

  return (
    <main
      className="projects-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .projects-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .projects-display {
          letter-spacing: -0.064em;
        }

        .projects-section-title {
          letter-spacing: -0.045em;
        }

        .projects-hero {
          --projects-x: 80%;
          --projects-y: 18%;
        }

        .projects-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--projects-x) var(--projects-y),
              rgba(229,83,61,.12),
              transparent 24%
            );
          opacity: .86;
        }

        .projects-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.94), transparent 96%);
        }

        .project-image {
          transition: transform .85s cubic-bezier(.2,.7,.2,1);
        }

        .project-card:hover .project-image,
        .featured-project-image:hover .project-image {
          transform: scale(1.028);
        }

        .project-card {
          transition:
            transform .38s cubic-bezier(.2,.7,.2,1),
            box-shadow .38s ease,
            border-color .3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: #D8D1C5;
          box-shadow: 0 28px 70px rgba(20,20,20,.09) !important;
        }

        .project-primary-action,
        .project-filter-button {
          -webkit-tap-highlight-color: transparent;
        }

        .project-filter-button {
          transition:
            transform .28s cubic-bezier(.2,.7,.2,1),
            background-color .25s ease,
            color .25s ease,
            border-color .25s ease;
        }

        .project-filter-button:hover {
          transform: translateY(-2px);
        }

        .projects-search {
          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .projects-search:focus-within {
          border-color: #CFC8BC;
          background-color: #fff;
          box-shadow: 0 10px 30px rgba(20,20,20,.06);
        }

        .projects-dark-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .projects-dark-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 16% 18%, rgba(229,83,61,.18), transparent 28%),
            radial-gradient(circle at 86% 76%, rgba(29,122,112,.14), transparent 30%);
        }

        .projects-tech-scroller {
          scrollbar-width: none;
        }

        .projects-tech-scroller::-webkit-scrollbar {
          display: none;
        }

        @supports not ((backdrop-filter: blur(10px)) or (-webkit-backdrop-filter: blur(10px))) {
          .featured-project-image span {
            background-color: rgba(255,255,255,.98) !important;
          }
        }

        @media (min-width: 640px) {
          .projects-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .projects-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-image,
          .project-card,
          .project-filter-button,
          .projects-search {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section
        ref={heroRef}
        className="projects-hero relative overflow-hidden border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F1ECE3 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="projects-grid pointer-events-none absolute inset-0 opacity-75"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="projects-page-width relative z-10 grid min-h-[720px] items-center gap-10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
          <div className="md:col-span-7">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-semibold"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  P
                </span>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                  style={{ color: MUTED }}
                >
                  Projects
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1 className="projects-display max-w-[940px] text-[clamp(3.6rem,8.8vw,7.8rem)] font-semibold leading-[0.83]">
                Systems,
                <br />
                experiments &
                <br />
                <span style={{ color: ACCENT }}>built work.</span>
              </h1>
            </Reveal>

            <Reveal delay={105}>
              <p
                className="mt-8 max-w-[680px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                Selected machine learning, computer vision, multimodal, and
                software projects represented in the portfolio.
              </p>
            </Reveal>

            <Reveal delay={145}>
              <div className="mt-8 grid max-w-[760px] grid-cols-1 gap-3 sm:grid-cols-3">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.62)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    Projects
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {PROJECTS.length}
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.62)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    Technologies
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {totalTech}
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.62)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: MUTED }}
                  >
                    With metric
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {metricCount}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={115} className="md:col-span-5">
            <div
              className="projects-dark-card rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                color: '#fff',
                boxShadow: '0 28px 75px rgba(20,20,20,.16)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,.40)' }}
                  >
                    Project index
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Browse by stack
                  </h2>
                </div>

                <Layers3 className="h-5 w-5" style={{ color: AMBER }} />
              </div>

              <div className="mt-6 space-y-1">
                {PROJECTS.slice(0, 5).map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="group grid w-full grid-cols-[36px_1fr_auto] items-center gap-3 border-b py-4 text-left"
                    style={{ borderColor: 'rgba(255,255,255,.08)' }}
                  >
                    <span
                      className="text-[9px] font-semibold tabular-nums"
                      style={{ color: 'rgba(255,255,255,.34)' }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {project.title}
                      </p>
                      <p
                        className="mt-1 truncate text-[10px]"
                        style={{ color: 'rgba(255,255,255,.42)' }}
                      >
                        {project.tag}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 opacity-45 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                ))}
              </div>

              <a
                href="#project-browser"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold"
              >
                Browse all
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURED PROJECT                                                 */}
      {/* ================================================================ */}
      {featuredProject && (
        <section className="projects-page-width py-20 md:py-28">
          <Reveal>
            <SectionHeader
              number="01"
              eyebrow="Featured project"
              title="One project gets the full stage."
              description="The first project in your PROJECTS data is treated as the featured case study."
            />
          </Reveal>

          <Reveal delay={70}>
            <div className="mt-8">
              <FeaturedProject
                project={featuredProject}
                onSelectProject={onSelectProject}
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* ================================================================ */}
      {/* PROJECT BROWSER                                                  */}
      {/* ================================================================ */}
      <section
        id="project-browser"
        className="border-y py-20 md:py-28"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="projects-page-width">
          <Reveal>
            <SectionHeader
              number="02"
              eyebrow="Project browser"
              title="Search, filter, and open the work."
              description="The browser uses the project titles, tags, technologies, descriptions, and metrics already stored in PROJECTS."
            />
          </Reveal>

          <Reveal delay={55}>
            <div
              className="mt-8 rounded-[26px] p-4 sm:p-5"
              style={{
                backgroundColor: PAPER_2,
                border: `1px solid ${LINE}`,
              }}
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div
                  className="projects-search flex min-h-[50px] w-full items-center gap-3 rounded-xl px-4 xl:max-w-[460px]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.68)',
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <Search
                    className="h-4 w-4 shrink-0"
                    style={{ color: MUTED }}
                  />

                  <input
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search projects, tech, metric…"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                    style={{ color: INK }}
                    aria-label="Search projects"
                  />

                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      aria-label="Clear project search"
                    >
                      <X className="h-4 w-4" style={{ color: MUTED }} />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-xl px-3 text-[10px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: WHITE,
                      border: `1px solid ${LINE}`,
                      color: MUTED,
                    }}
                  >
                    <Filter className="h-3.5 w-3.5" />
                    {filteredProjects.length}/{PROJECTS.length}
                  </span>

                  {(query ||
                    selectedTag !== 'All' ||
                    selectedTech !== 'All') && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="project-filter-button inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        backgroundColor: INK,
                        color: '#fff',
                        border: `1px solid ${INK}`,
                      }}
                    >
                      Reset
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div
                className="mt-5 border-t pt-5"
                style={{ borderColor: LINE }}
              >
                <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <SlidersHorizontal
                        className="h-3.5 w-3.5"
                        style={{ color: MUTED }}
                      />
                      <span
                        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        By project type
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => {
                        const active = selectedTag === tag;

                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag(tag)}
                            className="project-filter-button inline-flex min-h-[38px] items-center rounded-xl px-3 text-[10px] font-semibold"
                            style={{
                              backgroundColor: active ? INK : WHITE,
                              border: `1px solid ${
                                active ? INK : LINE
                              }`,
                              color: active ? '#fff' : MUTED,
                            }}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Code2
                        className="h-3.5 w-3.5"
                        style={{ color: MUTED }}
                      />
                      <span
                        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        By technology
                      </span>
                    </div>

                    <div className="projects-tech-scroller flex gap-2 overflow-x-auto pb-1">
                      {technologies.slice(0, 14).map((tech) => {
                        const active = selectedTech === tech;

                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => setSelectedTech(tech)}
                            className="project-filter-button inline-flex min-h-[38px] shrink-0 items-center rounded-xl px-3 text-[10px] font-semibold"
                            style={{
                              backgroundColor: active
                                ? ACCENT
                                : WHITE,
                              border: `1px solid ${
                                active ? ACCENT : LINE
                              }`,
                              color: active ? '#fff' : MUTED,
                            }}
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <Reveal
                  key={project.id}
                  delay={Math.min(index * 45, 220)}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onSelectProject={onSelectProject}
                  />
                </Reveal>
              ))
            ) : (
              <Reveal className="md:col-span-2">
                <div
                  className="rounded-[28px] p-8 text-center sm:p-12"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <Search
                    className="mx-auto h-7 w-7"
                    style={{ color: MUTED }}
                  />

                  <h3 className="mt-4 text-xl font-semibold">
                    No matching project
                  </h3>

                  <p
                    className="mt-2 text-sm"
                    style={{ color: MUTED }}
                  >
                    Try another keyword or reset the filters.
                  </p>

                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-5 inline-flex min-h-[44px] items-center rounded-xl px-4 text-xs font-semibold"
                    style={{
                      backgroundColor: INK,
                      color: '#fff',
                    }}
                  >
                    Reset filters
                  </button>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* TECH LANDSCAPE                                                   */}
      {/* ================================================================ */}
      <section className="projects-page-width py-20 md:py-24">
        <Reveal>
          <SectionHeader
            number="03"
            eyebrow="Technology landscape"
            title="The tools represented across the project portfolio."
            description="Technology names below are generated directly from every project's tech array."
          />
        </Reveal>

        <div className="mt-8 grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
          <Reveal>
            <div
              className="projects-dark-card h-full rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                color: '#fff',
                boxShadow: '0 24px 62px rgba(20,20,20,.13)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: 'rgba(255,255,255,.38)' }}
                  >
                    Stack overview
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    {totalTech} technologies represented
                  </h3>
                </div>

                <Boxes className="h-5 w-5" style={{ color: AMBER }} />
              </div>

              <p
                className="mt-5 text-sm leading-7"
                style={{ color: 'rgba(255,255,255,.54)' }}
              >
                This count is calculated from the technology arrays attached to
                the project entries.
              </p>

              <div
                className="mt-7 grid grid-cols-2 gap-3 border-t pt-6"
                style={{ borderColor: 'rgba(255,255,255,.10)' }}
              >
                <div>
                  <p
                    className="text-[9px] uppercase tracking-[0.13em]"
                    style={{ color: 'rgba(255,255,255,.38)' }}
                  >
                    Projects
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {PROJECTS.length}
                  </p>
                </div>

                <div>
                  <p
                    className="text-[9px] uppercase tracking-[0.13em]"
                    style={{ color: 'rgba(255,255,255,.38)' }}
                  >
                    Metrics listed
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {metricCount}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div
              className="rounded-[28px] p-5 sm:p-7"
              style={{
                backgroundColor: WHITE,
                border: `1px solid ${LINE}`,
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: MUTED }}
                  >
                    Technologies
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Browse the stack
                  </h3>
                </div>

                <Code2 className="h-5 w-5" style={{ color: ACCENT }} />
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {technologies
                  .filter((tech) => tech !== 'All')
                  .map((tech, index) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => {
                        setSelectedTech(tech);
                        document
                          .getElementById('project-browser')
                          ?.scrollIntoView({
                            behavior: reducedMotion
                              ? 'auto'
                              : 'smooth',
                          });
                      }}
                      className="project-filter-button inline-flex min-h-[40px] items-center gap-2 rounded-xl px-3 text-[10px] font-semibold"
                      style={{
                        backgroundColor:
                          index % 4 === 0
                            ? 'rgba(229,83,61,.08)'
                            : index % 4 === 1
                              ? 'rgba(29,122,112,.08)'
                              : index % 4 === 2
                                ? 'rgba(37,58,120,.08)'
                                : 'rgba(240,165,74,.10)',
                        border: `1px solid ${LINE}`,
                        color: MUTED,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            index % 4 === 0
                              ? ACCENT
                              : index % 4 === 1
                                ? TEAL
                                : index % 4 === 2
                                  ? BLUE
                                  : AMBER,
                        }}
                      />
                      {tech}
                    </button>
                  ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* END STRIP                                                        */}
      {/* ================================================================ */}
      <section
        className="border-t"
        style={{
          borderColor: LINE,
          backgroundColor: PAPER_2,
          paddingBottom:
            'max(0px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="projects-page-width grid sm:grid-cols-3">
          <a
            href="#/research"
            className="group flex min-h-[76px] items-center justify-between px-4 sm:border-r"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Previous
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Research
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/news"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-r sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Continue
              </span>
              <span className="mt-1 block text-sm font-semibold">
                News
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/contact"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Next
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Contact
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
