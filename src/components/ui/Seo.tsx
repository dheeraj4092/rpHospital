import { Helmet } from 'react-helmet-async';
import { baseMeta, buildTitle, getCanonicalUrl } from '../../lib/seo';

interface SeoProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  robots?: string;
  noindex?: boolean;
  structuredData?: Array<Record<string, unknown> | null | undefined>;
}

export function Seo({
  title,
  description,
  canonicalPath = '/',
  image,
  robots,
  noindex,
  structuredData = [],
}: SeoProps) {
  const hasSiteName = title?.includes(baseMeta.siteName);
  const resolvedTitle = title ? (hasSiteName ? title : buildTitle(title)) : buildTitle();
  const resolvedDescription = description || baseMeta.defaultDescription;
  const canonicalUrl = getCanonicalUrl(canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const ogImage = image ? getCanonicalUrl(image) : getCanonicalUrl(baseMeta.defaultImage);
  const robotsValue = robots || (noindex ? 'noindex, nofollow' : 'index, follow');

  return (
    <Helmet>
      <html lang="en" />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsValue} />
      <meta name="theme-color" content="#0d1240" />

      {/* Open Graph */}
      <meta property="og:site_name" content={baseMeta.siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Prefetch critical assets */}
      <link rel="dns-prefetch" href="https://rphospitals.in" />

      {structuredData
        .filter(Boolean)
        .map((schema, idx) => (
          <script key={idx} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
    </Helmet>
  );
}

export default Seo;
