import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useSiteEnhancements() {
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const raf = window.requestAnimationFrame.bind(window);

    if ("IntersectionObserver" in window) {
      const sel =
        ".project-card, .project-mini, .impact-card, .section-head, .case-panel, .about-copy, .contact-inner, .hero-proof span";
      const nodes = Array.from(document.querySelectorAll(sel));
      nodes.forEach((n) => n.classList.add("fx-in"));
      let i = 0;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const target = e.target as HTMLElement;
            target.style.setProperty("--fx-d", `${i++ * 80}ms`);
            target.classList.add("fx-on");
            io.unobserve(target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      nodes.forEach((n) => io.observe(n));
    }

    if (!window.matchMedia("(pointer: coarse)").matches) {
      document.querySelectorAll(".project-card").forEach((card) => {
        const el = card as HTMLElement;
        let pending = false;
        let rx = 0;
        let ry = 0;
        el.addEventListener("pointermove", (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const px = (ev.clientX - r.left) / r.width;
          const py = (ev.clientY - r.top) / r.height;
          el.style.setProperty("--mx", `${px * 100}%`);
          el.style.setProperty("--my", `${py * 100}%`);
          ry = (px - 0.5) * 9;
          rx = (0.5 - py) * 7;
          if (!pending) {
            pending = true;
            raf(() => {
              el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
              pending = false;
            });
          }
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });

      document.querySelectorAll(".button, .icon-button").forEach((b) => {
        const el = b as HTMLElement;
        el.addEventListener("pointermove", (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = (ev.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (ev.clientY - (r.top + r.height / 2)) / r.height;
          el.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "";
        });
      });
    }

    const visual = document.querySelector(".hero-visual") as HTMLElement | null;
    const notes = document.querySelectorAll(".floating-note");
    if (visual) {
      let ticking = false;
      const clamp = (v: number, lo: number, hi: number) =>
        Math.max(lo, Math.min(hi, v));
      const move = () => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          visual.style.transform = `translateY(${clamp(y * 0.11, -40, 40).toFixed(1)}px)`;
          notes.forEach((n, i) => {
            (n as HTMLElement).style.transform = `translateY(${clamp(y * (i ? -0.06 : 0.05), -26, 26).toFixed(1)}px)`;
          });
        }
        ticking = false;
      };
      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            ticking = true;
            raf(move);
          }
        },
        { passive: true },
      );
    }

    const strip = document.querySelector(".delivery-strip");
    if (strip) {
      const row = strip.querySelector("div");
      if (row && !row.dataset.fxDone) {
        row.dataset.fxDone = "1";
        const clone = row.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        row.parentElement?.appendChild(clone);
        row.classList.add("fx-marquee-track");
        clone.classList.add("fx-marquee-track");
        strip.classList.add("fx-marquee");
      }
    }
  }, [reduce]);
}
