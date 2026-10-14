import { Fragment, ReactNode } from 'react';
import { LINKS, NEWS, PROFILE, PROJECTS, PUBLICATIONS } from '../data/portfolioData';
import { Project } from '../types';
import ProjectMedia from '../components/ProjectMedia';
import { Authors, Person } from '../components/ui';

const pub = (id: string) => PUBLICATIONS.find((p) => p.id === id)!;
const proj = (id: string) => PROJECTS.find((p) => p.id === id)!;

const INTERESTS = [
  {
    title: 'Trustworthy and explainable AI',
    text: 'Models that show why they made a decision, so people can check it instead of just trusting it. In DeFaX we used Grad-CAM and LIME heatmaps for this.',
  },
  {
    title: 'Safety of vision-language-action models',
    text: 'What I want to work on next. Robots are starting to use VLA models to decide what to do. I want to study when these models break, for example with tricky inputs or in new places, and how to make them safer.',
    current: true,
  },
  {
    title: 'Computer vision',
    text: 'Most of my work so far: spotting AI-generated faces, and identifying medicinal plants from leaf photos.',
  },
  {
    title: 'Testing models properly',
    text: 'Checking that a model still works on new data and on noisy or blurry images, not only on the data it was trained on.',
  },
  {
    title: 'Human–computer interaction',
    text: 'Whether people can understand and use what a model or a map shows them. With Cholo Puran Dhaka, I want to find out if a 3D street view helps visitors find their way better than a flat map.',
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
  const products = ['cholo-puran-dhaka', 'unun', 'kona', 'bazario'].map(proj);

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
                At university I worked as a research assistant on deepfake detection with <Person name="Md Al-Imran" /> and{' '}
                <Person name="Shamim Ripon" />, and did my thesis on identifying medicinal plants from leaf images with{' '}
                <Person name="Md Nawab Yousuf Ali" />.
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
              All publications
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
              We joined a Swin Transformer and an EfficientNet with cross-attention. Grad-CAM and LIME heatmaps show which
              parts of the face each prediction looked at, so a person can check it.
            </p>
          </Entry>

          <Entry media={<ProjectMedia project={proj('vfdnet')} />} title={pub('03').title} href={pub('03').link}>
            <p className="ac-authors">
              <Authors list={pub('03').authors} />
            </p>
            <p className="ac-venue">IEEE IBDAP 2025, Thailand. Oral presentation</p>
            <Links
              items={[
                { label: 'paper', href: pub('03').link },
                { label: 'code', href: proj('vfdnet').github },
                { label: 'details', onClick: open('vfdnet') },
              ]}
            />
            <p className="ac-desc">
              We compared three CNNs and a Vision Transformer on telling real faces from GAN-made ones, and looked at what
              each type of model notices in a face.
            </p>
          </Entry>

          <Entry media={<Still src="/files/datasets_13.png" alt="Sample leaves from the dataset" contain />} title={pub('02').title}>
            <p className="ac-authors">
              <Authors list={pub('02').authors} />
            </p>
            <p className="ac-venue">Data paper under review at Scientific Data. Dataset on Mendeley Data, 2026</p>
            <Links items={[{ label: 'dataset', href: pub('04').link }]} />
            <p className="ac-desc">
              Leaf photos of 13 medicinal plant species that we collected in Bangladesh. Anyone can download them. My
              thesis, MediLeafNET, is built on this data.
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

          <Entry media={<ProjectMedia project={medileaf} />} title="MediLeafNET" href={medileaf.github}>
            <p className="ac-venue">Undergraduate thesis, East West University</p>
            <Links
              items={[
                { label: 'code', href: medileaf.github },
                { label: 'thesis', href: medileaf.extraLinks?.[0]?.href },
                { label: 'dataset', href: medileaf.paperLink },
                { label: 'details', onClick: open('medileaf') },
              ]}
            />
            <p className="ac-desc">
              A Vision Transformer identifies the plant from a photo of one leaf. If it is sure enough, a text model writes
              a short note on what the plant is used for, what it contains and its side effects. It covers 11 species
              from Bangladesh.
            </p>
            <p className="stack-tags">
              {medileaf.tech.slice(0, 5).map((t) => (
                <code key={t}>{t}</code>
              ))}
            </p>
          </Entry>

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
