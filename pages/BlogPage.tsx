import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/seo/SEOHead';
import StructuredData, { generateBreadcrumbSchema } from '../components/seo/StructuredData';
import { Article, formatDate } from '../utils/articleUtils';
import { getAllArticles } from '../utils/articleLoader';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allArticles = getAllArticles();

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allArticles.forEach(article => {
      article.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allArticles]);

  // Filter articles based on search and tag
  const filteredArticles = useMemo(() => {
    return allArticles.filter(article => {
      const matchesSearch = searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || article.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [allArticles, searchQuery, selectedTag]);

  const siteUrl = 'https://glaido.com';
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Blog', url: `${siteUrl}/blog` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title="Blog"
        description="Insights, tips, and updates on voice-to-text technology, productivity, and the future of work from the Glaido team."
        canonical={`${siteUrl}/blog`}
        ogType="website"
      />
      <StructuredData data={breadcrumbSchema} />

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 pt-32 pb-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-brand-black mb-6 leading-tight">
              From the Glaido Blog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Insights, tips, and updates on voice-to-text technology, productivity, and the future of work.
            </p>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 pb-12">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition-all"
              />
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-brand-black text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-brand-black text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 pb-24">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group"
                >
                  <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-lime/20 transition-all duration-300">
                    {/* Featured Image */}
                    {article.image && (
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      {/* Tags */}
                      {article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-brand-lime/10 text-brand-black text-xs font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-brand-lime transition-colors line-clamp-2">
                        {article.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                        </div>
                        {article.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{article.readTime} min</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
