# Redline Design LLC - Digital Marketing Agency Website

## Overview

This is a modern, conversion-focused website for Redline Design LLC, a digital marketing agency. The application is built as a single-page application with multiple routes showcasing services, company values, and lead generation forms. The site emphasizes bold design, data-driven results messaging, and high-performance user experience with subtle animations throughout.

The project targets digital marketing clients looking for SEO, PPC, web design, social media marketing, and email marketing services, with a focus on demonstrating ROI (14x average return) and quick turnaround times.

**Recent Changes (November 2025)**
- Integrated Google Business Profile API for automatic 5-star review syncing with profile photos
- Reviews stored in PostgreSQL with automatic deduplication
- Moved metrics section (Client Satisfaction, ROI, Success Stories, Retention) from standalone Testimonials page to Home page
- Removed standalone Testimonials page and navigation link
- **Blog Management System**: Complete blog platform with database-backed content, admin dashboard, and external API integration
  - Database schema for blog posts with all necessary fields (title, slug, content, excerpt, category, author, etc.)
  - Replit Auth integration for admin authentication and authorization
  - Admin dashboard at `/admin` for creating, editing, and deleting blog posts
  - External API endpoint (`POST /api/external/blog/posts`) with API key authentication for automated content creation
  - Security: Unpublished posts protected from unauthenticated access on both listing and individual post endpoints
  - Seeded with 6 example blog posts covering SEO, PPC, Web Design, Social Media, Email Marketing, and Local SEO
- **Horizontal Scrolling Services Section**: Interactive "What We Do" section with scroll-based horizontal movement
  - Displays 10 service cards: World Class Websites, Paid Advertising, SEO/SEM, CRM Setup & Automation, Analytics & Data Analysis, Graphic Design, Social Media Marketing, Email Marketing, Consulting, and AI Automation
  - Uses Framer Motion's useScroll and useTransform for scroll-linked horizontal translation (110% translation for very fast scrolling)
  - Progress bar indicator showing scroll position through services with accessible aria-valuenow updates
  - Sticky positioning with minimal container height (120vh on mobile, 150vh on desktop) allowing users to easily scroll past without viewing all services
  - Glassmorphism background (backdrop-blur-md, bg-card/40) with subtle border and rounded corners matching site theme
  - Contained within max-w-6xl centered container (wider than before) with overflow-hidden to clip cards within the section
  - **Scroll Locking Behavior**: When hovering over the section, scrolling is locked until horizontal scroll completes (progress reaches 100%). When not hovering, users can freely scroll past the section
  - Services centered on screen for optimal viewing while scrolling
  - Each service card has unique accent color and icon for visual differentiation
  - **Mobile-responsive design**:
    - Card sizes: 85vw × 240px (mobile), 300px × 260px (sm), 320px × 280px (md+)
    - Gap between cards: 16px (mobile), 32px (desktop)
    - Reduced padding and text sizes on smaller screens
    - Optimized touch-friendly scrolling experience
  - Cards use flexbox layout with "Learn More" buttons positioned at bottom

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing (alternative to React Router)
- **SPA Architecture** with code-splitting at the route level

**UI Component System**
- **shadcn/ui** component library built on Radix UI primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling with custom design tokens
- **Framer Motion** for declarative animations and transitions
- Custom theme system supporting light/dark modes via React Context

**State Management**
- **TanStack Query (React Query)** for server state management and caching
- Local component state with React hooks
- Theme state managed through Context API with localStorage persistence

**Design System**
- Deep charcoal/near-black backgrounds (#0a0a0a to #1a1a1a)
- Bold red accent colors for CTAs and brand elements
- Custom Tailwind configuration with extended spacing, border radius, and color tokens
- Typography using Inter font family (loaded from Google Fonts)
- Glassmorphism effects with backdrop-blur for cards and overlays
- Consistent animation patterns: fade/slide/scale reveals, hover elevations, stat counters
- **Custom Cursor**: Single glowing dot cursor with red accent
  - 8px red dot with glowing shadow (15-25px blur radius)
  - Interactive states: Expands 2.5x and changes to white when hovering over clickable elements
  - Smooth transitions with cubic-bezier easing
  - Implemented in App.tsx with real-time mouse tracking
- **Brand Tagline Styling**: All section headers use red (#ff0000), uppercase text with wide letter spacing (0.3em), and a pulsing red glow animation (text-lg to text-2xl responsive sizing)
  - Applied to main tagline "Digital Marketing That Doesn't Suck" and all h2 section headers across the website
  - Glow animation: 3-second cycle with tight text-shadow (8-16px blur radius) for a subtle pulsing effect

### Backend Architecture

**Server Framework**
- **Express.js** HTTP server with TypeScript
- Middleware for JSON body parsing, URL encoding, and request logging
- Custom Vite integration for SSR-ready development environment

**API Structure**
- RESTful endpoint pattern at `/api/*`
- `/api/chat` endpoint for AI assistant chat functionality using OpenAI API
- `/api/reviews` endpoint (GET) - Fetches 5-star reviews from database for testimonials display
- `/api/reviews/sync` endpoint (POST) - Triggers Google Business Profile API sync for new reviews
- `/api/blog/posts` endpoint (GET) - Fetches published blog posts (requires auth for unpublished posts via `?includeUnpublished=true`)
- `/api/blog/posts/:slug` endpoint (GET) - Fetches individual blog post by slug (returns 404 for unpublished posts to unauthenticated users)
- `/api/blog/posts` endpoint (POST) - Creates new blog post (requires authentication)
- `/api/blog/posts/:id` endpoint (PUT) - Updates existing blog post (requires authentication)
- `/api/blog/posts/:id` endpoint (DELETE) - Deletes blog post (requires authentication)
- `/api/external/blog/posts` endpoint (POST) - External API for automated blog post creation/updates (requires API key via X-API-Key header)
- Request/response logging with duration tracking
- Error handling with status code propagation

**Development Server**
- Vite middleware mode for HMR during development
- Custom error overlay integration via Replit plugins
- Static file serving for production builds
- HTTP server created via Node's `http` module for WebSocket compatibility

### Data Storage

**Database Setup**
- **Drizzle ORM** configured for PostgreSQL dialect
- Connection via `@neondatabase/serverless` package for Neon database compatibility
- Schema defined in `shared/schema.ts` for shared type safety between client and server
- Migration files output to `./migrations` directory

**Schema Design**
- **Users table**: Authentication structure with id (UUID), username, email
  - Used by Replit Auth for session management
- **Sessions table**: Stores user sessions for Replit Auth
  - Fields: sid (primary key), sess (JSON), expire (timestamp)
- **Reviews table**: Stores Google Business Profile reviews with profile photos
  - Fields: id (UUID), googleReviewId (unique), name, role, company, content, rating, profilePhotoUrl, reviewDate, createdAt
  - Seeded with 3 existing Google reviews from Pete Gallego, Mason Small, and Emily Check
- **Blog Posts table**: Stores all blog content with full metadata
  - Fields: id (UUID), title, slug (unique), content (text), excerpt, category, author, readTime, featured (boolean), published (boolean), publishedAt (nullable timestamp), createdAt, updatedAt
  - Seeded with 6 example posts covering SEO, PPC, Web Design, Social Media, Email Marketing, and Local SEO
- Drizzle-Zod integration for runtime schema validation
- Type inference for Insert and Select operations

**In-Memory Storage**
- Temporary `MemStorage` implementation for development/testing
- CRUD interface defined in `storage.ts` for future database integration
- User management methods: getUser, getUserByUsername, createUser

### External Dependencies

**Third-Party Services**
- **OpenAI API**: Powers the chat widget AI assistant for customer inquiries (requires `OPENAI_API_KEY` environment variable)
- **Neon Database**: Serverless PostgreSQL database (requires `DATABASE_URL` environment variable)
- **Google Business Profile API**: Syncs 5-star reviews with profile photos (requires `GOOGLE_BUSINESS_API_KEY`, `GOOGLE_BUSINESS_ACCOUNT_ID`, `GOOGLE_BUSINESS_LOCATION_ID`)
- **Google Fonts**: Inter font family loaded via CDN

**UI Libraries**
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives (Accordion, Dialog, Dropdown, Select, Toast, etc.)
- **Framer Motion**: Animation library for smooth page transitions and micro-interactions
- **Lucide React**: Icon library for consistent iconography
- **React Icons**: Additional icons (Font Awesome, Simple Icons for brand logos)
- **cmdk**: Command palette component
- **embla-carousel-react**: Touch-friendly carousel component
- **react-intersection-observer**: Viewport-based animation triggers

**Development Tools**
- **Replit-specific plugins**: vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner
- **TypeScript**: Strict mode enabled with path aliases for clean imports
- **ESBuild**: Used for server-side code bundling in production

**Form Handling**
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod integration with React Hook Form

**Deployment Configuration**
- Production build outputs client to `dist/public` and server to `dist`
- Environment-based configuration (NODE_ENV)
- Database migrations via `drizzle-kit push` command