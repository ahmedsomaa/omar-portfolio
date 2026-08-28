import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function CursorGlow() {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const glow = document.querySelector(".cursor-glow") as HTMLElement | null;
    if (!glow) return;

    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let targetX = glowX;
    let targetY = glowY;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const moveGlow = () => {
      glowX += (targetX - glowX) * 0.11;
      glowY += (targetY - glowY) * 0.11;
      glow.style.transform = `translate(${glowX - 272}px, ${glowY - 272}px)`;
      requestAnimationFrame(moveGlow);
    };
    requestAnimationFrame(moveGlow);

    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  if (reduce) return null;

  return <div className="cursor-glow" aria-hidden="true" />;
}
