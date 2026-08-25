# Design Tokens & Styling System Specification

This document serves as the single authoritative design token system for **Ramit Batra | Luxury Wedding Photography & Films**. Every HTML page and CSS file must reference these unified variables.

---

## 1. Color Palette Tokens

### CSS Custom Properties
```css
:root {
  /* Backgrounds */
  --color-bg-primary: #FAF5EA;        /* Signature warm ivory/cream background */
  --color-bg-secondary: #F6F6F2;      /* Light warm tint for alternate sections */
  --color-bg-card: #FFFFFF;           /* Crisp white for elevated card UI */
  --color-bg-dark: #0D0D0D;           /* Deep dark luxury background (hero overlays/footer) */
  --color-bg-dark-secondary: #141414; /* Dark secondary section background */

  /* Text & Content */
  --color-text-primary: #0D0D0D;      /* Deep black for titles and high-contrast text */
  --color-text-body: #363636;         /* Charcoal body text for readability */
  --color-text-muted: #666666;        /* Muted gray for captions and metadata */
  --color-text-light: #999999;        /* Light subtle text / placeholders */
  --color-text-inverse: #FFFFFF;      /* White text on dark backgrounds */

  /* Accent & Interactive */
  --color-accent-brand: #FF6017;      /* Warm vibrant orange brand accent */
  --color-accent-hover: #FF7738;      /* Hover state for orange buttons */
  --color-accent-blue: #0765C8;       /* Deep sapphire link/focus accent */

  /* Borders & Shadows */
  --color-border-light: #EDEAE8;      /* Delicate divider line color */
  --color-border-medium: #BABABA;     /* Medium border color for form controls */
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
}
```

---

## 2. Typography System

| Type Role | Font Family | Fallback | Weights | Letter Spacing | Text Transform | Typical Usage |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Headline Display** | `'Instrument Serif'` | `Georgia, serif` | 400 (Regular/Italic) | `-0.02em` | Normal / Title | Section titles, Hero headings, Pull quotes |
| **Sans Display / H1-H3** | `'Gilroy-Regular'`, `'Monument Extended Regular'`, `'Inter'` | `system-ui, sans-serif` | 400, 600, 700 | `0.02em` - `0.08em` | Upper / Title | Modern sans headers, Card titles, Hero subtitles |
| **Body Copy** | `'Inter'`, `'Satoshi'` | `system-ui, sans-serif` | 300, 400, 500 | `0` | Normal | Paragraph narrative text, blog posts, bio copy |
| **Meta & Technical** | `'Fragment Mono'` | `monospace` | 400 | `0.05em` | Uppercase | Dates, locations, tags, form input labels |

### Type Scale (Fluid Desktop to Mobile)
- **Display XL (Hero)**: `clamp(2.75rem, 6vw, 5.5rem)` (Line Height: 1.05)
- **H1 (Page Title)**: `clamp(2.25rem, 4.5vw, 4rem)` (Line Height: 1.1)
- **H2 (Section Heading)**: `clamp(1.75rem, 3.2vw, 2.75rem)` (Line Height: 1.15)
- **H3 (Subheading / Card Title)**: `clamp(1.25rem, 2vw, 1.75rem)` (Line Height: 1.25)
- **Body Large**: `1.125rem` (18px, Line Height: 1.6)
- **Body Regular**: `1rem` (16px, Line Height: 1.6)
- **Small / Meta**: `0.875rem` (14px, Line Height: 1.4)
- **Caption**: `0.75rem` (12px, Line Height: 1.4)

---

## 3. Spacing & Container Layout System

```css
:root {
  /* Container Widths */
  --max-width-site: 1440px;
  --max-width-content: 1200px;
  --max-width-narrow: 840px;

  /* Section Spacing */
  --space-section-padding-y: clamp(4rem, 8vw, 8rem);
  --space-container-padding-x: clamp(1.25rem, 4vw, 4rem);

  /* Element Gaps */
  --gap-grid-lg: 2.5rem;
  --gap-grid-md: 1.5rem;
  --gap-grid-sm: 1rem;
}
```

---

## 4. Breakpoints & Media Queries

- **Desktop Extra Large**: `1920px` (Max layout container expansion)
- **Desktop Standard**: `1440px` (Primary design reference)
- **Laptop / Tablet Landscape**: `1200px` (Grid layout switches from 4-col to 2-col/3-col)
- **Tablet Portrait**: `810px` (Header nav collapses to mobile drawer, forms stack vertically)
- **Mobile Device**: `390px` (Single column cards, touch-optimized button targets $\ge 48\text{px}$)
