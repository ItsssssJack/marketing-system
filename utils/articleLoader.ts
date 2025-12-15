import { Article, parseMarkdownArticle } from './articleUtils';

// Use Vite's glob import to load all markdown files
const markdownFiles = import.meta.glob('../content/articles/*.md', {
  eager: true,
  as: 'raw'
});

console.log('=== ARTICLE IMPORT DEBUG ===');
console.log('markdownFiles:', markdownFiles);
console.log('Number of files found:', Object.keys(markdownFiles).length);

let articlesCache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (articlesCache) {
    return articlesCache;
  }

  const articles: Article[] = [];

  console.log('Loading articles from glob import');

  for (const [path, markdown] of Object.entries(markdownFiles)) {
    // Extract slug from file path: ../content/articles/my-article.md -> my-article
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    console.log(`Processing article: ${slug}, markdown type: ${typeof markdown}, length: ${(markdown as string)?.length || 0}`);

    if (!markdown || typeof markdown !== 'string') {
      console.error(`Article ${slug} has invalid markdown:`, markdown);
      continue;
    }

    try {
      const article = parseMarkdownArticle(markdown as string, slug);
      console.log(`Parsed article: ${article.title}`);
      articles.push(article);
    } catch (error) {
      console.error(`Error parsing article ${slug}:`, error);
    }
  }

  console.log(`Total articles loaded: ${articles.length}`);

  // Sort by date, newest first
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  articlesCache = articles;
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const allArticles = getAllArticles();
  return allArticles.find(article => article.slug === slug) || null;
}
