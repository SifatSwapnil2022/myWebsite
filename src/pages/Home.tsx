import { Fragment, ReactNode } from 'react';
import { LINKS, NEWS, PROFILE, PROJECTS, PUBLICATIONS, RESEARCH_INTERESTS, asset } from '../data/portfolioData';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiGmail, SiGooglescholar, SiOrcid } from 'react-icons/si';
import { Project } from '../types';
import ProjectMedia from '../components/ProjectMedia';
import { Authors, Person } from '../components/ui';

const scholarHref = LINKS.find((l) => l.label === 'Google Scholar')!.href;
const ICONS = [
  { label: 'Email', href: `mailto:${PROFILE.email}`, Icon: SiGmail, color: '#EA4335' },
  { label: 'Google Scholar', href: scholarHref, Icon: SiGooglescholar, color: '#4285F4' },
  { label: 'ORCID', href: LINKS.find((l) => l.label === 'ORCID')!.href, Icon: SiOrcid, color: '#A6CE39' },
  { label: 'GitHub', href: LINKS.find((l) => l.label === 'GitHub')!.href, Icon: SiGithub, color: '#181717' },
  { label: 'LinkedIn', href: LINKS.find((l) => l.label === 'LinkedIn')!.href, Icon: FaLinkedin, color: '#0A66C2' },
];

const pub = (id: string) => PUBLICATIONS.find((p) => p.id === id)!;
const proj = (id: string) => PROJECTS.find((p) => p.id === id)!;

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
  const products = ['sentinel', 'chalan', 'cholo-puran-dhaka', 'dhaka-bus-war', 'unun', 'kona', 'bazario'].map(proj);

  return (
    <div className="page ac">
      <div className="ac-wrap">
        {/* Intro: photo and links on the left, details on the right */}
        <header className="ac-intro">
          <div className="ac-side">
            <img className="ac-photo" src={PROFILE.photo} alt="Md Sifatullah Sheikh" width={220} height={286} />
            <nav className="ac-icons" aria-label="Profiles">
              {ICONS.map(({ label, href, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  style={{ color }}
                >
                  <Icon aria-hidden />
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h1 className="ac-name">{PROFILE.name}</h1>
            <p className="ac-facts">
              {PROFILE.role}, {PROFILE.employer}
              <br />
              {PROFILE.degree}
              <br />
              E-mail: <a className="link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <br />
              <a className="link" href={PROFILE.cv} target="_blank" rel="noreferrer">CV (PDF)</a>
            </p>
            <p className="badge">
              <span className="dot" aria-hidden />
              Open to Fall 2027 PhD positions
            </p>

            <h2 className="ac-sub">Research interests</h2>
            <ul className="ac-interests">
              {RESEARCH_INTERESTS.map((r) => (
                <li key={r.title}>{r.title}</li>
              ))}
            </ul>

            <h2 className="ac-sub">Biography</h2>
            <div className="ac-bio">
              <p>
                I work at {PROFILE.employer} in Dhaka as a {PROFILE.role}, where I test machine learning models on
                real-world data. I completed my B.Sc. in Computer Science and Engineering at East West
                University.
              </p>
              <p>
                At university I was a research assistant with <Person name="Md Al-Imran" /> and{' '}
                <Person name="Shamim Ripon" />. We worked on detecting faces made by GANs, testing the detectors on
                compressed and noisy images, and using Grad-CAM and LIME to show why a model calls a face fake.
              </p>
              <p>
                For my thesis, supervised by <Person name="Md. Nawab Yousuf Ali" />, I built MediLeafNET. It identifies a
                medicinal plant from a photo of its leaf, then writes a short summary of the plant's uses and side
                effects from a knowledge base we put together.
              </p>
            </div>
          </div>
        </header>

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
              parts of the face each prediction relied on.
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

          <Entry media={<Still src={asset("files/datasets_13.png")} alt="Sample leaves from the dataset" contain />} title={pub('04').title}>
            <p className="ac-authors">
              <Authors list={pub('04').authors} />
            </p>
            <p className="ac-venue">Mendeley Data, Version 2, 2026</p>
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
            <p className="ac-venue">Undergraduate thesis, East West University. Multimodal learning, knowledge generation</p>
            <Links
              items={[
                { label: 'code', href: medileaf.github },
                { label: 'thesis', href: medileaf.extraLinks?.[0]?.href },
                { label: 'dataset', href: medileaf.paperLink },
                { label: 'details', onClick: open('medileaf') },
              ]}
            />
            <p className="ac-desc">
              A Vision Transformer identifies the plant from a leaf photo. If it is confident enough, a fine-tuned
              language model writes a short summary of the plant's medicinal uses, active compounds, clinical evidence
              and side effects, using a knowledge base we built for 11 species from Bangladesh.
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
