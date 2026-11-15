import type { MetadataRoute } from "next";

const SITE_URL = "https://abhiram-gaddam.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    // Add each case-study page here, e.g.:
    { url: `${SITE_URL}/about`, lastModified: new Date(), priority: 0.90 },

    { url: `${SITE_URL}/projects/eaap`, lastModified: new Date(), priority: 0.80 },
    { url: `${SITE_URL}/projects/global-academy`, lastModified: new Date(), priority: 0.75 },
    { url: `${SITE_URL}/projects/property-valuation`, lastModified: new Date(), priority: 0.70 },
    { url: `${SITE_URL}/projects/invoice-assistant`, lastModified: new Date(), priority: 0.60 },
    { url: `${SITE_URL}/projects/fraud-detection`, lastModified: new Date(), priority: 0.60 },
  ];
}