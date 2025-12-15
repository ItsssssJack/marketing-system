# Centralized SEO Management System

This folder contains the centralized SEO management system for the Glaido marketing website. All page metadata (H1 tags, page titles, meta descriptions) are managed here for easy editing and consistent SEO optimization.

## 📁 Structure

```
content/seo/
├── README.md           # This file - documentation
├── types.ts            # TypeScript interfaces for metadata
├── pages.json          # All page metadata (edit this file!)
└── index.ts            # Utility functions to fetch metadata
```

## 🎯 Purpose

This system centralizes all SEO-related content in one place, making it easy to:

- **Audit** all page titles, descriptions, and H1s at a glance
- **Update** SEO content without diving into component files
- **Maintain** consistency across the entire website
- **Optimize** for search engines with a clear overview of all metadata

## 📝 How to Edit Page Metadata

### Step 1: Open `pages.json`

All page metadata is stored in `pages.json`. This file contains a JSON object where each key is a route path.

### Step 2: Edit the Metadata

Example structure:

```json
{
  "/": {
    "h1": "Write 5x faster in every app",
    "title": "Work at the speed of thought",
    "description": "Write 5x faster in every app. Speak naturally, your words appear instantly.",
    "canonical": "https://glaido.com",
    "ogType": "website",
    "keywords": ["voice to text", "productivity", "speech to text"]
  }
}
```

### Field Descriptions:

- **h1** (required): The main heading displayed on the page
- **title** (required): Browser tab title and search result title (automatically appended with " | Glaido")
- **description** (required): Meta description for search results and social media previews (aim for 150-160 characters)
- **canonical** (required): The full canonical URL for the page
- **ogType** (optional): Open Graph type - typically "website" for pages, "article" for blog posts
- **keywords** (optional): Array of keywords for additional SEO context

### Step 3: Save and Deploy

Changes to `pages.json` will take effect immediately on the next build or dev server refresh.

## 🚀 Adding a New Page

To add metadata for a new page:

1. Open `pages.json`
2. Add a new entry with the route path as the key:

```json
{
  "/pricing": {
    "h1": "Simple, Transparent Pricing",
    "title": "Pricing",
    "description": "Choose the perfect Glaido plan for your needs. Start free, upgrade anytime.",
    "canonical": "https://glaido.com/pricing",
    "ogType": "website"
  }
}
```

3. Update your page component to use the centralized metadata:

```tsx
import { getPageMetadata } from '../content/seo';

const YourPage: React.FC = () => {
  const pageMetadata = getPageMetadata('/your-route');

  return (
    <>
      {pageMetadata && (
        <SEOHead
          title={pageMetadata.title}
          description={pageMetadata.description}
          canonical={pageMetadata.canonical}
          ogType={pageMetadata.ogType}
        />
      )}
      <h1>{pageMetadata?.h1}</h1>
      {/* Rest of your page */}
    </>
  );
};
```

## 📊 Current Pages

| Route | H1 | Status |
|-------|-----|--------|
| `/` | Write 5x faster in every app | ✅ Active |
| `/blog` | From the Glaido Blog | ✅ Active |

## 🔧 Utility Functions

The system provides several utility functions (exported from `index.ts`):

### `getPageMetadata(route: string)`

Fetches metadata for a specific route.

```tsx
const homeMetadata = getPageMetadata('/');
console.log(homeMetadata.h1); // "Write 5x faster in every app"
```

### `getAllPageMetadata()`

Returns all page metadata as a collection.

```tsx
const allMetadata = getAllPageMetadata();
```

### `hasPageMetadata(route: string)`

Checks if metadata exists for a route.

```tsx
if (hasPageMetadata('/pricing')) {
  // Metadata exists
}
```

### `getAllRoutes()`

Gets a list of all routes with metadata.

```tsx
const routes = getAllRoutes(); // ['/', '/blog']
```

## 📚 Blog Articles

**Note:** Individual blog articles do NOT use this system. Blog post metadata is managed through markdown frontmatter:

```yaml
---
title: "Your Article Title"
description: "Your article description for SEO"
date: "2025-12-15"
author: "Author Name"
image: "/blog/featured-image.jpg"
tags: ["tag1", "tag2"]
---
```

Blog articles automatically use their title as the H1 tag and pull all SEO metadata from the frontmatter.

## ⚠️ Important SEO Guidelines

### H1 Tags
- **One H1 per page** - Each page should have exactly one H1 tag
- **Descriptive and unique** - Each page's H1 should be unique and clearly describe the page content
- **Match user intent** - H1 should align with what users expect when landing on the page

### Meta Descriptions
- **Length**: 150-160 characters (anything longer gets truncated in search results)
- **Compelling**: Should entice users to click from search results
- **Unique**: Each page should have a unique description
- **Include keywords**: Naturally incorporate relevant keywords

### Page Titles
- **Concise**: Keep under 60 characters to avoid truncation
- **Brand consistency**: System automatically adds " | Glaido" suffix
- **Front-load keywords**: Important keywords should appear early
- **Unique per page**: Each page needs a distinct title

## 🐛 Troubleshooting

### Metadata not showing up?

1. Check that the route in `pages.json` matches exactly (including leading slash)
2. Verify JSON syntax is valid (no trailing commas, proper quotes)
3. Ensure the component is importing and using `getPageMetadata()`
4. Restart the dev server if changes aren't reflecting

### Duplicate H1 tags?

The system is designed to prevent duplicate H1s:
- **Static pages**: Use the H1 from `pages.json`
- **Blog articles**: Use the title as H1, and markdown H1s (`#`) are automatically converted to H2s

### TypeScript errors?

Make sure you're importing types correctly:

```tsx
import { getPageMetadata, type PageMetadata } from '../content/seo';
```

## 🎨 Best Practices

1. **Regular audits**: Review `pages.json` quarterly to ensure metadata is optimized
2. **A/B test descriptions**: Try different descriptions to improve click-through rates
3. **Monitor performance**: Use Google Search Console to track how pages perform
4. **Keep it updated**: Update metadata when page content changes significantly
5. **Maintain consistency**: Use similar tone and style across all pages

## 📖 Further Reading

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Moz: On-Page SEO](https://moz.com/learn/seo/on-page-factors)
- [Open Graph Protocol](https://ogp.me/)

---

**Questions or suggestions?** Update this README or create an issue in the repository.
