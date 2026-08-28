import type { HeroContent, Profile } from "@/content/types";
import { imageUrl, isPlaceholderImage } from "@/content/load";
import { cn } from "@/lib/cn";

interface HeroProps {
  profile: Profile;
  hero: HeroContent;
}

export function Hero({ profile, hero }: HeroProps) {
  const portraitPending = isPlaceholderImage(profile.portrait);

  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">
          <span />
          {hero.eyebrow}
        </p>
        <h1>{hero.headline}</h1>
        <p className="hero-lead">{hero.lead}</p>
        <div className="hero-actions">
          <a className="button primary" href="#work">
            {hero.primaryCta} <span>↓</span>
          </a>
          <a
            className="button ghost"
            href={profile.cvUrl || "#contact"}
            target={profile.cvUrl ? "_blank" : undefined}
            rel={profile.cvUrl ? "noopener" : undefined}
          >
            {hero.secondaryCta} <span>↗</span>
          </a>
        </div>
        <div className="hero-proof">
          {hero.proofStats.map((stat) => (
            <span key={stat.label}>
              <b>{stat.value}</b> {stat.label}
            </span>
          ))}
        </div>
      </div>

      <div
        className="hero-visual"
        aria-label={`Portrait of ${profile.name} with engineering project imagery`}
      >
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div
          className={cn("portrait-frame", portraitPending && "media-pending")}
        >
          <img
            src={imageUrl(profile.portrait)}
            width={900}
            height={900}
            alt={profile.portraitAlt}
            decoding="async"
            fetchPriority="high"
          />
          <span className="portrait-code">{profile.portraitBadge}</span>
        </div>
        {hero.floatingNotes.map((note, i) => (
          <div
            key={note.label}
            className={`floating-note note-${i === 0 ? "one" : "two"}`}
          >
            <span>{note.label}</span>
            <b>{note.value}</b>
          </div>
        ))}
      </div>

      <div className="hero-footer">
        <span>{hero.footerLine}</span>
      </div>
    </section>
  );
}
