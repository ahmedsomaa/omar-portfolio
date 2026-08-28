import { useEffect, useRef } from "react";
import type { Project } from "@/content/types";
import { imageUrl } from "@/content/load";

interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE =
  "a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex='-1'])";

function pauseVideos(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll("video").forEach((video) => {
    video.pause();
    video.currentTime = 0;
  });
}

export function ProjectDialog({ project, open, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && project) {
      returnFocusRef.current = document.activeElement as HTMLElement;
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeRef.current?.focus());
    } else if (dialog.open) {
      pauseVideos(dialog);
      dialog.close();
      document.body.style.overflow = "";
    }
  }, [open, project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCloseEvent = () => {
      pauseVideos(dialog);
      document.body.style.overflow = "";
      onClose();
      requestAnimationFrame(() => returnFocusRef.current?.focus());
    };

    dialog.addEventListener("close", onCloseEvent);
    return () => dialog.removeEventListener("close", onCloseEvent);
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const nodes = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => !el.hasAttribute("disabled"));

      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const handleClose = () => {
    const dialog = dialogRef.current;
    pauseVideos(dialog);
    if (dialog?.open) dialog.close();
    else onClose();
  };

  if (!project) return null;

  const gallery =
    project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      id="project-dialog"
      onClick={(e) => {
        if (e.target === dialogRef.current) handleClose();
      }}
    >
      <button
        ref={closeRef}
        className="dialog-close"
        type="button"
        aria-label="Close project details"
        onClick={handleClose}
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
