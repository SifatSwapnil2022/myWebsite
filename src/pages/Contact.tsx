import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  Sparkles,
  XCircle,
} from 'lucide-react';

const INK = '#141414';
const PAPER = '#F7F5EF';
const PAPER_2 = '#EFEAE1';
const WHITE = '#FFFFFF';
const MUTED = '#716F69';
const LINE = '#E3DED4';
const ACCENT = '#E5533D';
const AMBER = '#F0A54A';
const TEAL = '#1D7A70';
const BLUE = '#253A78';

const EMAIL = 'mdsifatullahsheikh@gmail.com';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdaygqjy';

const GOOGLE_MAPS_API_KEY = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

const MAP_SRC = GOOGLE_MAPS_API_KEY
  ? `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=Dhaka%2CBangladesh&zoom=11`
  : 'https://www.google.com/maps?q=Dhaka%2C%20Bangladesh&z=11&output=embed';

const CONTACT_LINKS = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: Mail,
    accent: ACCENT,
  },
  {
    label: 'LinkedIn',
    value: 'mdsifatullahsheikh',
    href: 'https://www.linkedin.com/in/mdsifatullahsheikh',
    icon: Linkedin,
    accent: BLUE,
  },
  {
    label: 'GitHub',
    value: 'SifatSwapnil2022',
    href: 'https://github.com/SifatSwapnil2022',
    icon: Github,
    accent: INK,
  },
  {
    label: 'Google Scholar',
    value: 'Sifatullah Sheikh',
    href: 'https://scholar.google.com/citations?view_op=list_works&hl=en&user=7m3g1cEAAAAJ',
    icon: GraduationCap,
    accent: TEAL,
  },
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
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
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.64,
        delay: reducedMotion ? 0 : delay / 1000,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div
      className="grid gap-5 border-b pb-6 md:grid-cols-12 md:items-end"
      style={{ borderColor: LINE }}
    >
      <div className="md:col-span-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-semibold tabular-nums"
            style={{
              backgroundColor: WHITE,
              border: `1px solid ${LINE}`,
              color: MUTED,
            }}
          >
            {number}
          </span>

          <span
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: MUTED }}
          >
            {eyebrow}
          </span>
        </div>
      </div>

      <div className="md:col-span-6">
        <h2 className="contact-section-title text-3xl font-semibold leading-[1.02] md:text-4xl">
          {title}
        </h2>
      </div>

      {description && (
        <div className="md:col-span-3">
          <p className="text-sm leading-6" style={{ color: MUTED }}>
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date())
      );
    };

    update();

    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return <>{time || '--:--'} UTC+6</>;
}

function CopyEmailButton({
  dark = false,
}: {
  dark?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="contact-mini-action inline-flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 text-xs font-semibold"
      style={{
        backgroundColor: dark ? 'rgba(255,255,255,.06)' : WHITE,
        border: dark
          ? '1px solid rgba(255,255,255,.11)'
          : `1px solid ${LINE}`,
        color: dark ? '#fff' : INK,
      }}
      aria-label="Copy email address"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy email'}
    </button>
  );
}

function ContactMap() {
  return (
    <div
      className="contact-map overflow-hidden rounded-[26px]"
      style={{
        backgroundColor: WHITE,
        border: `1px solid ${LINE}`,
        boxShadow: '0 22px 58px rgba(20,20,20,.06)',
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: 'clamp(300px, 35vw, 410px)' }}
      >
        <iframe
          title="Dhaka, Bangladesh — Google Maps"
          src={MAP_SRC}
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          style={{
            border: 0,
            display: 'block',
            width: '100%',
            height: '100%',
          }}
        />

        <div
          className="contact-map-badge pointer-events-none absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl px-4 py-3 sm:right-auto"
          style={{
            backgroundColor: 'rgba(255,255,255,.92)',
            border: '1px solid rgba(255,255,255,.76)',
            boxShadow: '0 12px 28px rgba(20,20,20,.10)',
            WebkitBackdropFilter: 'blur(12px)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: 'rgba(229,83,61,.09)',
              color: ACCENT,
            }}
          >
            <MapPin className="h-4 w-4" />
          </span>

          <div>
            <p
              className="text-[9px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              Based in
            </p>
            <p className="mt-0.5 text-sm font-semibold">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-2 divide-x"
        style={{
          borderTop: `1px solid ${LINE}`,
          borderColor: LINE,
        }}
      >
        <div className="p-4">
          <p
            className="text-[9px] uppercase tracking-[0.14em]"
            style={{ color: MUTED }}
          >
            Local time
          </p>
          <p className="mt-1.5 text-sm font-semibold">
            <LocalTime />
          </p>
        </div>

        <div className="p-4">
          <p
            className="text-[9px] uppercase tracking-[0.14em]"
            style={{ color: MUTED }}
          >
            Location
          </p>
          <p className="mt-1.5 text-sm font-semibold">Dhaka</p>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type,
  required,
  placeholder,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`contact-${name}`}
        className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: MUTED }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: ACCENT }}>
            *
          </span>
        )}
      </label>

      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="contact-input min-h-[50px] w-full rounded-xl px-4 text-sm outline-none"
        style={{
          backgroundColor: WHITE,
          border: `1px solid ${LINE}`,
          color: INK,
        }}
      />
    </div>
  );
}

export default function Contact() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');

  const [errorMessage, setErrorMessage] = useState('');

  const messageLength = formState.message.length;
  const messageLimit = 1600;

  const canSubmit =
    formState.name.trim().length > 0 &&
    formState.email.trim().length > 0 &&
    formState.message.trim().length > 0 &&
    submissionState !== 'sending';

  const contactCount = useMemo(() => CONTACT_LINKS.length, []);

  useEffect(() => {
    const node = heroRef.current;
    if (!node || reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty('--contact-x', `${x}%`);
      node.style.setProperty('--contact-y', `${y}%`);
    };

    node.addEventListener('pointermove', handlePointerMove);
    return () => node.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion]);

  const resetForm = () => {
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!canSubmit) return;

    setSubmissionState('sending');
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error('Unable to send your message right now.');
      }

      setSubmissionState('success');
      resetForm();
    } catch {
      setSubmissionState('error');
      setErrorMessage(
        'The form could not send the message. You can still reach me directly by email.'
      );
    }
  };

  return (
    <main
      className="contact-pro overflow-hidden"
      style={{
        color: INK,
        backgroundColor: PAPER,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .contact-page-width {
          width: min(1420px, calc(100% - 24px));
          margin-inline: auto;
        }

        .contact-display {
          letter-spacing: -0.062em;
        }

        .contact-section-title {
          letter-spacing: -0.045em;
        }

        .contact-hero {
          --contact-x: 78%;
          --contact-y: 18%;
        }

        .contact-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at var(--contact-x) var(--contact-y),
              rgba(229,83,61,.11),
              transparent 24%
            );
          opacity: .84;
        }

        .contact-grid {
          background-image:
            linear-gradient(rgba(20,20,20,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,20,.035) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,.92), transparent 96%);
        }

        .contact-channel-card {
          transition:
            transform .34s cubic-bezier(.2,.7,.2,1),
            box-shadow .34s ease,
            border-color .3s ease,
            background-color .3s ease;
        }

        .contact-channel-card:hover {
          transform: translateY(-4px);
          border-color: #D8D1C5;
          background-color: #fff;
          box-shadow: 0 18px 42px rgba(20,20,20,.07);
        }

        .contact-input,
        .contact-textarea {
          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            background-color .25s ease;
        }

        .contact-input:focus,
        .contact-textarea:focus {
          border-color: #CFC8BC !important;
          background-color: #fff !important;
          box-shadow: 0 10px 28px rgba(20,20,20,.055);
        }

        .contact-map iframe {
          filter: grayscale(1) saturate(.45) contrast(.93) brightness(1.04);
          transition:
            filter .6s ease,
            transform .75s cubic-bezier(.2,.7,.2,1);
        }

        .contact-map:hover iframe {
          filter: grayscale(.15) saturate(.82) contrast(.97) brightness(1);
          transform: scale(1.01);
        }

        .contact-dark-card {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .contact-dark-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(circle at 16% 18%, rgba(229,83,61,.18), transparent 28%),
            radial-gradient(circle at 86% 76%, rgba(29,122,112,.14), transparent 30%);
        }

        .contact-primary-button {
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
        }

        .contact-primary-button::after {
          content: "";
          position: absolute;
          inset: -40%;
          background: linear-gradient(
            120deg,
            transparent 38%,
            rgba(255,255,255,.18) 50%,
            transparent 62%
          );
          transform: translateX(-120%) rotate(8deg);
          transition: transform .72s cubic-bezier(.2,.7,.2,1);
        }

        .contact-primary-button:hover::after {
          transform: translateX(120%) rotate(8deg);
        }

        .contact-mini-action {
          -webkit-tap-highlight-color: transparent;
        }

        @supports not ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
          .contact-map-badge {
            background-color: rgba(255,255,255,.98) !important;
          }
        }

        @media (min-width: 640px) {
          .contact-page-width {
            width: min(1420px, calc(100% - 48px));
          }
        }

        @media (min-width: 1024px) {
          .contact-page-width {
            width: min(1420px, calc(100% - 64px));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-channel-card,
          .contact-input,
          .contact-textarea,
          .contact-map iframe,
          .contact-primary-button::after {
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ================================================================ */}
      {/* HERO                                                             */}
      {/* ================================================================ */}
      <section
        ref={heroRef}
        className="contact-hero relative overflow-hidden border-b"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F7F5EF 0%, #F1ECE3 100%)',
        }}
      >
        <div
          aria-hidden="true"
          className="contact-grid pointer-events-none absolute inset-0 opacity-70"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(29,122,112,.08)' }}
        />

        <div className="contact-page-width relative z-10 grid min-h-[650px] items-center gap-10 py-14 md:grid-cols-12 md:gap-10 md:py-20">
          <div className="md:col-span-7">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span
                  className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-[9px] font-semibold"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                    color: MUTED,
                  }}
                >
                  C
                </span>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.17em]"
                  style={{ color: MUTED }}
                >
                  Contact
                </span>
              </div>
            </Reveal>

            <Reveal delay={55}>
              <h1 className="contact-display max-w-[900px] text-[clamp(3.5rem,8.6vw,7.5rem)] font-semibold leading-[0.84]">
                Start a
                <br />
                conversation.
                <br />
                <span style={{ color: ACCENT }}>Keep it direct.</span>
              </h1>
            </Reveal>

            <Reveal delay={105}>
              <p
                className="mt-8 max-w-[650px] text-[15px] leading-7 sm:text-base sm:leading-8"
                style={{ color: MUTED }}
              >
                For research, professional, academic, or project-related
                inquiries, use the form or reach me directly through one of the
                channels below.
              </p>
            </Reveal>

            <Reveal delay={145}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="contact-primary-button group inline-flex min-h-[50px] items-center gap-2 rounded-2xl px-5 text-xs font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, #151515 0%, #2B2926 100%)',
                    color: '#fff',
                    boxShadow:
                      '0 12px 30px rgba(20,20,20,.14), inset 0 1px 0 rgba(255,255,255,.10)',
                  }}
                >
                  <Mail className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">Email me</span>
                  <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>

                <CopyEmailButton />
              </div>
            </Reveal>
          </div>

          <Reveal delay={115} className="md:col-span-5">
            <div
              className="contact-dark-card rounded-[28px] p-6 sm:p-8"
              style={{
                background:
                  'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                color: '#fff',
                boxShadow: '0 28px 75px rgba(20,20,20,.16)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,.40)' }}
                  >
                    Contact snapshot
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                    Reach me your way
                  </h2>
                </div>

                <MessageSquare className="h-5 w-5" style={{ color: AMBER }} />
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.055)',
                    border: '1px solid rgba(255,255,255,.10)',
                  }}
                >
                  <p className="text-2xl font-semibold tracking-[-0.04em]">
                    {contactCount}
                  </p>
                  <p
                    className="mt-1 text-[9px] uppercase tracking-[0.12em]"
                    style={{ color: 'rgba(255,255,255,.42)' }}
                  >
                    Contact channels
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    backgroundColor: 'rgba(255,255,255,.055)',
                    border: '1px solid rgba(255,255,255,.10)',
                  }}
                >
                  <p className="text-sm font-semibold">
                    <LocalTime />
                  </p>
                  <p
                    className="mt-1 text-[9px] uppercase tracking-[0.12em]"
                    style={{ color: 'rgba(255,255,255,.42)' }}
                  >
                    Dhaka local time
                  </p>
                </div>
              </div>

              <div
                className="mt-5 border-t pt-5"
                style={{ borderColor: 'rgba(255,255,255,.10)' }}
              >
                <div className="flex items-start gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: '#FF8C77' }}
                  />

                  <div>
                    <p className="text-sm font-semibold">Dhaka, Bangladesh</p>
                    <p
                      className="mt-1 text-xs leading-5"
                      style={{ color: 'rgba(255,255,255,.46)' }}
                    >
                      Primary location shown throughout the portfolio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* CONTACT CHANNELS                                                 */}
      {/* ================================================================ */}
      <section className="contact-page-width py-20 md:py-24">
        <Reveal>
          <SectionHeader
            number="01"
            eyebrow="Contact channels"
            title="Use whichever route is most convenient."
            description="Email, LinkedIn, GitHub, and Google Scholar are the main public contact points on this portfolio."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CONTACT_LINKS.map((link, index) => {
            const Icon = link.icon;

            return (
              <Reveal key={link.label} delay={index * 45}>
                <a
                  href={link.href}
                  target={
                    link.href.startsWith('mailto:')
                      ? undefined
                      : '_blank'
                  }
                  rel={
                    link.href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="contact-channel-card group flex min-h-[150px] flex-col justify-between rounded-[22px] p-5"
                  style={{
                    backgroundColor: WHITE,
                    border: `1px solid ${LINE}`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${link.accent}10`,
                        color: link.accent,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={{ color: MUTED }}
                    />
                  </div>

                  <div className="mt-6">
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                      style={{ color: MUTED }}
                    >
                      {link.label}
                    </p>

                    <p className="mt-2 truncate text-sm font-semibold">
                      {link.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ================================================================ */}
      {/* FORM + MAP                                                       */}
      {/* ================================================================ */}
      <section
        className="border-y py-20 md:py-28"
        style={{
          borderColor: LINE,
          background:
            'linear-gradient(180deg, #F1ECE3 0%, #F7F5EF 100%)',
        }}
      >
        <div className="contact-page-width">
          <Reveal>
            <SectionHeader
              number="02"
              eyebrow="Send a message"
              title="A proper contact form, not a dead-end card."
              description="Messages are submitted through your existing Formspree endpoint."
            />
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
            {/* form */}
            <Reveal>
              <div
                className="rounded-[28px] p-5 sm:p-7 md:p-8"
                style={{
                  backgroundColor: WHITE,
                  border: `1px solid ${LINE}`,
                  boxShadow: '0 22px 58px rgba(20,20,20,.055)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[9px] font-semibold uppercase tracking-[0.15em]"
                      style={{ color: MUTED }}
                    >
                      Contact form
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                      Send a message
                    </h3>
                  </div>

                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: 'rgba(229,83,61,.09)',
                      color: ACCENT,
                    }}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {submissionState === 'success' ? (
                    <motion.div
                      key="success"
                      initial={
                        reducedMotion
                          ? false
                          : { opacity: 0, scale: 0.98 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.28,
                      }}
                      className="py-12 text-center"
                    >
                      <span
                        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: 'rgba(29,122,112,.09)',
                          color: TEAL,
                        }}
                      >
                        <CheckCircle2 className="h-8 w-8" />
                      </span>

                      <h4 className="mt-5 text-2xl font-semibold">
                        Message sent
                      </h4>

                      <p
                        className="mx-auto mt-3 max-w-sm text-sm leading-7"
                        style={{ color: MUTED }}
                      >
                        Your message was submitted successfully.
                      </p>

                      <button
                        type="button"
                        onClick={() => setSubmissionState('idle')}
                        className="mt-6 inline-flex min-h-[44px] items-center rounded-xl px-4 text-xs font-semibold"
                        style={{
                          backgroundColor: INK,
                          color: '#fff',
                        }}
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={
                        reducedMotion
                          ? false
                          : { opacity: 0, y: 8 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: reducedMotion ? 0 : 0.25,
                      }}
                      className="mt-7 space-y-5"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          label="Name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formState.name}
                          autoComplete="name"
                          onChange={(value) =>
                            setFormState({
                              ...formState,
                              name: value,
                            })
                          }
                        />

                        <FormField
                          label="Email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formState.email}
                          autoComplete="email"
                          onChange={(value) =>
                            setFormState({
                              ...formState,
                              email: value,
                            })
                          }
                        />
                      </div>

                      <FormField
                        label="Subject"
                        name="subject"
                        type="text"
                        placeholder="What would you like to discuss?"
                        value={formState.subject}
                        onChange={(value) =>
                          setFormState({
                            ...formState,
                            subject: value,
                          })
                        }
                      />

                      <div>
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <label
                            htmlFor="contact-message"
                            className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                            style={{ color: MUTED }}
                          >
                            Message
                            <span className="ml-1" style={{ color: ACCENT }}>
                              *
                            </span>
                          </label>

                          <span
                            className="text-[9px] tabular-nums"
                            style={{
                              color:
                                messageLength > messageLimit
                                  ? ACCENT
                                  : MUTED,
                            }}
                          >
                            {messageLength}/{messageLimit}
                          </span>
                        </div>

                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={7}
                          maxLength={messageLimit}
                          placeholder="Write your message here…"
                          value={formState.message}
                          onChange={(event) =>
                            setFormState({
                              ...formState,
                              message: event.target.value,
                            })
                          }
                          className="contact-textarea w-full resize-y rounded-xl px-4 py-3 text-sm leading-6 outline-none"
                          style={{
                            minHeight: 170,
                            backgroundColor: WHITE,
                            border: `1px solid ${LINE}`,
                            color: INK,
                          }}
                        />
                      </div>

                      {submissionState === 'error' && (
                        <div
                          className="flex items-start gap-3 rounded-xl p-4"
                          style={{
                            backgroundColor: 'rgba(229,83,61,.07)',
                            border: '1px solid rgba(229,83,61,.14)',
                            color: ACCENT,
                          }}
                        >
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          <p className="text-xs leading-5">
                            {errorMessage}
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="contact-primary-button group flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl px-5 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                        style={{
                          background:
                            'linear-gradient(135deg, #151515 0%, #2B2926 100%)',
                          color: '#fff',
                        }}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {submissionState === 'sending' ? (
                            <>
                              <span
                                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                aria-hidden="true"
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </span>
                      </button>

                      <p
                        className="text-[10px] leading-5"
                        style={{ color: MUTED }}
                      >
                        Required fields are marked with an asterisk.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* map */}
            <Reveal delay={70}>
              <div className="space-y-5">
                <ContactMap />

                <div
                  className="contact-dark-card rounded-[26px] p-6 sm:p-7"
                  style={{
                    background:
                      'linear-gradient(145deg, #171717 0%, #25231F 100%)',
                    color: '#fff',
                    boxShadow: '0 22px 58px rgba(20,20,20,.12)',
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="text-[9px] font-semibold uppercase tracking-[0.16em]"
                        style={{ color: 'rgba(255,255,255,.40)' }}
                      >
                        Direct email
                      </p>

                      <h3 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                        Prefer email?
                      </h3>
                    </div>

                    <Sparkles className="h-4 w-4" style={{ color: AMBER }} />
                  </div>

                  <a
                    href={`mailto:${EMAIL}`}
                    className="group mt-6 flex min-h-[58px] items-center justify-between rounded-2xl px-4"
                    style={{
                      backgroundColor: '#fff',
                      color: INK,
                    }}
                  >
                    <span className="min-w-0">
                      <span
                        className="block text-[9px] font-semibold uppercase tracking-[0.13em]"
                        style={{ color: MUTED }}
                      >
                        Email
                      </span>

                      <span className="mt-1 block truncate text-sm font-semibold">
                        {EMAIL}
                      </span>
                    </span>

                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>

                  <div className="mt-3">
                    <CopyEmailButton dark />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* QUICK DIRECTORY                                                 */}
      {/* ================================================================ */}
      <section className="contact-page-width py-20 md:py-24">
        <Reveal>
          <SectionHeader
            number="03"
            eyebrow="Quick directory"
            title="Everything important in one place."
            description="Useful routes for someone exploring the portfolio after contacting you."
          />
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal>
            <a
              href="#/research"
              className="contact-channel-card group block rounded-[22px] p-5"
              style={{
                backgroundColor: WHITE,
                border: `1px solid ${LINE}`,
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: 'rgba(229,83,61,.09)',
                  color: ACCENT,
                }}
              >
                <GraduationCap className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-lg font-semibold">Research</h3>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: MUTED }}
              >
                Publications, datasets, citation tools, and Scholar links.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold">Open research</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          </Reveal>

          <Reveal delay={45}>
            <a
              href="#/projects"
              className="contact-channel-card group block rounded-[22px] p-5"
              style={{
                backgroundColor: WHITE,
                border: `1px solid ${LINE}`,
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: 'rgba(29,122,112,.09)',
                  color: TEAL,
                }}
              >
                <Sparkles className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-lg font-semibold">Projects</h3>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: MUTED }}
              >
                Selected machine learning and computer vision project work.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold">Open projects</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          </Reveal>

          <Reveal delay={90}>
            <a
              href="#/experience"
              className="contact-channel-card group block rounded-[22px] p-5"
              style={{
                backgroundColor: WHITE,
                border: `1px solid ${LINE}`,
              }}
            >
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: 'rgba(37,58,120,.09)',
                  color: BLUE,
                }}
              >
                <Clock3 className="h-5 w-5" />
              </span>

              <h3 className="mt-5 text-lg font-semibold">Experience</h3>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: MUTED }}
              >
                Research, industry, academic, and professional experience.
              </p>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold">Open experience</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/* END STRIP                                                       */}
      {/* ================================================================ */}
      <section
        className="border-t"
        style={{
          borderColor: LINE,
          backgroundColor: PAPER_2,
          paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="contact-page-width grid sm:grid-cols-3">
          <a
            href="#/news"
            className="group flex min-h-[76px] items-center justify-between px-4 sm:border-r"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Previous
              </span>
              <span className="mt-1 block text-sm font-semibold">
                News
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/about"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-r sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Explore
              </span>
              <span className="mt-1 block text-sm font-semibold">
                About
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          <a
            href="#/"
            className="group flex min-h-[76px] items-center justify-between border-t px-4 sm:border-t-0"
            style={{ borderColor: LINE }}
          >
            <span>
              <span
                className="block text-[9px] uppercase tracking-[0.13em]"
                style={{ color: MUTED }}
              >
                Return
              </span>
              <span className="mt-1 block text-sm font-semibold">
                Home
              </span>
            </span>

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </main>
  );
}
