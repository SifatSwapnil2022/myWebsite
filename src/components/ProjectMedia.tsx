import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Project } from '../types';
import { usePrefersReducedMotion } from './ui';

/**
 * Video (looping, muted, plays only while mostly on screen) or a still image.
 * Diagrams and screenshots with white space are shown whole rather than cropped.
 */
export default function ProjectMedia({ project, contain = false }: { project: Project; contain?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(reduced);

  useEffect(() => setPaused(reduced), [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio > 0.55), { threshold: [0, 0.55, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && !paused) v.play().catch(() => setPaused(true));
    else v.pause();
  }, [inView, paused]);

  if (!project.video) {
    return (
      <div className="pmedia">
        <img src={project.image} alt={`${project.title} preview`} loading="lazy" className={contain ? 'contain' : undefined} />
      </div>
    );
  }

  return (
    <div className="pmedia">
      <video
        ref={ref}
        src={project.video.src}
        poster={project.video.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={`${project.title}: ${project.video.caption}`}
      />
      <button className="pbtn" onClick={() => setPaused((p) => !p)} aria-label={paused ? `Play ${project.title} film` : `Pause ${project.title} film`}>
        {paused ? <Play aria-hidden /> : <Pause aria-hidden />}
      </button>
    </div>
  );
}
