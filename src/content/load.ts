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
