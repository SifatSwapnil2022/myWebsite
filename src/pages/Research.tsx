import { useState } from 'react';
import { PROJECTS, PUBLICATIONS, RESEARCH_INTERESTS, SCHOLAR, LINKS } from '../data/portfolioData';
import { Project, Publication } from '../types';
import ProjectMedia from '../components/ProjectMedia';
import { Authors, copyText, PageIntro, SectionHead } from '../components/ui';

const GROUPS: { type: Publication['venueType']; title: string }[] = [
  { type: 'journal', title: 'Journal articles' },
  { type: 'conference', title: 'Conference papers' },
  { type: 'dataset', title: 'Datasets' },
];

function citation(p: Publication) {
  return `${p.authors}. "${p.title}." ${p.venue}, ${p.year}.${p.link ? ` ${p.link}` : ''}`;
}

function CopyCite({ p }: { p: Publication }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="text-btn link"
      onClick={() =>
        copyText(citation(p)).then(() => {
          setDone(true);
          window.setTimeout(() => setDone(false), 1800);
        })
      }
    >
      {done ? 'Citation copied' : 'Copy citation'}
    </button>
  );
}

export default function Research({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  const defax = PROJECTS.find((p) => p.id === 'defax')!;
  const scholar = LINKS.find((l) => l.label === 'Google Scholar')!;
  let n = 0;

  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="Research">
          My published work is on deepfake detection that explains itself, and on a dataset of medicinal plant leaves
          from Bangladesh. I'm now moving toward the safety and robustness of models that act, such as
          vision-language-action models.
        </PageIntro>

        <div className="stat-row" style={{ maxWidth: 640 }}>
          <div>
            <b>{SCHOLAR.citations}</b>
            <span>Citations</span>
          </div>
          <div>
            <b>{SCHOLAR.hIndex}</b>
            <span>h-index</span>
          </div>
          <div>
            <b>{SCHOLAR.i10Index}</b>
            <span>i10-index</span>
          </div>
        </div>
        <p className="xs" style={{ marginTop: 10 }}>
          From <a className="link" href={scholar.href} target="_blank" rel="noreferrer">Google Scholar</a>, copied by hand
          in {SCHOLAR.updated}.
        </p>

        {/* Featured */}
        <section className="section">
          <SectionHead title="DeFaX, in 24 seconds" note="How the two backbones and the cross-attention fit together, as drawn in the paper." />
          <div className="prow" style={{ borderTop: 0, paddingTop: 0 }}>
            <ProjectMedia project={defax} />
            <div className="pbody">
              <p className="meta">IEEE Access, 2025. Second author</p>
              <h3 className="h3" style={{ marginBottom: 12 }}>
                A cross-attention fusion framework for robust and explainable deepfake detection
              </h3>
              <div className="prose" style={{ fontSize: '1.04rem' }}>
                <p>{defax.longDescription}</p>
              </div>
              <div className="acts">
                <a className="btn" href={defax.paperLink} target="_blank" rel="noreferrer">
                  Read the paper
                </a>
                <button className="btn ghost" onClick={() => onSelectProject(defax)}>
                  Details
                </button>
                <a className="btn ghost" href={defax.github} target="_blank" rel="noreferrer">
                  Code
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Publications */}
        {GROUPS.map((g) => {
          const items = PUBLICATIONS.filter((p) => p.venueType === g.type);
          if (!items.length) return null;
          return (
            <section className="section" key={g.type}>
              <SectionHead title={g.title} />
              <ol className="refs">
                {items.map((p) => {
                  n += 1;
                  return (
                    <li className="ref" key={p.id}>
                      <span className="n">[{n}]</span>
                      <div>
                        <h3 className="title">
                          {p.title}
                          {p.authors.startsWith('Md Sifatullah Sheikh') && <span className="tag-pill">First author</span>}
                        </h3>
                        <p className="authors">
                          <Authors list={p.authors} />
                        </p>
                        <p className="venue">
                          {p.venue}, {p.year}
                        </p>
                        <p className="note">{p.highlight}</p>
                        <div className="acts">
                          {p.link && (
                            <a className="link" href={p.link} target="_blank" rel="noreferrer">
                              {g.type === 'dataset' ? 'Dataset' : 'Paper'}
                            </a>
                          )}
                          <CopyCite p={p} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}

        {/* Interests */}
        <section className="section">
          <SectionHead title="What I'm interested in" />
          <dl className="defs">
            {RESEARCH_INTERESTS.map((r) => (
              <div key={r.title}>
                <dt>{r.title}</dt>
                <dd>{r.desc}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
