# RootWorks Agency Website

## Project Overview
rootworks.ai — The website for Rootworks, an AI-powered full-service agency. We build websites, apps, automations, SEO systems, and AI training programs. The site must convert visitors into booked calls.

## Brand Identity
- **Name:** Rootworks
- **Tagline:** "We build what others quote."
- **Tone:** Quiet confidence. Let the work speak. Minimal words, maximum impact. Think More Air meets Linear — editorial restraint, premium feel, zero fluff.

## Tech Stack
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- GSAP + ScrollTrigger (scroll animations — subtle, not flashy)
- Framer Motion (page transitions, micro-interactions)
- Lucide React (icons, used sparingly)
- Google Fonts: Instrument Serif (display/headings) + DM Sans (body)
- Deployed on Vercel

## Design System — "Quiet Light"

### Design Philosophy
Whitespace is the design. Typography does the heavy lifting. One powerful visual element (hero image) anchors the page. Everything else recedes. No decorative noise — every element earns its place.

### Colors
```
Light theme:
  bg:           #FAFAFA     (near-white, warm)
  bg-warm:      #F5F3EF     (slightly warmer for alternating sections)
  card:         #FFFFFF     (pure white cards with subtle shadow)
  elevated:     #F0EEED     (hover states, subtle highlights)
  border:       rgba(0,0,0,0.08)
  border-hover: rgba(0,0,0,0.15)

  text:         #1A1A1A     (near-black, primary)
  text-dim:     rgba(0,0,0,0.55)
  text-muted:   rgba(0,0,0,0.35)

  accent:       #1A1A1A     (black IS the accent — CTAs, emphasis)
  accent-subtle: rgba(0,0,0,0.05)  (hover backgrounds)
```

**Important: This is essentially a monochrome palette.** Black text on white background. No bright accent colors. The visual interest comes from typography scale, whitespace, and the hero image. If you need a rare highlight, use a warm muted tone like `#8B7355` (earth) but sparingly.

### Typography
- **Display/Headlines:** Instrument Serif, 400 weight (regular), italic for select emphasis
- **Body:** DM Sans, 300-400 weight (light to regular)
- **Hero h1:** clamp(56px, 9vw, 120px), letter-spacing: -3px, line-height: 1.0
- **Section h2:** clamp(40px, 6vw, 72px), letter-spacing: -2px, line-height: 1.05
- **Section subtitles:** 18-20px, DM Sans light (300), max-width 560px
- **Labels:** 11-12px, DM Sans medium (500), uppercase, letter-spacing: 3-4px, text-muted
- **Body text:** 16px, line-height: 1.75, text-dim
- **Card titles:** 22-28px, Instrument Serif

### Spacing — Generous, Breathing
- Section padding: 160-200px vertical (100px on mobile)
- Container max-width: 1100px (narrower than typical for elegance), padding: 0 40px
- Between section header and content: 80-100px
- Between cards: 24-32px
- Card internal padding: 40-48px
- Paragraph max-width: 560px (never wider — keeps reading comfortable)

### Component Patterns

**Navigation:**
- Clean, minimal. Logo left, links right.
- No backdrop blur, no visible background initially
- Show subtle bg on scroll (bg-bg with border-bottom)
- Links: text-dim, hover: text (black). No underlines.
- CTA: "Book a Call" — black bg, white text, rounded-full pill, hover: slight scale

**Hero:**
- Dominant hero image, centered, very large (70-80vh or close)
- Headline above or overlapping the image, Instrument Serif, massive
- Short subtitle below in DM Sans light
- Tons of whitespace above and below
- No stats bar, no badges, no accent dots — just type + image + air

**Section Headers:**
- Small uppercase label (no dot, just text) — text-muted
- Large Instrument Serif headline
- Optional subtitle paragraph
- Centered OR left-aligned depending on section
- Massive whitespace below before content

**Service Blocks:**
- NOT cards with borders. Instead: clean text blocks in a grid.
- Each service: small number ("01"), bold title, paragraph description
- 2-column or 4-column grid with generous gap
- No background colors, no borders, no pills/tags — just type
- Divider lines (1px, very subtle) between items if needed

**Case Study Cards:**
- Clean image + text cards, no heavy borders
- Subtle shadow or no border at all on white bg
- Title + one-line description + small category label
- Hover: subtle lift or image scale
- Metrics shown as clean inline text, not boxed

**Process Steps:**
- Numbered (01, 02, 03, 04), sequential
- Title + short description per step
- Clean horizontal or vertical layout
- No card backgrounds — just numbered text blocks

**FAQ / Questions:**
- Accordion style, click to expand
- Clean divider lines between items
- Question in semi-bold, answer in body text

**Testimonials:**
- Large italic Instrument Serif quote
- Author name + role below
- One at a time, centered, lots of whitespace
- Optional: carousel dots to cycle through multiple

**CTA:**
- Very simple. Large headline, short subtitle, one button.
- Button: black bg, white text, pill shape
- Centered, massive whitespace around it

**Footer:**
- Minimal. Single line or two lines max.
- © 2026 Rootworks. + contact links
- No multi-column footer grid — keep it ultra clean

### Animation Principles — Subtle is Sexy

**Philosophy:** Animations should feel like the page is breathing, not performing. Nothing should feel "animated" — it should feel natural.

**Scroll Reveals:**
- Elements fade in gently: opacity 0→1, y: 20→0 (NOT 40px — keep it subtle)
- Duration: 0.7s, ease: "power2.out"
- ScrollTrigger start: "top 80%"
- Stagger: 0.08-0.1s (faster, more cohesive)
- No scale transforms on reveal (too flashy)

**Hero Load:**
- Headline fades in (0.8s), image fades in slightly delayed (0.3s after)
- Subtitle last (0.5s after headline)
- Very gentle, no dramatic staging

**Hover States:**
- Links: opacity transition or color shift only
- Cards: translateY(-2px) max, subtle shadow increase
- Buttons: scale(1.02), not 1.05 — restraint
- Image cards: image scale(1.03) with overflow hidden

**Marquee:**
- Slow, steady, continuous. 30s+ duration.
- Text in text-muted, very understated
- No accent dots between items — use middot (·) or extra spacing

**No:**
- No glow effects
- No colored shadows
- No accent-colored decorations
- No grain textures
- No gradient overlays on backgrounds
- No bouncing, pulsing, or attention-grabbing motion

### DO NOT
- Use dark theme
- Use bright accent colors (lime, green, blue)
- Use decorative dots, lines, badges, or pills unless essential
- Use heavy card borders or card backgrounds with color
- Use stock photos or generic imagery
- Add decorative elements that don't serve information
- Over-animate anything
- Make anything feel "techy" or "startup-y"
- Use emoji anywhere in the UI

### DO
- Leave generous whitespace — when in doubt, add more space
- Let typography create hierarchy instead of colors/decoration
- Keep copy short and confident
- Make the hero image the star of the page
- Use subtle divider lines (1px, very low opacity) for structure
- Keep the overall feeling: quiet, warm, confident, premium

## Site Structure

Single page, sections in order:

1. **Navigation** — Minimal, transparent initially, bg on scroll
2. **Hero** — Massive headline + hero image + short subtitle
3. **Services** — 4 text blocks in a grid (Build, Optimize, Automate, Train)
4. **Industries Marquee** — Slow scrolling industry/tech tags
5. **Work** — Case study cards with clean layout
6. **Process** — 4 numbered steps (Align/Discover, Build, Refine, Deploy)
7. **FAQ** — "Good questions" accordion section
8. **Testimonials** — Rotating quotes from clients
9. **CTA** — Simple "Got a project?" + contact button
10. **Footer** — Minimal, one line

### Contact Integration
- **Calendly:** CTA buttons link to booking page
- **WhatsApp:** Small icon link in footer or nav (not floating button — too noisy for this aesthetic)
- **Email:** victor@rootworks.io

## Hero Image

The hero image is THE defining visual element of the site. It should be:
- A striking, high-quality image or 3D render
- Abstract but evocative — something organic meeting technology
- Light/neutral tones that work with the white background
- Centered, large (spanning most of viewport width)
- Think: ethereal cloud forms, abstract botanical, organic geometry

For now, use a placeholder (solid light gray box with dimensions). The actual image will be created separately and dropped in.

Placeholder: 1200x800 rounded-2xl bg with `bg-[#E8E6E1]` and centered text "Hero Image" in text-muted.

## Content
All copy in CONTENT.md. Some sections will need copy adjustments to match the quieter, more confident tone of this design direction.

## File Structure
```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Navigation.tsx
    Hero.tsx
    Services.tsx
    IndustryMarquee.tsx
    Work.tsx
    Process.tsx
    FAQ.tsx
    Testimonials.tsx
    CallToAction.tsx
    Footer.tsx
    ScrollReveal.tsx
  lib/
    gsap.ts
    constants.ts
```
