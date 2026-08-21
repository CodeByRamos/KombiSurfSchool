import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export const dynamic = 'force-static';

/**
 * Enquanto o projeto for conceito (sem autorização da escola), o robots bloqueia
 * a indexação inteira. Depois da aprovação, `site.isConcept = false` libera.
 */
export default function robots(): MetadataRoute.Robots {
  if (site.isConcept) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/revisao/'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
