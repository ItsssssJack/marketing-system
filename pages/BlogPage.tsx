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
          <div className="flex flex-col gap-6">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
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

        {/* Articles Layout */}
        <section className="max-w-7xl mx-auto px-5 md:px-10 pb-24">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Hero Article */}
              {filteredArticles[0] && (
                <Link
                  to={`/blog/${filteredArticles[0].slug}`}
                  className="group block"
                >
                  <article className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-brand-lime/5 to-brand-lime/10 rounded-3xl overflow-hidden p-8 md:p-12 hover:shadow-2xl transition-all duration-500">
                    {/* Hero Image */}
                    {filteredArticles[0].image && (
                      <div className="order-2 md:order-1 rounded-2xl overflow-hidden aspect-[4/3] bg-white">
                        <img
                          src={filteredArticles[0].image}
                          alt={filteredArticles[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    {/* Hero Content */}
                    <div className="order-1 md:order-2 space-y-6">
                      {/* Featured Badge */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-black text-white text-sm font-bold rounded-full">
                        <span className="w-2 h-2 bg-brand-lime rounded-full animate-pulse"></span>
                        FEATURED
                      </div>

                      {/* Tags */}
                      {filteredArticles[0].tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {filteredArticles[0].tags.map(tag => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-white text-brand-black text-sm font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-4xl md:text-5xl font-bold tracking-tight group-hover:text-brand-black/80 transition-colors leading-tight">
                        {filteredArticles[0].title}
                      </h2>

                      {/* Description */}
                      <p className="text-lg text-gray-700 leading-relaxed">
                        {filteredArticles[0].description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <time dateTime={filteredArticles[0].date}>{formatDate(filteredArticles[0].date)}</time>
                        </div>
                        {filteredArticles[0].readTime && (
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>{filteredArticles[0].readTime} min read</span>
                          </div>
                        )}
                      </div>

                      {/* Read More CTA */}
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 text-brand-black font-semibold group-hover:gap-4 transition-all">
                          Read Full Article
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Articles Grid */}
              {filteredArticles.length > 1 && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 text-brand-black">More Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.slice(1).map(article => (
                      <Link
                        key={article.slug}
                        to={`/blog/${article.slug}`}
                        className="group h-full"
                      >
                        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-lime/50 transition-all duration-300 h-full flex flex-col">
                          {/* Featured Image */}
                          {article.image && (
                            <div className="aspect-video overflow-hidden bg-gray-50">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}

                          <div className="p-6 flex-grow flex flex-col">
                            {/* Tags */}
                            {article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.slice(0, 2).map(tag => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 bg-brand-lime/10 text-brand-black text-xs font-semibold rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="text-xl font-bold mb-3 group-hover:text-brand-black/70 transition-colors line-clamp-2 leading-tight">
                              {article.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow text-sm leading-relaxed">
                              {article.description}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-1.5">
                                <Calendar size={12} />
                                <time dateTime={article.date}>{formatDate(article.date)}</time>
                              </div>
                              {article.readTime && (
                                <div className="flex items-center gap-1.5">
                                  <Clock size={12} />
                                  <span>{article.readTime} min</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
