/// <reference types="react/jsx-runtime" />
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { Project } from './types';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Research from './pages/Research';
import Projects from './pages/Projects';
import News from './pages/News';
import Contact from './pages/Contact';

const PAPER = '#FAFAF7';
const INK   = '#16192B';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    // Handle initial load if hash is empty, default to #/
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPath) {
      case '#/':
      case '#':
        return <Home />;
      case '#/about':
        return <About />;
      case '#/experience':
        return <Experience />;
      case '#/research':
        return <Research />;
      case '#/projects':
        return <Projects onSelectProject={setSelectedProject} />;
      case '#/news':
        return <News />;
      case '#/contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <style>{`
        ::selection { background-color: rgba(255,90,60,0.2); color: #FF5A3C; }
      `}</style>

      {/* Global Navigation */}
      <Navbar currentPath={currentPath} />

      {/* Main Page Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 pt-28 pb-16">
        {renderPage()}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Rich Project Modal Detail Drawer */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}