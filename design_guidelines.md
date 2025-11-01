# Redline Design LLC - Design Guidelines

## Design Approach
**Reference-Based**: Drawing from modern agency websites with bold, conversion-focused design. High-impact hero sections, data visualization, and results-driven messaging aligned with "Digital Marketing that doesn't suck" brand voice.

## Brand Identity & Voice
- **Tone**: Bold, direct, no-fluff approach with conversational professionalism
- **Key Message**: Data-driven results, speed, affordability, and measurable ROI
- **Personality**: Confident, results-oriented, accessible

## Color System
- **Background**: Deep charcoal/near-black (#0a0a0a to #1a1a1a)
- **Text**: High-contrast white (#ffffff) for maximum readability
- **Accent**: Bold red for CTAs, underlines, and brand motifs
- **Supporting**: Subtle grays for cards and borders

## Typography
- **Display/Headlines**: Strong, geometric fonts (Inter Bold/Black or Oswald)
  - H1: 3xl-6xl, bold weight, tight leading
  - H2: 2xl-4xl, semi-bold
- **Body**: Inter regular for readability
  - Base: 16-18px (text-base to text-lg)
  - Supporting text: 14px (text-sm)
- **Hierarchy**: Clear contrast between headline impact and body clarity

## Layout System
- **Spacing**: Consistent rhythm using Tailwind units: 4, 8, 12, 16, 20, 24, 32
- **Containers**: max-w-7xl for content sections, full-width for hero/features
- **Grid**: Responsive grids (1 column mobile → 2-3 columns tablet → 3-4 desktop)
- **Section Padding**: py-16 to py-32 for vertical breathing room

## Component Library

### Navigation
- **Sticky header** with glassy background on scroll (backdrop-blur)
- Logo left, nav links center/right, "Book Demo" CTA button (red accent)
- Mobile: Hamburger menu with smooth slide-in drawer

### Hero Section
- **Full viewport height** with parallax motion background
- Animated red line motif overlaying subtle gradient
- Large H1 with punchy tagline
- Dual CTAs: Primary (solid red) + Secondary (outlined)
- Subtle scroll indicator at bottom

### Cards
- **Rounded-2xl** corners for modern softness
- Soft drop-shadows (shadow-lg) for depth
- **Hover states**: Lift effect (translateY -4px) with enhanced shadow
- Glass-morphism variants for overlays

### Service/Feature Cards
- Icon or visual element at top
- Bold headline (text-xl to text-2xl)
- Concise description (2-3 lines)
- "Get Started" mini-CTA
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile

### Tabbed Interface (Differentiators)
- Horizontal tabs with animated red underline on active state
- Content transitions with fade + slide
- Icons paired with tab labels
- Include mini data visualizations (charts, metrics)

### Value Tiles (Why Us)
- 2x3 or 3x2 grid layout
- Icon + headline + supporting text
- Staggered reveal animations on scroll
- Consistent height for visual harmony

### Stats/Metrics
- Large numbers with animated counters (count-up effect)
- Supporting label below
- Optional small chart/graph visualization
- 4-column layout on desktop, 2 on tablet

### Partner/Logo Row
- Horizontal scroll on mobile, grid on desktop
- Grayscale default → full color on hover
- Even spacing, consistent sizing

### CTA Bands
- Full-width sections with contrasting background
- Centered large headline + prominent button
- Generous padding (py-20)

### Forms
- Clean, spacious inputs with focus states
- Labels above inputs (text-sm, uppercase, tracked)
- Red border on validation errors
- Large submit button (w-full on mobile)
- SMS consent checkbox with legal copy
- Optional Calendly embed integration

### Footer
- Multi-column layout (4 columns desktop → stacked mobile)
- Nav links, policy links, social icons
- Micro-copy about response time
- Subtle top border separation

## Images
- **Hero Background**: Motion parallax effect (10-15% movement), subtle gradient overlay with animated red line motif
- **Service Cards**: Consider icon illustrations or abstract visuals
- **All images**: Optimized PNG for brand assets, WebP for photos, lazy-loaded below fold

## Animation Strategy
**Subtle and purposeful** - respect reduced-motion preferences

### Section Reveals
- Fade-up 20px on scroll into view
- 300-450ms stagger between elements
- Intersection Observer triggers

### Micro-interactions
- Buttons: Scale 1.02 on hover, subtle ripple on click
- Cards: Lift + shadow enhancement on hover
- Links: Red underline slide-in effect

### Specialty Animations
- Parallax hero background (10-15% scroll-based movement)
- Stat counter animations (count-up from 0)
- Tab content fade + slide transitions
- Logo grayscale → color on hover

### Performance
- All animations: GPU-accelerated (transform, opacity)
- No layout-shifting animations
- Reduced-motion media query respected

## Responsive Behavior
- **Mobile-first approach**: Design for 375px up
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch targets**: Minimum 44x44px for mobile
- **Navigation**: Hamburger menu below lg breakpoint
- **Typography**: Scale down 1-2 sizes on mobile
- **Grids**: Collapse to 1-2 columns on mobile

## Accessibility
- **Keyboard navigation**: All interactive elements focusable
- **Focus indicators**: Visible red outline (2px)
- **ARIA labels**: Where needed for screen readers
- **Color contrast**: WCAG 2.2 AA compliant (minimum 4.5:1)
- **Reduced motion**: Respect prefers-reduced-motion
- **Form validation**: Clear error messaging

## Performance Targets
- **Lighthouse score**: 95+ on mobile
- **Lazy loading**: All below-fold images and heavy components
- **Code splitting**: Route-based and component-level
- **Font loading**: Subset and preload critical fonts only
- **Image optimization**: next/image with proper sizing

## Page-Specific Notes

### Homepage
6-7 sections: Hero → What We Do cards → Tabbed Differentiators → Why Us tiles → Partner logos → CTA band → Footer

### Services
Accordion or expandable cards for each service category with detailed breakdowns

### Book a Demo
Clean, focused form with Calendly embed option and prominent legal consent language

### Blog/Articles
Card-based index with featured image, category tag, excerpt, read time

### Policy Pages
Simple, readable markdown rendering with table of contents for longer documents