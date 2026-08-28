import type { CSSProperties } from "react";
import type { Project, WorkSection } from "@/content/types";
import { imageUrl } from "@/content/load";
import { Reveal } from "@/components/layout/Reveal";

interface ProjectLibraryProps {
  work: WorkSection;
  projects: Array<{ id: string; project: Project }>;
  onOpen: (id: string) => void;
}

export function ProjectLibrary({ work, projects, onOpen }: ProjectLibraryProps) {
  return (
    <div className="project-library" id="project-library">
      <Reveal className="project-library-head">
        <div>
          <p className="section-kicker">{work.libraryKicker}</p>
          <h3>{work.libraryTitle}</h3>
        </div>
        <span>{work.libraryCount}</span>
      </Reveal>
      <div className="project-library-grid">
        {projects.map(({ id, project }, index) => (
          <Reveal
            key={id}
            as="article"
            className={`project-mini project-${id}`}
            style={{ "--delay": `${index * 45}ms` } as CSSProperties}
          >
            <button
              className="project-open"
              type="button"
              aria-label={`Open case study: ${project.title}`}
              onClick={() => onOpen(id)}
            >
              <span className="project-mini-media">
                <img
                  src={imageUrl(project.image)}
                  width={478}
                  height={850}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                  className={project.containImage ? "contain-img" : undefined}
                />
              </span>
              <span className="project-mini-copy">
                <small>{project.category}</small>
                <strong>{project.title}</strong>
                <span>{project.metric}</span>
              </span>
              <b aria-hidden="true">↗</b>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
