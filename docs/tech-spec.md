# ION - Technical Specification

**Author:** Rubens
**Date:** 2025-11-08
**Project Level:** 1 (Coherent Feature)
**Change Type:** New Feature - Home Dashboard
**Development Context:** Greenfield - Initial platform foundation

---

## Context

### Available Documents

**Loaded Documents:**
- ✅ **Product High-Level MVP Draft** (`docs/resources/Product High-Level MVP Draft.md`)
  - Comprehensive product vision for ION platform
  - Defined 6 core capabilities
  - User personas and value propositions
  - UX/UI requirements (Modern SaaS, Blue Tech palette, Söhne typography)

**Project Status:**
- **Field Type:** Greenfield - new codebase
- **Track:** BMad Quick Flow
- **First Feature:** Home Dashboard (executive command center)

### Project Stack

**Tech Stack (Greenfield - Establishing from scratch):**

- **Frontend Framework:** SvelteKit 2.x (latest stable)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **UI Components:** Skeleton UI (Svelte component library)
- **API Layer:** tRPC with svelte-query adapter (type-safe RPC)
- **Database:** Supabase (PostgreSQL managed service)
- **ORM:** Drizzle ORM (type-safe SQL operations)
- **Authentication:** Supabase Auth
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Package Manager:** npm or pnpm
- **Deployment:** Vercel (recommended for SvelteKit)

**Key Technology Decisions:**
- Using tRPC for end-to-end type safety from database to UI
- Supabase for managed PostgreSQL + built-in auth + real-time capabilities
- Skeleton UI for production-ready Svelte components matching Modern SaaS design requirements
- Drizzle for type-safe, SQL-first database operations with excellent TypeScript integration

### Existing Codebase Structure

**Greenfield Project** - Establishing new codebase structure following SvelteKit best practices:

```
ion/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   ├── server/         # Server-side code (tRPC routers, DB)
│   │   ├── stores/         # Svelte stores for client state
│   │   └── utils/          # Shared utilities
│   ├── routes/             # SvelteKit file-based routing
│   │   ├── (auth)/        # Auth-protected routes
│   │   └── api/           # API endpoints (if needed beyond tRPC)
│   └── app.html           # HTML template
├── drizzle/               # Database schemas and migrations
├── static/                # Static assets
└── tests/                 # Test files
```

---

## The Change

### Problem Statement

ION platform users (executives, portfolio managers, product managers) need immediate visibility into portfolio health, risks, and progress when they log in. Currently, there is no dashboard to provide this critical "command center" view.

**User Pain Points:**
- Executives cannot quickly assess portfolio health without diving into detailed reports
- Risk indicators are not surfaced proactively for early intervention
- No single view to understand value delivery progress
- Initiative phase planning lacks data-driven insights at a glance

**Business Impact:**
- Delayed decision-making on risk mitigation
- Missed opportunities for early intervention
- Reduced confidence in portfolio status reporting
- Inefficient executive time spent searching for insights

### Proposed Solution

Build a **Home Dashboard** that serves as the executive command center, providing immediate visibility into the 6 most critical portfolio metrics and enabling risk mitigation and initiative phase planning decisions.

**Core Value Proposition:**
- **Immediate Insight:** Log in → see health at a glance
- **Proactive Management:** Surface risks before they become issues
- **Decision Support:** Enable risk mitigation and phase planning
- **Executive-Focused:** High-level metrics, not operational details

**Key Features:**
1. Six strategic widgets displaying critical portfolio data
2. AI Assistant panel (right-side, expandable) for contextual help
3. Navigation framework (left sidebar + top bar)
4. Responsive layout following Modern SaaS design principles
5. Authenticated access with Supabase Auth

### Scope

**In Scope:**

- ✅ Dashboard layout with 6 critical widgets:
  1. Portfolio health overview (RAG status indicators)
  2. Value delivered vs. targeted (progress metrics)
  3. Active initiatives count (current portfolio size)
  4. Team health/delivery metrics (performance indicators)
  5. Risk indicators (flagged risks requiring attention)
  6. Recent updates/changes (activity feed)

- ✅ Data visualization components (charts, gauges, status pills, progress bars)
- ✅ AI Assistant panel (right-side expandable) - **Placeholder UI** with static content
- ✅ Navigation structure:
  - Left sidebar navigation (per MVP design)
  - Top bar with user menu
  - Mobile-responsive hamburger menu
- ✅ Authentication flow:
  - Supabase Auth integration
  - Email/password login
  - Protected dashboard route
  - Logout functionality
- ✅ Seed data in Supabase:
  - Sample initiatives (5-10 realistic examples)
  - Mock RAG statuses, metrics, risks
  - Realistic value delivery data
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Skeleton UI theming to match ION brand (Blue Tech palette)

**Out of Scope:**

- ❌ Widget customization/reordering (drag-and-drop)
- ❌ Real-time live updates (WebSocket/polling)
- ❌ Advanced filtering per widget
- ❌ Multiple dashboard views/configurations
- ❌ Azure DevOps integration (future epic)
- ❌ Real LLM integration for AI Assistant (placeholder only)
- ❌ User preferences/settings persistence
- ❌ Export functionality (PDF/Excel)
- ❌ Drill-down detail views (coming in future stories)

---

## Implementation Details

### Source Tree Changes

**Files to CREATE:**

```
src/
├── routes/
│   ├── (auth)/
│   │   └── dashboard/
│   │       └── +page.svelte                    # CREATE - Main dashboard page
│   ├── login/
│   │   └── +page.svelte                        # CREATE - Login page
│   └── +layout.svelte                          # CREATE - Root layout with nav
│
├── lib/
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── PortfolioHealthWidget.svelte   # CREATE - RAG status widget
│   │   │   ├── ValueDeliveryWidget.svelte     # CREATE - Value vs target widget
│   │   │   ├── ActiveInitiativesWidget.svelte # CREATE - Initiative count widget
│   │   │   ├── TeamHealthWidget.svelte        # CREATE - Team metrics widget
│   │   │   ├── RiskIndicatorsWidget.svelte    # CREATE - Risk widget
│   │   │   └── RecentUpdatesWidget.svelte     # CREATE - Activity feed widget
│   │   ├── layout/
│   │   │   ├── Sidebar.svelte                 # CREATE - Left sidebar navigation
│   │   │   ├── TopBar.svelte                  # CREATE - Top navigation bar
│   │   │   └── AIAssistantPanel.svelte        # CREATE - Right-side AI panel
│   │   └── ui/
│   │       ├── Widget.svelte                  # CREATE - Base widget wrapper
│   │       ├── StatusPill.svelte              # CREATE - RAG status indicator
│   │       └── ProgressRing.svelte            # CREATE - Circular progress indicator
│   │
│   ├── server/
│   │   ├── trpc/
│   │   │   ├── router.ts                      # CREATE - Root tRPC router
│   │   │   └── routers/
│   │   │       └── dashboard.ts               # CREATE - Dashboard data router
│   │   └── db/
│   │       ├── client.ts                      # CREATE - Drizzle client setup
│   │       └── schema.ts                      # CREATE - Database schema
│   │
│   └── stores/
│       └── auth.ts                            # CREATE - Auth state store
│
├── drizzle/
│   ├── migrations/                            # CREATE - Auto-generated migrations
│   └── seed.ts                                # CREATE - Seed data script
│
└── tests/
    ├── unit/
    │   └── components/
    │       └── dashboard/
    │           └── PortfolioHealthWidget.test.ts  # CREATE - Widget tests
    └── e2e/
        └── dashboard.spec.ts                  # CREATE - E2E dashboard tests

Configuration Files to CREATE:
├── drizzle.config.ts                          # CREATE - Drizzle ORM config
├── tailwind.config.js                         # CREATE - Tailwind configuration
├── .env.example                               # CREATE - Environment variables template
└── supabase/                                  # CREATE - Supabase local setup (optional)
    └── config.toml
```

**Total New Files:** ~30 files
- 6 dashboard widget components
- 3 layout components
- 3 UI primitives
- 2 route pages (+layout)
- 4 server-side files
- 3 test files
- 4 configuration files

### Technical Approach

**Architecture Pattern:** Type-Safe Full-Stack SvelteKit with tRPC

**Data Flow:**
1. **Client → Server:** Svelte components call tRPC procedures using svelte-query
2. **Server → Database:** tRPC routers use Drizzle ORM to query Supabase PostgreSQL
3. **Database → Server:** Drizzle returns type-safe results
4. **Server → Client:** tRPC returns typed data, svelte-query manages cache and state
5. **End Result:** Full type safety from database schema to UI, with IDE intellisense at every layer

**Component Architecture:**

```
Dashboard Page (routes/(auth)/dashboard/+page.svelte)
  ├── Layout Wrapper (+layout.svelte)
  │   ├── Sidebar Component
  │   ├── TopBar Component
  │   └── AIAssistantPanel Component (floating)
  │
  └── Dashboard Grid (6 widgets)
      ├── PortfolioHealthWidget
      ├── ValueDeliveryWidget
      ├── ActiveInitiativesWidget
      ├── TeamHealthWidget
      ├── RiskIndicatorsWidget
      └── RecentUpdatesWidget
```

**Database Schema (Drizzle):**

```typescript
// drizzle/schema.ts - Core tables for dashboard data

import { pgTable, serial, text, integer, timestamp, boolean, numeric } from 'drizzle-orm/pg-core';

export const initiatives = pgTable('initiatives', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status').notNull(), // 'planning', 'active', 'on-hold', 'completed'
  ragStatus: text('rag_status').notNull(), // 'red', 'amber', 'green'
  targetValue: numeric('target_value', { precision: 10, scale: 2 }),
  deliveredValue: numeric('delivered_value', { precision: 10, scale: 2 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const risks = pgTable('risks', {
  id: serial('id').primaryKey(),
  initiativeId: integer('initiative_id').references(() => initiatives.id),
  title: text('title').notNull(),
  description: text('description'),
  severity: text('severity').notNull(), // 'low', 'medium', 'high', 'critical'
  status: text('status').notNull(), // 'identified', 'mitigating', 'resolved'
  createdAt: timestamp('created_at').defaultNow(),
});

export const teamMetrics = pgTable('team_metrics', {
  id: serial('id').primaryKey(),
  initiativeId: integer('initiative_id').references(() => initiatives.id),
  cycleTime: numeric('cycle_time', { precision: 5, scale: 2 }), // days
  velocity: integer('velocity'), // story points
  healthScore: integer('health_score'), // 0-100
  recordedAt: timestamp('recorded_at').defaultNow(),
});

export const activityFeed = pgTable('activity_feed', {
  id: serial('id').primaryKey(),
  initiativeId: integer('initiative_id').references(() => initiatives.id),
  activityType: text('activity_type').notNull(), // 'status_change', 'risk_added', 'value_updated'
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

**tRPC Router Structure:**

```typescript
// src/lib/server/trpc/routers/dashboard.ts

import { router, publicProcedure } from '../router';
import { db } from '$lib/server/db/client';
import { initiatives, risks, teamMetrics, activityFeed } from '$lib/server/db/schema';

export const dashboardRouter = router({
  // Portfolio Health Widget data
  getPortfolioHealth: publicProcedure.query(async () => {
    const allInitiatives = await db.select().from(initiatives);

    return {
      total: allInitiatives.length,
      red: allInitiatives.filter(i => i.ragStatus === 'red').length,
      amber: allInitiatives.filter(i => i.ragStatus === 'amber').length,
      green: allInitiatives.filter(i => i.ragStatus === 'green').length,
    };
  }),

  // Value Delivery Widget data
  getValueDelivery: publicProcedure.query(async () => {
    const allInitiatives = await db.select().from(initiatives);

    const total = allInitiatives.reduce((sum, i) =>
      sum + Number(i.targetValue || 0), 0
    );
    const delivered = allInitiatives.reduce((sum, i) =>
      sum + Number(i.deliveredValue || 0), 0
    );

    return {
      targetValue: total,
      deliveredValue: delivered,
      percentage: total > 0 ? (delivered / total) * 100 : 0,
    };
  }),

  // Active Initiatives count
  getActiveInitiatives: publicProcedure.query(async () => {
    const active = await db
      .select()
      .from(initiatives)
      .where(eq(initiatives.status, 'active'));

    return {
      count: active.length,
      initiatives: active.map(i => ({ id: i.id, name: i.name, ragStatus: i.ragStatus })),
    };
  }),

  // Team Health metrics
  getTeamHealth: publicProcedure.query(async () => {
    const latestMetrics = await db
      .select()
      .from(teamMetrics)
      .orderBy(desc(teamMetrics.recordedAt))
      .limit(10);

    const avgHealth = latestMetrics.reduce((sum, m) =>
      sum + (m.healthScore || 0), 0
    ) / latestMetrics.length;

    return {
      averageHealthScore: Math.round(avgHealth),
      averageCycleTime: latestMetrics[0]?.cycleTime || 0,
      averageVelocity: latestMetrics[0]?.velocity || 0,
    };
  }),

  // Risk Indicators
  getRisks: publicProcedure.query(async () => {
    const allRisks = await db
      .select()
      .from(risks)
      .where(eq(risks.status, 'identified'));

    return {
      total: allRisks.length,
      critical: allRisks.filter(r => r.severity === 'critical').length,
      high: allRisks.filter(r => r.severity === 'high').length,
      risks: allRisks.slice(0, 5), // Top 5 risks
    };
  }),

  // Recent Updates
  getRecentActivity: publicProcedure.query(async () => {
    const recentActivities = await db
      .select()
      .from(activityFeed)
      .orderBy(desc(activityFeed.createdAt))
      .limit(10);

    return {
      activities: recentActivities,
    };
  }),
});
```

**Authentication Flow:**

1. User lands on `/login` page
2. Enters credentials → Supabase Auth validates
3. On success → redirect to `/dashboard` (protected route)
4. SvelteKit `+layout.server.ts` checks auth session
5. If authenticated → load dashboard, else redirect to `/login`

**Styling Approach:**

- **Tailwind CSS** for utility-first styling
- **Skeleton UI** components as base (Button, Card, AppShell, etc.)
- **Custom theme** following ION brand:
  - Primary: Blue Tech palette
  - Typography: Configure Söhne font in `tailwind.config.js`
  - RAG indicators: Red (#EF4444), Amber (#F59E0B), Green (#10B981)

### Existing Patterns to Follow

**Greenfield Project** - Establishing new conventions following modern SvelteKit and TypeScript best practices:

**Code Style Conventions:**
- **TypeScript:** Strict mode enabled
- **Imports:** Use SvelteKit `$lib` alias for internal imports
- **Components:** PascalCase naming (e.g., `PortfolioHealthWidget.svelte`)
- **Files:** PascalCase for components, camelCase for utilities
- **Formatting:** Prettier with default settings
- **Linting:** ESLint with `@typescript-eslint` rules

**Component Patterns:**
```typescript
// Standard Svelte component structure
<script lang="ts">
  import { trpc } from '$lib/trpc/client';

  // Props
  export let title: string;

  // Reactive data using svelte-query
  const query = trpc.dashboard.getPortfolioHealth.useQuery();

  // Computed values
  $: data = $query.data;
</script>

<!-- Template -->
<div class="widget-container">
  {#if $query.isLoading}
    <p>Loading...</p>
  {:else if $query.error}
    <p>Error: {$query.error.message}</p>
  {:else if data}
    <!-- Render data -->
  {/if}
</div>

<style>
  /* Scoped styles if needed (prefer Tailwind) */
</style>
```

**Server-Side Patterns:**
- tRPC procedures return typed data objects
- Drizzle queries use async/await
- Error handling with try/catch, throw TRPCError for client errors

**Testing Patterns:**
- Unit tests for individual components (Vitest + Testing Library)
- E2E tests for user flows (Playwright)
- Test file naming: `ComponentName.test.ts`

### Integration Points

**External Integrations:**

1. **Supabase (PostgreSQL + Auth):**
   - Connection: via Supabase client SDK
   - Auth: `@supabase/auth-helpers-sveltekit`
   - Database: Drizzle ORM connecting to Supabase Postgres
   - Environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`

2. **tRPC:**
   - Client-server bridge with full type safety
   - svelte-query adapter for data fetching
   - No REST API needed - RPC-style calls

**Internal Module Integrations:**

1. **Authentication → Dashboard:**
   - Auth store (`$lib/stores/auth.ts`) provides user session
   - Protected routes check auth in `+layout.server.ts`
   - TopBar component shows user info from auth store

2. **Dashboard Widgets → tRPC Routers:**
   - Each widget calls specific tRPC procedure
   - svelte-query manages caching, loading, error states
   - Data flows: Widget → tRPC Client → tRPC Server → Drizzle → Supabase

3. **Layout Components → Dashboard Page:**
   - Sidebar, TopBar, AI Panel rendered in root `+layout.svelte`
   - Dashboard page uses slot for content
   - Responsive: AI Panel toggleable on mobile

**State Management:**

- **Server State:** Managed by svelte-query (from tRPC calls)
- **Client State:** Minimal - use Svelte stores for auth, UI state (sidebar collapsed, AI panel open)
- **URL State:** None for this feature (future: filters, views)

---

## Development Context

### Relevant Existing Code

**Greenfield - No existing code to reference**

This is the first feature being built. Future features will reference this dashboard implementation as the pattern to follow.

**Patterns being established:**
- tRPC + svelte-query for data fetching
- Drizzle ORM for database operations
- Skeleton UI for component library
- Tailwind for styling
- SvelteKit file-based routing

### Dependencies

**Framework/Libraries (package.json):**

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-sveltekit": "^0.10.7",
    "@trpc/client": "^10.45.0",
    "@trpc/server": "^10.45.0",
    "@skeletonlabs/skeleton": "^2.6.0",
    "drizzle-orm": "^0.29.3",
    "postgres": "^3.4.3",
    "zod": "^3.22.4",
    "svelte-query": "^1.5.0"
  },
  "devDependencies": {
    "@sveltejs/adapter-vercel": "^4.0.5",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^3.0.1",
    "svelte": "^4.2.8",
    "typescript": "^5.3.3",
    "vite": "^5.0.11",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.33",
    "drizzle-kit": "^0.20.10",
    "vitest": "^1.2.0",
    "@testing-library/svelte": "^4.0.5",
    "@playwright/test": "^1.40.1",
    "eslint": "^8.56.0",
    "prettier": "^3.1.1",
    "prettier-plugin-svelte": "^3.1.2"
  }
}
```

**Internal Modules:**

```
$lib/components/dashboard/*  - Dashboard widget components
$lib/components/layout/*      - Layout components (Sidebar, TopBar, AI Panel)
$lib/components/ui/*          - Reusable UI primitives
$lib/server/trpc/*            - tRPC routers and procedures
$lib/server/db/*              - Database client and schema
$lib/stores/*                 - Svelte stores for client state
```

### Configuration Changes

**New Configuration Files:**

**1. Drizzle Config (`drizzle.config.ts`):**
```typescript
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

**2. Tailwind Config (`tailwind.config.js`):**
```javascript
import { skeleton } from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // ION Blue Tech palette
        'ion-blue': {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
        'ion-red': '#ef4444',
        'ion-amber': '#f59e0b',
        'ion-green': '#10b981',
      },
      fontFamily: {
        sans: ['Söhne', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [skeleton],
};
```

**3. Environment Variables (`.env.example`):**
```bash
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres

# App
PUBLIC_APP_URL=http://localhost:5173
```

**4. SvelteKit Config (`svelte.config.js`):**
```javascript
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
    },
  },
};

export default config;
```

### Existing Conventions (Greenfield)

**Greenfield project - establishing new conventions:**

**File Organization:**
- Routes: SvelteKit file-based routing (`src/routes/`)
- Components: Organized by feature in `src/lib/components/`
- Server code: `src/lib/server/` (never exposed to client)
- Utilities: `src/lib/utils/`

**Naming Conventions:**
- Components: PascalCase (e.g., `PortfolioHealthWidget.svelte`)
- Utilities: camelCase (e.g., `formatCurrency.ts`)
- Database tables: snake_case (e.g., `team_metrics`)
- TypeScript types: PascalCase with `Type` suffix (e.g., `InitiativeType`)

**Code Style:**
- TypeScript strict mode
- Prettier for formatting (default config)
- ESLint for linting
- Single quotes for strings
- Semicolons required
- 2-space indentation

**Error Handling:**
- Server: Throw `TRPCError` with appropriate codes
- Client: Handle errors in svelte-query `$query.error`
- User-facing: Show friendly error messages, log details to console

### Test Framework & Standards

**Testing Stack:**

- **Unit Tests:** Vitest + @testing-library/svelte
- **E2E Tests:** Playwright
- **Coverage Target:** 70%+ for critical paths (widgets, auth)

**Test File Organization:**
```
tests/
├── unit/
│   └── components/
│       └── dashboard/
│           └── PortfolioHealthWidget.test.ts
└── e2e/
    └── dashboard.spec.ts
```

**Test Naming:**
- Test files: `ComponentName.test.ts` or `featureName.spec.ts`
- Test descriptions: "should [expected behavior] when [condition]"

**Example Unit Test:**
```typescript
// tests/unit/components/dashboard/PortfolioHealthWidget.test.ts
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import PortfolioHealthWidget from '$lib/components/dashboard/PortfolioHealthWidget.svelte';

describe('PortfolioHealthWidget', () => {
  it('should display portfolio health metrics', () => {
    render(PortfolioHealthWidget);
    expect(screen.getByText(/Portfolio Health/i)).toBeInTheDocument();
  });

  it('should show RAG status breakdown', async () => {
    render(PortfolioHealthWidget);
    // Mock tRPC data and assert RAG counts displayed
  });
});
```

**Example E2E Test:**
```typescript
// tests/e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('authenticated user sees dashboard', async ({ page }) => {
  // Login
  await page.goto('/login');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Verify dashboard loads
  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByText('Portfolio Health')).toBeVisible();
  await expect(page.getByText('Active Initiatives')).toBeVisible();
});
```

---

## Implementation Stack

**Complete Technology Stack with Versions:**

**Runtime & Framework:**
- Node.js: 20.x LTS
- SvelteKit: 2.0+ (latest stable)
- Svelte: 4.2+
- TypeScript: 5.3+

**Frontend Libraries:**
- @skeletonlabs/skeleton: 2.6+ (UI components)
- Tailwind CSS: 3.4+
- svelte-query: 1.5+ (data fetching/caching)
- @trpc/client: 10.45+ (type-safe API client)

**Backend & Data:**
- @trpc/server: 10.45+ (RPC server)
- Drizzle ORM: 0.29+ (type-safe SQL)

- PostgreSQL: via Supabase (managed)
- @supabase/supabase-js: 2.39+ (Supabase client)
- @supabase/auth-helpers-sveltekit: 0.10+ (Auth integration)
- Zod: 3.22+ (schema validation)

**Build & Development:**
- Vite: 5.0+ (build tool, bundled with SvelteKit)
- @sveltejs/adapter-vercel: 4.0+ (deployment adapter)
- Drizzle Kit: 0.20+ (database migrations)

**Testing & Quality:**
- Vitest: 1.2+ (unit testing)
- @testing-library/svelte: 4.0+ (component testing)
- @playwright/test: 1.40+ (E2E testing)
- ESLint: 8.56+ (linting)
- Prettier: 3.1+ (formatting)
- prettier-plugin-svelte: 3.1+ (Svelte formatting)

**Package Manager:**
- npm or pnpm (recommend pnpm for faster installs)

**Deployment Platform:**
- Vercel (optimized for SvelteKit)
- Supabase (managed PostgreSQL + Auth)

---

## Technical Details

###  Database Schema Deep Dive

**Tables:**

1. **initiatives** - Core portfolio items
   - Primary key: `id` (serial)
   - Key fields: `name`, `status`, `ragStatus`, `targetValue`, `deliveredValue`
   - Timestamps: `startDate`, `endDate`, `createdAt`, `updatedAt`
   - RAG Status values: 'red' | 'amber' | 'green'
   - Status values: 'planning' | 'active' | 'on-hold' | 'completed'

2. **risks** - Portfolio risks
   - Foreign key: `initiativeId` → initiatives.id
   - Severity: 'low' | 'medium' | 'high' | 'critical'
   - Status: 'identified' | 'mitigating' | 'resolved'

3. **team_metrics** - Team performance data
   - Foreign key: `initiativeId` → initiatives.id
   - Metrics: cycleTime (days), velocity (points), healthScore (0-100)

4. **activity_feed** - Audit trail / recent changes
   - Foreign key: `initiativeId` → initiatives.id
   - Activity types: 'status_change' | 'risk_added' | 'value_updated'

**Indexes (performance optimization):**
```typescript
// Add to schema.ts
import { index } from 'drizzle-orm/pg-core';

// Optimize queries by RAG status
export const initiativesRagIdx = index('initiatives_rag_idx').on(initiatives.ragStatus);

// Optimize queries by initiative status
export const initiativesStatusIdx = index('initiatives_status_idx').on(initiatives.status);

// Optimize risk lookups by initiative
export const risksInitiativeIdx = index('risks_initiative_idx').on(risks.initiativeId);

// Optimize activity feed queries
export const activityFeedCreatedIdx = index('activity_feed_created_idx').on(activityFeed.createdAt);
```

### Widget Implementation Details

**1. Portfolio Health Widget:**
- **Data Source:** `trpc.dashboard.getPortfolioHealth`
- **Visualization:** Donut chart or horizontal bar showing RAG breakdown
- **Layout:** 
  - Top: Total initiatives count
  - Center: RAG distribution (percentages + counts)
  - Color coding: Red (#EF4444), Amber (#F59E0B), Green (#10B981)
- **Interactivity:** Click RAG segment → future: filter to see those initiatives

**2. Value Delivery Widget:**
- **Data Source:** `trpc.dashboard.getValueDelivery`
- **Visualization:** Progress ring or bar showing delivered vs. target
- **Layout:**
  - Top: "Value Delivered vs. Targeted"
  - Center: Circular progress (percentage)
  - Bottom: Actual numbers (e.g., "$2.5M of $5M")
- **Calculation:** `(deliveredValue / targetValue) * 100`

**3. Active Initiatives Widget:**
- **Data Source:** `trpc.dashboard.getActiveInitiatives`
- **Visualization:** Large number + list of top initiatives
- **Layout:**
  - Top: Count (e.g., "12 Active Initiatives")
  - Below: List of 3-5 initiatives with RAG pills
- **Interactivity:** Click initiative → future: navigate to detail view

**4. Team Health Widget:**
- **Data Source:** `trpc.dashboard.getTeamHealth`
- **Visualization:** Health score gauge + key metrics
- **Layout:**
  - Main: Health score (0-100) as gauge
  - Secondary: Avg cycle time, Avg velocity
- **Color coding:** Red <50, Amber 50-75, Green >75

**5. Risk Indicators Widget:**
- **Data Source:** `trpc.dashboard.getRisks`
- **Visualization:** Risk count + severity breakdown
- **Layout:**
  - Top: Total identified risks
  - List: Top 5 risks with severity pills
  - Critical/High risks highlighted
- **Sorting:** Critical first, then high, then by created date

**6. Recent Updates Widget:**
- **Data Source:** `trpc.dashboard.getRecentActivity`
- **Visualization:** Activity feed / timeline
- **Layout:**
  - Scrollable list of recent 10 activities
  - Each item: Icon + description + timestamp
  - Relative time (e.g., "2 hours ago")
- **Activity icons:** 🔄 status change, ⚠️ risk, 💰 value update

### AI Assistant Panel (Placeholder)

**Structure:**
- Right-side panel (300px width on desktop)
- Expandable/collapsible via button
- Sticky position when scrolling
- **Placeholder Content:**
  - Header: "AI Assistant" with close button
  - Body: Static help text explaining upcoming AI features
  - Future: LLM integration for contextual insights

**Behavior:**
- Default state: Collapsed (icon button visible)
- Click button: Slide in from right
- Mobile: Full-screen overlay when open

### Responsive Design Breakpoints

**Tailwind CSS breakpoints:**
- **sm:** 640px - Mobile landscape
- **md:** 768px - Tablet portrait
- **lg:** 1024px - Tablet landscape / small desktop
- **xl:** 1280px - Desktop
- **2xl:** 1536px - Large desktop

**Dashboard Grid:**
- **Mobile (< 640px):** 1 column, stacked widgets
- **Tablet (640px - 1024px):** 2 columns
- **Desktop (> 1024px):** 3 columns (2-2-2 layout for 6 widgets)

**Navigation:**
- **Mobile:** Hamburger menu, collapsible sidebar
- **Tablet+:** Persistent left sidebar (~240px width)
- **AI Panel:** Full-screen on mobile, side panel on desktop

### Performance Considerations

**Optimization Strategies:**
1. **Data Caching:** svelte-query caches tRPC responses (default: 5 minutes)
2. **Lazy Loading:** Dashboard widgets load data independently (parallel requests)
3. **Database Indexing:** Indexes on frequently queried fields (RAG status, initiative status)
4. **Pagination:** Activity feed limited to 10 items (add "Load More" in future)
5. **Image Optimization:** Use Vite's built-in image optimization for assets
6. **Code Splitting:** SvelteKit automatically splits routes

**Target Performance Metrics:**
- Initial page load: < 2 seconds
- Time to Interactive (TTI): < 3 seconds
- Widget data load: < 500ms per widget
- Lighthouse score: > 90

### Security Considerations

**Authentication:**
- Supabase Auth with JWT tokens
- Row Level Security (RLS) on Supabase tables
- Protected routes: Check session in `+layout.server.ts`

**Data Validation:**
- Zod schemas for tRPC inputs/outputs
- SQL injection prevention: Drizzle ORM parameterized queries
- XSS prevention: Svelte auto-escapes template output

**Environment Variables:**
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to client
- Use `PUBLIC_` prefix only for client-safe vars
- `.env` in `.gitignore`

**CORS & CSP:**
- Configure Supabase CORS for production domain
- Add Content Security Policy headers in SvelteKit hooks

---

## Development Setup

### Prerequisites

- **Node.js:** 20.x LTS or later
- **Package Manager:** npm (bundled) or pnpm (recommended)
- **Git:** Latest version
- **Supabase Account:** Free tier sufficient for development

### Initial Project Setup

**1. Create SvelteKit Project:**
```bash
# Create new SvelteKit app
npm create svelte@latest ion
cd ion

# Select options:
# - Skeleton project: No
# - Which Svelte app template? SvelteKit demo app
# - Add type checking with TypeScript? Yes, using TypeScript syntax
# - Add ESLint? Yes
# - Add Prettier? Yes
# - Add Playwright? Yes
# - Add Vitest? Yes
```

**2. Install Dependencies:**
```bash
# Install all dependencies from package.json
npm install @supabase/supabase-js @supabase/auth-helpers-sveltekit
npm install @trpc/client @trpc/server svelte-query
npm install drizzle-orm postgres
npm install @skeletonlabs/skeleton
npm install zod

# Install dev dependencies
npm install -D drizzle-kit
npm install -D tailwindcss autoprefixer postcss
npm install -D @testing-library/svelte
npm install -D @sveltejs/adapter-vercel
```

**3. Setup Supabase:**
```bash
# Create Supabase project at https://supabase.com
# Get credentials from project settings

# Create .env file
cp .env.example .env

# Add Supabase credentials to .env
# SUPABASE_URL=https://yourproject.supabase.co
# SUPABASE_ANON_KEY=your-anon-key
# DATABASE_URL=postgresql://postgres:[password]@db.yourproject.supabase.co:5432/postgres
```

**4. Initialize Tailwind:**
```bash
npx tailwindcss init -p
# Configure tailwind.config.js as shown in Configuration Changes section
```

**5. Setup Database:**
```bash
# Generate initial migration from schema
npx drizzle-kit generate:pg

# Push schema to Supabase
npx drizzle-kit push:pg

# Run seed script
npm run db:seed
```

**6. Start Development Server:**
```bash
npm run dev
# App available at http://localhost:5173
```

### Development Workflow

**Daily Development:**
```bash
# Start dev server (with hot reload)
npm run dev

# Run tests in watch mode
npm run test:unit -- --watch

# Run linter
npm run lint

# Format code
npm run format
```

**Database Changes:**
```bash
# 1. Modify src/lib/server/db/schema.ts
# 2. Generate migration
npx drizzle-kit generate:pg

# 3. Apply migration
npx drizzle-kit push:pg

# 4. Update seed data if needed
npm run db:seed
```

**Testing:**
```bash
# Unit tests
npm run test:unit

# E2E tests (requires dev server running)
npm run test:e2e

# All tests
npm test
```

**Build for Production:**
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## Implementation Guide

### Setup Steps

**Pre-Implementation Checklist:**

- [ ] **1. Initialize SvelteKit project** with TypeScript
- [ ] **2. Install all dependencies** (see Development Setup)
- [ ] **3. Create Supabase project** and get credentials
- [ ] **4. Configure environment variables** (.env file)
- [ ] **5. Initialize Tailwind CSS** and Skeleton UI
- [ ] **6. Setup tRPC** boilerplate (router, client)
- [ ] **7. Configure Drizzle ORM** (drizzle.config.ts)
- [ ] **8. Create database schema** (schema.ts)
- [ ] **9. Run initial migration** to Supabase
- [ ] **10. Create seed data script** and populate database
- [ ] **11. Setup testing infrastructure** (Vitest, Playwright configs)
- [ ] **12. Create project structure** (folders for components, routes)
- [ ] **13. Configure ESLint & Prettier**
- [ ] **14. Initialize Git repository** (if not already done)
- [ ] **15. Create feature branch** (e.g., `feature/home-dashboard`)

### Implementation Steps

**Phase 1: Foundation (Database & API) - Story 1**

1. **Create Database Schema** (`src/lib/server/db/schema.ts`)
   - Define `initiatives`, `risks`, `teamMetrics`, `activityFeed` tables
   - Add indexes for performance
   - Export TypeScript types from schema

2. **Setup Drizzle Client** (`src/lib/server/db/client.ts`)
   - Initialize Drizzle with Supabase connection
   - Export db client for use in tRPC routers

3. **Generate and Run Migrations**
   ```bash
   npx drizzle-kit generate:pg
   npx drizzle-kit push:pg
   ```

4. **Create Seed Data Script** (`drizzle/seed.ts`)
   - Generate 5-10 realistic initiatives
   - Add sample risks (various severities)
   - Create team metrics data
   - Populate activity feed
   - Run: `npm run db:seed`

5. **Setup tRPC Infrastructure**
   - Create root router (`src/lib/server/trpc/router.ts`)
   - Create dashboard router (`src/lib/server/trpc/routers/dashboard.ts`)
   - Implement 6 procedures (one per widget)
   - Setup tRPC client (`src/lib/trpc/client.ts`)

6. **Test API Endpoints**
   - Write unit tests for each tRPC procedure
   - Verify data returns correctly
   - Test error handling

**Phase 2: UI Foundation (Layout & Auth) - Story 2**

7. **Create Base Layout Components**
   - `src/lib/components/layout/Sidebar.svelte`
     - Navigation links (Home, Portfolio, Roadmap, Settings)
     - Logo/branding
     - User section at bottom
   - `src/lib/components/layout/TopBar.svelte`
     - Page title
     - User menu (logout)
     - Mobile hamburger button
   - `src/lib/components/layout/AIAssistantPanel.svelte`
     - Placeholder panel with static content
     - Open/close button
     - Sticky positioning

8. **Create Root Layout** (`src/routes/+layout.svelte`)
   - Integrate Sidebar, TopBar, AI Panel
   - Define slot for page content
   - Add responsive classes
   - Apply Skeleton UI AppShell component

9. **Setup Supabase Auth**
   - Create auth store (`src/lib/stores/auth.ts`)
   - Implement login page (`src/routes/login/+page.svelte`)
   - Add auth guard (`src/routes/(auth)/+layout.server.ts`)
   - Test login/logout flow

10. **Create UI Primitives**
    - `src/lib/components/ui/Widget.svelte` - Base widget wrapper
    - `src/lib/components/ui/StatusPill.svelte` - RAG indicator
    - `src/lib/components/ui/ProgressRing.svelte` - Circular progress

**Phase 3: Dashboard Widgets - Story 3**

11. **Implement Portfolio Health Widget**
    - Create `PortfolioHealthWidget.svelte`
    - Call `trpc.dashboard.getPortfolioHealth` with svelte-query
    - Render donut chart or bar visualization
    - Add loading/error states
    - Style with Tailwind + Skeleton UI

12. **Implement Value Delivery Widget**
    - Create `ValueDeliveryWidget.svelte`
    - Fetch value data
    - Render progress ring
    - Display percentage and actual values

13. **Implement Active Initiatives Widget**
    - Create `ActiveInitiativesWidget.svelte`
    - Show count + list of initiatives
    - Add RAG status pills

14. **Implement Team Health Widget**
    - Create `TeamHealthWidget.svelte`
    - Display health score gauge
    - Show cycle time and velocity metrics

15. **Implement Risk Indicators Widget**
    - Create `RiskIndicatorsWidget.svelte`
    - List top 5 risks
    - Highlight critical/high severity

16. **Implement Recent Updates Widget**
    - Create `RecentUpdatesWidget.svelte`
    - Display activity feed timeline
    - Add relative timestamps
    - Use activity type icons

17. **Create Dashboard Page** (`src/routes/(auth)/dashboard/+page.svelte`)
    - Import all 6 widgets
    - Layout in responsive grid (3 columns desktop, 2 tablet, 1 mobile)
    - Add page title and metadata

18. **Apply ION Branding**
    - Configure Tailwind theme with Blue Tech colors
    - Add Söhne font (or fallback to system fonts if unavailable)
    - Style components to match Modern SaaS design requirements

19. **Responsive Testing**
    - Test on desktop (1920px, 1366px)
    - Test on tablet (768px, 1024px)
    - Test on mobile (375px, 414px)
    - Adjust grid and spacing as needed

20. **Write Tests**
    - Unit tests for each widget component
    - E2E test for dashboard flow (login → see widgets)
    - Verify loading/error states
    - Test responsive behavior

21. **Code Review & Refinement**
    - Run linter (fix any errors)
    - Format code with Prettier
    - Check TypeScript errors (`npm run check`)
    - Review code for best practices

22. **Documentation**
    - Add JSDoc comments to complex functions
    - Update README with setup instructions
    - Document component props and usage

### Testing Strategy

**Unit Testing (Vitest + Testing Library):**

**Test Coverage:**
- All 6 dashboard widgets
- UI primitive components (Widget, StatusPill, ProgressRing)
- tRPC procedures (mock database)
- Utility functions

**Test Cases:**
1. **Widget Rendering:**
   - Component renders without errors
   - Loading state displays correctly
   - Error state shows error message
   - Data displays when loaded

2. **Data Display:**
   - RAG statuses show correct colors
   - Numbers format correctly
   - Percentages calculate correctly
   - Lists filter/sort correctly

3. **Interactivity:**
   - AI Panel toggles open/close
   - Sidebar collapses on mobile
   - Logout button calls auth.signOut()

**Integration Testing (E2E with Playwright):**

**Test Scenarios:**
1. **Authentication Flow:**
   - User logs in with valid credentials → redirects to dashboard
   - User tries invalid credentials → shows error
   - Unauthenticated user redirects to login when accessing dashboard

2. **Dashboard Display:**
   - Dashboard loads all 6 widgets
   - Each widget shows data (not loading forever)
   - No console errors on page load

3. **Responsive Behavior:**
   - Mobile: Widgets stack vertically
   - Tablet: Widgets in 2-column grid
   - Desktop: Widgets in 3-column grid
   - AI Panel behaves correctly on all screen sizes

4. **Navigation:**
   - Sidebar links navigate correctly
   - User menu opens and closes
   - Logout works and redirects to login

**Performance Testing:**
- Lighthouse audit (target: >90 score)
- Measure Time to Interactive
- Check bundle size (target: < 200KB gzipped)

**Manual Testing Checklist:**
- [ ] All widgets load data correctly
- [ ] RAG colors match design (Red, Amber, Green)
- [ ] Fonts render correctly (Söhne or fallback)
- [ ] Responsive layout works on all breakpoints
- [ ] AI Panel opens/closes smoothly
- [ ] Logout clears session
- [ ] No console errors or warnings
- [ ] Loading states appear during data fetch
- [ ] Error states handle failed requests gracefully

### Acceptance Criteria

**Functional Requirements:**

1. ✅ **Dashboard Page Exists:**
   - Accessible at `/dashboard` route
   - Protected (requires authentication)
   - Renders without errors

2. ✅ **All 6 Widgets Display:**
   - Portfolio Health (RAG breakdown)
   - Value Delivery (progress ring)
   - Active Initiatives (count + list)
   - Team Health (gauge + metrics)
   - Risk Indicators (top 5 risks)
   - Recent Updates (activity feed)

3. ✅ **Data Loads from Supabase:**
   - tRPC procedures fetch data successfully
   - Seed data populates database
   - Widgets display real data (not hardcoded)

4. ✅ **Authentication Works:**
   - Login page accepts credentials
   - Supabase Auth validates user
   - Dashboard only accessible when logged in
   - Logout clears session and redirects

5. ✅ **Navigation Functions:**
   - Sidebar displays on all pages
   - TopBar shows user info
   - Mobile hamburger menu works
   - Logout button functions correctly

6. ✅ **AI Assistant Panel (Placeholder):**
   - Panel toggles open/close
   - Displays placeholder content
   - Positioned correctly (right side)
   - Responsive (full-screen on mobile)

7. ✅ **Responsive Design:**
   - Desktop (>1024px): 3-column grid
   - Tablet (640-1024px): 2-column grid
   - Mobile (<640px): 1-column stack
   - All components render correctly at all sizes

8. ✅ **ION Branding Applied:**
   - Blue Tech color palette used
   - Söhne font configured (or fallback)
   - Modern SaaS design aesthetics
   - Consistent styling across components

**Technical Requirements:**

9. ✅ **Type Safety:**
   - No TypeScript errors (`npm run check` passes)
   - tRPC provides end-to-end types
   - Drizzle schema types used throughout

10. ✅ **Code Quality:**
    - ESLint passes with no errors
    - Prettier formatting applied
    - No console errors in browser
    - Lighthouse score > 90

11. ✅ **Testing:**
    - Unit test coverage > 70%
    - E2E tests pass for critical flows
    - All tests run successfully (`npm test`)

12. ✅ **Performance:**
    - Initial load < 2 seconds
    - Time to Interactive < 3 seconds
    - Widget data loads < 500ms each

**User Experience Requirements:**

13. ✅ **Loading States:**
    - Widgets show loading indicator while fetching
    - No flash of empty content
    - Smooth transitions when data loads

14. ✅ **Error Handling:**
    - Failed API calls show user-friendly errors
    - Network errors handled gracefully
    - No crashes or blank screens

15. ✅ **Visual Polish:**
    - RAG colors clearly distinguishable
    - Progress indicators smooth
    - Spacing and alignment consistent
    - Typography hierarchy clear

---

## Developer Resources

### File Paths Reference

**Complete list of files to create/modify:**

**Routes:**
```
src/routes/
├── (auth)/
│   ├── +layout.server.ts         # Auth guard
│   ├── +layout.svelte             # Auth-protected layout
│   └── dashboard/
│       └── +page.svelte           # Dashboard page
├── login/
│   └── +page.svelte               # Login page
└── +layout.svelte                 # Root layout (nav)
```

**Components:**
```
src/lib/components/
├── dashboard/
│   ├── PortfolioHealthWidget.svelte
│   ├── ValueDeliveryWidget.svelte
│   ├── ActiveInitiativesWidget.svelte
│   ├── TeamHealthWidget.svelte
│   ├── RiskIndicatorsWidget.svelte
│   └── RecentUpdatesWidget.svelte
├── layout/
│   ├── Sidebar.svelte
│   ├── TopBar.svelte
│   └── AIAssistantPanel.svelte
└── ui/
    ├── Widget.svelte
    ├── StatusPill.svelte
    └── ProgressRing.svelte
```

**Server:**
```
src/lib/server/
├── trpc/
│   ├── router.ts                  # Root tRPC router
│   └── routers/
│       └── dashboard.ts           # Dashboard procedures
└── db/
    ├── client.ts                  # Drizzle client
    └── schema.ts                  # Database schema
```

**Database:**
```
drizzle/
├── migrations/                     # Auto-generated (don't edit)
│   └── 0000_initial.sql
└── seed.ts                        # Seed data script
```

**Tests:**
```
tests/
├── unit/
│   └── components/
│       └── dashboard/
│           ├── PortfolioHealthWidget.test.ts
│           ├── ValueDeliveryWidget.test.ts
│           └── (... other widget tests)
└── e2e/
    ├── auth.spec.ts               # Login/logout tests
    └── dashboard.spec.ts          # Dashboard flow tests
```

**Config:**
```
Root/
├── drizzle.config.ts              # Drizzle ORM config
├── tailwind.config.js             # Tailwind CSS config
├── svelte.config.js               # SvelteKit config
├── vite.config.ts                 # Vite config (auto-generated)
├── playwright.config.ts           # Playwright config
├── vitest.config.ts               # Vitest config
├── .env.example                   # Environment template
└── .env                           # Environment vars (DO NOT COMMIT)
```

### Key Code Locations

**Database Schema:**
- `src/lib/server/db/schema.ts:5-50` - Table definitions (initiatives, risks, teamMetrics, activityFeed)

**tRPC Routers:**
- `src/lib/server/trpc/router.ts:10` - Root router setup
- `src/lib/server/trpc/routers/dashboard.ts:15-100` - Dashboard data procedures

**Components:**
- `src/lib/components/dashboard/PortfolioHealthWidget.svelte` - Main widget implementation
- `src/lib/components/layout/Sidebar.svelte:20` - Navigation links
- `src/lib/components/ui/StatusPill.svelte:10` - RAG color logic

**Authentication:**
- `src/routes/(auth)/+layout.server.ts:5` - Auth guard check
- `src/lib/stores/auth.ts:10` - Auth store setup

**Styling:**
- `tailwind.config.js:15` - ION brand colors
- `src/app.css` - Global styles (Tailwind imports)

### Testing Locations

**Unit Tests:**
```
tests/unit/
└── components/
    └── dashboard/
        ├── PortfolioHealthWidget.test.ts
        ├── ValueDeliveryWidget.test.ts
        ├── ActiveInitiativesWidget.test.ts
        ├── TeamHealthWidget.test.ts
        ├── RiskIndicatorsWidget.test.ts
        └── RecentUpdatesWidget.test.ts
```

**Integration/E2E Tests:**
```
tests/e2e/
├── auth.spec.ts                   # Login, logout flows
└── dashboard.spec.ts              # Dashboard functionality
```

**Test Commands:**
```bash
npm run test:unit                  # Run Vitest unit tests
npm run test:e2e                   # Run Playwright E2E tests
npm test                           # Run all tests
npm run test:unit -- --coverage   # Generate coverage report
```

### Documentation to Update

**Files to create/update:**

1. **README.md** - Add setup instructions
   - Prerequisites
   - Installation steps
   - Environment variables
   - Running development server
   - Running tests
   - Deployment

2. **ARCHITECTURE.md** (optional) - Document technical decisions
   - Why tRPC over REST?
   - Why Drizzle over Prisma?
   - Component architecture
   - Data flow diagrams

3. **CONTRIBUTING.md** (optional) - Developer guidelines
   - Code style conventions
   - Testing requirements
   - PR process

4. **Component JSDoc Comments** - Inline documentation
   ```typescript
   /**
    * Portfolio Health Widget
    * Displays RAG status breakdown of all initiatives
    * 
    * @component
    * @example
    * <PortfolioHealthWidget />
    */
   ```

---

## UX/UI Considerations

**UI Components Affected:**

**New Components:**
- 6 dashboard widgets (all new)
- 3 layout components (Sidebar, TopBar, AI Panel)
- 3 UI primitives (Widget wrapper, StatusPill, ProgressRing)
- Login form
- Dashboard grid container

**UX Flow:**

**User Journey:**
1. User lands on login page
2. Enters credentials (or sees error if invalid)
3. Redirected to dashboard upon success
4. Sees 6 widgets loading simultaneously
5. Data populates widgets within 500ms
6. Can scroll through widgets, toggle AI panel
7. Can navigate via sidebar to other sections (future)
8. Can logout from user menu

**Visual & Interaction Patterns:**

**Design System (Skeleton UI):**
- Use Skeleton UI Card component for widget wrappers
- Use Skeleton UI Button for actions
- Use Skeleton UI AppShell for layout structure
- Extend with custom Tailwind classes for ION branding

**Color Palette:**
```css
/* ION Blue Tech Palette */
--ion-blue-50: #eff6ff;
--ion-blue-500: #3b82f6;   /* Primary */
--ion-blue-700: #1d4ed8;   /* Dark accent */

/* RAG Status Colors */
--ion-red: #ef4444;         /* Danger / At Risk */
--ion-amber: #f59e0b;       /* Warning / Needs Attention */
--ion-green: #10b981;       /* Success / On Track */

/* Neutrals (from Skeleton UI) */
--surface-50: #fafafa;
--surface-900: #171717;
```

**Typography:**
- Primary: Söhne (if available), fallback to system-ui
- Headers: Font weight 600-700
- Body: Font weight 400
- Numbers/Metrics: Font weight 500, tabular-nums for alignment

**Component Patterns:**

**Widget Structure:**
```svelte
<div class="card p-6 bg-surface-50 dark:bg-surface-900">
  <h3 class="h3 mb-4">Widget Title</h3>
  {#if $query.isLoading}
    <div class="placeholder animate-pulse" />
  {:else if $query.error}
    <p class="text-error-500">Error loading data</p>
  {:else if $query.data}
    <!-- Widget content -->
  {/if}
</div>
```

**RAG Status Pills:**
```svelte
<span class="badge variant-filled-{ragColor}">
  {ragStatus}
</span>
```

**Responsive Grid:**
```svelte
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  <!-- Widgets -->
</div>
```

**Accessibility:**

**Requirements:**
- Keyboard navigation: All interactive elements accessible via Tab
- Screen readers: Use semantic HTML (h1-h6, nav, main, article)
- ARIA labels: Add labels to icon buttons (e.g., AI Panel toggle)
- Color contrast: Ensure text meets WCAG AA (4.5:1 ratio)
- Focus indicators: Visible focus rings on all interactive elements

**Implementation:**
```svelte
<!-- Screen reader friendly -->
<button aria-label="Toggle AI Assistant Panel">
  <svg><!-- Icon --></svg>
</button>

<!-- Semantic structure -->
<main>
  <h1>Dashboard</h1>
  <section aria-label="Portfolio Metrics">
    <article>
      <h2>Portfolio Health</h2>
      <!-- Widget content -->
    </article>
  </section>
</main>
```

**User Feedback:**

**Loading States:**
- Skeleton loaders for widgets (pulsing placeholders)
- Spinner for initial auth check
- Progress bar for long operations (if any)

**Error Messages:**
- Toast notifications for transient errors
- Inline error text for persistent failures
- "Retry" button for failed data fetches

**Success Confirmations:**
- Toast for successful login
- Subtle animation when data loads (fade-in)

**Progress Indicators:**
- Progress rings for value delivery
- Health score gauges for team metrics
- Timeline visualization for activity feed

**Micro-interactions:**
- Hover effects on clickable elements
- Smooth transitions (200-300ms)
- AI Panel slide-in animation
- Widget data fade-in when loaded

---

## Testing Approach

**Test Framework Stack:**

- **Unit Tests:** Vitest 1.2+ (fast, ESM-native)
- **Component Tests:** @testing-library/svelte 4.0+
- **E2E Tests:** Playwright 1.40+ (cross-browser)
- **Assertion Library:** Vitest (built-in expect)

**Test Organization:**

```
tests/
├── unit/
│   ├── components/
│   │   ├── dashboard/            # Widget component tests
│   │   ├── layout/               # Layout component tests
│   │   └── ui/                   # UI primitive tests
│   └── server/
│       └── trpc/                 # tRPC procedure tests
└── e2e/
    ├── auth.spec.ts              # Authentication flows
    └── dashboard.spec.ts         # Dashboard functionality
```

**Coverage Strategy:**

**Unit Test Coverage (Target: 70%+):**
- All dashboard widget components (100%)
- UI primitives (100%)
- tRPC procedures (100%)
- Utility functions (100%)
- Layout components (core functionality)

**E2E Test Coverage:**
- Happy path: Login → Dashboard → See all widgets
- Error path: Invalid login credentials
- Responsive: Mobile, tablet, desktop layouts
- Navigation: Sidebar links, logout

**Test Execution:**

```bash
# Run all tests
npm test

# Unit tests only (watch mode)
npm run test:unit -- --watch

# E2E tests only
npm run test:e2e

# Coverage report
npm run test:unit -- --coverage

# Run tests for specific file
npm run test:unit -- PortfolioHealthWidget
```

**Mocking Strategy:**

**Mock tRPC in Components:**
```typescript
import { vi } from 'vitest';

// Mock tRPC client
vi.mock('$lib/trpc/client', () => ({
  trpc: {
    dashboard: {
      getPortfolioHealth: {
        useQuery: vi.fn(() => ({
          data: { total: 10, red: 2, amber: 3, green: 5 },
          isLoading: false,
          error: null,
        })),
      },
    },
  },
}));
```

**Mock Database in tRPC Tests:**
```typescript
import { vi } from 'vitest';
import { db } from '$lib/server/db/client';

// Mock Drizzle DB
vi.mock('$lib/server/db/client', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockResolvedValue([/* mock data */]),
  },
}));
```

**Playwright Configuration:**

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Deployment Strategy

### Deployment Steps

**Platform: Vercel (Recommended)**

**Prerequisites:**
- Vercel account
- Git repository connected to Vercel
- Supabase production project

**Deployment Process:**

1. **Prepare Production Environment:**
   - Create Supabase production project (separate from dev)
   - Get production credentials (URL, anon key, database URL)
   - Add production environment variables in Vercel:
     ```
     SUPABASE_URL=https://prod-project.supabase.co
     SUPABASE_ANON_KEY=prod-anon-key
     DATABASE_URL=postgresql://postgres:[password]@db.prod-project.supabase.co:5432/postgres
     PUBLIC_APP_URL=https://ion.vercel.app
     ```

2. **Run Database Migrations:**
   ```bash
   # Point to production database
   export DATABASE_URL="postgresql://..."
   
   # Run migrations
   npx drizzle-kit push:pg
   
   # Run seed data (if needed)
   npm run db:seed
   ```

3. **Push to Git:**
   ```bash
   git add .
   git commit -m "feat: add home dashboard"
   git push origin feature/home-dashboard
   ```

4. **Deploy via Vercel:**
   - Vercel auto-deploys on git push (if connected)
   - Or manually: `vercel deploy --prod`

5. **Verify Deployment:**
   - Visit production URL
   - Test login flow
   - Verify all widgets load data
   - Check Vercel logs for errors

6. **Configure Custom Domain (Optional):**
   - Add domain in Vercel settings
   - Update DNS records
   - Update `PUBLIC_APP_URL` environment variable

**Build Command:**
```bash
npm run build
```

**Environment Variables (Vercel Dashboard):**
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `PUBLIC_APP_URL`

### Rollback Plan

**If Deployment Fails:**

1. **Immediate Rollback:**
   - Vercel: Click "Rollback" to previous deployment
   - Or redeploy previous commit: `vercel --prod --force`

2. **Identify Issue:**
   - Check Vercel deployment logs
   - Check browser console errors
   - Check Supabase logs

3. **Fix and Redeploy:**
   - Fix issue locally
   - Test thoroughly in development
   - Push fix and redeploy

**Database Rollback:**
- If schema migration causes issues, rollback with Drizzle:
  ```bash
  # Revert to previous migration
  npx drizzle-kit drop
  ```
- Restore database from Supabase backup (if needed)

**Zero-Downtime Strategy:**
- Use Vercel preview deployments for testing
- Only promote to production after QA pass
- Keep previous deployment available for instant rollback

### Monitoring

**Post-Deployment Monitoring:**

**1. Vercel Analytics:**
- Enable Vercel Analytics for performance tracking
- Monitor Web Vitals (LCP, FID, CLS)
- Track pageviews and user sessions

**2. Error Tracking:**
- **Option A:** Sentry integration (recommended)
  ```bash
  npm install @sentry/sveltekit
  ```
- **Option B:** Vercel Error Logging (built-in)

**3. Application Metrics:**
- Monitor API response times (tRPC calls)
- Track database query performance (Supabase dashboard)
- Watch for failed auth attempts

**4. User Monitoring:**
- Track login success rate
- Monitor dashboard load times
- Identify slow widgets

**Alerts:**
- Set up Vercel alerts for:
  - Deployment failures
  - High error rates (> 5%)
  - Poor performance (TTI > 5s)
- Supabase alerts for:
  - Database connection issues
  - High query latency
  - Authentication failures

**Logging:**
- Server errors: Logged to Vercel Functions logs
- Client errors: Console errors (capture with Sentry)
- Database queries: Supabase query logs

**Health Checks:**
- Create `/api/health` endpoint returning 200 if app is healthy
- Monitor with external uptime service (e.g., Better Uptime, Pingdom)

---

## Summary

This technical specification provides a comprehensive blueprint for implementing the ION Home Dashboard using a modern, type-safe stack:

**Tech Stack:** SvelteKit 2 + TypeScript + tRPC + Drizzle + Supabase
**Scope:** Level 1 feature (1 epic, 3 stories expected)
**Timeline:** ~1-2 weeks for experienced SvelteKit developer
**Deliverables:** 6 dashboard widgets, auth flow, responsive layout, AI panel placeholder

**Next Steps:**
1. Review and approve this spec
2. Create 3 user stories from this spec (epic breakdown)
3. Generate story context for Story 1
4. Begin implementation with Story 1 (Database & API foundation)

**Key Success Factors:**
✅ Type safety from database to UI
✅ Comprehensive seed data for realistic testing
✅ Responsive design tested on all breakpoints
✅ 70%+ test coverage
✅ Lighthouse score > 90
✅ ION branding applied consistently
