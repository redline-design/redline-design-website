# Redline Design LLC - Digital Marketing Agency Website

## Overview

This project is a modern, conversion-focused single-page application for Redline Design LLC, a digital marketing agency. It showcases services, company values, and lead generation capabilities with an emphasis on bold design, data-driven results, and a high-performance user experience. The website targets businesses seeking SEO, PPC, web design, social media marketing, and email marketing services, highlighting ROI and quick turnaround times. Key features include dynamic testimonial displays, interactive service showcases, a comprehensive blog management system, and engaging UI animations.

## Recent Updates (November 2025)

### Conversion-Focused Homepage Restructuring
The homepage has been restructured with **progressive disclosure** to serve both beginner and advanced users:

**New Components:**
- **Sticky Conversion Bar** (`StickyConversionBar.tsx`): Appears after 300px scroll, features prominent "Book Free Consultation" CTA, dismissible with localStorage persistence
- **Beginner Explainer** (`BeginnerExplainer.tsx`): Collapsible section accessible via "Learn More" anchor from hero, explains digital marketing basics in 3 simple steps
- **Services Deep Dive** (`ServicesDeepDive.tsx`): Accordion-style expandable service cards below the visual carousel, shows detailed information including What You Get, Perfect For, Timeline, and Investment for each service

**Modified Components:**
- **Hero**: Simplified with ultra-clear value proposition "We grow your business online", dual CTAs (primary: Book Consultation, secondary: Learn More anchor link)
- **Statistics**: Streamlined from 7 to 3 outcome-focused metrics (14x Average ROI, 76% consumer research, 3-6 months to results)
- **Testimonials**: Reframed with beginner-friendly heading "From Skeptical to Successful" and subheading "Real business owners who took the leap (you can too)"

**Conversion Flow:**
Hero → Learn More (anchor) → Beginner Explainer → Services Carousel (visual) → Services Deep Dive (detailed) → Stats → Testimonials → Sticky Bar (persistent CTA)

This structure allows beginners to get quick answers while advanced users can dig into detailed service information on demand.

### Service Pages Infrastructure (November 2025)

**Dedicated Service Pages**: Created comprehensive service pages system with 10 individual service pages accessible via both homepage carousel and header navigation dropdown.

**Components:**
- **ServicePageTemplate** (`ServicePageTemplate.tsx`): Reusable template component with hero section, dual CTAs (Get Started + Book a Demo), What You Get benefits list, Perfect For description, Timeline info, and Investment pricing
- **10 Service Pages** (`client/src/pages/services/`):
  - `websites.tsx` - World Class Websites
  - `paid-advertising.tsx` - Paid Advertising  
  - `seo.tsx` - SEO/SEM (waitlist status badge)
  - `crm.tsx` - CRM Setup & Automation
  - `analytics.tsx` - Analytics & Data Analysis
  - `design.tsx` - Graphic Design
  - `social-media.tsx` - Social Media Marketing
  - `email-marketing.tsx` - Email Marketing
  - `consulting.tsx` - Consulting
  - `ai-automation.tsx` - AI Automation
- **Contact Page** (`Contact.tsx`): Lead generation form with react-hook-form + zod validation, includes all fields (name, email, phone, company, service dropdown, message) with toast notifications

**Navigation Updates** (`Header.tsx`):
- **Desktop**: Services dropdown menu using shadcn DropdownMenu with hover interaction, displays all 10 services
- **Mobile**: Expandable Services section with smooth animations, ChevronDown icon rotates on expand/collapse
- Service links updated in HorizontalScrollServices component to navigate to dedicated pages

**Routing**: All service pages route to `/services/{service-name}` pattern, contact form at `/contact`

### Portfolio System (November 2025)

**Portfolio Showcase**: Redesigned Our Work page as a modern portfolio with database-backed project management.

**Database Schema** (`shared/schema.ts`):
- **portfolioItems Table**: Stores portfolio projects with fields for title, url, screenshotUrl, description, category, featured flag, displayOrder, and timestamps
- Full Drizzle ORM integration with Zod schemas for validation
- PostgreSQL backend with UUID primary keys

**API Endpoints** (`/api/portfolio`):
- GET /api/portfolio - Retrieve all portfolio items ordered by displayOrder
- GET /api/portfolio/:id - Retrieve single portfolio item
- POST /api/portfolio - Create new item (admin only)
- PATCH /api/portfolio/:id - Update item (admin only)
- DELETE /api/portfolio/:id - Delete item (admin only)

**Our Work Page** (`client/src/pages/OurWork.tsx`):
- Modern portfolio showcase with responsive grid layout
- **Responsive Design**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- Portfolio cards with hover effects: image zoom (scale 1.1), color transitions
- Frosted glass card design with backdrop blur
- Smooth scroll animations using Framer Motion and react-intersection-observer
- React Query integration for data fetching
- Loading skeleton and empty states

**Admin Portfolio Management** (`client/src/pages/Admin.tsx`):
- Portfolio section in admin dashboard for CRUD operations
- View website functionality (opens in new tab)
- Delete with confirmation dialog
- React Query mutations with proper cache invalidation
- Toast notifications for user feedback
- Dual-path screenshot capture: Automated via ScreenshotOne API + manual upload fallback
- Logo upload functionality with file validation
- Edit dialog with form validation for all portfolio fields

**Admin Dashboard Reorganization** (November 2025):
- **Collapsible Sections**: All major sections (Employee Tools, Customer Reviews, Blog Posts, Portfolio) are now collapsible with smooth animations
- **Collapsed by Default**: All sections start collapsed for cleaner dashboard layout and reduced cognitive load
- **Employee Tools Section**: New dedicated section with quick access to:
  - Website Hosting Subscription Link (Stripe payment link for client hosting)
  - Redline Ascend SEO Tool (SEO analysis and optimization platform)
  - Redline Onboarding (Client onboarding system)
- Each section features a ChevronDown icon that rotates on expand/collapse
- Uses shadcn Collapsible component with smooth transitions

### Manual Customer Review Management (November 2025)

**Manual Review System**: Implemented comprehensive manual review creation and management system allowing admins to add, edit, and delete customer testimonials directly through the admin dashboard.

**Database Schema** (`shared/schema.ts`):
- **reviews Table**: Stores customer reviews with fields for name, role, company, content, rating, profilePhotoUrl, reviewDate
- All manually created reviews default to 5-star rating
- No integration with external review platforms

**API Endpoints** (`/api/reviews`):
- GET /api/reviews - Retrieve all reviews
- POST /api/reviews - Create new review (admin only)
- PATCH /api/reviews/:id - Update review (admin only)
- DELETE /api/reviews/:id - Delete review (admin only)

**Admin UI** (`client/src/pages/Admin.tsx`):
- **Create Review Form**: Dialog-based form with react-hook-form + zod validation
  - Name (required)
  - Job Title/Role (optional)
  - Company (optional)
  - Review Content (required, textarea)
  - Rating automatically set to 5 stars
- **Review Management**: 
  - Edit button opens pre-filled form for updating reviews
  - Delete button with confirmation dialog
  - Frosted glass card design for review display
  - Real-time updates with React Query cache invalidation
  - Toast notifications for all operations

**Features:**
- All reviews default to 5-star rating
- Simple form validation with minimum character requirements
- Proper error handling with toast notifications
- Unauthorized access redirects to login
- Follows existing shadcn component patterns
- Maintains consistent frosted glass design system

**Initial Portfolio Items** (5 seeded projects):
1. Morf Media Photos (Photography)
2. NAP Sales (E-commerce)
3. National GMC (Automotive)
4. Phoenix Rising Treatment (Healthcare)
5. Paula's Spa & Palette (Beauty & Wellness)

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