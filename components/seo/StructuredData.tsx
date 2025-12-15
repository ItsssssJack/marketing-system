import React from 'react';

interface StructuredDataProps {
  data: object;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;

// Helper functions to generate common schema types
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Glaido',
  url: 'https://glaido.com',
  logo: 'https://glaido.com/Glaido Horizontal Black.png',
  description: 'Seamless voice-to-text in any application. Write 5x faster with universal dictation.',
  sameAs: [
    'https://twitter.com/glaido',
    'https://linkedin.com/company/glaido',
  ],
});

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Glaido',
  url: 'https://glaido.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://glaido.com/blog?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
});

export const generateArticleSchema = (article: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Person',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Glaido',
    logo: {
      '@type': 'ImageObject',
      url: 'https://glaido.com/Glaido Horizontal Black.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
