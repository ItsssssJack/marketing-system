# SEO Infrastructure Setup Guide

## Overview

Your Glaido marketing site now has a complete SEO infrastructure including:

- ✅ Dynamic meta tags and Open Graph tags
- ✅ JSON-LD structured data
- ✅ Blog system with article pages
- ✅ Automatic sitemap generation
- ✅ Robots.txt configuration
- ✅ Internal linking and breadcrumbs
- ✅ Mobile-responsive article templates

## Directory Structure

```
marketing-system/
├── components/
│   ├── seo/
│   │   ├── SEOHead.tsx          # SEO meta tags component
│   │   └── StructuredData.tsx   # JSON-LD schema component
│   ├── Breadcrumb.tsx           # Breadcrumb navigation
│   ├── Header.tsx               # Updated with blog link
│   └── Footer.tsx               # Updated with blog link
├── pages/
│   ├── HomePage.tsx             # Homepage with SEO + recent articles
│   ├── BlogPage.tsx             # Blog listing with search/filter
│   └── ArticlePage.tsx          # Individual article template
├── utils/
│   ├── articleUtils.ts          # Article parsing utilities
│   ├── articleLoader.ts         # Article loading system
│   └── generateSitemap.ts       # Sitemap generator
├── content/
│   └── articles/                # Markdown articles go here
│       ├── TEMPLATE.md          # Template for new articles
│       ├── boost-productivity-with-voice-typing.md
│       ├── voice-typing-vs-traditional-typing.md
│       └── getting-started-with-voice-typing.md
└── public/
    └── robots.txt               # Search engine instructions
```

## How to Add New Blog Articles

### Step 1: Create Markdown File

Create a new `.md` file in `content/articles/` using this frontmatter format:

```markdown
---
title: "Your Article Title"
description: "SEO-friendly description (150-160 characters)"
date: "2025-12-15"
author: "Author Name"
image: "/blog/article-image.jpg"
tags: ["tag1", "tag2", "tag3"]
---

# Your Article Content Here

Write your article content using markdown...
```

### Step 2: Register the Article

Currently, articles need to be manually registered. Open any page file and import/register:

```typescript
import { registerArticle } from '../utils/articleLoader';
import articleContent from '../content/articles/your-article.md?raw';

registerArticle('your-article-slug', articleContent);
```

**Note:** For production, implement Vite's `import.meta.glob()` to auto-load all markdown files (commented example in `articleLoader.ts`).

### Step 3: Add Article Image

Place your article's featured image in `public/blog/` directory.

## SEO Features Implemented

### 1. Meta Tags (SEOHead Component)

Every page includes:
- Title tag (format: "Page Title | Glaido")
- Meta description
- Canonical URL
- Open Graph tags (Facebook/LinkedIn sharing)
- Twitter Card tags
- Article-specific meta (publish date, author, tags)

**Usage:**
```tsx
<SEOHead
  title="Your Page Title"
  description="Page description"
  canonical="https://glaido.com/page"
  ogType="article"
  article={{
    publishedTime: "2025-12-15",
    author: "Author Name",
    tags: ["tag1", "tag2"]
  }}
/>
```

### 2. Structured Data (JSON-LD)

Implemented schemas:
- **Organization** (homepage)
- **WebSite** with SearchAction (homepage)
- **Article** (blog posts)
- **BreadcrumbList** (navigation)
- **FAQPage** (ready to use)

**Usage:**
```tsx
import StructuredData, { generateArticleSchema } from '../components/seo/StructuredData';

const schema = generateArticleSchema({
  title: article.title,
  description: article.description,
  url: articleUrl,
  image: article.image,
  datePublished: article.date,
  author: article.author
});

<StructuredData data={schema} />
```

### 3. Article Page Features

Each article page includes:
- Semantic HTML structure (`<article>`, `<header>`, `<time>`)
- Breadcrumb navigation
- Author and date display
- Estimated read time
- Table of contents (auto-generated from headings)
- Tag display
- Related articles section
- Proper heading hierarchy (single H1)

### 4. Blog Index Features

The blog listing page includes:
- Search functionality
- Tag filtering
- Article cards with images
- Pagination-ready structure
- Meta info (date, read time)

### 5. Sitemap Generation

Generate sitemap with:

```bash
npm run generate-sitemap
```

The sitemap includes:
- All static pages
- All blog articles
- Last modified dates
- Priority hints
- Change frequency

Located at: `/sitemap.xml`

### 6. Robots.txt

Located at `/public/robots.txt`:
- Allows all search engines
- Points to sitemap
- Can be customized for specific needs

## SEO Best Practices Implemented

### ✅ Technical SEO
- Clean URL structure (`/blog/article-slug`)
- Canonical URLs on all pages
- Mobile-responsive design
- Fast loading times (Vite optimization)
- Semantic HTML5 markup

### ✅ On-Page SEO
- Unique title tags (under 60 characters)
- Meta descriptions (150-160 characters)
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text ready for images
- Internal linking structure

### ✅ Content SEO
- Related articles feature
- Tag-based organization
- Breadcrumb navigation
- Table of contents for long articles
- Author attribution

### ✅ Social SEO
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- Featured images for sharing
- Proper descriptions for previews

## Customization Guide

### Update Site URL

Change `siteUrl` in these files:
- `/components/seo/SEOHead.tsx` (line 27)
- `/components/seo/StructuredData.tsx` (line 22)
- `/pages/ArticlePage.tsx` (line 70)
- `/pages/BlogPage.tsx` (line 52)
- `/utils/generateSitemap.ts` (line 4)

### Update Organization Info

Edit `/components/seo/StructuredData.tsx`:
- Organization name
- Logo URL
- Social media links

### Customize Styles

All components use Tailwind CSS with your brand colors:
- `brand-lime`: #BFF549
- `brand-black`: #000000
- `brand-gray`: #F5F5F5

### Add More Pages

To add new static pages:

1. Create page component in `/pages/`
2. Add route in `/App.tsx`
3. Add to sitemap in `/utils/generateSitemap.ts`
4. Update navigation in Header/Footer

## Testing Your SEO

### Meta Tags
Use browser dev tools or [Meta Tags Debugger](https://metatags.io/)

### Structured Data
Validate with [Google's Rich Results Test](https://search.google.com/test/rich-results)

### Mobile-Friendly
Test with [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

### Site Speed
Check with [PageSpeed Insights](https://pagespeed.web.dev/)

### Sitemap
Verify at `https://yourdomain.com/sitemap.xml`

## Next Steps

1. **Add Real Content**: Replace sample articles with your actual content
2. **Optimize Images**: Add featured images and optimize for web
3. **Submit Sitemap**: Submit to Google Search Console
4. **Set Up Analytics**: Add Google Analytics or similar
5. **Monitor Performance**: Track rankings and traffic
6. **Build Backlinks**: Create shareable content and promote
7. **Update Regularly**: Fresh content helps SEO

## Production Deployment

Before deploying:

1. ✅ Update all `siteUrl` references to your actual domain
2. ✅ Add real article content and images
3. ✅ Generate final sitemap
4. ✅ Test all meta tags
5. ✅ Validate structured data
6. ✅ Check mobile responsiveness
7. ✅ Optimize images
8. ✅ Set up 301 redirects if migrating from old URLs

## Support

For questions or issues:
- Check component comments in code
- Review React Router docs for routing questions
- See Tailwind CSS docs for styling
- Consult Schema.org for structured data questions

---

Built with ❤️ for Glaido
