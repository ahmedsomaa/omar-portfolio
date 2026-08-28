import { useCallback, useEffect, useRef, useState } from "react";
import type { CompareSection } from "@/content/types";
import { imageUrl } from "@/content/load";
import { useReveal } from "@/hooks/useReveal";

export function CompareSlider({ compare }: { compare: CompareSection }) {
  const elRef = useReveal<HTMLDivElement>();
  const topRef = useRef<HTMLImageElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const setPosition = useCallback((p: number) => {
    const clamped = Math.max(0, Math.min(100, p));
    setPos(clamped);
    if (topRef.current) {
      topRef.current.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`;
    }
    if (handleRef.current) {
      handleRef.current.style.left = `${clamped}%`;
      handleRef.current.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }
  }, []);

  useEffect(() => {
    setPosition(50);
  }, [setPosition]);

  const fromEvent = (clientX: number) => {
    const el = elRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPosition(((clientX - r.left) / r.width) * 100);
  };

  return (
    <section className="sticks" id="compare-section">
      <p className="section-kicker reveal visible">{compare.kicker}</p>
      <h2 className="reveal visible">{compare.title}</h2>
      <p className="cmp-intro reveal visible">{compare.intro}</p>
      <div
        ref={elRef}
        className="cmp reveal"
        id="compare"
        onPointerDown={(ev) => {
          draggingRef.current = true;
          elRef.current?.setPointerCapture(ev.pointerId);
          fromEvent(ev.clientX);
        }}
        onPointerMove={(ev) => {
          if (draggingRef.current) fromEvent(ev.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
        onPointerLeave={() => {
          draggingRef.current = false;
        }}
      >
        <img
          className="cmp-base"
          src={imageUrl(compare.builtImage)}
          width={1200}
          height={675}
          alt={compare.builtAlt}
          loading="lazy"
          decoding="async"
        />
        <img
          ref={topRef}
          className="cmp-top"
          src={imageUrl(compare.cadImage)}
          width={1200}
          height={675}
          alt={compare.cadAlt}
          loading="lazy"
          decoding="async"
        />
        <span className="cmp-tag cmp-tag-l">{compare.tagLeft}</span>
        <span className="cmp-tag cmp-tag-r">{compare.tagRight}</span>
        <div
          ref={handleRef}
          className="cmp-handle"
          role="slider"
          tabIndex={0}
          aria-label="Compare CAD and built"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onKeyDown={(ev) => {
            if (ev.key === "ArrowLeft") {
              setPosition(pos - 4);
              ev.preventDefault();
            }
            if (ev.key === "ArrowRight") {
              setPosition(pos + 4);
              ev.preventDefault();
            }
          }}
        >
          <i />
        </div>
      </div>
    </section>
  );
}
