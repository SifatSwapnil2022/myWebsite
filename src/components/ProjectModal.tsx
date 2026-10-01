import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  ExternalLink,
  FileCheck2,
  FileText,
  Github,
  Globe,
  GraduationCap,
  HeartPulse,
  Layers,
  Maximize2,
  Sparkles,
  X,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const INK = '#141414';
const PAPER = '#F7F6F2';
const WHITE = '#FFFFFF';
const MUTED = '#716F69';
const LINE = '#E7E3DB';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';

export const getIcon = (name: string) => {
  switch (name) {
    case 'Cpu':
      return <Cpu className="h-5 w-5" />;
    case 'Layers':
      return <Layers className="h-5 w-5" />;
    case 'CheckCircle2':
      return <CheckCircle2 className="h-5 w-5" />;
    case 'HeartPulse':
      return <HeartPulse className="h-5 w-5" />;
    case 'Database':
      return <Database className="h-5 w-5" />;
    case 'GraduationCap':
      return <GraduationCap className="h-5 w-5" />;
    default:
      return <Cpu className="h-5 w-5" />;
  }
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function ProjectImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
      style={{
        backgroundColor: 'rgba(10,10,10,.92)',
        paddingTop: 'max(12px, env(safe-area-inset-top))',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          marginTop: 'env(safe-area-inset-top)',
          backgroundColor: 'rgba(255,255,255,.10)',
          border: '1px solid rgba(255,255,255,.16)',
          color: '#fff',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        aria-label="Close image preview"
      >
        <X className="h-5 w-5" />
      </button>

      <motion.img
        src={src}
        alt={alt}
        className="max-h-full max-w-full rounded-2xl object-contain"
        initial={reducedMotion ? false : { scale: 0.97, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25 }}
        onClick={(event) => event.stopPropagation()}
      />
    </motion.div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: ProjectModalProps) {
  const reducedMotion = usePrefersReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imagePreviewOpen, setImagePreviewOpen] = useState(false);

  const projectLinks = useMemo(
    () =>
      [
        project.github
          ? {
              label: 'View code',
              href: project.github,
              icon: Github,
              primary: true,
            }
          : null,
        project.paperLink
          ? {
              label: 'Read paper',
              href: project.paperLink,
              icon: FileCheck2,
              primary: false,
            }
          : null,
        project.website
          ? {
              label: 'Visit site',
              href: project.website,
              icon: Globe,
              primary: false,
            }
          : null,
      ].filter(Boolean) as Array<{
        label: string;
        href: string;
        icon: typeof Github;
        primary: boolean;
      }>,
    [project.github, project.paperLink, project.website]
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 40);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !imagePreviewOpen) {
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const node = dialogRef.current;
      if (!node) return;

      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute('disabled'));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imagePreviewOpen, onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain"
        style={{
          background:
            'radial-gradient(circle at 14% 12%, rgba(229,83,61,.14), transparent 25%), radial-gradient(circle at 88% 86%, rgba(29,122,112,.12), transparent 26%), rgba(12,12,12,.82)',
          WebkitBackdropFilter: 'blur(14px) saturate(125%)',
          backdropFilter: 'blur(14px) saturate(125%)',
          paddingTop: 'max(10px, env(safe-area-inset-top))',
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        }}
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.24 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        role="presentation"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          .project-modal-shell {
            font-family:
              Inter, ui-sans-serif, system-ui, -apple-system,
              BlinkMacSystemFont, "Segoe UI", sans-serif;
          }

          .project-modal-title {
            letter-spacing: -0.05em;
          }

          .project-hero-image {
            transition:
              transform .8s cubic-bezier(.2,.7,.2,1),
              filter .5s ease;
          }

          .project-hero:hover .project-hero-image {
            transform: scale(1.018);
          }

          .project-action {
            position: relative;
            overflow: hidden;
            -webkit-tap-highlight-color: transparent;
          }

          .project-action::after {
            content: "";
            position: absolute;
            inset: -45%;
            background: linear-gradient(
              120deg,
              transparent 37%,
              rgba(255,255,255,.16) 50%,
              transparent 63%
            );
            transform: translateX(-120%) rotate(8deg);
            transition: transform .7s cubic-bezier(.2,.7,.2,1);
          }

          .project-action:hover::after {
            transform: translateX(120%) rotate(8deg);
          }

          .feature-card {
            transition:
              transform .32s cubic-bezier(.2,.7,.2,1),
              border-color .25s ease,
              background-color .25s ease,
              box-shadow .3s ease;
          }

          .feature-card:hover {
            transform: translateY(-3px);
            border-color: #DCD6CC;
            background: #fff;
            box-shadow: 0 12px 30px rgba(20,20,20,.06);
          }

          .tech-chip {
            transition:
              transform .25s cubic-bezier(.2,.7,.2,1),
              background-color .25s ease,
              color .25s ease;
          }

          .tech-chip:hover {
            transform: translateY(-2px);
            background-color: ${INK};
            color: #fff;
          }

          .modal-grid {
            background-image:
              linear-gradient(rgba(20,20,20,.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(20,20,20,.03) 1px, transparent 1px);
            background-size: 28px 28px;
          }

          @supports not ((backdrop-filter: blur(14px)) or (-webkit-backdrop-filter: blur(14px))) {
            .project-modal-fallback {
              background: rgba(18,18,18,.96) !important;
            }
          }

          @media (max-width: 640px) {
            .project-modal-card {
              border-radius: 0 !important;
              min-height: 100dvh;
              margin: 0 !important;
            }

            .project-modal-viewport {
              padding: 0 !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .project-hero-image,
            .project-action::after,
            .feature-card,
            .tech-chip {
              transition: none !important;
              transform: none !important;
            }
          }
        `}</style>

        <div className="project-modal-viewport flex min-h-full items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="project-modal-card project-modal-shell relative my-2 w-full max-w-[1180px] overflow-hidden rounded-[30px]"
            style={{
              backgroundColor: PAPER,
              color: INK,
              border: `1px solid rgba(255,255,255,.30)`,
              boxShadow:
                '0 35px 100px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.72)',
            }}
            initial={
              reducedMotion
                ? false
                : { opacity: 0, y: 24, scale: 0.985 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.99 }}
            transition={{
              duration: reducedMotion ? 0 : 0.38,
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {/* top floating controls */}
            <div
              className="absolute left-3 right-3 top-3 z-40 flex items-center justify-between gap-3 sm:left-4 sm:right-4 sm:top-4"
              style={{ paddingTop: 'env(safe-area-inset-top)' }}
            >
              <button
                type="button"
                onClick={onClose}
                className="flex min-h-[44px] items-center gap-2 rounded-xl px-3 text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(255,255,255,.88)',
                  border: '1px solid rgba(255,255,255,.72)',
                  color: INK,
                  boxShadow: '0 8px 24px rgba(20,20,20,.10)',
                  WebkitBackdropFilter: 'blur(12px)',
                  backdropFilter: 'blur(12px)',
                }}
                aria-label="Back to projects"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Projects</span>
              </button>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: 'rgba(255,255,255,.88)',
                  border: '1px solid rgba(255,255,255,.72)',
                  color: INK,
                  boxShadow: '0 8px 24px rgba(20,20,20,.10)',
                  WebkitBackdropFilter: 'blur(12px)',
                  backdropFilter: 'blur(12px)',
                }}
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* HERO                                                       */}
            {/* ---------------------------------------------------------- */}
            <section className="project-hero relative overflow-hidden">
              <button
                type="button"
                onClick={() => setImagePreviewOpen(true)}
                className="group block w-full cursor-zoom-in text-left"
                aria-label="Open project image"
              >
                <div
                  className="relative h-[290px] overflow-hidden sm:h-[380px] md:h-[470px]"
                  style={{ backgroundColor: '#EDEAE4' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-hero-image h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(to top, rgba(20,20,20,.74) 0%, rgba(20,20,20,.16) 48%, rgba(20,20,20,.10) 100%)',
                    }}
                  />

                  <div
                    className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl opacity-90 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255,255,255,.90)',
                      color: INK,
                      border: '1px solid rgba(255,255,255,.62)',
                      WebkitBackdropFilter: 'blur(10px)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>
              </button>

              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 md:p-9">
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-[760px]">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex min-h-[30px] items-center gap-2 rounded-full px-3 text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{
                          color: '#fff',
                          backgroundColor: 'rgba(20,20,20,.46)',
                          border: '1px solid rgba(255,255,255,.18)',
                          WebkitBackdropFilter: 'blur(10px)',
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        <span style={{ color: ACCENT }}>
                          {getIcon(project.iconName)}
                        </span>
                        {project.tag}
                      </span>
                    </div>

                    <h2
                      id="project-modal-title"
                      className="project-modal-title text-3xl font-semibold leading-[1.02] text-white sm:text-4xl md:text-5xl"
                    >
                      {project.title}
                    </h2>
                  </div>

                  {project.metric && (
                    <div
                      className="w-fit rounded-2xl px-4 py-3"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.90)',
                        border: '1px solid rgba(255,255,255,.68)',
                        WebkitBackdropFilter: 'blur(12px)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 12px 28px rgba(0,0,0,.12)',
                      }}
                    >
                      <p
                        className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Result
                      </p>
                      <p className="mt-1 text-sm font-semibold" style={{ color: INK }}>
                        {project.metric}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* ---------------------------------------------------------- */}
            {/* CONTENT                                                    */}
            {/* ---------------------------------------------------------- */}
            <div className="modal-grid relative">
              <div className="grid lg:grid-cols-[1fr_330px]">
                {/* main column */}
                <div className="p-5 sm:p-7 md:p-9 lg:p-10">
                  {/* intro */}
                  <section>
                    <div className="flex items-center gap-2">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: 'rgba(229,83,61,.10)',
                          color: ACCENT,
                          border: '1px solid rgba(229,83,61,.14)',
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </span>

                      <p
                        className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                        style={{ color: MUTED }}
                      >
                        About this project
                      </p>
                    </div>

                    <p
                      className="mt-5 max-w-[760px] text-[15px] leading-7 sm:text-base sm:leading-8"
                      style={{ color: '#56544F' }}
                    >
                      {project.longDescription}
                    </p>
                  </section>

                  {/* divider */}
                  <div
                    className="my-8 h-px"
                    style={{ backgroundColor: LINE }}
                  />

                  {/* features */}
                  <section>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                          style={{ color: MUTED }}
                        >
                          Details
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                          What I built
                        </h3>
                      </div>

                      <span
                        className="hidden rounded-full px-3 py-1.5 text-[10px] font-semibold sm:block"
                        style={{
                          backgroundColor: '#fff',
                          border: `1px solid ${LINE}`,
                          color: MUTED,
                        }}
                      >
                        {project.features.length}{' '}
                        {project.features.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={`${feature}-${index}`}
                          className="feature-card rounded-2xl p-4"
                          style={{
                            backgroundColor: 'rgba(255,255,255,.68)',
                            border: `1px solid ${LINE}`,
                          }}
                          initial={
                            reducedMotion
                              ? false
                              : { opacity: 0, y: 10 }
                          }
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{
                            delay: reducedMotion ? 0 : index * 0.035,
                            duration: reducedMotion ? 0 : 0.4,
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold"
                              style={{
                                backgroundColor:
                                  index % 3 === 0
                                    ? 'rgba(229,83,61,.10)'
                                    : index % 3 === 1
                                      ? 'rgba(29,122,112,.10)'
                                      : 'rgba(240,165,74,.13)',
                                color:
                                  index % 3 === 0
                                    ? ACCENT
                                    : index % 3 === 1
                                      ? TEAL
                                      : '#9A651A',
                              }}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>

                            <p
                              className="text-sm leading-6"
                              style={{ color: '#55534E' }}
                            >
                              {feature}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* sidebar */}
                <aside
                  className="border-t p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-7"
                  style={{
                    borderColor: LINE,
                    backgroundColor: 'rgba(255,255,255,.50)',
                  }}
                >
                  <div className="lg:sticky lg:top-5">
                    {/* tech */}
                    <section>
                      <div className="flex items-center justify-between gap-4">
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                          style={{ color: MUTED }}
                        >
                          Built with
                        </p>

                        <span
                          className="text-[10px] font-medium"
                          style={{ color: '#AAA59D' }}
                        >
                          {project.tech.length}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="tech-chip rounded-xl px-3 py-2 text-[11px] font-semibold"
                            style={{
                              backgroundColor: '#fff',
                              border: `1px solid ${LINE}`,
                              color: '#55534E',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    <div
                      className="my-6 h-px"
                      style={{ backgroundColor: LINE }}
                    />

                    {/* result card */}
                    {project.metric && (
                      <>
                        <section
                          className="rounded-2xl p-4"
                          style={{
                            background:
                              'linear-gradient(145deg, rgba(29,122,112,.09), rgba(255,255,255,.72))',
                            border: '1px solid rgba(29,122,112,.14)',
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                              style={{
                                backgroundColor: 'rgba(29,122,112,.10)',
                                color: TEAL,
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </span>

                            <div>
                              <p
                                className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                                style={{ color: MUTED }}
                              >
                                Result
                              </p>
                              <p className="mt-1 text-sm font-semibold">
                                {project.metric}
                              </p>
                            </div>
                          </div>
                        </section>

                        <div
                          className="my-6 h-px"
                          style={{ backgroundColor: LINE }}
                        />
                      </>
                    )}

                    {/* external links */}
                    {projectLinks.length > 0 && (
                      <section>
                        <p
                          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                          style={{ color: MUTED }}
                        >
                          Links
                        </p>

                        <div className="mt-4 space-y-2.5">
                          {projectLinks.map(
                            ({ label, href, icon: Icon, primary }) => (
                              <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-action group flex min-h-[48px] items-center justify-between rounded-xl px-4 text-xs font-semibold"
                                style={{
                                  backgroundColor: primary ? INK : '#fff',
                                  color: primary ? '#fff' : INK,
                                  border: primary
                                    ? '1px solid #141414'
                                    : `1px solid ${LINE}`,
                                  boxShadow: primary
                                    ? '0 10px 22px rgba(20,20,20,.12)'
                                    : 'none',
                                }}
                              >
                                <span className="relative z-10 flex items-center gap-2.5">
                                  <Icon className="h-4 w-4" />
                                  {label}
                                </span>

                                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                              </a>
                            )
                          )}
                        </div>
                      </section>
                    )}

                    {/* small data card */}
                    <section
                      className="mt-6 rounded-2xl p-4"
                      style={{
                        backgroundColor: PAPER,
                        border: `1px solid ${LINE}`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles
                          className="h-4 w-4"
                          style={{ color: AMBER }}
                        />
                        <p className="text-xs font-semibold">At a glance</p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div>
                          <p
                            className="text-[9px] uppercase tracking-[0.13em]"
                            style={{ color: MUTED }}
                          >
                            Features
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {project.features.length}
                          </p>
                        </div>

                        <div>
                          <p
                            className="text-[9px] uppercase tracking-[0.13em]"
                            style={{ color: MUTED }}
                          >
                            Tools
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {project.tech.length}
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </aside>
              </div>

              {/* -------------------------------------------------------- */}
              {/* BOTTOM ACTION BAR                                       */}
              {/* -------------------------------------------------------- */}
              <div
                className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7 md:px-9"
                style={{
                  borderColor: LINE,
                  backgroundColor: 'rgba(247,246,242,.90)',
                  WebkitBackdropFilter: 'blur(10px)',
                  backdropFilter: 'blur(10px)',
                  paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
                }}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[44px] items-center gap-2 text-xs font-semibold"
                  style={{ color: MUTED }}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to projects
                </button>

                {projectLinks.length > 0 && (
                  <a
                    href={projectLinks[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold"
                    style={{
                      backgroundColor: INK,
                      color: '#fff',
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {projectLinks[0].label}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {imagePreviewOpen && (
          <ProjectImageLightbox
            src={project.image}
            alt={project.title}
            onClose={() => setImagePreviewOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}