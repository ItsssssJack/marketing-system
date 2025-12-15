import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import SEOHead from '../components/seo/SEOHead';
import StructuredData, { generateArticleSchema, generateBreadcrumbSchema } from '../components/seo/StructuredData';
import { Article, formatDate, getRelatedArticles, extractHeadings } from '../utils/articleUtils';
import { getArticleBySlug, getAllArticles } from '../utils/articleLoader';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [headings, setHeadings] = useState<Array<{ id: string; title: string; level: number }>>([]);
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    if (!slug) return;

    // Load article
    const loadedArticle = getArticleBySlug(slug);
    if (loadedArticle) {
      setArticle(loadedArticle);

      // Extract headings for table of contents
      const articleHeadings = extractHeadings(loadedArticle.content);
      setHeadings(articleHeadings);

      // Get related articles
      const allArticles = getAllArticles();
      const related = getRelatedArticles(slug, allArticles);
      setRelatedArticles(related);
    }
  }, [slug]);

  useEffect(() => {
    // Handle scroll spy for table of contents
    const handleScroll = () => {
      const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveHeading(element.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <Link to="/blog" className="text-brand-lime hover:underline">
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const siteUrl = 'https://glaido.com';
  const articleUrl = `${siteUrl}/blog/${article.slug}`;

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.description,
    url: articleUrl,
    image: article.image,
    datePublished: article.date,
    author: article.author,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
    { name: article.title, url: articleUrl },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title={article.title}
        description={article.description}
        canonical={articleUrl}
        ogImage={article.image}
        ogType="article"
        article={{
          publishedTime: article.date,
          author: article.author,
          tags: article.tags,
        }}
      />
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <Header />

      <main className="flex-grow">
        <article className="max-w-7xl mx-auto px-5 md:px-10 py-32">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-black mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Blog
            </Link>

            {/* Breadcrumb */}
            <Breadcrumb
              items={[
                { name: 'Blog', url: '/blog' },
                { name: article.title, url: `/blog/${article.slug}` },
              ]}
            />

            {/* Article Header */}
            <header className="mb-12">
              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-brand-lime/10 text-brand-black text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-brand-black mb-6 leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {article.description}
              </p>

              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </div>
                {article.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{article.readTime} min read</span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {article.image && (
              <div className="mb-12 rounded-2xl overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Main Content Area with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
              {/* Article Content */}
              <div className="article-content">
                <div dangerouslySetInnerHTML={{ __html: article.htmlContent }} />
              </div>

              {/* Table of Contents Sidebar */}
              {headings.length > 0 && (
                <aside className="hidden lg:block">
                  <div className="sticky top-32">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
                      On This Page
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`block text-sm transition-colors ${
                            activeHeading === heading.id
                              ? 'text-brand-black font-medium'
                              : 'text-gray-500 hover:text-brand-black'
                          } ${heading.level === 3 ? 'pl-4' : ''}`}
                        >
                          {heading.title}
                        </a>
                      ))}
                    </nav>
                  </div>
                </aside>
              )}
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="max-w-4xl mx-auto mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      {related.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-brand-lime transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {related.description}
                        </p>
                        <div className="text-xs text-gray-400">
                          {formatDate(related.date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
