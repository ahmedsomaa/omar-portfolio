import { useEffect, useState } from "react";
import type { NavLink, Profile } from "@/content/types";
import { useActiveSection } from "@/hooks/useActiveSection";

interface SiteHeaderProps {
  profile: Profile;
  nav: NavLink[];
}

const NAV_SECTION_IDS = ["work", "proof", "game", "about"];

export function SiteHeader({ profile, nav }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(NAV_SECTION_IDS);
  const mainNav = nav.filter((n) => n.label !== "CV ↓");
  const showCv = Boolean(profile.cvUrl);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    const onScroll = () => {
      header?.classList.toggle("scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const cvHref = profile.cvUrl || "#contact";

  const navClass = (href: string) => {
    const id = href.replace("#", "");
    return id && activeSection === id ? "fx-active" : undefined;
  };

  return (
    <header className="site-header" id="top">
      <a className="brand" href="#top" aria-label={`${profile.name} — Home`}>
        <span className="brand-mark">{profile.initials}</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <small>{profile.role}</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {mainNav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={navClass(link.href)}
          >
            {link.label}
          </a>
        ))}
        {showCv && (
          <a
            className="nav-cv"
            href={cvHref}
            target="_blank"
            rel="noopener"
          >
            CV <span aria-hidden="true">↓</span>
          </a>
        )}
      </nav>

      <div className="header-actions">
        <a className="mini-cta" href="#contact">
          Let&apos;s talk <span>↗</span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        id="mobile-menu"
        aria-label="Mobile navigation"
      >
        {mainNav.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={navClass(link.href)}
            onClick={() => setMenuOpen(false)}
          >
            {link.mobileLabel ?? link.label}
          </a>
        ))}
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        {showCv && (
          <a
            className="mobile-cv"
            href={cvHref}
            target="_blank"
            rel="noopener"
            onClick={() => setMenuOpen(false)}
          >
            Download CV ↓
          </a>
        )}
      </nav>
    </header>
  );
}
