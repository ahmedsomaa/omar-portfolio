import type { ContactSection, Profile } from "@/content/types";

export function Contact({ contact, profile }: { contact: ContactSection; profile: Profile }) {
  const emailHref = profile.email
    ? `mailto:${profile.email}?subject=Engineering%20Opportunity`
    : "#";

  return (
    <section className="contact" id="contact">
      <p className="section-kicker">{contact.kicker}</p>
      <h2>{contact.title}</h2>
      <p>{contact.body}</p>
      <div className="contact-actions">
        {profile.email && (
          <a className="button light" href={emailHref}>
            {contact.emailLabel} <span>↗</span>
          </a>
        )}
        {profile.whatsapp && (
          <a
            className="button outline-light"
            href={profile.whatsapp}
            target="_blank"
            rel="noopener"
          >
            {contact.whatsappLabel} <span>↗</span>
          </a>
        )}
        {profile.linkedIn && (
          <a
            className="button outline-light"
            href={profile.linkedIn}
            target="_blank"
            rel="noopener"
          >
            {contact.linkedInLabel} <span>↗</span>
          </a>
        )}
        {profile.cvUrl && (
          <a
            className="button outline-light"
            href={profile.cvUrl}
            target="_blank"
            rel="noopener"
          >
            {contact.cvLabel} <span>↓</span>
          </a>
        )}
      </div>
      {profile.phone && (
        <p className="contact-phone">
          {contact.phoneLabel}{" "}
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
        </p>
      )}
    </section>
  );
}
