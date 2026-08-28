import { useEffect, useRef } from "react";
import type { Project } from "@/content/types";
import { imageUrl } from "@/content/load";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

export function ProjectDialog({ project, open, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && project) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open, project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCloseEvent = () => {
      document.body.style.overflow = "";
      onClose();
    };

    dialog.addEventListener("close", onCloseEvent);
    return () => dialog.removeEventListener("close", onCloseEvent);
  }, [onClose]);

  if (!project) return null;

  const gallery =
    project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      id="project-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <button
        className="dialog-close"
        type="button"
        aria-label="Close project details"
        onClick={onClose}
      >
        ×
      </button>
      <div className="dialog-scroll">
        <div className="dialog-gallery" id="dialog-gallery">
          {gallery.map((file) => (
            <img
              key={file}
              src={imageUrl(file)}
              alt={project.alt}
              loading="lazy"
            />
          ))}
          {project.video && (
            <video
              src={imageUrl(project.video)}
              controls
              playsInline
              preload="metadata"
              aria-label={`${project.title} video`}
            />
          )}
        </div>
        <div className="dialog-content">
          <p className="project-category">{project.category}</p>
          <h2>{project.title}</h2>
          <p className="dialog-hook">{project.hook}</p>
          <div className="dialog-sections">
            <section>
              <span>Challenge</span>
              <p>{project.challenge}</p>
            </section>
            <section>
              <span>My contribution</span>
              <p>{project.work}</p>
            </section>
            <section className="dialog-result">
              <span>Evidence / outcome</span>
              <p>{project.result}</p>
            </section>
          </div>
          <div className="dialog-tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {project.cad && (
            <p style={{ marginTop: "1rem" }}>
              <a href={project.cad} target="_blank" rel="noopener noreferrer">
                View CAD model ↗
              </a>
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
