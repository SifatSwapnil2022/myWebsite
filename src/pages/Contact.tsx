import { useEffect, useRef, useState, FormEvent } from 'react';
import { Mail, Linkedin, Github, GraduationCap, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

const LOGO_PALETTE = [CORAL, TEAL, INK, AMBER];

/* ─── Motion primitives (hooks + CSS only, no new dependencies) ─────────── */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const h = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', h);
    return () => mq.removeEventListener('change', h);
  }, []);
  return reduced;
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const shown = visible || reduced;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const CARD_HOVER = 'transition-all duration-300 hover:-translate-y-1 hover:shadow-md';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    try {
      const response = await fetch('https://formspree.io/f/xdaygqjy', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormState({ name: '', email: '', subject: '', message: '' });
        }, 4000);
      }
    } catch {
      // silently fail — no error UI in this version
    }
  };

  const LINKS = [
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'mdsifatullahsheikh@gmail.com', href: 'mailto:mdsifatullahsheikh@gmail.com' },
    { icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn', value: 'mdsifatullahsheikh', href: 'https://www.linkedin.com/in/mdsifatullahsheikh' },
    { icon: <Github className="w-5 h-5" />, label: 'GitHub', value: 'SifatSwapnil2022', href: 'https://github.com/SifatSwapnil2022' },
    { icon: <GraduationCap className="w-5 h-5" />, label: 'Google Scholar', value: 'Sifatullah Sheikh', href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ' },
  ];

  return (
    <div className="space-y-12 md:space-y-16 py-8 md:py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes driftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(18px, -14px) scale(1.05); }
        }
        @keyframes driftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-16px, 12px) scale(1.04); }
        }
      `}</style>

      {/* Header */}
      <section className="relative overflow-hidden rounded-4xl p-2">
        {/* Ambient drifting blobs — matches Home.tsx / About.tsx, disabled under reduced motion */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-14 -right-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[80px]"
          style={{
            backgroundColor: `${CORAL}0F`,
            animation: reducedMotion ? undefined : 'driftA 15s ease-in-out infinite',
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-10 w-56 h-56 md:w-72 md:h-72 rounded-full blur-[80px]"
          style={{
            backgroundColor: `${AMBER}0F`,
            animation: reducedMotion ? undefined : 'driftB 18s ease-in-out infinite',
          }}
        />

        <Reveal className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="block w-0.5 h-5 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${CORAL}, ${AMBER})` }}
            />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: CORAL }}>
              Connect
            </span>
          </div>
          <h1 className="dsp text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: INK }}>
            Let's start a <span style={{ color: CORAL }}>conversation</span>
          </h1>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mt-4" style={{ color: `${INK}80` }}>
            Whether you're an adviser reviewing applications, a researcher looking for a collaborator,
            or a fellow developer, my inbox is always open.
          </p>
        </Reveal>
      </section>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
        {/* Contact Links & Pitch */}
        <Reveal delay={80} className="space-y-8">
          <div className="space-y-4">
            <h2 className="dsp text-xl sm:text-2xl font-bold" style={{ color: INK }}>Prospective graduate opportunities</h2>
            <p className="text-sm leading-relaxed" style={{ color: `${INK}99` }}>
              I'm actively preparing applications for PhD and research assistant positions starting in
              upcoming cycles. I'm flexible on relocation and glad to walk through{' '}
              <strong style={{ color: INK }}>Trustworthy AI</strong> and{' '}
              <strong style={{ color: INK }}>Machine Learning</strong> in a lab interview.
            </p>
          </div>

          {/* Social and scholarly directories */}
          <div className="grid sm:grid-cols-2 gap-4">
            {LINKS.map((link, i) => {
              const accent = LOGO_PALETTE[i % LOGO_PALETTE.length];
              return (
                <Reveal key={link.label} delay={i * 60}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-5 rounded-2xl group ${CARD_HOVER}`}
                    style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}55`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}0D`; }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `${accent}14`, color: accent === AMBER ? '#8A6300' : accent }}
                    >
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: `${INK}50` }}>
                        {link.label}
                      </div>
                      <div className="font-semibold text-sm truncate" style={{ color: INK }}>
                        {link.value}
                      </div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </Reveal>

        {/* Interactive Contact Form Card */}
        <Reveal delay={140}>
          <div
            className={`rounded-4xl p-6 sm:p-8 md:p-10 ${CARD_HOVER}`}
            style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
          >
            {submitted ? (
              <div className="py-12 text-center space-y-4" style={{ animation: 'scaleUp 0.3s ease-out' }}>
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                  style={{ backgroundColor: `${TEAL}14` }}
                >
                  <CheckCircle2 className="w-8 h-8" style={{ color: TEAL }} />
                </div>
                <h3 className="dsp text-2xl font-bold" style={{ color: INK }}>Message sent</h3>
                <p className="text-sm max-w-sm mx-auto leading-relaxed" style={{ color: `${INK}80` }}>
                  Thanks for reaching out — I've received your message and will reply within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2 pb-3 mb-2" style={{ borderBottom: `1px solid ${INK}0D` }}>
                  <MessageSquare className="w-4 h-4" style={{ color: CORAL }} />
                  <span className="text-[11px] font-bold tracking-[0.15em] uppercase" style={{ color: `${INK}55` }}>
                    Send a message
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Name"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={formState.name}
                    onChange={(v) => setFormState({ ...formState, name: v })}
                  />
                  <FormField
                    label="Email"
                    type="email"
                    required
                    placeholder="name@institution.edu"
                    value={formState.email}
                    onChange={(v) => setFormState({ ...formState, email: v })}
                  />
                </div>

                <FormField
                  label="Subject"
                  type="text"
                  placeholder="PhD application / research collaboration"
                  value={formState.subject}
                  onChange={(v) => setFormState({ ...formState, subject: v })}
                />

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase ml-1" style={{ color: `${INK}55` }}>
                    Message
                  </label>
                  <textarea
                    required
                    placeholder="Your inquiry details or invitation copy..."
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 resize-none focus:shadow-sm"
                    style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = CORAL)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = `${INK}1F`)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:-translate-y-0.5 hover:shadow-md group"
                  style={{ backgroundColor: INK, color: '#fff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
                >
                  Send message
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function FormField({
  label,
  type,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold tracking-wider uppercase ml-1" style={{ color: '#16192B8C' }}>
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 focus:shadow-sm"
        style={{ backgroundColor: '#fff', border: '1px solid #16192B1F', color: '#16192B' }}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5A3C')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#16192B1F')}
      />
    </div>
  );
}