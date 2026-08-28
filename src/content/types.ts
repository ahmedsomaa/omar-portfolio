export type ProjectPlacement = "card" | "library";

export interface Profile {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  footerTagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  linkedIn: string;
  cvUrl: string;
  portrait: string;
  portraitAlt: string;
  portraitBadge: string;
}

export interface NavLink {
  label: string;
  href: string;
  mobileLabel?: string;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  proofStats: Array<{ value: string; label: string }>;
  floatingNotes: Array<{ label: string; value: string }>;
  footerLine: string;
}

export interface DeliveryStrip {
  label: string;
  clients: string[];
}

export interface ImpactStat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface ImpactSection {
  kicker: string;
  title: string;
  description: string;
  stats: ImpactStat[];
}

export interface Project {
  title: string;
  category: string;
  hook: string;
  challenge: string;
  work: string;
  result: string;
  metric: string;
  tags: string[];
  image: string;
  alt: string;
  gallery: string[];
  placement: ProjectPlacement;
  video?: string;
  cad?: string;
  decisions?: string;
  containImage?: boolean;
}

export interface CompareSection {
  kicker: string;
  title: string;
  intro: string;
  builtImage: string;
  builtAlt: string;
  cadImage: string;
  cadAlt: string;
  tagLeft: string;
  tagRight: string;
}

export interface AboutSection {
  kicker: string;
  title: string;
  paragraphs: string[];
  highlight?: string;
  facts: string[];
  image: string;
  imageAlt: string;
  imageNote: string;
}

export interface Credential {
  type: string;
  title: string;
  detail: string;
}

export interface ContactSection {
  kicker: string;
  title: string;
  body: string;
  emailLabel: string;
  whatsappLabel: string;
  linkedInLabel: string;
  cvLabel: string;
  phoneLabel: string;
}

export interface GameOption {
  label: string;
  scores: { reliability: number; speed: number; cost: number };
  title: string;
  feedback: string;
}

export interface GameRound {
  question: string;
  options: GameOption[];
}

export interface ChallengeSection {
  launchKicker: string;
  launchTitle: string;
  launchBody: string;
  launchCta: string;
  dialogKicker: string;
  dialogTitle: string;
  pills: string[];
  rounds: GameRound[];
  results: {
    high: { title: string; text: string; threshold: number };
    fast: { title: string; text: string };
    default: { title: string; text: string };
  };
}

export interface WorkSection {
  kicker: string;
  title: string;
  description: string;
  libraryKicker: string;
  libraryTitle: string;
  libraryCount: string;
}

export interface SiteContent {
  profile: Profile;
  nav: NavLink[];
  hero: HeroContent;
  deliveryStrip: DeliveryStrip;
  impact: ImpactSection;
  featuredProjectId: string;
  work: WorkSection;
  projects: Record<string, Project>;
  compare: CompareSection;
  about: AboutSection;
  credentials: {
    kicker: string;
    title: string;
    items: Credential[];
  };
  contact: ContactSection;
  challenge: ChallengeSection;
}
