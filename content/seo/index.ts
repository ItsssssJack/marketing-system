/**
 * Centralized SEO Management System
 *
 * This module provides utilities for accessing page metadata
 * from a centralized location.
 */

import { PageMetadata, PageMetadataCollection } from './types';
import pagesData from './pages.json';

// Type-safe access to pages data
const pages = pagesData as PageMetadataCollection;

/**
 * Get metadata for a specific route
 *
 * @param route - The route path (e.g., '/', '/blog')
 * @returns PageMetadata object or null if not found
 *
 * @example
 * const homeMetadata = getPageMetadata('/');
 * console.log(homeMetadata.h1); // "Write 5x faster in every app"
 */
export function getPageMetadata(route: string): PageMetadata | null {
  return pages[route] || null;
}

/**
 * Get all page metadata
 *
 * @returns Complete collection of all page metadata
 */
export function getAllPageMetadata(): PageMetadataCollection {
  return pages;
}

/**
 * Check if metadata exists for a route
 *
 * @param route - The route path to check
 * @returns boolean indicating if metadata exists
 */
export function hasPageMetadata(route: string): boolean {
  return route in pages;
}

/**
 * Get a list of all routes with metadata
 *
 * @returns Array of route paths
 */
export function getAllRoutes(): string[] {
  return Object.keys(pages);
}

// Export types for consumers
export type { PageMetadata, PageMetadataCollection } from './types';
