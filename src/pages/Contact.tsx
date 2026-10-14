import { FormEvent, useState } from 'react';
import { FORMSPREE_ENDPOINT, LINKS, PROFILE } from '../data/portfolioData';
import { copyText, PageIntro, useDhakaTime } from '../components/ui';

type State = { kind: 'idle' | 'sending' | 'ok' | 'err'; msg?: string };

export default function Contact() {
  const time = useDhakaTime();
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [copied, setCopied] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get('_gotcha')) return;
    setState({ kind: 'sending' });
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState({ kind: 'ok', msg: "Message sent. I'll reply by email." });
    } catch {
      setState({ kind: 'err', msg: `The message didn't send. Check your connection and try again, or email me at ${PROFILE.email}.` });
    }
  }

  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="Contact">
          For research, a PhD position, or a project, email is the quickest way to reach me. The form below goes to the
          same inbox.
        </PageIntro>

        <div className="cols-2">
          <div>
            <p style={{ margin: 0 }}>
              <a className="h2" href={`mailto:${PROFILE.email}`} style={{ textDecoration: 'none', wordBreak: 'break-all' }}>
                {PROFILE.email}
              </a>
            </p>
            <p style={{ marginTop: 12 }}>
              <button
                className="text-btn link small"
                onClick={() =>
                  copyText(PROFILE.email).then(() => {
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 1800);
                  })
                }
              >
                {copied ? 'Email copied' : 'Copy email'}
              </button>
            </p>

            <dl className="defs" style={{ marginTop: 40 }}>
              {LINKS.filter((l) => l.label !== 'Email').map((l) => (
                <div key={l.label}>
                  <dt>{l.label}</dt>
                  <dd style={{ fontFamily: 'var(--sans)' }}>
                    <a className="link" href={l.href} target="_blank" rel="noreferrer">
                      {l.handle}
                    </a>
                  </dd>
                </div>
              ))}
              <div>
                <dt>Location</dt>
                <dd style={{ fontFamily: 'var(--sans)' }}>
                  {PROFILE.location}. It's <span className="num">{time}</span> here (UTC+6).
                </dd>
              </div>
            </dl>
          </div>

          <form onSubmit={submit} style={{ display: 'grid', gap: 18 }} aria-describedby="form-status">
            <h2 className="h3">Send a message</h2>
            <div className="field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" name="name" required autoComplete="name" />
            </div>
            <div className="field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="field">
              <label htmlFor="c-subject">Subject (optional)</label>
              <input id="c-subject" name="subject" />
            </div>
            <div className="field">
              <label htmlFor="c-msg">Message</label>
              <textarea id="c-msg" name="message" required maxLength={1600} />
            </div>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: -9999 }} aria-hidden />
            <div>
              <button className="btn" type="submit" disabled={state.kind === 'sending'}>
                {state.kind === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p id="form-status" className={`status ${state.kind === 'err' ? 'err' : state.kind === 'ok' ? 'ok' : ''}`} role="status">
                {state.msg}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
