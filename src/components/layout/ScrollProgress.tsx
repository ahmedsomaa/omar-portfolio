import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function ScrollProgress() {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const bar = document.createElement("div");
    bar.id = "fx-progress";
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
    };
  }, [reduce]);

  return null;
}
