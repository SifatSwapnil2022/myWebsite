import { useState } from 'react';
import { LINKS, PROFILE } from '../data/portfolioData';
import { copyText, useDhakaTime } from './ui';

const PAGES = [
  { href: '#/', label: 'Home' },
  { href: '#/about', label: 'About' },
  { href: '#/research', label: 'Research' },
  { href: '#/projects', label: 'Projects' },
  { href: '#/experience', label: 'Experience' },
  { href: '#/news', label: 'News' },
  { href: '#/contact', label: 'Contact' },
];

export default function Footer() {
  const time = useDhakaTime();
  const [copied, setCopied] = useState(false);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="top">
          <div>
            <p className="big">Get in touch</p>
            <a className="mail" href={`mailto:${PROFILE.email}`}>
              {PROFILE.email}
            </a>
            <button
              className="copy-btn"
              onClick={() =>
                copyText(PROFILE.email).then(() => {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1800);
                })
              }
            >
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <div className="cols">
            <div>
              <h3>Pages</h3>
              <ul>
                {PAGES.map((p) => (
                  <li key={p.href}>
                    <a href={p.href}>{p.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Elsewhere</h3>
              <ul>
                {LINKS.filter((l) => l.label !== 'Email').map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer">
                      {l.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={PROFILE.cv} target="_blank" rel="noreferrer">
                    CV (PDF)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span className="num">Dhaka, {time} local time</span>
        </div>
      </div>
    </footer>
  );
}
