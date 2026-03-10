import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = process.env.SITEMAP_BASE_URL || 'https://www.rphospitals.in';

const routes = [
  '/',
  '/about',
  '/services',
  '/doctors',
  '/gallery',
  '/contact',
];

function buildUrl(pathname) {
  const trimmedBase = BASE_URL.replace(/\/$/, '');
  const trimmedPath = pathname === '/' ? '' : pathname.replace(/^\//, '');
  return `${trimmedBase}/${trimmedPath}`;
}

function buildSitemapXml(urls) {
  const lastmod = new Date().toISOString();
  const entries = urls
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${loc.endsWith('/') ? '1.0' : '0.8'}</priority>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function main() {
  const urls = routes.map(buildUrl);
  const xml = buildSitemapXml(urls);
  const publicDir = resolve(process.cwd(), 'public');
  mkdirSync(publicDir, { recursive: true });
  const outfile = resolve(publicDir, 'sitemap.xml');
  writeFileSync(outfile, xml, 'utf8');
  console.log(`Sitemap written to ${outfile}`);
}

main();
