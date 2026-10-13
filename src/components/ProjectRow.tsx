import { Project } from '../types';
import ProjectMedia from './ProjectMedia';

export default function ProjectRow({ project, flip = false, onOpen }: { project: Project; flip?: boolean; onOpen: (p: Project) => void }) {
  const p = project;
  return (
    <article className={`prow${flip ? ' flip' : ''}`} id={`project-${p.id}`}>
      <ProjectMedia project={p} contain={p.id === 'medileaf' || p.id === 'defax'} />
      <div className="pbody">
        <p className="meta">
          {p.tag}
          {p.role ? `. ${p.role}` : ''}
        </p>
        <h3 className="h2">{p.title}</h3>
        <div className="prose">
          <p>{p.description}</p>
        </div>
        <p className="figure">
          <b>{p.metric}</b>
        </p>
        <p className="stack">{p.tech.join(', ')}</p>
        <div className="acts">
          <button className="btn" onClick={() => onOpen(p)}>
            Read more
          </button>
          {p.website && (
            <a className="btn ghost" href={p.website} target="_blank" rel="noreferrer">
              Open the site
            </a>
          )}
          {p.paperLink && !p.website && (
            <a className="btn ghost" href={p.paperLink} target="_blank" rel="noreferrer">
              {p.id === 'medileaf' ? 'Dataset' : 'Paper'}
            </a>
          )}
          {p.github && (
            <a className="btn ghost" href={p.github} target="_blank" rel="noreferrer">
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
