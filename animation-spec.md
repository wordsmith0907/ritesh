# Animation & Motion Design Specification

This document details all GSAP animations, ScrollTrigger behaviors, and interactive transitions used across the **Ramit Batra | Luxury Wedding Photography & Films** project.

---

## 1. Core Motion Design Principles
- **Elegance & Fluidity**: Easing is tailored with smooth power curves (e.g. `power2.out`, `power3.inOut`, `expo.out`) to reflect high-end luxury editorial aesthetics.
- **Scroll-Triggered Reveals**: Elements fade up and stagger gracefully into view as they enter 85% of the viewport.
- **Accessibility & Motion Guard**: Automatically disable continuous marquee animations and heavy transforms when `(prefers-reduced-motion: reduce)` is enabled.

---

## 2. Reusable Motion Patterns (GSAP Utility Catalog)

### A. Headline SplitText / Word Reveal (`initRevealOnScroll`)
- **Trigger**: ScrollTrigger entering `top 85%` of viewport.
- **Animated Properties**: `y: 40px` $\rightarrow$ `0px`, `opacity: 0` $\rightarrow$ `1`.
- **Duration**: `1.0s`.
- **Easing**: `power3.out`.
- **Stagger**: `0.08s` delay between successive lines or words.

### B. Infinite Image & Logo Marquee (`initMarquee`)
- **Behavior**: Seamless looping horizontal scroll for brand badges, press logos, and horizontal photo strip.
- **Implementation**: GSAP timeline with `repeat: -1`, `ease: "none"`, duration `25s` - `40s` depending on item count.
- **Interaction**: Pauses smoothly on hover (`timeScale` decelerates to `0`).

### C. Card Hover Scale & Image Parallax (`initCardHover`)
- **Trigger**: Pointer enter/leave on Wedding & Portfolio cards.
- **Animated Properties**: Image `scale: 1.0` $\rightarrow$ `1.05` over `0.6s` (`power2.out`), overlay `opacity: 0.2` $\rightarrow$ `0.4`. Title text shifts slightly up `y: 0` $\rightarrow$ `-4px`.

### D. Accordion Toggle (`initAccordion`)
- **Trigger**: Click on FAQ header item.
- **Animated Properties**: Target body `height: 0` $\rightarrow$ `auto` (measured via `scrollHeight`), chevron rotation `0deg` $\rightarrow$ `180deg`.
- **Duration**: `0.4s` (`power2.inOut`).

### E. Photo Lightbox Modal (`initLightbox`)
- **Trigger**: Click on any image in Portfolio or Wedding gallery.
- **Animated Properties**: Modal backdrop `opacity: 0` $\rightarrow$ `1`, image `scale: 0.9` $\rightarrow$ `1.0`. Full keyboard (Esc, Left/Right arrows) and touch swipe support.

---

## 3. Page-Specific Motion Specifications

| Page | Section | Trigger | Motion Pattern / GSAP Details |
| :--- | :--- | :--- | :--- |
| **Home (`index.html`)** | Hero Banner | On Load | Soft fade-in of background media + staggered title text (`delay: 0.2s`) |
| **Home** | Weddings Teaser | Scroll | 4-card grid staggered reveal (`stagger: 0.15s`, `y: 50`) |
| **Home** | "Hey There!" Mad-Libs | Focus | Input underline color shift & highlight background subtle pulse |
| **Home** | FAQ Accordion | Click | Smooth expand/collapse using GSAP `height: "auto"` |
| **Weddings** | Index Grid | Scroll | Lazy card reveal on scroll, smooth filter tab category switch transition |
| **Films** | Video Grid | Hover | Video preview thumbnail plays audio-less loop on mouseover |
| **Portfolio** | Masonry Gallery | Scroll/Click | Image entrance animation + smooth lightbox expand |
| **Contact Us** | Mad-Libs Form | Input | Smooth expand of dynamic form fields and submit state feedback |
