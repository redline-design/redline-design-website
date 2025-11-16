# Redline Design LLC - Digital Marketing Agency Website

## Overview

This project is a modern, conversion-focused single-page application for Redline Design LLC, a digital marketing agency. It showcases services, company values, and lead generation capabilities with an emphasis on bold design, data-driven results, and a high-performance user experience. The website targets businesses seeking SEO, PPC, web design, social media marketing, and email marketing services, highlighting ROI and quick turnaround times. Key features include dynamic testimonial displays, interactive service showcases, a comprehensive blog management system, and engaging UI animations. The business vision is to provide a compelling online presence that drives client acquisition and demonstrates Redline Design LLC's expertise in digital marketing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with **React 18** and **TypeScript**, using **Vite** for fast development and optimized builds. It follows an **SPA Architecture** with client-side routing via **Wouter**. **shadcn/ui** components, based on Radix UI, are styled with **Tailwind CSS** using a custom design system. **Framer Motion** handles declarative animations. State management uses **TanStack Query** for server state and React hooks for local component state. The design emphasizes deep charcoal backgrounds, bold red accents, Inter font, and consistent animation patterns including a custom glowing cursor (desktop only, disabled on mobile/tablets). A sophisticated frosted glass design system with a hexagon pattern overlay is applied to all card elements. Performance optimizations include `useReducedMotion`, `React.memo`, CSS performance optimizations (`contain: layout paint`, `transform: translateZ(0)`), lazy loading, and optimized scroll performance.

**Color Scheme Architecture**:
- **Service Pages**: Follow a **monochromatic + accent** color scheme for professional appearance - neutral gray/silver for icons and headings, muted green for success indicators (checkboxes), red exclusively for CTA buttons. Service section headings use `service-section-heading` and `service-glow-pulse` classes with neutral gray glow animation.
- **Marketing Pages**: Preserve bold red branding for section headers (`red-glow-pulse` class) to maintain strong brand identity on homepage, Why Us, and About pages.
- **Design Philosophy**: Red is reserved exclusively for CTA buttons site-wide to create clear visual hierarchy and drive conversions. Icon containers use dark shadows only (no light bleed or glare) for sophisticated neumorphic appearance.

Key features include:
- **Conversion-Focused Homepage**: Progressive disclosure for diverse user needs with a sticky conversion bar, beginner explainer, and detailed services deep dive.
- **Scroll Animation System**: Smooth scroll-based animations using `SectionDivider` and `ScrollAnimatedSection` for enhanced visual flow across major pages (Homepage, Why Us, Service Pages).
- **Dedicated Service Pages**: Comprehensive system for 10 individual service pages (`ServicePageTemplate`) with consistent layout for details, CTAs, benefits, timeline, and investment.
- **Modern Portfolio System**: Database-backed project showcase with responsive grid, interactive cards, and admin CRUD management.
- **Manual Customer Review Management**: Admin dashboard allows manual creation, editing, and deletion of customer testimonials.
- **Admin Dashboard Reorganization**: Collapsible sections for improved usability and dedicated Employee Tools.

### Backend Architecture

The backend utilizes **Express.js** with **TypeScript**, providing RESTful APIs for various functionalities. Key API endpoints include `/api/chat` (for AI assistant), `/api/reviews` (fetching and syncing Google Business Profile reviews, and manual management), `/api/blog` (CRUD operations for blog posts and external content creation), and `/api/portfolio` (CRUD operations for portfolio items). The development server uses Vite in middleware mode for HMR.

### Data Storage

**Drizzle ORM** is used with **PostgreSQL** (Neon Database compatible) for data persistence. The schema defines tables for `Users` (for Replit Auth), `Sessions`, `Reviews` (with Google Business Profile integration and manual entries), `Blog Posts`, and `Portfolio Items`. Drizzle-Zod is integrated for runtime schema validation.

## External Dependencies

### Third-Party Services

-   **OpenAI API**: Powers the AI assistant chat widget.
-   **Neon Database**: Serverless PostgreSQL database.
-   **Google Business Profile API**: Syncs 5-star reviews with profile photos (for automated reviews).
-   **Google Fonts**: For loading the Inter font family.
-   **ScreenshotOne API**: Automated screenshot capture for portfolio items.

### UI Libraries

-   **Radix UI**: Provides accessible, unstyled component primitives.
-   **Framer Motion**: For animations and transitions.
-   **Lucide React** and **React Icons**: Icon libraries.
-   **cmdk**: Command palette component.
-   **embla-carousel-react**: Touch-friendly carousel.
-   **react-intersection-observer**: For viewport-based animations.
-   **shadcn/ui**: Component library built on Radix UI and Tailwind CSS.

### Form Handling

-   **React Hook Form**: For form state management.
-   **Zod**: For schema validation.
-   **@hookform/resolvers**: Zod integration with React Hook Form.