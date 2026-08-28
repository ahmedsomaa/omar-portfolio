import { useEffect, useState } from "react";

/** Highlights nav links when their target section is in view. */
export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size === 0) {
          setActiveId(null);
          return;
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        setActiveId(bestId);
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0, 0.12, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
