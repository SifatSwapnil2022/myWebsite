import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Project } from '../types';
import { usePrefersReducedMotion } from './ui';

type Props = {
  projects: Project[];
  onOpen: (p: Project) => void;
};

/**
 * Plays each project film in turn, without sound. The chapter list under the video
 * doubles as the progress indicator and lets people jump to a film.
 * Plays only while on screen; with reduced motion it waits for a click.
 */
export default function Showreel({ projects, onOpen }: Props) {
  const items = projects.filter((p) => p.video);
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [inView, setInView] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => setPlaying(!reduced), [reduced]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // play / pause with visibility and the button
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing && inView) v.play().catch(() => setPlaying(false));
    else v.pause();
  }, [playing, inView, index]);

  // progress bars
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = videoRef.current;
      barRefs.current.forEach((b, i) => {
        if (!b) return;
        let k = 0;
        if (i < index) k = 1;
        else if (i === index && v && v.duration) k = v.currentTime / v.duration;
        b.style.transform = `scaleX(${k})`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [index]);

  if (!items.length) return null;
  const cur = items[index];
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <section className="reel" aria-label="Project films">
      <div className="reel-stage" ref={stageRef}>
        <video
          key={cur.id}
          ref={videoRef}
          src={cur.video!.src}
          poster={cur.video!.poster}
          muted
          playsInline
          preload="metadata"
          onEnded={next}
          aria-label={`${cur.title}: ${cur.video!.caption}`}
        />
        <button className="reel-ctrl" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause film' : 'Play film'}>
          {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="reel-chapters" role="list">
        {items.map((p, i) => (
          <button
            key={p.id}
            role="listitem"
            className="chap"
            aria-current={i === index ? 'true' : undefined}
            onClick={() => {
              setIndex(i);
              setPlaying(true);
            }}
          >
            <span className="bar">
              <i
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
              />
            </span>
            <span className="t">{p.title}</span>
            <span className="d">{p.tag}</span>
          </button>
        ))}
      </div>

      <p className="small" style={{ marginTop: 14 }}>
        {cur.video!.caption}.{' '}
        <button className="text-btn link" onClick={() => onOpen(cur)}>
          About {cur.title}
        </button>
      </p>
    </section>
  );
}
