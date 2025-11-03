# Redline Design LLC - Digital Marketing Agency Website

## Overview

This project is a modern, conversion-focused single-page application for Redline Design LLC, a digital marketing agency. It showcases services, company values, and lead generation capabilities with an emphasis on bold design, data-driven results, and a high-performance user experience. The website targets businesses seeking SEO, PPC, web design, social media marketing, and email marketing services, highlighting ROI and quick turnaround times. Key features include dynamic testimonial displays, interactive service showcases, a comprehensive blog management system, and engaging UI animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with **React 18** and **TypeScript**, using **Vite** for fast development and optimized builds. It follows an **SPA Architecture** with client-side routing via **Wouter**. **shadcn/ui** components, based on Radix UI, are styled with **Tailwind CSS** using a custom design system. **Framer Motion** handles declarative animations. State management uses **TanStack Query** for server state and React hooks for local component state. The design emphasizes deep charcoal backgrounds, bold red accents, Inter font, and consistent animation patterns including a custom glowing cursor (desktop only, disabled on mobile/tablets) and pulsing red glow for brand taglines and section headers.

**Frosted Glass Design System**: All card elements site-wide feature a sophisticated frosted glass effect with a subtle hexagon pattern overlay. Implementation includes 12px backdrop blur for the glass effect, plus a very small (20px) SVG hexagon pattern in light mode (8% opacity white) and dark mode (5% opacity white). The pattern is applied via CSS pseudo-elements to all `bg-card` elements throughout the application, creating a cohesive premium aesthetic.

**Performance Optimizations**: The application implements comprehensive performance optimizations including:
- Custom cursor uses refs instead of state to eliminate re-renders
- `useReducedMotion` hook respects user accessibility preferences (prefers-reduced-motion)
- AnimatedBackground features tab visibility detection, throttled mouse events (60fps), and reduced hexagon count on mobile
- React.memo applied to ServiceCard and ArticleCard to prevent unnecessary re-renders
- CSS performance optimizations on all `.bg-card` elements: `contain: layout paint` and `transform: translateZ(0)` for GPU acceleration
- Lazy loading on all images
- Scroll performance improved from ~405ms average frame intervals to ~30ms (13x improvement)

### Backend Architecture

The backend utilizes **Express.js** with **TypeScript**, providing RESTful APIs for various functionalities. Key API endpoints include `/api/chat` (for AI assistant), `/api/reviews` (fetching and syncing Google Business Profile reviews), and a comprehensive `/api/blog` suite for CRUD operations on blog posts, including an external API for automated content creation. The development server uses Vite in middleware mode for HMR.

### Data Storage

**Drizzle ORM** is used with **PostgreSQL** (Neon Database compatible) for data persistence. The schema defines tables for `Users` (for Replit Auth), `Sessions`, `Reviews` (with Google Business Profile integration), and `Blog Posts` (with detailed metadata). Drizzle-Zod is integrated for runtime schema validation.

## External Dependencies

### Third-Party Services

-   **OpenAI API**: Powers the AI assistant chat widget.
-   **Neon Database**: Serverless PostgreSQL database.
-   **Google Business Profile API**: Syncs 5-star reviews with profile photos.
-   **Google Fonts**: For loading the Inter font family.

### UI Libraries

-   **Radix UI**: Provides accessible, unstyled component primitives.
-   **Framer Motion**: For animations and transitions.
-   **Lucide React** and **React Icons**: Icon libraries.
-   **cmdk**: Command palette component.
-   **embla-carousel-react**: Touch-friendly carousel.
-   **react-intersection-observer**: For viewport-based animations.

### Development Tools

-   **Replit-specific plugins**: For enhanced development experience.
-   **TypeScript**: For type-safe development.
-   **ESBuild**: For server-side bundling.

### Form Handling

-   **React Hook Form**: For form state management.
-   **Zod**: For schema validation.
-   **@hookform/resolvers**: Zod integration with React Hook Form.