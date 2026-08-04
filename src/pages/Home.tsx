import { ArrowRight, GraduationCap, ChevronRight, Linkedin, Github, Mail, FileDown } from 'lucide-react';
import { PROJECTS, NEWS } from '../data/portfolioData';
import { getIcon } from '../components/ProjectModal';

// TODO: replace with your real profile photo.
// Put the image file in src/assets/ (e.g. src/assets/profile.jpg) and update the import below.
// import profilePhoto from '../assets/profile.jpg';

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mdsifatullahsheikh', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com/SifatSwapnil2022', icon: Github },
  // TODO: replace with your real Google Scholar profile URL
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=REPLACE_ME', icon: GraduationCap },
  { label: 'Email', href: 'mailto:mdsifatullahsheikh@gmail.com', icon: Mail },
];

// FIXED: was "D:/My-Portfolio/files/CV_Sifat_Sheikh.pdf" — a local drive path.
// Browsers cannot resolve D:/ paths; this would 404 for every visitor,
// including you outside this exact machine, and file:// access from an
// http(s):// page is blocked by browsers regardless.
// Must be root-relative, pointing at a file inside your project's public/
// folder, e.g. public/cv/CV_Sifat_Sheikh.pdf.
// NOTE: Navbar.tsx currently links its own CV button to /resume.pdf — make
// sure both files point at the same path, or one "Download CV" button 404s.
const CV_PATH = '/cv/CV_Sifat_Sheikh.pdf';

const CORAL = '#FF5A3C';
const AMBER = '#FFC94A';
const TEAL  = '#0F6E63';
const INK   = '#16192B';
const PAPER = '#FAFAF7';

const RESEARCH_INTERESTS = [
  'Machine learning systems & AI-enabled autonomy',
  'Computer vision & multimodal AI',
  'Robotics & multi-agent systems',
  'Trustworthy, interpretable AI for real-world decision-making',
];

export default function Home() {
  const latestNews = NEWS.slice(0, 2);
  const featuredProject = PROJECTS[0];

  return (
    <div className="space-y-24 py-12" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
        .dsp { font-family: 'Space Grotesk', sans-serif; }
      `}</style>

      {/* Hero */}
      <section
        className="rounded-[2.5rem] p-8 md:p-16"
        style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
      >
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text column */}
          <div className="lg:col-span-3 space-y-7">
            <span
              className="inline-flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full"
              style={{ backgroundColor: `${CORAL}14`, color: CORAL }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CORAL }} />
              Prospective PhD candidate
            </span>

            <h1 className="dsp text-4xl md:text-6xl font-bold leading-[1.05]" style={{ color: INK }}>
              Md Sifatullah <span style={{ color: CORAL }}>Sheikh</span>
            </h1>

            <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: `${INK}66` }}>
              Computer Science &amp; Engineering graduate · East West University
            </p>

            {/* Grounded summary — what I do, what problems it addresses, and the direction I'm headed */}
            <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: `${INK}99` }}>
              I am a computer science graduate with a year of research experience in machine learning
              and deep learning, working on computer vision, multimodal AI, and trustworthy AI. My
              past research has applied these methods to real problems in healthcare and biodiversity —
              detecting manipulated media and identifying medicinal plants from images. I am now looking
              to extend this work toward machine learning systems, AI-enabled autonomy, and multi-agent
              systems, with the long-term goal of building AI that can make decisions safely and
              reliably in real environments, and explain those decisions to the people who rely on them.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#/research"
                className="px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center gap-2 transition-colors duration-200 shadow-sm group"
                style={{ backgroundColor: INK, color: '#fff' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                Publications &amp; patents
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#/about"
                className="px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-colors duration-200"
                style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = INK; }}
              >
                Academic background
              </a>
              <a
                href="public/files/CV_Sifat_Sheikh.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase flex items-center gap-2 transition-colors duration-200"
                style={{ backgroundColor: '#fff', border: `1px solid ${INK}1F`, color: INK }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1F`; e.currentTarget.style.color = INK; }}
              >
                <FileDown className="w-4 h-4" /> Download CV
              </a>
            </div>

            {/* Social / contact row */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors duration-200"
                  style={{ backgroundColor: '#fff', border: `1px solid ${INK}1A`, color: `${INK}99` }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = CORAL; e.currentTarget.style.color = CORAL; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${INK}1A`; e.currentTarget.style.color = `${INK}99`; }}
                >
                  <Icon className="w-4 h-4" /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Photo column */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div
                className="absolute inset-0 rounded-[2.5rem]"
                style={{ border: `2px solid ${CORAL}33` }}
              />
              <div
                className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-lg flex items-center justify-center"
                style={{ backgroundColor: INK, border: `1px solid ${INK}0D` }}
              >
                {/* FIXED: was "D:\My-Portfolio\files\profile.png" — a local
                    drive path using backslashes, which aren't valid URL path
                    separators at all. Even setting the drive-letter problem
                    aside, this string could never resolve as a URL. Must be
                    root-relative, pointing at a file inside public/, e.g.
                    public/profile.png. Swap the src below for your imported
                    photo once it's in place, e.g. src={profilePhoto}. */}
                <img
                  src="/files/profile.png"
                  alt="Md Sifatullah Sheikh"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div
                  className="dsp hidden absolute inset-0 items-center justify-center text-5xl font-bold"
                  style={{ color: AMBER }}
                >
                  SS
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Publication — framed around the problem and why it matters, not just the metrics */}
      <section className="grid lg:grid-cols-5 gap-12 items-start">
        <div className="lg:col-span-3 space-y-5">
          <div className="text-[11px] font-bold tracking-widest uppercase" style={{ color: CORAL }}>
            Featured publication
          </div>
          <h2 className="dsp text-2xl md:text-3xl font-bold leading-tight" style={{ color: INK }}>
            DeFaX: a cross-attention framework for explainable deepfake detection
          </h2>
          <p className="text-sm font-semibold" style={{ color: `${INK}66` }}>
            IEEE Access (SCI, Q1 journal), 2025
          </p>
          {/* Framework diagram */}
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: `${INK}0D`, border: `1px solid ${INK}0D` }}
    >
      <img
        src="/files/framework.png"
        alt="DeFaX architecture: Swin Transformer and EfficientNet fused via cross-attention, with Grad-CAM/LIME explainability output"
        className="w-full h-auto object-cover"
        referrerPolicy="no-referrer"
      />
    </div>


          <div
            className="p-5 rounded-xl text-sm leading-relaxed space-y-3"
            style={{ backgroundColor: PAPER, borderLeft: `3px solid ${AMBER}`, color: `${INK}B3` }}
          >
            <p>
              <span className="font-bold" style={{ color: '#8A6300' }}>The problem: </span>
              manipulated video and image content is increasingly hard to tell apart from real
              footage, and misuse — disinformation, fraud, non-consensual imagery — has real costs
              for the people it targets. Detection tools that can't explain their reasoning are hard
              to trust or audit in practice.
            </p>
            <p>
              <span className="font-bold" style={{ color: '#8A6300' }}>The approach: </span>
              DeFaX combines two vision architectures (Swin Transformer and EfficientNet) through a
              cross-attention fusion mechanism, and pairs the detector with Grad-CAM and LIME so a
              reviewer can see which regions of a face the model flagged as manipulated, not just a
              yes/no score.
            </p>
          </div>

          <a
            href="https://ieeexplore.ieee.org/abstract/document/11303744"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold transition-colors duration-200"
            style={{ color: CORAL }}
          >
            Read the full paper on IEEE Xplore <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div
          className="lg:col-span-2 rounded-3xl p-8 space-y-6 flex flex-col justify-between h-full"
          style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
        >
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: `${INK}50` }}>
              Where I want to take this
            </div>
            <h3 className="dsp text-lg font-bold mb-4" style={{ color: INK }}>PhD research interests</h3>
            <ul className="space-y-3">
              {RESEARCH_INTERESTS.map((area) => (
                <li key={area} className="flex items-start gap-2.5 text-sm" style={{ color: `${INK}99` }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: TEAL }} />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
          <a
            href="#/research"
            className="w-full text-center py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors duration-200"
            style={{ backgroundColor: INK, color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
          >
            All publications
          </a>
        </div>
      </section>

      {/* Featured Project */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color: CORAL }}>
              Selected work
            </div>
            <h2 className="dsp text-2xl md:text-3xl font-bold" style={{ color: INK }}>Featured project</h2>
          </div>
          <a
            href="#/projects"
            className="text-xs font-bold transition-colors duration-200 flex items-center gap-1"
            style={{ color: CORAL }}
          >
            All projects <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center transition-shadow duration-300 hover:shadow-md"
          style={{ backgroundColor: '#fff', border: `1px solid ${INK}0D` }}
        >
          <div
            className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shrink-0"
            style={{ backgroundColor: `${INK}0D` }}
          >
            <img
              src={featuredProject.image}
              alt={featuredProject.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: CORAL }}>
              {getIcon(featuredProject.iconName)} {featuredProject.tag}
            </div>
            <h3 className="dsp text-xl md:text-2xl font-bold" style={{ color: INK }}>{featuredProject.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: `${INK}99` }}>
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {featuredProject.tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-[10px] font-bold px-2.5 py-1 rounded"
                  style={{ backgroundColor: PAPER, border: `1px solid ${INK}14`, color: `${INK}80` }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <a
                href="#/projects"
                className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors duration-200"
                style={{ backgroundColor: INK, color: '#fff' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CORAL)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = INK)}
              >
                View project details
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section
        className="rounded-[2rem] p-8 md:p-12 space-y-6"
        style={{ backgroundColor: PAPER, border: `1px solid ${INK}0D` }}
      >
        <div className="flex justify-between items-end">
          <div>
            <div className="text-[11px] font-bold tracking-widest uppercase mb-1" style={{ color: CORAL }}>
              Timeline
            </div>
            <h3 className="dsp text-xl md:text-2xl font-bold" style={{ color: INK }}>Recent updates</h3>
          </div>
          <a
            href="#/news"
            className="text-xs font-bold transition-colors duration-200 flex items-center gap-1"
            style={{ color: CORAL }}
          >
            Full timeline <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="space-y-6">
          {latestNews.map((item) => (
            <div
              key={item.id}
              className="pl-5 py-1 transition-colors duration-200"
              style={{ borderLeft: `2px solid ${AMBER}` }}
            >
              <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: `${INK}55` }}>
                {item.date}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: `${INK}99` }}>{item.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}