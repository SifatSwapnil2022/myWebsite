import { FEATURED_ID, PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import ProjectRow from '../components/ProjectRow';
import ProjectMedia from '../components/ProjectMedia';
import FeaturedFilm from '../components/FeaturedFilm';
import { PageIntro, SectionHead, scrollToId } from '../components/ui';

const featured = PROJECTS.find((p) => p.id === FEATURED_ID)!;
const research = PROJECTS.filter((p) => p.group === 'research');
const built = PROJECTS.filter((p) => p.group === 'product' && p.id !== FEATURED_ID);

/** One line per project at the top of the page; clicking scrolls to it. */
function Index() {
  const groups: [string, Project[]][] = [
    ['Featured', [featured]],
    ['Research', research],
    ['Built', built],
  ];
  return (
    <nav className="pindex" aria-label="All projects">
      {groups.map(([label, list]) => (
        <div key={label} className="pindex-col">
          <h2 className="pindex-h">{label}</h2>
          <ul>
            {list.map((p) => (
              <li key={p.id}>
                <a
                  href="#/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(`project-${p.id}`);
                  }}
                >
                  <span className="t">{p.title}</span>
                  <span className="d">{p.tag}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Card({ project: p, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="pcard" id={`project-${p.id}`}>
      <ProjectMedia project={p} />
      <p className="meta">
        {p.tag}
        {p.role ? `. ${p.role}` : ''}
      </p>
      <h3 className="h3">{p.title}</h3>
      <p className="pcard-desc">{p.description}</p>
      <p className="pcard-links">
        <button className="text-btn link" onClick={() => onOpen(p)}>
          Read more
        </button>
        {p.website && (
          <a className="link" href={p.website} target="_blank" rel="noreferrer">
            {p.websiteLabel ?? 'Open the site'}
          </a>
        )}
        {p.github && (
          <a className="link" href={p.github} target="_blank" rel="noreferrer">
            Code
          </a>
        )}
      </p>
    </article>
  );
}

export default function Projects({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="Projects">
          Research papers, my thesis, and things I've built. The films play without sound. Open a project for the
          full write-up.
        </PageIntro>
        <Index />
      </div>

      <div className="feat-wrap section-tight" id={`project-${featured.id}`}>
        <FeaturedFilm project={featured} onOpen={onSelectProject} />
      </div>

      <div className="wrap">
        <section className="section">
          <SectionHead title="Research" note="Papers, my thesis, and a healthcare learning project." />
          {research.map((p, i) => (
            <ProjectRow key={p.id} project={p} flip={i % 2 === 1} onOpen={onSelectProject} />
          ))}
        </section>

        <section className="section">
          <SectionHead title="Built" note="Websites, a store and a marketplace. Two of them are made for Dhaka." />
          <div className="pgrid">
            {built.map((p) => (
              <Card key={p.id} project={p} onOpen={onSelectProject} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
