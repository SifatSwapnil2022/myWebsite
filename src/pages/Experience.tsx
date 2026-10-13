import { EXPERIENCES, PROFILE } from '../data/portfolioData';
import { PageIntro } from '../components/ui';

export default function Experience() {
  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="Experience">
          A year as a research assistant, an internship in IT and operations, and my current role in machine learning.
        </PageIntro>

        <div>
          {EXPERIENCES.map((e) => (
            <article className="dated" key={e.id} style={{ paddingTop: 30, paddingBottom: 30 }}>
              <span className="when">{e.period}</span>
              <div>
                <h2 className="h3">{e.role}</h2>
                <p className="small" style={{ margin: '4px 0 16px' }}>
                  {e.company}, {e.location}
                </p>
                <ul className="feat prose" style={{ fontSize: '1.06rem' }}>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {e.supervisor && (
                  <p className="small" style={{ marginTop: 16 }}>
                    Supervised by{' '}
                    {e.supervisor.profileUrl ? (
                      <a className="link" href={e.supervisor.profileUrl} target="_blank" rel="noreferrer">
                        {e.supervisor.name}
                      </a>
                    ) : (
                      e.supervisor.name
                    )}
                    , {e.supervisor.title}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="section small">
          Dates and details are also in my <a className="link" href={PROFILE.cv} target="_blank" rel="noreferrer">CV</a>.
        </p>
      </div>
    </div>
  );
}
