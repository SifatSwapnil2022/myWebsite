import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

export default function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const p = project;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const opener = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="pm-title" tabIndex={-1} ref={ref}>
        <div className="drawer-top">
          <span className="small">{p.tag}</span>
          <button className="nav-menu" onClick={onClose} style={{ display: 'inline-flex' }}>
            <X size={16} aria-hidden /> Close
          </button>
        </div>

        <div className="drawer-body">
          <h2 className="h1" id="pm-title">
            {p.title}
          </h2>
          {p.role && (
            <p className="small" style={{ marginTop: 10 }}>
              {p.role}
            </p>
          )}

          <div className="media" style={{ marginTop: 28 }}>
            {p.video ? (
              <video src={p.video.srcHd} poster={p.video.poster} controls muted playsInline autoPlay preload="metadata" />
            ) : (
              <img src={p.image} alt={`${p.title} preview`} />
            )}
          </div>
          {p.video && (
            <p className="xs" style={{ marginTop: 10 }}>
              {p.video.caption}. No sound.
            </p>
          )}

          <div className="prose" style={{ marginTop: 32 }}>
            <p>{p.longDescription}</p>
          </div>

          <h3 className="h3" style={{ marginTop: 40, marginBottom: 16 }}>
            What it does
          </h3>
          <ul className="feat">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <dl className="defs" style={{ marginTop: 40 }}>
            <div>
              <dt>Result</dt>
              <dd>{p.metric}</dd>
            </div>
            <div>
              <dt>Built with</dt>
              <dd>{p.tech.join(', ')}</dd>
            </div>
          </dl>

          <div className="btn-row" style={{ marginTop: 32 }}>
            {p.website && (
              <a className="btn" href={p.website} target="_blank" rel="noreferrer">
                Open the site
              </a>
            )}
            {p.paperLink && (
              <a className={p.website ? 'btn ghost' : 'btn'} href={p.paperLink} target="_blank" rel="noreferrer">
                {p.id === 'medileaf' ? 'Dataset on Mendeley Data' : 'Read the paper'}
              </a>
            )}
            {p.github && (
              <a className="btn ghost" href={p.github} target="_blank" rel="noreferrer">
                Source code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
