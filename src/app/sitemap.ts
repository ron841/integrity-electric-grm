import type { MetadataRoute } from "next";

const SITE = "https://integrity-electric-grm.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/reviews`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}
