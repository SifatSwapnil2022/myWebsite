import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Project } from '../types';
import { usePrefersReducedMotion } from './ui';

type Props = {
  project: Project;
  onOpen: (p: Project) => void;
  /** id of the title, for aria-labelledby; must be unique on the page */
  headingId?: string;
};

/**
 * One project shown large: a full-width film that plays without sound while it is on screen,
 * with the title, a short description and the links underneath.
 * With reduced motion the film waits for a click.
 */
export default function FeaturedFilm({ project, onOpen, headingId = 'h-featured' }: Props) {
  const p = project;
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(!reduced);

  useEffect(() => setPlaying(!reduced), [reduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio > 0.35), { threshold: [0, 0.35, 1] });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing && inView) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing, inView]);

  // thin progress line along the bottom of the film
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      if (v && barRef.current && v.duration) barRef.current.style.transform = `scaleX(${v.currentTime / v.duration})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!p.video) return null;

  return (
    <section className="feat" aria-labelledby={headingId}>
      <div className="feat-stage">
        <video
          ref={videoRef}
          src={p.video.src}
          poster={p.video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={`${p.title}: ${p.video.caption}`}
        />
        <button className="reel-ctrl" onClick={() => setPlaying((x) => !x)} aria-label={playing ? 'Pause film' : 'Play film'}>
          {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </button>
        <span className="feat-bar" aria-hidden>
          <i ref={barRef} />
        </span>
      </div>

      <div className="feat-body">
        <div>
          <p className="feat-kicker">
            Featured · {p.tag}
          </p>
          <h2 className="h2" id={headingId}>
            {p.title}
          </h2>
          <p className="feat-desc">{p.description}</p>
        </div>
        <div className="feat-side">
          <div className="btn-row">
            {p.website && (
              <a className="btn" href={p.website} target="_blank" rel="noreferrer">
                {p.websiteLabel ?? 'Open the site'}
              </a>
            )}
            {p.github && (
              <a className="btn ghost" href={p.github} target="_blank" rel="noreferrer">
                Code
              </a>
            )}
            <button className="btn ghost" onClick={() => onOpen(p)}>
              Read more
            </button>
          </div>
          <p className="stack-tags">
            {p.tech.map((t) => (
              <code key={t}>{t}</code>
            ))}
          </p>
          <p className="xs" style={{ marginTop: 12 }}>
            {p.video.caption}. No sound.
          </p>
        </div>
      </div>
    </section>
  );
}
