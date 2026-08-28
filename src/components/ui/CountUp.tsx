import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(n));
}

export function CountUp({ value, prefix = "", suffix = "", className = "count" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const animate = () => {
      if (reduce) {
        node.textContent = `${prefix}${formatNumber(value)}${suffix}`;
        return;
      }

      const start = performance.now();
      const duration = value > 1000 ? 1450 : 1100;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        node.textContent = `${prefix}${formatNumber(value * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (!("IntersectionObserver" in window)) {
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate();
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, prefix, suffix, reduce]);

  return (
    <span ref={ref} className={className} data-count={value} data-prefix={prefix} data-suffix={suffix}>
      {prefix}{formatNumber(value)}{suffix}
    </span>
  );
}
