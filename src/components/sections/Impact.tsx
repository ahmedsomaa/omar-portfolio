import type { ImpactSection } from "@/content/types";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/layout/Reveal";

export function Impact({ impact }: { impact: ImpactSection }) {
  return (
    <section className="impact" id="proof">
      <Reveal className="section-head">
        <p className="section-kicker">{impact.kicker}</p>
        <h2>{impact.title}</h2>
        <p>{impact.description}</p>
      </Reveal>
      <div className="impact-grid">
        {impact.stats.map((stat) => (
          <Reveal key={stat.label} as="article" className="impact-card">
            <CountUp
              value={stat.value}
              prefix={stat.prefix ?? ""}
              suffix={stat.suffix ?? ""}
            />
            <p>{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
