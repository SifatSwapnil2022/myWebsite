import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { Project } from './types';

import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Research from './pages/Research';
import Projects from './pages/Projects';
import News from './pages/News';
import Contact from './pages/Contact';

const TITLES: Record<string, string> = {
  '#/': 'Md Sifatullah Sheikh',
  '#/about': 'About · Md Sifatullah Sheikh',
  '#/research': 'Research · Md Sifatullah Sheikh',
  '#/projects': 'Projects · Md Sifatullah Sheikh',
  '#/experience': 'Experience · Md Sifatullah Sheikh',
  '#/news': 'News · Md Sifatullah Sheikh',
  '#/contact': 'Contact · Md Sifatullah Sheikh',
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const onHash = () => {
      setCurrentPath(window.location.hash || '#/');
      setSelectedProject(null);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHash);
    if (!window.location.hash) window.location.hash = '#/';
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title = TITLES[currentPath] ?? TITLES['#/'];
  }, [currentPath]);

  const open = setSelectedProject;
  const close = useCallback(() => setSelectedProject(null), []);

  const page = () => {
    switch (currentPath) {
      case '#/about':
        return <About />;
      case '#/experience':
        return <Experience />;
      case '#/research':
        return <Research onSelectProject={open} />;
      case '#/projects':
        return <Projects onSelectProject={open} />;
      case '#/news':
        return <News />;
      case '#/contact':
        return <Contact />;
      default:
        return <Home onSelectProject={open} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main" className="sr-only focus:not-sr-only" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }}>
        Skip to content
      </a>
      <Navbar currentPath={currentPath} />
      <main id="main" tabIndex={-1} style={{ flex: 1, outline: 'none' }} key={currentPath}>
        {page()}
      </main>
      <Footer />
      {selectedProject && <ProjectModal project={selectedProject} onClose={close} />}
    </div>
  );
}
