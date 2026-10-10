import type { MetadataRoute } from "next";
const SITE = "https://www.vovix.in";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-10");
  return [
    { url: `${SITE}/`,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/services`,       lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE}/products`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE}/about`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/contact`,        lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/legal/privacy`,  lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${SITE}/legal/terms`,    lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
  ];
}
