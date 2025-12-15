import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Search } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/seo/SEOHead';
import StructuredData, { generateBreadcrumbSchema } from '../components/seo/StructuredData';
import { Article, formatDate } from '../utils/articleUtils';
import { getAllArticles } from '../utils/articleLoader';
import { getPageMetadata } from '../content/seo';

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const allArticles = getAllArticles();
  const pageMetadata = getPageMetadata('/blog');

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
      {pageMetadata && (
        <SEOHead
          title={pageMetadata.title}
          description={pageMetadata.description}
          canonical={pageMetadata.canonical}
          ogType={pageMetadata.ogType}
        />
      )}
      <StructuredData data={breadcrumbSchema} />

      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-5 md:px-10 pt-32 md:pt-40 lg:pt-48 pb-24 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-brand-lime-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-40 left-0 w-48 h-48 bg-brand-accent-purple rounded-full opacity-10 blur-3xl"></div>

          <div className="relative max-w-4xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-brand-black mb-8 leading-[0.9]">
              {pageMetadata?.h1 || 'From the Glaido Blog'}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 leading-relaxed font-medium max-w-2xl">
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
                  <article className="relative grid md:grid-cols-2 gap-10 items-center bg-gradient-to-br from-brand-lime-100 via-brand-lime-50 to-white rounded-3xl overflow-hidden p-10 md:p-16 lg:p-20 hover:shadow-[0_25px_80px_-15px_rgba(191,245,73,0.4)] transition-all duration-700 border-2 border-brand-lime-200">
                    {/* Decorative background blobs */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-accent-teal rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-brand-accent-yellow rounded-full opacity-10 blur-3xl"></div>

                    {/* Hero Image */}
                    {filteredArticles[0].image && (
                      <div className="relative order-2 md:order-1 rounded-2xl overflow-hidden aspect-[4/3] bg-white shadow-2xl ring-4 ring-white">
                        <img
                          src={filteredArticles[0].image}
                          alt={filteredArticles[0].title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    {/* Hero Content */}
                    <div className="relative order-1 md:order-2 space-y-6">
                      {/* Featured Badge */}
                      <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brand-black text-white text-sm font-black rounded-full shadow-lg">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-lime"></span>
                        </span>
                        FEATURED ARTICLE
                      </div>

                      {/* Tags */}
                      {filteredArticles[0].tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {filteredArticles[0].tags.map(tag => (
                            <span
                              key={tag}
                              className="px-4 py-1.5 bg-white text-brand-black text-sm font-bold rounded-full shadow-sm border border-brand-lime-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight group-hover:text-brand-lime-600 transition-colors leading-[1.1]">
                        {filteredArticles[0].title}
                      </h2>

                      {/* Description */}
                      <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium">
                        {filteredArticles[0].description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 text-base font-semibold text-gray-700 pt-6 border-t-2 border-brand-lime-300">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} className="text-brand-lime-600" />
                          <time dateTime={filteredArticles[0].date}>{formatDate(filteredArticles[0].date)}</time>
                        </div>
                        {filteredArticles[0].readTime && (
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-brand-lime-600" />
                            <span>{filteredArticles[0].readTime} min read</span>
                          </div>
                        )}
                      </div>

                      {/* Read More CTA */}
                      <div className="pt-4">
                        <span className="inline-flex items-center gap-3 px-6 py-3 bg-brand-black text-white font-black rounded-full group-hover:gap-5 group-hover:bg-brand-lime-600 group-hover:text-brand-black transition-all duration-300 shadow-lg">
                          Read Full Article
                          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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
                  <h3 className="text-3xl md:text-4xl font-black mb-10 text-brand-black tracking-tight">More Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredArticles.slice(1).map(article => (
                      <Link
                        key={article.slug}
                        to={`/blog/${article.slug}`}
                        className="group h-full"
                      >
                        <article className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] hover:border-brand-lime-400 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                          {/* Featured Image */}
                          {article.image && (
                            <div className="aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}

                          <div className="p-8 flex-grow flex flex-col">
                            {/* Tags */}
                            {article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {article.tags.slice(0, 2).map(tag => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1.5 bg-brand-lime-100 text-brand-black text-xs font-bold rounded-full border border-brand-lime-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-brand-lime-600 transition-colors line-clamp-2 leading-tight">
                              {article.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-700 mb-6 line-clamp-3 flex-grow text-base leading-relaxed font-medium">
                              {article.description}
                            </p>

                            {/* Meta Info */}
                            <div className="flex items-center gap-4 text-sm font-semibold text-gray-600 mt-auto pt-4 border-t-2 border-gray-100">
                              <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-brand-lime-500" />
                                <time dateTime={article.date}>{formatDate(article.date)}</time>
                              </div>
                              {article.readTime && (
                                <div className="flex items-center gap-2">
                                  <Clock size={14} className="text-brand-lime-500" />
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
