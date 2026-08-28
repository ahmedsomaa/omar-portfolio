import type { Profile } from "@/content/types";

interface SiteFooterProps {
  profile: Profile;
}

export function SiteFooter({ profile }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <a className="brand footer-brand" href="#top">
        <span className="brand-mark">{profile.initials}</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <small>{profile.footerTagline}</small>
        </span>
      </a>
      <p>
        © {year} {profile.name}. Designed for engineering conversations.
      </p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
