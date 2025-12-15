import { Article, parseMarkdownArticle } from './articleUtils';

// Import markdown files directly as raw strings
import article1 from '../content/articles/boost-productivity-with-voice-typing.md?raw';
import article2 from '../content/articles/voice-typing-vs-traditional-typing.md?raw';
import article3 from '../content/articles/getting-started-with-voice-typing.md?raw';
import article4 from '../content/articles/why-keyboards-are-dead.md?raw';

const articleData: Record<string, string> = {
  'boost-productivity-with-voice-typing': article1,
  'voice-typing-vs-traditional-typing': article2,
  'getting-started-with-voice-typing': article3,
  'why-keyboards-are-dead': article4,
};

let articlesCache: Article[] | null = null;

export function getAllArticles(): Article[] {
  if (articlesCache) {
    return articlesCache;
  }

  const articles: Article[] = [];

  for (const [slug, markdown] of Object.entries(articleData)) {
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
  const allArticles = getAllArticles();
  return allArticles.find(article => article.slug === slug) || null;
}
