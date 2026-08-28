import type { CSSProperties } from "react";
import type { Project, WorkSection } from "@/content/types";
import { imageUrl } from "@/content/load";
import { Reveal } from "@/components/layout/Reveal";
import { ProjectLibrary } from "@/components/sections/ProjectLibrary";

interface WorkGridProps {
  work: WorkSection;
  cardProjects: Array<{ id: string; project: Project }>;
  libraryProjects: Array<{ id: string; project: Project }>;
  onOpen: (id: string) => void;
}

export function WorkGrid({
  work,
  cardProjects,
  libraryProjects,
  onOpen,
}: WorkGridProps) {
  return (
    <section className="work" id="work">
      <Reveal className="section-head split">
        <div>
          <p className="section-kicker">{work.kicker}</p>
          <h2>{work.title}</h2>
        </div>
        <p>{work.description}</p>
      </Reveal>
      <div className="project-grid">
        {cardProjects.map(({ id, project }, index) => (
          <Reveal
            key={id}
            as="article"
            className={`project-card project-${id}`}
            style={{ "--delay": `${index * 70}ms` } as CSSProperties}
          >
            <button
              className="project-open"
              type="button"
              aria-label={`Open case study: ${project.title}`}
              onClick={() => onOpen(id)}
            >
              <div className="project-media">
                <img
                  src={imageUrl(project.image)}
                  width={1280}
                  height={960}
                  alt={project.alt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="project-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
              <div className="project-copy">
                <p className="project-category">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.hook}</p>
                <div className="project-bottom">
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <strong>{project.metric}</strong>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <ProjectLibrary work={work} projects={libraryProjects} onOpen={onOpen} />
    </section>
  );
}
