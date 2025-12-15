import { Article, parseMarkdownArticle } from './articleUtils';

// Import markdown files directly as raw strings
import article1 from '../content/articles/boost-productivity-with-voice-typing.md?raw';
import article2 from '../content/articles/voice-typing-vs-traditional-typing.md?raw';
import article3 from '../content/articles/getting-started-with-voice-typing.md?raw';
import article4 from '../content/articles/why-keyboards-are-dead.md?raw';

console.log('=== ARTICLE IMPORT DEBUG ===');
console.log('article1 type:', typeof article1, 'length:', article1?.length);
console.log('article2 type:', typeof article2, 'length:', article2?.length);
console.log('article3 type:', typeof article3, 'length:', article3?.length);
console.log('article4 type:', typeof article4, 'length:', article4?.length);
console.log('article1 preview:', article1?.substring(0, 100));

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

  console.log('Loading articles, articleData keys:', Object.keys(articleData));

  for (const [slug, markdown] of Object.entries(articleData)) {
    console.log(`Processing article: ${slug}, markdown type: ${typeof markdown}, length: ${markdown?.length || 0}`);

    if (!markdown || typeof markdown !== 'string') {
      console.error(`Article ${slug} has invalid markdown:`, markdown);
      continue;
    }

    try {
      const article = parseMarkdownArticle(markdown, slug);
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
