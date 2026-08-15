# Riwaaz Entertainment -- website

Plain HTML/CSS/JS, no build step. Deploys to Vercel as-is.

## Tech Stack
- **HTML5** -- Semantic markup, SEO-optimized
- **CSS3** -- Custom properties, CSS animations, responsive grid layouts
- **Vanilla JS** -- No frameworks or libraries
- **Fonts** -- Playfair Display, DM Sans, Dancing Script (via Google Fonts)

## Features
- Full-viewport hero with animated particle background
- Scrolling trust strip with key stats
- 6 detailed service cards with hover effects
- Animated counter stats section
- Testimonial carousel with auto-advance
- 4-step "How It Works" timeline
- FAQ accordion
- Enquiry form that redirects to WhatsApp with pre-filled message
- Fully responsive (mobile, tablet, desktop)
- Scroll-reveal animations
- Active nav highlighting on scroll

## Deploy to Vercel
1. Create a new GitHub repo and push this folder's contents to it (or drag-and-drop the folder into vercel.com/new).
2. In Vercel: **New Project -> Import** this repo. Framework preset: **Other** (static site). No build command needed.
3. Once deployed, go to **Settings -> Domains** and add your domain, then follow Vercel's DNS instructions.

## Before going live
- [ ] Confirm the stats numbers (150+ events, 5+ years, 50+ venue partners, 4.9 rating) are accurate
- [ ] Confirm the WhatsApp number (+919887577752) is correct for the WhatsApp Business API
- [ ] Double-check the address in all pages matches official documents
- [ ] Add real event photos when available -- the design is photo-ready with placeholder gradients
- [ ] Add Instagram link if applicable

## Files
- `index.html` -- Homepage (hero, about, services, stats, testimonials, process, FAQ, contact)
- `privacy.html` -- Privacy policy (required for Meta/WhatsApp Business Verification)
- `style.css` -- Complete design system and styles (~1200 lines)
- `script.js` -- Interactions, animations, and form logic (~236 lines)
- `assets/logo.png` -- Brand logo
