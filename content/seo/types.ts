/**
 * SEO and Page Metadata Types
 *
 * This file defines the TypeScript interfaces for the centralized
 * SEO management system.
 */

export interface PageMetadata {
  /**
   * The H1 heading displayed on the page
   */
  h1: string;

  /**
   * The page title (appears in browser tab and search results)
   * Will be automatically appended with " | Glaido"
   */
  title: string;

  /**
   * Meta description for SEO (ideal: 150-160 characters)
   */
  description: string;

  /**
   * Canonical URL for the page (without domain)
   */
  canonical: string;

  /**
   * Open Graph type (website, article, etc.)
   */
  ogType?: 'website' | 'article' | 'product';

  /**
   * Optional Open Graph image URL
   */
  ogImage?: string;

  /**
   * Optional keywords for additional SEO context
   */
  keywords?: string[];
}

export interface PageMetadataCollection {
  [route: string]: PageMetadata;
}
