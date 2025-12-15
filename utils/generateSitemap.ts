import { getAllArticles } from './articleLoader';

export function generateSitemap(): string {
  const siteUrl = 'https://glaido.com';
  const articles = getAllArticles();

  const staticPages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/blog', changefreq: 'daily', priority: '0.9' },
  ];

  const articlePages = articles.map(article => ({
    url: `/blog/${article.slug}`,
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: article.date,
  }));

  const allPages = [...staticPages, ...articlePages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${new Date(page.lastmod).toISOString().split('T')[0]}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

// Script to generate sitemap file
if (import.meta.url === `file://${process.argv[1]}`) {
  const sitemap = generateSitemap();
  console.log(sitemap);
}
