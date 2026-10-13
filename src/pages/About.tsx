import { AWARDS, COURSEWORK, EDUCATION, EXTRA_ACTIVITIES, HOBBIES, LANGUAGES, PROFILE, SKILL_GROUPS } from '../data/portfolioData';
import { PageIntro, SectionHead } from '../components/ui';

export default function About() {
  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="About">
          I studied Computer Science and Engineering at East West University and now work on machine learning at a
          company in Dhaka. My research so far has been on deepfake detection and medicinal plant identification. Next, I
          want to work on robotics and on making AI systems more reliable.
        </PageIntro>

        <section>
          <SectionHead title="Education" />
          <div>
            {EDUCATION.map((e) => (
              <div className="dated" key={e.id}>
                <span className="when">{e.date}</span>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <img className="logo-sq" src={e.logo} alt="" loading="lazy" />
                  <div>
                    <h3 className="h4">{e.credential}</h3>
                    <p className="small" style={{ margin: '2px 0 0' }}>
                      {e.institution}, {e.location}
                    </p>
                    {e.details && (
                      <p className="prose" style={{ fontSize: '1rem', margin: '8px 0 0' }}>
                        {e.details}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <SectionHead title="Skills" note="The tools I use most, grouped roughly by where they show up in my work." />
          <dl className="defs">
            {SKILL_GROUPS.map((g) => (
              <div key={g.title}>
                <dt>{g.title}</dt>
                <dd style={{ fontFamily: 'var(--sans)' }}>{g.skills.join(', ')}</dd>
              </div>
            ))}
            <div>
              <dt>Coursework</dt>
              <dd style={{ fontFamily: 'var(--sans)' }}>{COURSEWORK.join(', ')}</dd>
            </div>
          </dl>
        </section>

        <section className="section">
          <SectionHead title="Teaching, clubs and volunteering" note="What I did alongside coursework at university." />
          <div>
            {EXTRA_ACTIVITIES.map((a) => (
              <div className="dated" key={a.id}>
                <span className="when">{a.period}</span>
                <div>
                  <h3 className="h4">{a.role}</h3>
                  <p className="small" style={{ margin: '2px 0 10px' }}>
                    {a.organization}
                  </p>
                  <ul className="feat">
                    {(a.bullets ?? [a.description]).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="cols-2">
            <div>
              <SectionHead title="Recognition" />
              <dl className="defs">
                {AWARDS.map((a) => (
                  <div key={a.title} style={{ gridTemplateColumns: '1fr' }}>
                    <dt>{a.title}</dt>
                    <dd>{a.sub}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <SectionHead title="Outside work" />
              <dl className="defs">
                {HOBBIES.map((h) => (
                  <div key={h.name} style={{ gridTemplateColumns: '1fr' }}>
                    <dt>{h.name}</dt>
                    <dd>{h.description}</dd>
                  </div>
                ))}
                <div style={{ gridTemplateColumns: '1fr' }}>
                  <dt>Languages</dt>
                  <dd>{LANGUAGES.map((l) => `${l.label} (${l.level})`).join(', ')}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <p className="section small">
          The full record is in my <a className="link" href={PROFILE.cv} target="_blank" rel="noreferrer">CV</a>.
        </p>
      </div>
    </div>
  );
}
