import matter from 'gray-matter';
import { marked } from 'marked';
import { Buffer } from 'buffer';

// Ensure Buffer is available globally
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  content: string;
  htmlContent: string;
  readTime?: number;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function parseMarkdownArticle(markdown: string, slug: string): Article {
  const { data, content } = matter(markdown);

  // Calculate read time (average reading speed: 200 words per minute)
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  // Configure marked to add IDs to headings
  const renderer = new marked.Renderer();
  const originalHeading = renderer.heading.bind(renderer);

  renderer.heading = function({ text, depth, tokens }) {
    const id = generateSlug(typeof text === 'string' ? text : tokens?.[0]?.text || '');
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  // Convert markdown to HTML
  const htmlContent = marked(content, {
    gfm: true,
    breaks: true,
    renderer,
  }) as string;

  return {
    slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    author: data.author || 'Glaido Team',
    image: data.image || '/blog-default.png',
    tags: data.tags || [],
    content,
    htmlContent,
    readTime,
  };
}

export function extractHeadings(markdown: string): Array<{ id: string; title: string; level: number }> {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Array<{ id: string; title: string; level: number }> = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = generateSlug(title);
    headings.push({ id, title, level });
  }

  return headings;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getRelatedArticles(currentSlug: string, allArticles: Article[], limit = 3): Article[] {
  const currentArticle = allArticles.find(a => a.slug === currentSlug);
  if (!currentArticle) return [];

  // Simple related logic: find articles with matching tags
  const related = allArticles
    .filter(article => article.slug !== currentSlug)
    .map(article => {
      const commonTags = article.tags.filter(tag =>
        currentArticle.tags.includes(tag)
      ).length;
      return { article, score: commonTags };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.article);

  // If not enough related articles, fill with recent ones
  if (related.length < limit) {
    const additional = allArticles
      .filter(article =>
        article.slug !== currentSlug &&
        !related.find(r => r.slug === article.slug)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit - related.length);

    related.push(...additional);
  }

  return related;
}
