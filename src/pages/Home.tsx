import { Download } from 'lucide-react';
import { LINKS, NEWS, PROFILE, PROJECTS, PUBLICATIONS, SHOWREEL_IDS } from '../data/portfolioData';
import { Project } from '../types';
import Showreel from '../components/Showreel';
import { Authors, Cite, SectionHead, useDhakaTime } from '../components/ui';

const pub = (id: string) => PUBLICATIONS.find((p) => p.id === id)!;

/** Numbered in the order they're cited in the introduction. */
const REFS = [
  { n: 1, p: pub('01'), venue: 'IEEE Access, vol. 13, 2025' },
  { n: 2, p: pub('03'), venue: 'IEEE IBDAP 2025, Thailand. Oral presentation' },
  {
    n: 3,
    p: pub('02'),
    venue: 'Data paper under review at Scientific Data. Dataset public on Mendeley Data, v2 (DOI 10.17632/9tdc9gbtgb.2)',
    linkOverride: pub('04').link,
  },
];

export default function Home({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  const time = useDhakaTime();
  const reel = SHOWREEL_IDS.map((id) => PROJECTS.find((p) => p.id === id)!).filter(Boolean);

  return (
    <div className="page">
      <div className="wrap">
        {/* Introduction */}
        <section className="hero">
          <div>
            <h1 className="display reveal">
              Md Sifatullah
              <br />
              Sheikh
            </h1>
            <p className="lede reveal d1">
              I work on computer vision and trustworthy machine learning. So far that has meant a deepfake detector that
              shows the evidence behind each prediction
              <Cite n={1} target="ref-1" />
              <Cite n={2} target="ref-2" /> and a leaf image dataset of medicinal plants from Bangladesh
              <Cite n={3} target="ref-3" />. Next, I want to work on the safety of models that act in the world, such as
              vision-language-action models for robots.
            </p>
            <p className="small reveal d2" style={{ marginTop: 18 }}>
              I'm applying for PhD programs starting in Fall 2027.
            </p>
            <div className="btn-row reveal d3">
              <a className="btn" href="#/research">
                Research and publications
              </a>
              <a className="btn ghost" href="#/projects">
                Projects
              </a>
              <a className="btn ghost" href={PROFILE.cv} target="_blank" rel="noreferrer">
                CV <Download aria-hidden />
              </a>
            </div>
          </div>

          <aside className="hero-side reveal d2">
            <img className="hero-photo" src={PROFILE.photo} alt="Portrait of Md Sifatullah Sheikh" width={300} height={375} />
            <dl className="facts">
              <div>
                <dt>Now</dt>
                <dd>
                  {PROFILE.role}, {PROFILE.employer}
                </dd>
              </div>
              <div>
                <dt>Studied</dt>
                <dd>B.Sc. in CSE, East West University</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>
                  Dhaka, <span className="num muted">{time}</span>
                </dd>
              </div>
              <div>
                <dt>Elsewhere</dt>
                <dd style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px' }}>
                  {LINKS.filter((l) => l.label !== 'Email').map((l) => (
                    <a key={l.label} className="quiet-link" href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </section>

        {/* Films */}
        <Showreel projects={reel} onOpen={onSelectProject} />

        {/* Publications */}
        <section className="section">
          <SectionHead
            title="Publications"
            note={
              <>
                Full list, with citations, on the <a className="link" href="#/research">research page</a>.
              </>
            }
          />
          <ol className="refs">
            {REFS.map(({ n, p, venue, linkOverride }) => (
              <li className="ref" id={`ref-${n}`} key={n}>
                <span className="n">[{n}]</span>
                <div>
                  <h3 className="title">
                    {p.title}
                    {p.authors.startsWith('Md Sifatullah Sheikh') && <span className="tag-pill">First author</span>}
                  </h3>
                  <p className="authors">
                    <Authors list={p.authors} />
                  </p>
                  <p className="venue">{venue}</p>
                  <p className="note">{p.highlight}</p>
                  <div className="acts">
                    {(linkOverride || p.link) && (
                      <a className="link" href={linkOverride || p.link} target="_blank" rel="noreferrer">
                        {linkOverride ? 'Dataset' : 'Paper'}
                      </a>
                    )}
                    {n === 1 && (
                      <button className="text-btn link" onClick={() => onSelectProject(PROJECTS[0])}>
                        Watch the architecture film
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section className="section">
          <SectionHead
            title="Projects"
            note="Research work, my thesis, and products I've designed and built."
          />
          <div className="plist">
            {PROJECTS.map((p) => (
              <button key={p.id} className="pline" onClick={() => onSelectProject(p)}>
                <span>
                  <span className="t">{p.title}</span>
                  <span className="d">{p.description}</span>
                </span>
                <span className="small pline-tag">{p.tag}</span>
              </button>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <a className="link" href="#/projects">
              All projects, with films and details
            </a>
          </p>
        </section>

        {/* News */}
        <section className="section">
          <SectionHead title="Recently" />
          <div>
            {NEWS.slice(0, 4).map((n) => (
              <div className="dated" key={n.id}>
                <span className="when">{n.date}</span>
                <p className="what">
                  {n.content}{' '}
                  {n.link && (
                    <a className="link" href={n.link} target="_blank" rel="noreferrer">
                      {n.linkText ?? 'Link'}
                    </a>
                  )}
                </p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 20 }}>
            <a className="link" href="#/news">
              All news
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
