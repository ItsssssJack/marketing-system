import { Article, parseMarkdownArticle } from './articleUtils';

// This will store all articles
let articlesCache: Article[] | null = null;

// Import all markdown files from content/articles directory
// Note: In a real implementation with Vite, you'd use import.meta.glob
// For now, we'll create a simple registry system

const articleRegistry: Record<string, string> = {};

export function registerArticle(slug: string, markdown: string): void {
  articleRegistry[slug] = markdown;
  articlesCache = null; // Clear cache when new articles are registered
}

export function getAllArticles(): Article[] {
  if (articlesCache) {
    return articlesCache;
  }

  const articles: Article[] = [];

  for (const [slug, markdown] of Object.entries(articleRegistry)) {
    try {
      const article = parseMarkdownArticle(markdown, slug);
      articles.push(article);
    } catch (error) {
      console.error(`Error parsing article ${slug}:`, error);
    }
  }

  // Sort by date, newest first
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  articlesCache = articles;
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  const markdown = articleRegistry[slug];
  if (!markdown) {
    return null;
  }

  try {
    return parseMarkdownArticle(markdown, slug);
  } catch (error) {
    console.error(`Error parsing article ${slug}:`, error);
    return null;
  }
}

// For production, you would implement this with Vite's import.meta.glob:
/*
const articleModules = import.meta.glob('../content/articles/*.md', { as: 'raw', eager: true });

export function getAllArticles(): Article[] {
  const articles: Article[] = [];

  for (const [path, markdown] of Object.entries(articleModules)) {
    const slug = path.match(/\/([^/]+)\.md$/)?.[1];
    if (slug && typeof markdown === 'string') {
      try {
        const article = parseMarkdownArticle(markdown, slug);
        articles.push(article);
      } catch (error) {
        console.error(`Error parsing article ${slug}:`, error);
      }
    }
  }

  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}
*/
