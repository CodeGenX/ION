# Story 1.1: Database & API Foundation

**Status:** Draft

---

## User Story

As a developer,
I want a type-safe database schema and API layer,
So that I can reliably store and retrieve portfolio metrics for the dashboard widgets.

---

## Acceptance Criteria

**AC #1:** Database schema created with 4 tables (initiatives, risks, teamMetrics, activityFeed) using Drizzle ORM

**AC #2:** Schema includes proper indexes (RAG status, initiative status, activity feed created date) for query performance

**AC #3:** Seed data script populates database with 5-10 realistic initiatives, risks, team metrics, and activity feed entries

**AC #4:** tRPC router implemented with 6 procedures:
- getPortfolioHealth
- getValueDelivery
- getActiveInitiatives
- getTeamHealth
- getRisks
- getRecentActivity

**AC #5:** All tRPC procedures return correctly typed data matching expected widget schemas

**AC #6:** Unit tests written for all 6 tRPC procedures with mocked database, achieving 100% procedure coverage

**AC #7:** Database migrations run successfully on Supabase development instance

---

## Implementation Details

### Tasks / Subtasks

- [ ] **Task 1:** Create database schema (AC: #1, #2)
  - [ ] Define `initiatives` table with fields: id, name, status, ragStatus, targetValue, deliveredValue, dates
  - [ ] Define `risks` table with foreign key to initiatives
  - [ ] Define `teamMetrics` table with performance data fields
  - [ ] Define `activityFeed` table for audit trail
  - [ ] Add indexes: initiatives_rag_idx, initiatives_status_idx, risks_initiative_idx, activity_feed_created_idx
  - [ ] Export TypeScript types from schema

- [ ] **Task 2:** Setup Drizzle client (AC: #1)
  - [ ] Create `src/lib/server/db/client.ts` with Supabase connection
  - [ ] Configure drizzle.config.ts for migrations
  - [ ] Test database connection

- [ ] **Task 3:** Generate and run migrations (AC: #7)
  - [ ] Run `npx drizzle-kit generate:pg` to create migration files
  - [ ] Run `npx drizzle-kit push:pg` to apply to Supabase
  - [ ] Verify tables created in Supabase dashboard

- [ ] **Task 4:** Create seed data script (AC: #3)
  - [ ] Generate 5-10 realistic initiatives with varied RAG statuses
  - [ ] Create 10-15 risks with different severities (critical, high, medium, low)
  - [ ] Add team metrics data (health scores, cycle times, velocity)
  - [ ] Populate activity feed with recent changes
  - [ ] Create npm script: `"db:seed": "tsx drizzle/seed.ts"`
  - [ ] Run seed script and verify data in Supabase

- [ ] **Task 5:** Setup tRPC infrastructure (AC: #4)
  - [ ] Create root router: `src/lib/server/trpc/router.ts`
  - [ ] Create dashboard router: `src/lib/server/trpc/routers/dashboard.ts`
  - [ ] Implement 6 tRPC procedures with Drizzle queries
  - [ ] Setup tRPC client: `src/lib/trpc/client.ts` with svelte-query

- [ ] **Task 6:** Implement tRPC procedures (AC: #4, #5)
  - [ ] `getPortfolioHealth`: Query initiatives, calculate RAG counts
  - [ ] `getValueDelivery`: Sum targetValue and deliveredValue across initiatives
  - [ ] `getActiveInitiatives`: Filter by status='active', return count + list
  - [ ] `getTeamHealth`: Query latest team_metrics, calculate averages
  - [ ] `getRisks`: Filter by status='identified', sort by severity
  - [ ] `getRecentActivity`: Query activity_feed, order by createdAt desc, limit 10

- [ ] **Task 7:** Write unit tests (AC: #6)
  - [ ] Mock Drizzle DB in tests
  - [ ] Test each tRPC procedure with various data scenarios
  - [ ] Verify return types match expected schemas
  - [ ] Test error handling (database errors, empty results)
  - [ ] Achieve 100% coverage on procedures
  - [ ] Run `npm run test:unit` and verify all pass

### Technical Summary

This story establishes the data foundation for the ION dashboard using a modern, type-safe stack:

**Key Decisions:**
- **Database:** PostgreSQL via Supabase (managed, scalable)
- **ORM:** Drizzle (type-safe, SQL-first, excellent TypeScript integration)
- **API:** tRPC (end-to-end type safety, no REST overhead)
- **Data Flow:** Svelte Components → tRPC Client → tRPC Server → Drizzle → Supabase PostgreSQL

**Database Design:**
- 4 core tables for portfolio metrics
- Proper foreign key relationships (risks → initiatives, metrics → initiatives)
- Indexes on frequently queried fields for performance
- Timestamp fields for audit trails

**API Design:**
- 6 tRPC procedures (one per widget)
- Each procedure queries Drizzle, aggregates data, returns typed result
- svelte-query on client for caching and state management

### Project Structure Notes

- **Files to create:**
  - `src/lib/server/db/schema.ts` - Database tables and types
  - `src/lib/server/db/client.ts` - Drizzle client setup
  - `src/lib/server/trpc/router.ts` - Root tRPC router
  - `src/lib/server/trpc/routers/dashboard.ts` - Dashboard procedures
  - `src/lib/trpc/client.ts` - tRPC client for svelte-query
  - `drizzle/seed.ts` - Seed data script
  - `drizzle.config.ts` - Drizzle configuration
  - `tests/unit/server/trpc/dashboard.test.ts` - tRPC procedure tests

- **Expected test locations:**
  - `tests/unit/server/trpc/` - Unit tests for tRPC routers

- **Estimated effort:** 3 story points (2-3 days)

- **Prerequisites:**
  - Supabase project created
  - Environment variables configured (.env file with SUPABASE_URL, DATABASE_URL, SUPABASE_ANON_KEY)
  - Dependencies installed (drizzle-orm, @trpc/server, @trpc/client, svelte-query, zod)

### Key Code References

**Database Schema Example (from tech-spec.md):**

```typescript
// src/lib/server/db/schema.ts
import { pgTable, serial, text, integer, timestamp, numeric } from 'drizzle-orm/pg-core';

export const initiatives = pgTable('initiatives', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  status: text('status').notNull(), // 'planning' | 'active' | 'on-hold' | 'completed'
  ragStatus: text('rag_status').notNull(), // 'red' | 'amber' | 'green'
  targetValue: numeric('target_value', { precision: 10, scale: 2 }),
  deliveredValue: numeric('delivered_value', { precision: 10, scale: 2 }),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

**tRPC Procedure Example (from tech-spec.md):**

```typescript
// src/lib/server/trpc/routers/dashboard.ts
export const dashboardRouter = router({
  getPortfolioHealth: publicProcedure.query(async () => {
    const allInitiatives = await db.select().from(initiatives);
    return {
      total: allInitiatives.length,
      red: allInitiatives.filter(i => i.ragStatus === 'red').length,
      amber: allInitiatives.filter(i => i.ragStatus === 'amber').length,
      green: allInitiatives.filter(i => i.ragStatus === 'green').length,
    };
  }),
});
```

---

## Context References

**Tech-Spec:** [tech-spec.md](../tech-spec.md) - Primary context document containing:

- **Database Schema Deep Dive** (Lines 806-846): Complete table definitions, indexes, field types
- **tRPC Router Structure** (Lines 304-404): Full implementation of all 6 procedures
- **Technical Approach** (Lines 226-421): Architecture pattern, data flow
- **Development Setup** (Lines 976-1106): Step-by-step setup instructions
- **Implementation Guide - Phase 1** (Lines 1134-1168): Detailed task breakdown
- **Testing Strategy** (Lines 1271-1338): Unit testing approach with examples

**Architecture:** See tech-spec.md sections:
- Component Architecture (Lines 237-253)
- Database Schema (Lines 255-302)
- Integration Points (Lines 477-514)
- Implementation Stack (Lines 757-800)

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
