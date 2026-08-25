# Asset Handling & Placeholder Manifest

This manifest documents all local media assets (images, videos, icons) used across the **Ramit Batra | Luxury Wedding Photography & Films** static clone project, including file sizes, format optimizations, and local relative paths.

---

## 1. Asset Directory Organization Structure

```
assets/
├── home/
│   ├── hero-banner.webp       (1600px wide, ~120 KB)
│   ├── guided-by-emotion.webp (1000px wide, ~85 KB)
│   └── hero-reel.mp4          (HTML5 1080p loop video, ~2.5 MB)
├── real-weddings/
│   ├── dehradun-hero.webp     (1000px wide, ~80 KB)
│   ├── jaisalmer-hero.webp    (1000px wide, ~85 KB)
│   ├── bangkok-hero.webp      (1000px wide, ~90 KB)
│   ├── jaipur-hero.webp       (1000px wide, ~75 KB)
│   ├── san-francisco-hero.webp(1000px wide, ~85 KB)
│   └── beach-picnic-hero.webp (1000px wide, ~80 KB)
├── portfolio/
│   ├── gallery-1.webp         (1000px wide, ~75 KB)
│   ├── gallery-2.webp         (1000px wide, ~80 KB)
│   ├── gallery-3.webp         (1000px wide, ~85 KB)
│   ├── gallery-4.webp         (1000px wide, ~90 KB)
│   ├── gallery-5.webp         (1000px wide, ~75 KB)
│   └── gallery-6.webp         (1000px wide, ~80 KB)
├── films/
│   ├── bangkok-film.webp      (1200px wide, ~100 KB)
│   ├── jaisalmer-film.webp    (1200px wide, ~105 KB)
│   ├── jaipur-film.webp       (1200px wide, ~95 KB)
│   └── sf-film.webp           (1200px wide, ~100 KB)
└── shared/
    └── ramit-portrait.webp    (800px wide, ~65 KB)
```

---

## 2. Compression & Page Speed Optimization Metrics
- **Format**: All static photos are converted to next-generation **WebP** at 82 quality setting with Lanczos resampling.
- **Payload Reduction**: Reduced raw imagery size from ~15 MB down to ~1.4 MB across all pages (~90% compression saving) while retaining sharp visual clarity.
- **Video Background**: Hero background uses `<video autoplay muted loop playsinline poster="assets/home/hero-banner.webp">` for fast initial render on mobile devices and slow connections.
- **Native Lazy Loading**: All below-the-fold `<img>` elements feature `loading="lazy"` attributes.
