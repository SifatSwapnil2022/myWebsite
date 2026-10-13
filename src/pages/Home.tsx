import { Fragment, ReactNode } from 'react';
import { LINKS, NEWS, PROFILE, PROJECTS, PUBLICATIONS } from '../data/portfolioData';
import { Project } from '../types';
import ProjectMedia from '../components/ProjectMedia';
import { Authors } from '../components/ui';

const pub = (id: string) => PUBLICATIONS.find((p) => p.id === id)!;
const proj = (id: string) => PROJECTS.find((p) => p.id === id)!;

const INTERESTS = [
  {
    title: 'Trustworthy and explainable AI',
    text: 'Models that show the evidence behind a decision, so a person can check it. In DeFaX we used Grad-CAM and LIME for this.',
  },
  {
    title: 'Safety of vision-language-action models',
    text: 'Where I want to go next: how robot policies built on VLA models fail under adversarial inputs or new conditions, and how to make them fail less.',
    current: true,
  },
  {
    title: 'Computer vision',
    text: 'Detecting generated faces, and identifying medicinal plants from leaf images.',
  },
  {
    title: 'Robust evaluation',
    text: 'Results that hold up on new data: cross-dataset tests, corrupted inputs, ablations and statistical tests.',
  },
  {
    title: 'Human–computer interaction',
    text: 'Whether people can understand and use what a model or a map shows them. Cholo Puran Dhaka asks if a street-level 3D view helps people find their way.',
  },
];

type Link = { label: string; href?: string; onClick?: () => void };

function Links({ items }: { items: Link[] }) {
  const shown = items.filter((l) => l.href || l.onClick);
  return (
    <p className="ac-links">
      {shown.map((l, i) => (
        <Fragment key={l.label}>
          {i > 0 && <span className="sep"> / </span>}
          {l.href ? (
            <a
              className="link"
              href={l.href}
              target={l.href.startsWith('http') || l.href.endsWith('.pdf') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {l.label}
            </a>
          ) : (
            <button className="text-btn link" onClick={l.onClick}>
              {l.label}
            </button>
          )}
        </Fragment>
      ))}
    </p>
  );
}

function Entry({ media, title, href, children }: { media: ReactNode; title: string; href?: string; children: ReactNode }) {
  return (
    <article className="ac-entry">
      <div className="ac-thumb">{media}</div>
      <div className="ac-text">
        <h3 className="ac-title">
          {href ? (
            <a href={href} target="_blank" rel="noreferrer">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {children}
      </div>
    </article>
  );
}

function Still({ src, alt, contain }: { src: string; alt: string; contain?: boolean }) {
  return (
    <div className="pmedia">
      <img src={src} alt={alt} loading="lazy" className={contain ? 'contain' : undefined} />
    </div>
  );
}

export default function Home({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  const defax = proj('defax');
  const medileaf = proj('medileaf');
  const open = (id: string) => () => onSelectProject(proj(id));
  const products = ['cholo-puran-dhaka', 'unun', 'kona'].map(proj);

  return (
    <div className="page ac">
      <div className="ac-wrap">
        {/* Intro */}
        <header className="ac-intro">
          <div>
            <h1 className="ac-name reveal">{PROFILE.name}</h1>
            <p className="badge reveal d1">
              <span className="dot" aria-hidden />
              Open to Fall 2027 PhD positions
            </p>
            <div className="ac-bio reveal d2">
              <p>
                I'm an ML engineer intern at {PROFILE.employer} in Dhaka, where I test machine learning models on
                real-world data. I studied Computer Science and Engineering at East West University.
              </p>
              <p>
                At university I worked as a research assistant on deepfake detection with Md Al-Imran and Shamim Ripon,
                and did my thesis on identifying medicinal plants from leaf images with Md Nawab Yousuf Ali.
              </p>
            </div>
            <Links
              items={[
                { label: 'Email', href: `mailto:${PROFILE.email}` },
                { label: 'CV', href: PROFILE.cv },
                ...LINKS.filter((l) => l.label !== 'Email').map((l) => ({ label: l.label, href: l.href })),
              ]}
            />
          </div>
          <img className="ac-photo reveal d1" src={PROFILE.photo} alt="Md Sifatullah Sheikh" width={220} height={286} />
        </header>

        {/* Research interests */}
        <section className="ac-section" aria-labelledby="h-interests">
          <h2 className="ac-h" id="h-interests">
            Research interests
          </h2>
          <div className="interests">
            {INTERESTS.map((r) => (
              <div className={`interest${r.current ? ' current' : ''}`} key={r.title}>
                <h3>
                  {r.title}
                  {r.current && <span className="now">Next</span>}
                </h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="ac-section" aria-labelledby="h-pubs">
          <div className="ac-hrow">
            <h2 className="ac-h" id="h-pubs">
              Publications
            </h2>
            <a className="link small" href="#/research">
              All, with citations
            </a>
          </div>

          <Entry media={<ProjectMedia project={defax} />} title={pub('01').title} href={pub('01').link}>
            <p className="ac-authors">
              <Authors list={pub('01').authors} />
            </p>
            <p className="ac-venue">IEEE Access, vol. 13, 2025</p>
            <Links
              items={[
                { label: 'paper', href: pub('01').link },
                { label: 'code', href: defax.github },
                { label: 'details', onClick: open('defax') },
              ]}
            />
            <p className="ac-desc">
              A Swin Transformer and an EfficientNet joined by cross-attention, with Grad-CAM and LIME maps showing which
              face regions each prediction used. 99.80% accuracy on the 140K Real and Fake Faces test set.
            </p>
          </Entry>

          <Entry
            media={<Still src="/files/conference.png" alt="Vision Transformer pipeline from the paper" contain />}
            title={pub('03').title}
            href={pub('03').link}
          >
            <p className="ac-authors">
              <Authors list={pub('03').authors} />
            </p>
            <p className="ac-venue">IEEE IBDAP 2025, Thailand. Oral presentation</p>
            <Links items={[{ label: 'paper', href: pub('03').link }]} />
            <p className="ac-desc">
              Three CNNs and a Vision Transformer compared for deepfake detection. Our MobileNetV3-based VFDNET did best
              while staying small enough for limited hardware.
            </p>
          </Entry>

          <Entry media={<Still src="/files/datasets_13.png" alt="Sample leaves from the dataset" contain />} title={pub('02').title}>
            <p className="ac-authors">
              <Authors list={pub('02').authors} />
            </p>
            <p className="ac-venue">Data paper under review at Scientific Data. Dataset on Mendeley Data, 2026</p>
            <Links items={[{ label: 'dataset', href: pub('04').link }]} />
            <p className="ac-desc">
              Leaf images of 13 medicinal plant species collected in Bangladesh, free to download. It is the data behind
              my thesis, MediLeafNET.
            </p>
          </Entry>
        </section>

        {/* Projects */}
        <section className="ac-section" aria-labelledby="h-proj">
          <div className="ac-hrow">
            <h2 className="ac-h" id="h-proj">
              Projects
            </h2>
            <a className="link small" href="#/projects">
              All projects
            </a>
          </div>

          {products.map((p) => (
            <Entry key={p.id} media={<ProjectMedia project={p} />} title={p.title} href={p.website}>
              <p className="ac-venue">{p.role ? `${p.tag}. ${p.role}` : p.tag}</p>
              <Links
                items={[
                  { label: 'site', href: p.website },
                  { label: 'code', href: p.github },
                  { label: 'details', onClick: open(p.id) },
                ]}
              />
              <p className="ac-desc">{p.description}</p>
              <p className="stack-tags">
                {p.tech.slice(0, 6).map((t) => (
                  <code key={t}>{t}</code>
                ))}
              </p>
            </Entry>
          ))}

          <Entry media={<Still src={medileaf.image} alt="MediLeafNET overview" contain />} title="MediLeafNET" href={medileaf.github}>
            <p className="ac-venue">Undergraduate thesis, East West University</p>
            <Links
              items={[
                { label: 'code', href: medileaf.github },
                { label: 'details', onClick: open('medileaf') },
              ]}
            />
            <p className="ac-desc">{medileaf.description}</p>
            <p className="stack-tags">
              {medileaf.tech.slice(0, 5).map((t) => (
                <code key={t}>{t}</code>
              ))}
            </p>
          </Entry>
        </section>

        {/* News */}
        <section className="ac-section" aria-labelledby="h-news">
          <div className="ac-hrow">
            <h2 className="ac-h" id="h-news">
              News
            </h2>
            <a className="link small" href="#/news">
              All news
            </a>
          </div>
          <ul className="ac-news">
            {NEWS.slice(0, 6).map((n) => (
              <li key={n.id}>
                <span className="when">{n.date}</span>
                <span>
                  {n.content}{' '}
                  {n.link && (
                    <a className="link" href={n.link} target="_blank" rel="noreferrer">
                      {(n.linkText ?? 'link').toLowerCase()}
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
