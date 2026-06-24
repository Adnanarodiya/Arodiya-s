# Soft Drink Marketing Website — Research & Build Plan (Astro 7.0)

> **Project:** Animated soft drink brand marketing website with full product showcase  
> **Framework:** Astro 7.0 (not Next.js)  
> **Date:** June 24, 2026  
> **Status:** Research complete — ready for implementation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Why Astro 7.0 (Not Next.js)](#2-why-astro-70-not-nextjs)
3. [What Top Beverage Marketing Sites Do](#3-what-top-beverage-marketing-sites-do)
4. [Recommended Tech Stack](#4-recommended-tech-stack)
5. [Site Architecture & Page Map](#5-site-architecture--page-map)
6. [Product Data Model](#6-product-data-model)
7. [Animation & Motion Strategy](#7-animation--motion-strategy)
8. [Home Page vs Product Page Showcase](#8-home-page-vs-product-page-showcase)
9. [Astro 7.0 Project Structure](#9-astro-70-project-structure)
10. [Implementation Phases](#10-implementation-phases)
11. [Performance & Accessibility Rules](#11-performance--accessibility-rules)
12. [Key Code Patterns](#12-key-code-patterns)
13. [Design System Recommendations](#13-design-system-recommendations)
14. [References & Inspiration](#14-references--inspiration)

---

## 1. Executive Summary

The best approach for an **animated soft drink marketing website** in 2026 is:

| Layer | Recommendation |
|-------|----------------|
| **Framework** | Astro 7.0 — static-first, islands architecture, View Transitions |
| **Content** | Astro Content Collections (JSON/YAML) for all products |
| **Styling** | Tailwind CSS 4 + CSS custom properties per flavor |
| **Motion** | GSAP + ScrollTrigger + Lenis (smooth scroll) |
| **Page transitions** | Astro `<ClientRouter />` + `transition:name` (not Swup — native Astro) |
| **3D product hero** | Three.js island on homepage + flagship product pages only |
| **Images** | Astro `<Image />` with WebP/AVIF, lazy loading |
| **Deploy** | Netlify or Vercel with CDN cache (Astro 7 route caching) |

**Core principle:** Ship a fast, SEO-friendly marketing site where **95% of the page is static HTML** and only interactive sections (carousel, 3D can, flavor picker) hydrate as islands. Animation runs on scroll and navigation — not on every pixel of the page.

This matches what award-winning beverage brands do (OLIPOP, Liquid Death, Coca-Cola brand pages) while keeping Lighthouse scores high — proven by Astro + GSAP case studies scoring 90+ on PageSpeed Insights.

---

## 2. Why Astro 7.0 (Not Next.js)

### Astro wins for marketing / product showcase sites

| Criteria | Astro 7.0 | Next.js |
|----------|-----------|---------|
| Default output | Static HTML (zero JS by default) | React SSR/CSR — heavier baseline |
| JS shipped to browser | Only hydrated islands (~5–15 KB per island) | Full React runtime + app shell |
| Content-driven pages | Content Collections built-in | Requires CMS integration or MDX setup |
| Build speed (Astro 7) | 15–61% faster (Rust compiler + Vite 8/Rolldown) | Slower on large static content sites |
| Page transitions | Native View Transitions API + `<ClientRouter />` | Requires third-party or custom solution |
| SEO | Excellent out of the box | Excellent, but heavier |
| 3D / animation | Add as islands (`client:visible`) | Works, but bundles more JS globally |

### Astro 7.0 features that matter for this project

From the [Astro 7.0 release](https://astro.build/blog/astro-7/):

- **Rust compiler** — faster builds, stricter templates (catches HTML bugs early)
- **Sätteri markdown processor** — if you add blog/recipes content later
- **Vite 8 + Rolldown** — 10–30× faster bundling vs Rollup
- **Route caching** — cache product pages at CDN edge (`Astro.cache.set()`)
- **Advanced Routing (`src/fetch.ts`)** — optional API proxy for store locator
- **Queued rendering** — stable, ~2.4× faster page generation

### When you would pick Next.js instead

Only if you need: authenticated user accounts, real-time cart/checkout, heavy server actions, or a full e-commerce backend in the same app. For a **marketing + product showcase** site, Astro is the industry consensus in 2026.

---

## 3. What Top Beverage Marketing Sites Do

Research across OLIPOP, Coca-Cola brand pages, Liquid Death, and Awwwards food/drink winners reveals consistent patterns.

### 3.1 Homepage structure (every strong beverage brand)

```
┌─────────────────────────────────────────────────────────┐
│  Sticky nav: Logo | Products | Story | Where to Buy     │
├─────────────────────────────────────────────────────────┤
│  HERO: Full-bleed video or 3D can + bold tagline        │
│        Primary CTA: "Shop Flavors" / "Explore"          │
├─────────────────────────────────────────────────────────┤
│  KEY PRODUCTS (3–6 featured flavors)                    │
│  Horizontal scroll or grid with hover color shift       │
├─────────────────────────────────────────────────────────┤
│  BRAND STORY: "Why us?" — ingredients, mission, science │
├─────────────────────────────────────────────────────────┤
│  SCROLLYTELLING: Parallax ingredients / process         │
├─────────────────────────────────────────────────────────┤
│  SOCIAL PROOF: Reviews, press quotes, UGC               │
├─────────────────────────────────────────────────────────┤
│  RETAIL: Store logos + store locator CTA                │
├─────────────────────────────────────────────────────────┤
│  NEWSLETTER / FOOTER                                    │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Product listing page (`/products`)

- Filterable grid: by category (Cola, Citrus, Limited Edition), dietary tags (Zero Sugar, Classic)
- Each card shows: can render, flavor name, short descriptor, badge (New / Limited / Bestseller)
- Hover: can tilts or color wash animates to flavor palette
- OLIPOP pattern: collection tabs (9g Fiber / 6g Fiber / Variety Packs)

### 3.3 Individual product page (`/products/[slug]`)

| Section | Purpose |
|---------|---------|
| Hero | Large can image or 3D model, flavor name, tagline |
| Flavor story | Origin, taste notes, mood imagery |
| Nutrition panel | Calories, sugar, ingredients — styled but accurate |
| Ingredients breakdown | Animated icons for key ingredients |
| Related flavors | 3–4 cross-sell cards |
| Where to buy | CTA to store locator or external shop |
| Pairing / serving suggestions | Optional lifestyle content |

### 3.4 Motion patterns that work (not gimmicks)

| Pattern | Where | Library |
|---------|-------|---------|
| Text reveal (line/char stagger) | Hero headlines | GSAP SplitText |
| Scroll-scrubbed product scale | Homepage featured products | GSAP ScrollTrigger |
| Can-to-detail FLIP transition | Product card → product page | GSAP Flip + Astro `transition:name` |
| Parallax ingredient layers | Brand story section | GSAP ScrollTrigger |
| Smooth scroll | Global | Lenis |
| Page fade/slide | All navigation | Astro View Transitions |
| Preloader with asset % | First visit only | GSAP + sessionStorage flag |
| Horizontal product rail | Homepage | CSS scroll-snap + GSAP optional |

### 3.5 What to avoid

- Autoplay sound on hero video
- Full-page WebGL on every route (kills mobile performance)
- Animating `width`/`height` (use `transform: scale` instead)
- Ignoring `prefers-reduced-motion` (Astro View Transitions handles this natively)
- Heavy React SPA for a mostly static marketing site

---

## 4. Recommended Tech Stack

### Core

```bash
npm create astro@latest softdrink-brand -- --template minimal
cd softdrink-brand
npx @astrojs/upgrade   # Ensure Astro 7.x
npx astro add tailwind
npx astro add sitemap
```

### Animation & interaction

| Package | Role | Load strategy |
|---------|------|---------------|
| `gsap` | Scroll reveals, FLIP, timelines | `client:visible` island |
| `@gsap/react` | Optional — only if using React islands | Per-island |
| `lenis` | Smooth scroll | Global script, `client:load` |
| `three` | 3D can on hero | `client:visible` — lazy |
| `@astrojs/react` | Optional for complex UI (flavor picker) | Islands only |

### Content & assets

| Tool | Role |
|------|------|
| Astro Content Collections | Product JSON/YAML with Zod schema |
| `astro:assets` `<Image />` | Responsive images, WebP/AVIF |
| `public/` or `src/assets/` | Can PNGs, hero videos, ingredient icons |

### Optional CMS (later)

- **Sanity** or **Storyblok** — if non-developers will edit products
- Use Astro **live content collections** with route caching for CMS-driven inventory

### Deploy

- **Netlify** — `@astrojs/netlify` + `cacheNetlify()` (Astro 7 CDN cache)
- **Vercel** — `@astrojs/vercel` + `cacheVercel()`
- **Cloudflare Pages** — `@astrojs/cloudflare`

---

## 5. Site Architecture & Page Map

```
/                           → Homepage (hero, key products, brand story)
/products                   → Full product catalog with filters
/products/[slug]            → Individual product detail (dynamic routes)
/flavors                    → Optional: interactive flavor explorer
/our-story                  → Brand heritage, process, sustainability
/ingredients                → Ingredient science (OLIPOP-style)
/where-to-buy               → Store locator (map or retail logos)
/contact                    → Contact form
/blog (optional)            → News, campaigns, recipes
```

### Route generation from content

Each product in the `products` collection auto-generates `/products/[slug]` at build time via `getStaticPaths()`.

---

## 6. Product Data Model

Define in `src/content.config.ts`:

```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.json' }),
  schema: z.object({
    // Identity
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),

    // Showcase flags
    featured: z.boolean().default(false),
    featuredOrder: z.number().optional(),
    badge: z.enum(['new', 'limited', 'bestseller', 'classic']).optional(),

    // Taxonomy
    category: z.enum(['cola', 'citrus', 'fruit', 'classic', 'limited']),
    tags: z.array(z.string()).default([]),

    // Visual identity
    flavorColor: z.string(),        // hex — drives page theme
    flavorColorLight: z.string(),
    canImage: z.string(),           // path in src/assets
    heroImage: z.string().optional(),
    backgroundPattern: z.string().optional(),

    // Product details
    size: z.string().default('330ml'),
    packSizes: z.array(z.object({
      label: z.string(),
      quantity: z.number(),
      price: z.number().optional(),
    })).optional(),

    // Nutrition (marketing site — keep accurate)
    nutrition: z.object({
      calories: z.number(),
      sugar: z.string(),
      caffeine: z.string().optional(),
      ingredients: z.array(z.string()),
    }),

    // Taste profile
    tasteNotes: z.array(z.string()),
    pairingSuggestions: z.array(z.string()).optional(),

    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { products };
```

### Example product entry

`src/content/products/vintage-cola.json`:

```json
{
  "name": "Vintage Cola",
  "slug": "vintage-cola",
  "tagline": "Classic taste, modern refresh",
  "description": "A bold cola with notes of vanilla and caramel.",
  "featured": true,
  "featuredOrder": 1,
  "badge": "bestseller",
  "category": "cola",
  "tags": ["classic", "zero-caffeine"],
  "flavorColor": "#8B2500",
  "flavorColorLight": "#C44D2E",
  "canImage": "../../assets/products/vintage-cola-can.webp",
  "nutrition": {
    "calories": 45,
    "sugar": "2g",
    "ingredients": ["Carbonated Water", "Cane Sugar", "Natural Cola Flavor"]
  },
  "tasteNotes": ["Vanilla", "Caramel", "Spice"],
  "pairingSuggestions": ["BBQ", "Burgers", "Movie night"]
}
```

---

## 7. Animation & Motion Strategy

### Layer 1: Astro View Transitions (free, zero extra deps)

Add to `src/layouts/BaseLayout.astro`:

```astro
---
import { ClientRouter } from 'astro:transitions';
---
<head>
  <ClientRouter />
</head>
```

**Product card → detail page continuity:**

```astro
<!-- On product card (listing + homepage) -->
<article transition:name={`product-${product.slug}`}>
  <img src={product.canImage} alt={product.name} />
</article>

<!-- On product detail page -->
<div transition:name={`product-${product.slug}`}>
  <img src={product.canImage} alt={product.name} />
</div>
```

The can image morphs between pages — same technique Coca-Cola 3D sites use, without heavy SPA routing.

### Layer 2: GSAP scroll animations (islands)

Load GSAP only on pages that need it:

```astro
<ScrollAnimations client:visible />
```

**Recommended GSAP plugins for this project:**

| Plugin | Use |
|--------|-----|
| ScrollTrigger | Scroll-scrubbed sections, pin ingredient stories |
| SplitText | Hero headline character reveal |
| Flip | Grid ↔ slider layout toggle, menu → title morph |

### Layer 3: Lenis smooth scroll

```typescript
// src/scripts/smooth-scroll.ts
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initSmoothScroll() {
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
```

Wire in layout with `<script>` + `client:load` only on desktop (disable on mobile for native scroll performance).

### Layer 4: Three.js 3D can (homepage hero only)

- Use GLB model with compressed textures (Draco)
- `client:visible` — only loads when hero enters viewport
- Fallback: static WebP can image for low-end devices
- Rotate on scroll via ScrollTrigger scrub

Reference: [Fizzi 3D soda project](https://github.com/Itssanthoshhere/Fizzi) (design patterns — rebuild in Astro islands, not Next.js)

### Animation budget per page

| Page | Max animated sections | JS budget |
|------|----------------------|-----------|
| Homepage | 6–8 | ~80–120 KB gzipped |
| Product listing | 2–3 (hover only) | ~30 KB |
| Product detail | 4–5 | ~60 KB |
| Static pages | 1–2 | ~20 KB |

---

## 8. Home Page vs Product Page Showcase

### Homepage — "Key Products" section

**Goal:** Show 4–6 hero flavors, drive clicks to `/products/[slug]`

```
┌──────────────────────────────────────────────────┐
│  Section title: "Find Your Flavor"               │
│                                                  │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐        │
│  │Can1│  │Can2│  │Can3│  │Can4│  │Can5│  →scroll│
│  └────┘  └────┘  └────┘  └────┘  └────┘        │
│                                                  │
│  Active flavor: background color transitions     │
│  [View All Products]                             │
└──────────────────────────────────────────────────┘
```

**Data query:**

```typescript
import { getCollection } from 'astro:content';

const allProducts = await getCollection('products');
const featuredProducts = allProducts
  .filter(p => p.data.featured)
  .sort((a, b) => (a.data.featuredOrder ?? 99) - (b.data.featuredOrder ?? 99))
  .slice(0, 6);
```

**Interactions:**
- Horizontal scroll-snap rail
- Active card scales up (GSAP ScrollTrigger or CSS)
- Page background `flavorColor` transitions on active card change
- Each card links to `/products/[slug]` with `transition:name` for FLIP

### Product listing page — full catalog

**Goal:** Browse all products, filter by category

- Query: `getCollection('products')` — all entries
- Client island: `ProductFilter.tsx` with `client:visible`
- Filter by `category`, `tags`, `badge`
- Grid layout with staggered reveal on load

### Product detail page — deep showcase

**Goal:** Convert interest into purchase intent

| Block | Content source |
|-------|----------------|
| Themed layout | `product.flavorColor` → CSS variables on `<body>` |
| Hero can | `product.canImage` or 3D if `product.has3DModel` |
| Taste radar | `product.tasteNotes` — animated chart island |
| Nutrition | `product.nutrition` — styled label component |
| Ingredients story | Scroll-triggered icon grid |
| Related products | Same `category`, exclude current slug |

**Themed product page:**

```astro
---
const { product } = Astro.props;
---
<html style={`--flavor: ${product.data.flavorColor}; --flavor-light: ${product.data.flavorColorLight}`}>
```

---

## 9. Astro 7.0 Project Structure

```
softdrink-brand/
├── astro.config.mjs
├── src/
│   ├── content.config.ts          # Product collection schema
│   ├── content/
│   │   └── products/              # One JSON per flavor
│   │       ├── vintage-cola.json
│   │       ├── lemon-lime.json
│   │       └── ...
│   ├── assets/
│   │   ├── products/              # Can images (WebP)
│   │   ├── hero/                  # Hero video / backgrounds
│   │   └── ingredients/             # Icon SVGs
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── BaseLayout.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── FeaturedProducts.astro
│   │   │   ├── BrandStory.astro
│   │   │   └── StoreLogos.astro
│   │   ├── products/
│   │   │   ├── ProductCard.astro
│   │   │   ├── ProductGrid.astro
│   │   │   ├── ProductHero.astro
│   │   │   ├── NutritionPanel.astro
│   │   │   ├── TasteNotes.astro
│   │   │   └── RelatedProducts.astro
│   │   └── islands/               # Hydrated interactive components
│   │       ├── ProductFilter.tsx
│   │       ├── ScrollAnimations.ts
│   │       ├── SmoothScroll.ts
│   │       ├── CanScene3D.tsx
│   │       └── FlavorExplorer.tsx
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ProductLayout.astro    # Themed per flavor
│   ├── pages/
│   │   ├── index.astro
│   │   ├── products/
│   │   │   ├── index.astro        # Full catalog
│   │   │   └── [slug].astro       # Dynamic product pages
│   │   ├── our-story.astro
│   │   ├── ingredients.astro
│   │   └── where-to-buy.astro
│   ├── styles/
│   │   └── global.css
│   └── scripts/
│       └── animations/
│           ├── reveals.ts
│           ├── scroll-sections.ts
│           └── page-transition.ts
├── public/
│   ├── fonts/
│   └── favicon.svg
└── package.json
```

---

## 10. Implementation Phases

### Phase 1 — Foundation (Week 1)

- [ ] `npm create astro@latest` with Astro 7.x
- [ ] Tailwind + base layout (Header, Footer)
- [ ] Content collection + 6–10 sample products
- [ ] `/products` grid and `/products/[slug]` dynamic routes
- [ ] Responsive product card component

**Deliverable:** Working static site, all products browsable, no animation yet.

### Phase 2 — Visual identity (Week 2)

- [ ] Per-flavor CSS variables on product pages
- [ ] Homepage hero (video or static image)
- [ ] Featured products section with real data
- [ ] Brand story + ingredients pages
- [ ] Astro `<Image />` optimization for all cans

**Deliverable:** Beautiful static marketing site, on-brand colors per flavor.

### Phase 3 — Motion layer (Week 3)

- [ ] `<ClientRouter />` + view transition names on product cards
- [ ] Lenis smooth scroll (desktop)
- [ ] GSAP scroll reveals on homepage sections
- [ ] Product card hover animations
- [ ] `prefers-reduced-motion` fallbacks

**Deliverable:** Animated marketing site with smooth navigation.

### Phase 4 — Premium interactions (Week 4)

- [ ] Homepage horizontal flavor rail with active state
- [ ] GSAP Flip: product card → detail transition
- [ ] Optional Three.js can on homepage (`client:visible`)
- [ ] Product filter island on `/products`
- [ ] Preloader (first visit only, sessionStorage)

**Deliverable:** Award-quality motion matching top beverage brands.

### Phase 5 — Launch polish (Week 5)

- [ ] SEO meta per product (metaTitle, metaDescription)
- [ ] `astro add sitemap`
- [ ] Route caching for product pages (Astro 7 CDN)
- [ ] Lighthouse audit — target 90+ mobile
- [ ] Deploy to Netlify/Vercel

---

## 11. Performance & Accessibility Rules

### Performance

1. **Static HTML first** — every product page pre-rendered at build time
2. **Islands only where needed** — filter, 3D, scroll animations
3. **`client:visible`** for below-fold islands (3D, heavy GSAP)
4. **`client:idle`** for filter UI
5. **Never `client:load` on Three.js** — too heavy for initial paint
6. **Animate `transform` and `opacity` only** — GPU composited
7. **Preload hero image/video** — `<link rel="preload">` in layout
8. **Route caching** (Astro 7):

```typescript
// src/pages/products/[slug].astro
Astro.cache.set({
  maxAge: 3600,
  swr: 600,
  tags: ['products', `products:${slug}`],
});
```

### Accessibility

- Astro View Transitions respects `prefers-reduced-motion` automatically
- All can images need descriptive `alt` text (flavor + brand)
- Keyboard navigation for product filter and flavor rail
- Focus visible styles on all interactive cards
- Nutrition info readable without animation
- Video hero: muted, with pause control

---

## 12. Key Code Patterns

### Dynamic product pages

`src/pages/products/[slug].astro`:

```astro
---
import { getCollection, getEntry } from 'astro:content';
import ProductLayout from '../../layouts/ProductLayout.astro';
import ProductHero from '../../components/products/ProductHero.astro';
import NutritionPanel from '../../components/products/NutritionPanel.astro';
import RelatedProducts from '../../components/products/RelatedProducts.astro';

export async function getStaticPaths() {
  const products = await getCollection('products');
  return products.map((product) => ({
    params: { slug: product.data.slug },
    props: { product },
  }));
}

const { product } = Astro.props;
const related = (await getCollection('products'))
  .filter(p => p.data.category === product.data.category && p.data.slug !== product.data.slug)
  .slice(0, 4);
---

<ProductLayout product={product}>
  <ProductHero product={product} />
  <NutritionPanel nutrition={product.data.nutrition} />
  <RelatedProducts products={related} />
</ProductLayout>
```

### Homepage featured products

`src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import FeaturedProducts from '../components/home/FeaturedProducts.astro';

const products = await getCollection('products');
const featured = products
  .filter(p => p.data.featured)
  .sort((a, b) => (a.data.featuredOrder ?? 99) - (b.data.featuredOrder ?? 99))
  .slice(0, 6);
---

<FeaturedProducts products={featured} />
```

### Product card with view transition

`src/components/products/ProductCard.astro`:

```astro
---
const { product } = Astro.props;
---
<a href={`/products/${product.data.slug}`} class="product-card">
  <article transition:name={`product-${product.data.slug}`}>
    {product.data.badge && <span class="badge">{product.data.badge}</span>}
    <img src={product.data.canImage} alt={`${product.data.name} can`} loading="lazy" />
    <h3>{product.data.name}</h3>
    <p>{product.data.tagline}</p>
  </article>
</a>
```

### astro.config.mjs (Astro 7)

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://yourbrand.com',
  integrations: [tailwind()],
  image: {
    domains: [],
  },
  // Optional: CDN cache on Netlify
  // adapter: netlify(),
  // cache: { provider: cacheNetlify() },
});
```

---

## 13. Design System Recommendations

### Typography

| Role | Style |
|------|-------|
| Display / Hero | Bold condensed sans (e.g. Druk Wide, Bebas Neue) |
| Body | Clean sans (e.g. Inter, DM Sans) |
| Accents | Flavor name on product pages in display font |

### Color

- **Brand base:** 1 primary + 1 dark + 1 light neutral
- **Per flavor:** `flavorColor` drives page background, buttons, accents
- **Contrast:** WCAG AA minimum on all text over flavor backgrounds

### Product card

- Can image centered, slight drop shadow
- On hover: `translateY(-8px)` + shadow increase
- Background: subtle gradient using `flavorColorLight` → white
- Badge: top-right pill (New, Limited, Bestseller)

### Motion timing

| Element | Duration | Ease |
|---------|----------|------|
| Page transition | 0.4–0.6s | ease-in-out |
| Scroll reveal | 0.8–1.2s | expo.out |
| Hover | 0.2–0.3s | power2.out |
| Flavor color bg | 0.6s | power1.inOut |

---

## 14. References & Inspiration

### Framework & architecture

- [Astro 7.0 Release](https://astro.build/blog/astro-7/)
- [Astro View Transitions Guide](https://docs.astro.build/en/guides/view-transitions/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [Astro vs Next.js for Marketing Sites (2026)](https://migratelab.com/resources/why-astro-best-framework-marketing-sites-2026)

### Animation case studies

- [Astro + GSAP Portfolio Case Study (Codrops 2026)](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/)
- [GSAP + Astro View Transitions Forum](https://gsap.com/community/forums/topic/40524-gsap-with-astro-view-transitions-integration/)
- [Multi-page View Transitions with Astro (Codrops)](https://tympanus.net/codrops/2023/10/03/animating-multi-page-navigations-with-browser-view-transitions-and-astro/)

### Beverage brand inspiration

- [OLIPOP](https://drinkolipop.com/) — product grid, fiber line segmentation, ingredient story
- [Coca-Cola Brand Pages](https://www.coca-cola.com/us/en) — hero storytelling, brand world
- [Liquid Death](https://liquiddeath.com/) — bold brand personality, commerce integration
- [Awwwards Food & Drink](https://www.awwwards.com/websites/food-drink/)
- [Fizzi 3D Soda (GitHub)](https://github.com/Itssanthoshhere/Fizzi) — 3D can hero reference

### UX patterns

- [Scrollytelling Examples (Maglr)](https://www.maglr.com/blog/best-scrollytelling-examples)
- [Immersive Storytelling Guide (Utsubo)](https://www.utsubo.com/blog/immersive-storytelling-websites-guide)
- [Food & Beverage Hero Layouts (Medium)](https://medium.com/@mastinhouseco/top-10-food-and-beverage-brands-hero-layout-designs-for-inspiration-361968613dbc)

---

## Quick Start Command

When ready to build:

```bash
npm create astro@latest arodiya-softdrink
cd arodiya-softdrink
npx @astrojs/upgrade
npx astro add tailwind sitemap
npm install gsap lenis
npm install three @types/three   # optional, for 3D hero
npm run dev
```

---

## Decision Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Astro 7.0 | Static-first, islands, native view transitions, fastest builds |
| Not Next.js | — | Marketing site doesn't need React SSR overhead |
| Product data | Content Collections JSON | Type-safe, git-based, fast builds |
| Animation | GSAP + Lenis | Industry standard, proven with Astro |
| Page transitions | Astro ClientRouter | Native, no Swup needed |
| 3D | Three.js island | Homepage only, lazy loaded |
| CSS | Tailwind 4 | Rapid theming with CSS variables per flavor |

---

*This document is the single source of truth for building the Arodiya soft drink marketing website. Next step: run Phase 1 implementation.*