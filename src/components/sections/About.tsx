import type { AboutSection } from "@/content/types";
import { imageUrl } from "@/content/load";
import { Reveal } from "@/components/layout/Reveal";

export function About({ about }: { about: AboutSection }) {
  return (
    <section className="about" id="about">
      <Reveal className="about-card">
        <div className="about-portrait">
          <img
            src={imageUrl(about.image)}
            width={1125}
            height={1500}
            alt={about.imageAlt}
            loading="lazy"
            decoding="async"
          />
          <span className="about-image-note">{about.imageNote}</span>
        </div>
        <div className="about-copy">
          <p className="section-kicker">{about.kicker}</p>
          <h2>{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {about.highlight && (
            <p className="archery-note">{about.highlight}</p>
          )}
          <div className="about-facts">
            {about.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
