import { useEffect, useRef, type RefObject } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useReveal<T extends HTMLElement>(
  options?: IntersectionObserverInit,
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (reduce || !("IntersectionObserver" in window)) {
      node.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
        ...options,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce, options]);

  return ref;
}
