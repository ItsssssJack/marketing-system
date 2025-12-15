import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  noindex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  article,
  noindex = false,
}) => {
  const siteUrl = 'https://glaido.com'; // Update with your actual domain
  const fullCanonical = canonical || siteUrl;
  const fullTitle = `${title} | Glaido`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMeta = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonical;

    // Primary Meta Tags
    updateMeta('title', fullTitle);
    updateMeta('description', description);
    if (noindex) {
      updateMeta('robots', 'noindex,nofollow');
    }

    // Open Graph / Facebook
    updateMeta('og:type', ogType, true);
    updateMeta('og:url', fullCanonical, true);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', fullOgImage, true);
    updateMeta('og:site_name', 'Glaido', true);

    // Article specific Open Graph tags
    if (ogType === 'article' && article) {
      if (article.publishedTime) {
        updateMeta('article:published_time', article.publishedTime, true);
      }
      if (article.modifiedTime) {
        updateMeta('article:modified_time', article.modifiedTime, true);
      }
      if (article.author) {
        updateMeta('article:author', article.author, true);
      }
    }

    // Twitter Card
    updateMeta('twitter:card', 'summary_large_image', true);
    updateMeta('twitter:url', fullCanonical, true);
    updateMeta('twitter:title', fullTitle, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:image', fullOgImage, true);
  }, [fullTitle, description, fullCanonical, fullOgImage, ogType, article, noindex]);

  return null;
};

export default SEOHead;
