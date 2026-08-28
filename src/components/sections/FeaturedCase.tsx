import type { Project } from "@/content/types";
import { imageUrl } from "@/content/load";
import { Reveal } from "@/components/layout/Reveal";

interface FeaturedCaseProps {
  project: Project;
  projectId: string;
  onOpen: (id: string) => void;
}

export function FeaturedCase({ project, projectId, onOpen }: FeaturedCaseProps) {
  return (
    <section className="signature" id="signature">
      <Reveal className="signature-media">
        <img
          src={imageUrl(project.image)}
          width={1600}
          height={1200}
          alt={project.alt}
          decoding="async"
        />
        <div className="image-scan" aria-hidden="true" />
        <div className="signature-metric">
          <small>Client-side analysis</small>
          <strong>{project.metric}</strong>
        </div>
      </Reveal>
      <Reveal className="signature-copy">
        <p className="section-kicker">Featured case study</p>
        <h2>{project.title}</h2>
        <p className="lead-copy">{project.hook}</p>
        <div className="case-block">
          <span>01 / Challenge</span>
          <p>{project.challenge}</p>
        </div>
        <div className="case-block">
          <span>02 / Engineering work</span>
          <p>{project.work}</p>
        </div>
        <div className="case-block result">
          <span>03 / Evidence</span>
          <p>{project.result}</p>
        </div>
        <button
          className="text-button project-open"
          type="button"
          onClick={() => onOpen(projectId)}
        >
          See how it was built <span>↗</span>
        </button>
      </Reveal>
    </section>
  );
}
