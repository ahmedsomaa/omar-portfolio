import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}

export function Reveal({
  children,
  className = "",
  style,
  as: Tag = "div",
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    // @ts-expect-error dynamic tag ref
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={style} {...rest}>
      {children}
    </Tag>
  );
}
