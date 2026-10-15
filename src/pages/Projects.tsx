import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import ProjectRow from '../components/ProjectRow';
import { PageIntro, SectionHead } from '../components/ui';

const GROUPS: { id: Project['group']; title: string; note: string }[] = [
  { id: 'research', title: 'Research', note: 'Papers, my thesis, and a healthcare learning project.' },
  { id: 'product', title: 'Products', note: 'Websites and apps I built, two of them for Dhaka.' },
];

export default function Projects({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  return (
    <div className="page">
      <div className="wrap">
        <PageIntro title="Projects">
          Research I've worked on and things I've built. The videos play without sound. Open a project to read
          more.
        </PageIntro>

        {GROUPS.map((g, gi) => (
          <section key={g.id} className={gi ? 'section' : undefined}>
            <SectionHead title={g.title} note={g.note} />
            {PROJECTS.filter((p) => p.group === g.id).map((p, i) => (
              <ProjectRow key={p.id} project={p} flip={i % 2 === 1} onOpen={onSelectProject} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
