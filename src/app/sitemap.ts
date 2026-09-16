import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Every route on the site. Not shared with the nav — if you add a page, add it
 * here as well as to `Navbar` and `Footer`.
 */
const routes = ["", "/services", "/about", "/request-quote", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  // Static export, so this is the build date.
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
