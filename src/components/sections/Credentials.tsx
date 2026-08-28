import type { SiteContent } from "@/content/types";
import { Reveal } from "@/components/layout/Reveal";

export function Credentials({
  credentials,
}: {
  credentials: SiteContent["credentials"];
}) {
  return (
    <section className="credentials" id="credentials">
      <p className="section-kicker reveal visible">{credentials.kicker}</p>
      <h2 className="reveal visible">{credentials.title}</h2>
      <div className="credentials-grid">
        {credentials.items.map((item) => (
          <Reveal key={item.title} className="credential">
            <span>{item.type}</span>
            <strong>{item.title}</strong>
            <small>{item.detail}</small>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
