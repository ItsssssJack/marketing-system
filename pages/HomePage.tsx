import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import ValueProp from '../components/ValueProp';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import SEOHead from '../components/seo/SEOHead';
import StructuredData, { generateOrganizationSchema, generateWebSiteSchema } from '../components/seo/StructuredData';
import { getAllArticles } from '../utils/articleLoader';
import { formatDate } from '../utils/articleUtils';
import { getPageMetadata } from '../content/seo';

const HomePage: React.FC = () => {
  const recentArticles = getAllArticles().slice(0, 3);
  const pageMetadata = getPageMetadata('/');

  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-black selection:bg-brand-lime selection:text-brand-black">
      {pageMetadata && (
        <SEOHead
          title={pageMetadata.title}
          description={pageMetadata.description}
          canonical={pageMetadata.canonical}
          ogType={pageMetadata.ogType}
        />
      )}
      <StructuredData data={organizationSchema} />
      <StructuredData data={websiteSchema} />

      <Header />
      <main className="flex-grow">
        <Hero h1={pageMetadata?.h1} />
        <Testimonials />
        <ValueProp />

        {/* Latest Articles Section */}
        {recentArticles.length > 0 && (
          <section className="py-24 px-5 md:px-10 bg-brand-gray">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
                    Latest from our blog
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Tips, insights, and updates on voice-to-text technology
                  </p>
                </div>
                <Link
                  to="/blog"
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-medium rounded-full hover:bg-brand-lime hover:text-brand-black transition-colors"
                >
                  View All Articles
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recentArticles.map(article => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    {article.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-brand-lime transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.description}
                      </p>
                      <div className="text-xs text-gray-400">
                        {formatDate(article.date)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center md:hidden">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-black text-white font-medium rounded-full hover:bg-brand-lime hover:text-brand-black transition-colors"
                >
                  View All Articles
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </section>
        )}

        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
