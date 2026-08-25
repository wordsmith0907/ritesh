# Site Map & Page Routing Specification

This document maps out the entire page structure and navigation architecture for the **Ramit Batra | Luxury Wedding Photography & Films** static clone project.

---

## 1. Primary Pages & Template Hierarchy

| Page Route | Template / Type | Target HTML File | Purpose / Key Sections |
| :--- | :--- | :--- | :--- |
| `/` | Homepage | `index.html` | Hero banner, marquee, Weddings teaser (4 cards), "Guided by Emotion" split section, "Hey There!" Mad-Libs contact form, About teaser, Testimonials carousel, Instagram feed, FAQ accordion, Footer |
| `/real-weddings` | Index / Grid | `real-weddings.html` | Full grid of wedding stories, filter by location/year/type, search capability, lazy-loading cards |
| `/real-weddings/[slug]` | Story Template | `real-weddings/suryagarh-jaisalmer-destination-wedding.html`<br>`real-weddings/thailand-wedding-at-shangri-la-bangkok.html`<br>`real-weddings/harpreet-gurleen-anand-karaj-celebration.html` | Hero image/video, couple names, venue, year, narrative text, photo grid (masonry/full-bleed), video embed, next/prev story navigation |
| `/films` | Video Grid | `films.html` | Cinematic film showreel, grid of video cards with hover preview, YouTube modal/lightbox player |
| `/portfolio` | Masonry / Lightbox | `portfolio.html` | Filterable high-res photo gallery (All, Pre-Wedding, Destination, Details), full-screen lightbox modal |
| `/about-us` | Brand Story | `about-us.html` | Ramit Batra bio, brand philosophy, credentials & press features, team spotlight, "Work With Us" CTA |
| `/contact-us` | Lead Capture | `contact-us.html` | Interactive Mad-Libs inquiry form, studio location (Delhi/Gurgaon), email/phone contacts, direct booking info |
| `/job` | Careers | `job.html` | Work With Us / Careers info, open positions, application form / portfolio submission guidelines |
| `/testimonials` | Reviews Grid | `testimonials.html` | Full client review list with quotes, couple photos, wedding location, link back to their Wedding case study |
| `/term-condition` | Legal Text | `term-condition.html` | Terms of service, copyright notices, privacy policy, disclaimer |
| `/blogs` | Blog Index | `blogs/index.html` | List of blog articles & wedding advice guides |
| `/blogs/[slug]` | Blog Post Template | `blogs/kaleerey-at-the-chooda-ceremony.html` | Article header, rich text content, embedded photo gallery, related posts |

---

## 2. Navigation Architecture & Shared Header/Footer Links

### Primary Header Navigation (Sticky Desktop & Mobile Drawer)
- **Weddings** $\rightarrow$ `/real-weddings.html`
- **Films** $\rightarrow$ `/films.html`
- **Portfolio** $\rightarrow$ `/portfolio.html`
- **About Us** $\rightarrow$ `/about-us.html`
- **Testimonials** $\rightarrow$ `/testimonials.html`
- **Contact Us (CTA Button)** $\rightarrow$ `/contact-us.html`

### Footer Links & Secondary Navigation
- **Quick Links**: Home, Weddings, Films, Portfolio, About Us, Testimonials, Contact Us, Work With Us (`/job.html`)
- **Legal**: Terms & Conditions (`/term-condition.html`), Privacy Policy
- **Social Links**: Instagram (`@ramitbatraphotography`), YouTube
- **Contact Info**: `ritesh@yourbusiness.com`, Delhi NCR, India
