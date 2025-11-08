# Story 1.3: Dashboard Widgets Implementation

**Status:** Draft

---

## User Story

As an executive,
I want to see 6 critical portfolio metrics at a glance,
So that I can quickly assess health, identify risks, and make informed decisions about initiative planning.

---

## Acceptance Criteria

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

---

## Implementation Details

### Tasks / Subtasks

- [ ] **Task 1:** Create Dashboard Page (AC: #7)
  - [ ] Create `src/routes/(auth)/dashboard/+page.svelte`
  - [ ] Set up responsive grid layout using Tailwind CSS (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
  - [ ] Add page title "Executive Dashboard"
  - [ ] Import all 6 widget components
  - [ ] Arrange widgets in grid (2 rows x 3 columns desktop)
  - [ ] Test responsive behavior on mobile, tablet, desktop

- [ ] **Task 2:** Create Portfolio Health Widget (AC: #1, #8)
  - [ ] Create `src/lib/components/widgets/PortfolioHealthWidget.svelte`
  - [ ] Use Widget wrapper from UI primitives
  - [ ] Call `trpc.dashboard.getPortfolioHealth.useQuery()` using svelte-query adapter
  - [ ] Display total initiatives count prominently
  - [ ] Show RAG breakdown with StatusPill components (Red, Amber, Green)
  - [ ] Calculate and display percentages for each RAG status
  - [ ] Add loading skeleton (show placeholder cards while loading)
  - [ ] Add error state (display error message if API fails)
  - [ ] Style with Blue Tech palette

- [ ] **Task 3:** Create Value Delivery Widget (AC: #2, #8)
  - [ ] Create `src/lib/components/widgets/ValueDeliveryWidget.svelte`
  - [ ] Use Widget wrapper from UI primitives
  - [ ] Call `trpc.dashboard.getValueDelivery.useQuery()`
  - [ ] Use ProgressRing component to show delivered/target ratio
  - [ ] Display values as currency format (e.g., "$2.5M of $5M")
  - [ ] Calculate percentage (delivered / target * 100)
  - [ ] Add loading skeleton
  - [ ] Add error state
  - [ ] Style progress ring with primary color

- [ ] **Task 4:** Create Active Initiatives Widget (AC: #3, #8)
  - [ ] Create `src/lib/components/widgets/ActiveInitiativesWidget.svelte`
  - [ ] Use Widget wrapper from UI primitives
  - [ ] Call `trpc.dashboard.getActiveInitiatives.useQuery()`
  - [ ] Display count of active initiatives
  - [ ] List top 3-5 initiatives with names
  - [ ] Show RAG status pill for each initiative using StatusPill component
  - [ ] Add loading skeleton (show list placeholders)
  - [ ] Add error state
  - [ ] Style list with hover effects

- [ ] **Task 5:** Create Team Health Widget (AC: #4, #8)
  - [ ] Create `src/lib/components/widgets/TeamHealthWidget.svelte`
  - [ ] Use Widget wrapper from UI primitives
  - [ ] Call `trpc.dashboard.getTeamHealth.useQuery()`
  - [ ] Create health score gauge component (0-100 scale)
  - [ ] Color code gauge: Red (<50), Amber (50-75), Green (>75)
  - [ ] Display average cycle time (e.g., "12 days")
  - [ ] Display team velocity (e.g., "32 points/sprint")
  - [ ] Add loading skeleton
  - [ ] Add error state
  - [ ] Style with RAG colors

- [ ] **Task 6:** Create Risk Indicators Widget (AC: #5, #8)
  - [ ] Create `src/lib/components/widgets/RiskIndicatorsWidget.svelte`
  - [ ] Use Widget wrapper from UI primitives
  - [ ] Call `trpc.dashboard.getRisks.useQuery()`
  - [ ] Display top 5 risks sorted by severity
  - [ ] Show severity pills: Critical (Red), High (Amber), Medium (Yellow)
  - [ ] Display risk title/description
  - [ ] Add loading skeleton (show list placeholders)
  - [ ] Add error state
  - [ ] Style list with severity-based border colors

- [ ] **Task 7:** Create Recent Updates Widget (AC: #6, #8)
  - [ ] Create `src/lib/components/widgets/RecentUpdatesWidget.svelte`
  - [ ] Use Widget wrapper from UI primitives
  - [ ] Call `trpc.dashboard.getRecentActivity.useQuery()`
  - [ ] Display scrollable activity feed (max-height with overflow-y-auto)
  - [ ] Show last 10 activities with icons (based on activity type)
  - [ ] Format timestamps as relative time ("2 hours ago", "3 days ago") using a date utility
  - [ ] Add loading skeleton (show list placeholders)
  - [ ] Add error state
  - [ ] Style with alternating row backgrounds

- [ ] **Task 8:** Implement Loading States (AC: #8)
  - [ ] Create skeleton placeholder components for each widget type
  - [ ] Use Skeleton UI's skeleton utilities or create custom placeholders
  - [ ] Show skeletons while `isLoading` is true from svelte-query
  - [ ] Add smooth transition when data loads (fade-in animation)
  - [ ] Test all widgets show loading state on slow network

- [ ] **Task 9:** Implement Error States (AC: #8)
  - [ ] Create error display component (reusable across widgets)
  - [ ] Show error message when `isError` is true from svelte-query
  - [ ] Add "Retry" button that refetches data
  - [ ] Style error state with warning icon and error-500 color
  - [ ] Test error states by simulating API failures

- [ ] **Task 10:** Apply ION Branding (AC: #9)
  - [ ] Configure Tailwind CSS with Blue Tech color palette (primary, secondary, accent)
  - [ ] Set RAG colors: Red (#EF4444), Amber (#F59E0B), Green (#10B981)
  - [ ] Configure font family: Söhne (with system-ui fallback)
  - [ ] Update all widgets to use branded colors
  - [ ] Add ION logo to page header
  - [ ] Verify consistent spacing and padding across widgets

- [ ] **Task 11:** Write Unit Tests (AC: #10)
  - [ ] Create `tests/unit/widgets/PortfolioHealthWidget.test.ts`
  - [ ] Create `tests/unit/widgets/ValueDeliveryWidget.test.ts`
  - [ ] Create `tests/unit/widgets/ActiveInitiativesWidget.test.ts`
  - [ ] Create `tests/unit/widgets/TeamHealthWidget.test.ts`
  - [ ] Create `tests/unit/widgets/RiskIndicatorsWidget.test.ts`
  - [ ] Create `tests/unit/widgets/RecentUpdatesWidget.test.ts`
  - [ ] Test each widget renders with mock data
  - [ ] Test loading states render correctly
  - [ ] Test error states render correctly
  - [ ] Test data transformations (percentages, currency formatting, relative time)
  - [ ] Run `npm run test:unit` and verify 70%+ coverage

- [ ] **Task 12:** Write E2E Test (AC: #11)
  - [ ] Create `tests/e2e/dashboard.spec.ts`
  - [ ] Test: Authenticated user navigates to /dashboard
  - [ ] Test: All 6 widgets are visible on page
  - [ ] Test: Portfolio Health Widget displays RAG breakdown
  - [ ] Test: Value Delivery Widget shows progress ring
  - [ ] Test: Active Initiatives Widget lists initiatives
  - [ ] Test: Team Health Widget shows gauge
  - [ ] Test: Risk Indicators Widget lists risks
  - [ ] Test: Recent Updates Widget shows activity feed
  - [ ] Test: No console errors during page load
  - [ ] Run `npm run test:e2e` and verify pass

- [ ] **Task 13:** Optimize Performance (AC: #12)
  - [ ] Run Lighthouse audit on /dashboard page
  - [ ] Optimize images (use WebP format, lazy loading)
  - [ ] Code split large components
  - [ ] Minimize CSS bundle (purge unused Tailwind classes)
  - [ ] Enable tRPC query caching (staleTime: 5 minutes)
  - [ ] Reduce API payload sizes (only send required fields)
  - [ ] Test on slow 3G network
  - [ ] Verify Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)

### Technical Summary

This story brings the ION Executive Dashboard to life by implementing all 6 critical portfolio metric widgets that display real-time data from the tRPC API layer.

**Key Components:**

- **Dashboard Page:** Central hub at `/dashboard` with responsive 3-column grid
- **6 Widget Components:** Portfolio Health, Value Delivery, Active Initiatives, Team Health, Risk Indicators, Recent Updates
- **Data Fetching:** svelte-query adapter for tRPC with automatic caching and refetching
- **UI States:** Loading skeletons, error handling, smooth transitions
- **Branding:** Blue Tech palette, RAG colors, Söhne typography

**Widget Architecture:**

Each widget follows a consistent pattern:
1. Wraps content in `<Widget>` primitive component (card styling)
2. Uses svelte-query's `useQuery()` to fetch data via tRPC
3. Handles three states: loading (skeleton), error (message + retry), success (data display)
4. Uses UI primitives: StatusPill for RAG indicators, ProgressRing for circular progress
5. Responsive design with Tailwind utilities

**Data Flow:**

```
Dashboard Page
  ↓
Widget Component (e.g., PortfolioHealthWidget.svelte)
  ↓
trpc.dashboard.getPortfolioHealth.useQuery() (svelte-query)
  ↓
tRPC Client (auto-generated types)
  ↓
tRPC Server Router (src/lib/server/routers/dashboard.ts)
  ↓
Drizzle ORM Query (src/lib/server/db/schema.ts)
  ↓
Supabase PostgreSQL
```

**Responsive Grid Layout:**

- **Desktop (≥1024px):** 3 columns x 2 rows (all widgets visible)
- **Tablet (640-1024px):** 2 columns x 3 rows
- **Mobile (<640px):** 1 column x 6 rows (stacked)

**Performance Strategy:**

- **Query Caching:** 5-minute staleTime prevents unnecessary refetches
- **Code Splitting:** Each widget lazy-loaded (Vite dynamic imports)
- **Skeleton Loading:** Instant visual feedback while fetching
- **Optimized Images:** WebP format, lazy loading for icons
- **CSS Purging:** Remove unused Tailwind classes in production

### Project Structure Notes

- **Files to create:**
  - `src/routes/(auth)/dashboard/+page.svelte` - Main dashboard page
  - `src/lib/components/widgets/PortfolioHealthWidget.svelte` - Portfolio health metrics
  - `src/lib/components/widgets/ValueDeliveryWidget.svelte` - Value delivery progress
  - `src/lib/components/widgets/ActiveInitiativesWidget.svelte` - Active initiatives list
  - `src/lib/components/widgets/TeamHealthWidget.svelte` - Team health gauge
  - `src/lib/components/widgets/RiskIndicatorsWidget.svelte` - Risk indicators list
  - `src/lib/components/widgets/RecentUpdatesWidget.svelte` - Activity feed
  - `tests/unit/widgets/PortfolioHealthWidget.test.ts` - Unit test
  - `tests/unit/widgets/ValueDeliveryWidget.test.ts` - Unit test
  - `tests/unit/widgets/ActiveInitiativesWidget.test.ts` - Unit test
  - `tests/unit/widgets/TeamHealthWidget.test.ts` - Unit test
  - `tests/unit/widgets/RiskIndicatorsWidget.test.ts` - Unit test
  - `tests/unit/widgets/RecentUpdatesWidget.test.ts` - Unit test
  - `tests/e2e/dashboard.spec.ts` - E2E dashboard test

- **Expected test locations:**
  - `tests/unit/widgets/` - Widget component unit tests
  - `tests/e2e/` - Dashboard E2E test

- **Estimated effort:** 5 story points (3-5 days)

- **Prerequisites:**
  - Story 1 complete (tRPC API endpoints functional)
  - Story 2 complete (Layout, auth, and UI primitives available)
  - Seed data populated in Supabase
  - Blue Tech color palette configured in Tailwind
  - Söhne font loaded (or system-ui fallback)

### Key Code References

**Dashboard Page Example (from tech-spec.md):**

```svelte
<!-- src/routes/(auth)/dashboard/+page.svelte -->
<script lang="ts">
  import PortfolioHealthWidget from '$lib/components/widgets/PortfolioHealthWidget.svelte';
  import ValueDeliveryWidget from '$lib/components/widgets/ValueDeliveryWidget.svelte';
  import ActiveInitiativesWidget from '$lib/components/widgets/ActiveInitiativesWidget.svelte';
  import TeamHealthWidget from '$lib/components/widgets/TeamHealthWidget.svelte';
  import RiskIndicatorsWidget from '$lib/components/widgets/RiskIndicatorsWidget.svelte';
  import RecentUpdatesWidget from '$lib/components/widgets/RecentUpdatesWidget.svelte';
</script>

<div class="container mx-auto p-6">
  <h1 class="h1 mb-6">Executive Dashboard</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <PortfolioHealthWidget />
    <ValueDeliveryWidget />
    <ActiveInitiativesWidget />
    <TeamHealthWidget />
    <RiskIndicatorsWidget />
    <RecentUpdatesWidget />
  </div>
</div>
```

**Widget Component Example (from tech-spec.md):**

```svelte
<!-- src/lib/components/widgets/PortfolioHealthWidget.svelte -->
<script lang="ts">
  import { trpc } from '$lib/trpc/client';
  import Widget from '$lib/components/ui/Widget.svelte';
  import StatusPill from '$lib/components/ui/StatusPill.svelte';

  const query = trpc.dashboard.getPortfolioHealth.useQuery();
</script>

<Widget title="Portfolio Health">
  {#if $query.isLoading}
    <!-- Skeleton loading state -->
    <div class="animate-pulse">
      <div class="h-8 bg-surface-200 rounded mb-4"></div>
      <div class="h-6 bg-surface-200 rounded mb-2"></div>
      <div class="h-6 bg-surface-200 rounded"></div>
    </div>
  {:else if $query.isError}
    <!-- Error state -->
    <div class="text-error-500">
      <p>Failed to load portfolio health</p>
      <button class="btn btn-sm" on:click={() => $query.refetch()}>Retry</button>
    </div>
  {:else if $query.data}
    <!-- Success state -->
    <div class="text-center mb-4">
      <div class="text-4xl font-bold">{$query.data.total}</div>
      <div class="text-sm text-surface-600">Total Initiatives</div>
    </div>

    <div class="flex justify-around">
      <div class="text-center">
        <StatusPill status="red">{$query.data.red}</StatusPill>
        <div class="text-xs mt-1">
          {Math.round(($query.data.red / $query.data.total) * 100)}%
        </div>
      </div>

      <div class="text-center">
        <StatusPill status="amber">{$query.data.amber}</StatusPill>
        <div class="text-xs mt-1">
          {Math.round(($query.data.amber / $query.data.total) * 100)}%
        </div>
      </div>

      <div class="text-center">
        <StatusPill status="green">{$query.data.green}</StatusPill>
        <div class="text-xs mt-1">
          {Math.round(($query.data.green / $query.data.total) * 100)}%
        </div>
      </div>
    </div>
  {/if}
</Widget>
```

**Responsive Grid Breakpoints (from tech-spec.md):**

```css
/* Tailwind breakpoints used in dashboard grid */
grid-cols-1              /* Mobile: < 640px - 1 column */
md:grid-cols-2           /* Tablet: 640-1024px - 2 columns */
lg:grid-cols-3           /* Desktop: ≥ 1024px - 3 columns */

/* Widget spacing */
gap-6                    /* 1.5rem gap between widgets */
```

**Relative Time Formatting (from tech-spec.md):**

```typescript
// Utility function for relative timestamps
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
```

---

## Context References

**Tech-Spec:** [tech-spec.md](../tech-spec.md) - Primary context document containing:

- **Widget Implementation Details** (Lines 592-816): Complete specifications for all 6 widgets
- **Component Architecture** (Lines 237-253): Widget component structure
- **Data Fetching Strategy** (Lines 467-503): svelte-query integration with tRPC
- **Responsive Design Breakpoints** (Lines 918-935): Mobile/tablet/desktop breakpoints
- **Loading & Error States** (Lines 1749-1787): Skeleton and error handling patterns
- **Performance Optimization** (Lines 1527-1608): Caching, code splitting, Lighthouse targets
- **Testing Strategy** (Lines 1378-1526): Unit and E2E testing approach
- **UX/UI Considerations** (Lines 1609-1747): Color palette, typography, component patterns
- **Implementation Guide - Phase 3** (Lines 1202-1238): Detailed task breakdown

**Architecture:** See tech-spec.md sections:
- Widget Components (Lines 185-190 in Source Tree Changes)
- Dashboard Page (Line 168 in Source Tree Changes)
- tRPC Procedures (Lines 508-591 in Implementation Details)
- Database Queries (Lines 354-404 in Implementation Details)

---

## Dev Agent Record

### Agent Model Used

<!-- Will be populated during dev-story execution -->

### Debug Log References

<!-- Will be populated during dev-story execution -->

### Completion Notes

<!-- Will be populated during dev-story execution -->

### Files Modified

<!-- Will be populated during dev-story execution -->

### Test Results

<!-- Will be populated during dev-story execution -->

---

## Review Notes

<!-- Will be populated during code review -->
