import { useMemo, useState } from 'react';
import { NEWS } from '../data/portfolioData';
import { NewsItem } from '../types';
import { PageIntro } from '../components/ui';

type Cat = NonNullable<NewsItem['category']>;
const CATS: { id: Cat | 'all'; label: string }[] = [
  { id: 'all', label: 'Everything' },
  { id: 'Publication', label: 'Publications' },
  { id: 'Career', label: 'Work' },
  { id: 'Academic', label: 'Study' },
  { id: 'Event', label: 'Talks' },
  { id: 'Award', label: 'Awards' },
];

export default function News() {
  const [cat, setCat] = useState<Cat | 'all'>('all');
  const items = useMemo(() => (cat === 'all' ? NEWS : NEWS.filter((n) => n.category === cat)), [cat]);
  const year = (d: string) => d.split(' ').pop();
  let lastYear = '';

  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="News">Papers, talks, jobs and the occasional award, newest first.</PageIntro>

        <div className="chips" role="group" aria-label="Filter news" style={{ marginBottom: 32 }}>
          {CATS.filter((c) => c.id === 'all' || NEWS.some((n) => n.category === c.id)).map((c) => (
            <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <div>
          {items.map((n) => {
            const y = year(n.date)!;
            const showYear = y !== lastYear;
            lastYear = y;
            return (
              <div key={n.id}>
                {showYear && (
                  <h2 className="h3 num" style={{ margin: '36px 0 4px' }}>
                    {y}
                  </h2>
                )}
                <article className="dated">
                  <span className="when">{n.date.replace(` ${y}`, '')}</span>
                  <div className="news-body">
                    <div>
                      <h3 className="h4" style={{ fontWeight: 500 }}>
                        {n.content}
                      </h3>
                      {n.longContent && (
                        <p className="prose" style={{ fontSize: '1.02rem', marginTop: 8 }}>
                          {n.longContent}
                        </p>
                      )}
                      {n.link && (
                        <p style={{ marginTop: 10 }}>
                          <a className="link small" href={n.link} target="_blank" rel="noreferrer">
                            {n.linkText ?? 'Link'}
                          </a>
                        </p>
                      )}
                    </div>
                    {n.image && <img className="thumb" src={n.image} alt="" loading="lazy" />}
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
