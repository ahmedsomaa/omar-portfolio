import type { SiteContent } from "./types";
import siteJson from "./site.json";

export function loadSite(): SiteContent {
  return siteJson as SiteContent;
}

export function imageUrl(filename: string): string {
  if (!filename) return "";
  if (filename.startsWith("http") || filename.startsWith("/")) return filename;
  return `/images/${filename}`;
}

/** SVG placeholders in public/images should get the pending-media treatment. */
export function isPlaceholderImage(filename: string): boolean {
  if (!filename) return false;
  const path = filename.split("?")[0].toLowerCase();
  return path.endsWith(".svg");
}
