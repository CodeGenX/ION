# ION - Epic Breakdown

**Date:** 2025-11-08
**Project Level:** 1 (Coherent Feature)

---

## Epic 1: Executive Dashboard Command Center

**Slug:** executive-dashboard

### Goal

Provide ION users (executives, portfolio managers, product managers) with immediate visibility into portfolio health, risks, and progress through a comprehensive home dashboard that enables proactive risk mitigation and initiative phase planning decisions.

### Scope

**In Scope:**
- Home dashboard with 6 critical portfolio metrics widgets
- Authentication flow using Supabase Auth
- Responsive layout with navigation (sidebar + top bar)
- AI Assistant panel (placeholder UI)
- Database schema and seed data for dashboard metrics
- Type-safe API layer using tRPC
- Modern SaaS UI using Svelte Kit + Skeleton UI

**Out of Scope:**
- Widget customization/reordering (drag-and-drop)
- Real-time live updates (WebSocket/polling)
- Advanced filtering per widget
- Multiple dashboard configurations
- Azure DevOps integration
- Real LLM integration for AI Assistant (placeholder only)
- User preferences/settings persistence
- Export functionality (PDF/Excel)
- Drill-down detail views

### Success Criteria

1. ✅ All 6 widgets display real data from Supabase PostgreSQL
2. ✅ Authentication works - users must log in to access dashboard
3. ✅ Dashboard loads within 2 seconds on desktop, mobile, and tablet
4. ✅ RAG status indicators use correct colors (Red, Amber, Green)
5. ✅ 70%+ test coverage for critical paths (widgets, auth, API)
6. ✅ Lighthouse score > 90
7. ✅ Responsive design tested on all breakpoints (mobile, tablet, desktop)
8. ✅ Zero TypeScript errors, ESLint passes
9. ✅ ION branding applied (Blue Tech palette, Söhne typography)
10. ✅ Production deployment to Vercel successful

### Dependencies

**External:**
- Supabase account and project setup (PostgreSQL + Auth)
- Vercel deployment account
- Node.js 20.x LTS installed

**Technical:**
- SvelteKit 2.x project initialized
- Tailwind CSS + Skeleton UI configured
- tRPC infrastructure set up
- Drizzle ORM configured

**None from other epics** - This is the foundational epic

---

## Story Map - Epic 1

```
Epic: Executive Dashboard Command Center
│
├── Story 1: Database & API Foundation (3 points) 🏗️
│   │   Dependencies: None (foundation)
│   │   Deliverable: Database schema, seed data, tRPC API endpoints
│   │   Duration: 2-3 days
│   │
├── Story 2: UI Foundation & Authentication (3 points) 🔐
│   │   Dependencies: Story 1 (needs tRPC infrastructure)
│   │   Deliverable: Login, layouts, navigation, UI primitives
│   │   Duration: 2-3 days
│   │
└── Story 3: Dashboard Widgets Implementation (5 points) 📊
        Dependencies: Story 1 + Story 2 (needs API + layouts)
        Deliverable: All 6 widgets displaying real data
        Duration: 3-5 days
```

**Total Story Points:** 11 points
**Estimated Timeline:** 1.5-2 weeks (7-10 working days)

---

## Stories - Epic 1

### Story 1.1: Database & API Foundation

As a developer,
I want a type-safe database schema and API layer,
So that I can reliably store and retrieve portfolio metrics for the dashboard widgets.

**Acceptance Criteria:**

**AC #1:** Database schema created with 4 tables (initiatives, risks, teamMetrics, activityFeed) using Drizzle ORM
**AC #2:** Schema includes proper indexes (RAG status, initiative status, activity feed created date)
**AC #3:** Seed data script populates database with 5-10 realistic initiatives, risks, team metrics, and activity feed entries
**AC #4:** tRPC router implemented with 6 procedures (getPortfolioHealth, getValueDelivery, getActiveInitiatives, getTeamHealth, getRisks, getRecentActivity)
**AC #5:** All tRPC procedures return correctly typed data matching expected widget schemas
**AC #6:** Unit tests written for all 6 tRPC procedures with mocked database, achieving 100% procedure coverage
**AC #7:** Database migrations run successfully on Supabase development instance

**Prerequisites:** Supabase project created, environment variables configured

**Technical Notes:** Use Drizzle ORM for type-safe SQL, tRPC for end-to-end type safety. Reference tech-spec.md sections: Database Schema Deep Dive, tRPC Router Structure, Technical Approach.

**Estimated Effort:** 3 story points (2-3 days)

---

### Story 1.2: UI Foundation & Authentication

As a user,
I want to securely log in and navigate the ION platform,
So that I can access my personalized dashboard and portfolio data.

**Acceptance Criteria:**

**AC #1:** Login page created with email/password form using Skeleton UI components
**AC #2:** Supabase Auth integration functional - valid credentials redirect to dashboard, invalid show error
**AC #3:** Protected route guard implemented - unauthenticated users redirect to login when accessing /dashboard
**AC #4:** Root layout created with left sidebar navigation, top bar, and AI assistant panel (placeholder)
**AC #5:** Sidebar includes navigation links (Home, Portfolio, Roadmap, Settings) and responsive hamburger menu on mobile
**AC #6:** TopBar displays user menu with logout button that clears session and redirects to login
**AC #7:** AI Assistant panel toggles open/close with smooth slide-in animation from right side
**AC #8:** Three UI primitive components created: Widget wrapper, StatusPill (RAG colors), ProgressRing
**AC #9:** Layout is responsive - sidebar collapses on mobile (< 640px), AI panel full-screen on mobile
**AC #10:** E2E test passes: user logs in → sees dashboard route → logs out → redirects to login

**Prerequisites:** Story 1 complete (tRPC client setup needed for future widget data calls)

**Technical Notes:** Use Supabase Auth helpers for SvelteKit, Skeleton UI for components. Reference tech-spec.md sections: Authentication Flow, Layout Components, Responsive Design Breakpoints.

**Estimated Effort:** 3 story points (2-3 days)

---

### Story 1.3: Dashboard Widgets Implementation

As an executive,
I want to see 6 critical portfolio metrics at a glance,
So that I can quickly assess health, identify risks, and make informed decisions about initiative planning.

**Acceptance Criteria:**

**AC #1:** Portfolio Health Widget displays total initiatives and RAG breakdown (red/amber/green counts and percentages) using data from trpc.dashboard.getPortfolioHealth
**AC #2:** Value Delivery Widget shows circular progress ring with delivered vs. targeted value (e.g., "$2.5M of $5M" and percentage)
**AC #3:** Active Initiatives Widget displays count of active initiatives and lists top 3-5 with RAG status pills
**AC #4:** Team Health Widget shows health score gauge (0-100) with color coding (Red <50, Amber 50-75, Green >75) plus avg cycle time and velocity
**AC #5:** Risk Indicators Widget lists top 5 identified risks sorted by severity (Critical → High → Medium) with severity pills
**AC #6:** Recent Updates Widget displays scrollable activity feed of last 10 activities with icons and relative timestamps ("2 hours ago")
**AC #7:** Dashboard page created at /dashboard route with responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
**AC #8:** All widgets show loading state (skeleton placeholders) while fetching data, and error state if API call fails
**AC #9:** ION branding applied: Blue Tech color palette, RAG colors (#EF4444, #F59E0B, #10B981), Söhne font (or system-ui fallback)
**AC #10:** Unit tests written for all 6 widget components achieving 70%+ coverage
**AC #11:** E2E test passes: authenticated user navigates to dashboard → all 6 widgets load with data → no console errors
**AC #12:** Lighthouse score > 90 for dashboard page

**Prerequisites:** Story 1 (API endpoints) + Story 2 (layouts and auth) must be complete

**Technical Notes:** Use svelte-query for data fetching/caching, Skeleton UI Card components for widget wrappers, Tailwind for responsive grid. Reference tech-spec.md sections: Widget Implementation Details, Component Architecture, Testing Strategy.

**Estimated Effort:** 5 story points (3-5 days)

---

## Implementation Timeline - Epic 1

**Total Story Points:** 11 points
**Estimated Timeline:** 1.5-2 weeks (7-10 working days)

**Story Sequence:**
1. **Story 1** (Days 1-3): Database & API Foundation
   - ✅ Can be implemented independently
   - Deliverable: Working API with seed data

2. **Story 2** (Days 4-6): UI Foundation & Authentication
   - ⚠️ Depends on Story 1 for tRPC client setup
   - Deliverable: Login + layouts working

3. **Story 3** (Days 7-11): Dashboard Widgets
   - ⚠️ Depends on Story 1 (API) + Story 2 (layouts)
   - Deliverable: Full dashboard with all 6 widgets

**Dependency Validation:** ✅ Valid sequence - no forward dependencies

---

## Tech-Spec Reference

See [tech-spec.md](./tech-spec.md) for complete technical implementation details including:
- Database schema with exact table definitions
- tRPC router code examples
- Component architecture
- Responsive design breakpoints
- Testing approach
- Deployment strategy
