# Story 1.2: UI Foundation & Authentication

**Status:** Draft

---

## User Story

As a user,
I want to securely log in and navigate the ION platform,
So that I can access my personalized dashboard and portfolio data.

---

## Acceptance Criteria

**AC #1:** Login page created with email/password form using Skeleton UI components

**AC #2:** Supabase Auth integration functional - valid credentials redirect to dashboard, invalid credentials show error message

**AC #3:** Protected route guard implemented - unauthenticated users redirect to login when accessing /dashboard

**AC #4:** Root layout created with left sidebar navigation, top bar, and AI assistant panel (placeholder)

**AC #5:** Sidebar includes navigation links (Home, Portfolio, Roadmap, Settings) and responsive hamburger menu on mobile

**AC #6:** TopBar displays user menu with logout button that clears session and redirects to login

**AC #7:** AI Assistant panel toggles open/close with smooth slide-in animation from right side

**AC #8:** Three UI primitive components created: Widget wrapper, StatusPill (RAG colors), ProgressRing

**AC #9:** Layout is responsive - sidebar collapses on mobile (< 640px), AI panel full-screen on mobile

**AC #10:** E2E test passes: user logs in → sees dashboard route → logs out → redirects to login

---

## Implementation Details

### Tasks / Subtasks

- [ ] **Task 1:** Setup Supabase Auth (AC: #2, #3)
  - [ ] Install `@supabase/supabase-js` and `@supabase/auth-helpers-sveltekit`
  - [ ] Create auth store: `src/lib/stores/auth.ts` with session management
  - [ ] Configure Supabase client with environment variables
  - [ ] Create auth guard: `src/routes/(auth)/+layout.server.ts` to check session
  - [ ] Test auth redirect flow

- [ ] **Task 2:** Create Login Page (AC: #1, #2)
  - [ ] Create `src/routes/login/+page.svelte`
  - [ ] Build form with email and password fields using Skeleton UI Input components
  - [ ] Implement form submission handler that calls Supabase signInWithPassword
  - [ ] Add error handling for invalid credentials (display error message)
  - [ ] Add success redirect to /dashboard
  - [ ] Style form with Tailwind CSS (center on page, Blue Tech theme)

- [ ] **Task 3:** Create Root Layout (AC: #4)
  - [ ] Create `src/routes/+layout.svelte` as main app shell
  - [ ] Import and integrate Sidebar, TopBar, AI Panel components
  - [ ] Use Skeleton UI AppShell component for structure
  - [ ] Define `<slot />` for page content
  - [ ] Add responsive classes for layout adjustments

- [ ] **Task 4:** Create Sidebar Component (AC: #5)
  - [ ] Create `src/lib/components/layout/Sidebar.svelte`
  - [ ] Add navigation links: Home (/dashboard), Portfolio (future), Roadmap (future), Settings (future)
  - [ ] Add ION logo/branding at top
  - [ ] Add user section at bottom with avatar/name
  - [ ] Implement responsive hamburger menu for mobile (< 640px)
  - [ ] Use Skeleton UI AppRail component
  - [ ] Style with Tailwind (240px width desktop, collapsible mobile)

- [ ] **Task 5:** Create TopBar Component (AC: #6)
  - [ ] Create `src/lib/components/layout/TopBar.svelte`
  - [ ] Display page title dynamically
  - [ ] Add user menu dropdown (click to open/close)
  - [ ] Implement logout button that calls auth.signOut() and redirects to /login
  - [ ] Add mobile hamburger button to toggle sidebar
  - [ ] Style with Tailwind (full width, fixed height ~60px)

- [ ] **Task 6:** Create AI Assistant Panel (AC: #7)
  - [ ] Create `src/lib/components/layout/AIAssistantPanel.svelte`
  - [ ] Implement toggle button (fixed position, right side)
  - [ ] Create panel with placeholder content ("AI Assistant coming soon...")
  - [ ] Add slide-in/slide-out animation (300ms ease-in-out)
  - [ ] Set panel width 300px desktop, full-screen overlay on mobile
  - [ ] Use Svelte store for open/closed state
  - [ ] Style with Tailwind (sticky position when scrolling)

- [ ] **Task 7:** Create UI Primitive Components (AC: #8)
  - [ ] Create `src/lib/components/ui/Widget.svelte` - Base wrapper with card style
  - [ ] Create `src/lib/components/ui/StatusPill.svelte` - RAG status badge (Red #EF4444, Amber #F59E0B, Green #10B981)
  - [ ] Create `src/lib/components/ui/ProgressRing.svelte` - Circular progress indicator with percentage
  - [ ] Add prop types and default styles to each
  - [ ] Test components render correctly

- [ ] **Task 8:** Implement Responsive Behavior (AC: #9)
  - [ ] Test layout on mobile (375px, 414px)
  - [ ] Test layout on tablet (768px, 1024px)
  - [ ] Test layout on desktop (1366px, 1920px)
  - [ ] Verify sidebar collapses correctly on mobile
  - [ ] Verify AI panel goes full-screen on mobile
  - [ ] Adjust spacing and padding for each breakpoint

- [ ] **Task 9:** Write E2E Test (AC: #10)
  - [ ] Create `tests/e2e/auth.spec.ts`
  - [ ] Test: Navigate to /login page
  - [ ] Test: Submit invalid credentials → see error message
  - [ ] Test: Submit valid credentials → redirect to /dashboard
  - [ ] Test: Click logout → clear session → redirect to /login
  - [ ] Test: Try accessing /dashboard unauthenticated → redirect to /login
  - [ ] Run `npm run test:e2e` and verify pass

### Technical Summary

This story establishes the visual foundation and authentication layer for ION:

**Key Components:**
- **Authentication:** Supabase Auth with email/password, session-based
- **Layout:** Three-part structure (Sidebar + TopBar + AI Panel + Content)
- **Routing:** Protected routes using SvelteKit +layout.server.ts guards
- **UI Library:** Skeleton UI for components, Tailwind CSS for styling

**Authentication Flow:**
1. User visits /dashboard → +layout.server.ts checks session
2. No session → redirect to /login
3. Login form submits → Supabase validates → creates session
4. Redirect to /dashboard → session exists → load page
5. Logout → clear session → redirect to /login

**Responsive Strategy:**
- Desktop (>1024px): Full sidebar (240px), side AI panel (300px)
- Tablet (640-1024px): Collapsible sidebar, side AI panel
- Mobile (<640px): Hamburger menu sidebar, full-screen AI panel overlay

### Project Structure Notes

- **Files to create:**
  - `src/routes/login/+page.svelte` - Login form
  - `src/routes/+layout.svelte` - Root layout with navigation
  - `src/routes/(auth)/+layout.server.ts` - Auth guard
  - `src/routes/(auth)/+layout.svelte` - Auth-protected layout wrapper
  - `src/lib/components/layout/Sidebar.svelte` - Navigation sidebar
  - `src/lib/components/layout/TopBar.svelte` - Top navigation bar
  - `src/lib/components/layout/AIAssistantPanel.svelte` - AI panel
  - `src/lib/components/ui/Widget.svelte` - Widget wrapper
  - `src/lib/components/ui/StatusPill.svelte` - RAG status indicator
  - `src/lib/components/ui/ProgressRing.svelte` - Progress indicator
  - `src/lib/stores/auth.ts` - Auth state store
  - `tests/e2e/auth.spec.ts` - Authentication E2E tests

- **Expected test locations:**
  - `tests/e2e/` - End-to-end tests for auth and navigation

- **Estimated effort:** 3 story points (2-3 days)

- **Prerequisites:**
  - Story 1 complete (tRPC client setup)
  - Supabase Auth enabled in Supabase project
  - Test user account created in Supabase for E2E tests
  - Skeleton UI and Tailwind CSS configured

### Key Code References

**Auth Guard Example (from tech-spec.md):**

```typescript
// src/routes/(auth)/+layout.server.ts
import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  const session = await locals.getSession();

  if (!session) {
    throw redirect(303, '/login');
  }

  return {
    session,
  };
}
```

**Login Page Example (from tech-spec.md):**

```svelte
<!-- src/routes/login/+page.svelte -->
<script lang="ts">
  import { supabase } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function handleLogin() {
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      error = authError.message;
    } else {
      goto('/dashboard');
    }
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <form on:submit|preventDefault={handleLogin} class="card p-8 w-96">
    <h1 class="h1 mb-6">ION Login</h1>

    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      class="input mb-4"
    />

    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      class="input mb-4"
    />

    {#if error}
      <p class="text-error-500 mb-4">{error}</p>
    {/if}

    <button type="submit" class="btn variant-filled-primary w-full">
      Log In
    </button>
  </form>
</div>
```

**Responsive Sidebar Example (from tech-spec.md):**

```svelte
<!-- src/lib/components/layout/Sidebar.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  // Mobile menu state
  let mobileMenuOpen = false;
</script>

<!-- Desktop Sidebar -->
<aside class="hidden md:block w-60 bg-surface-50 dark:bg-surface-900 h-screen">
  <nav class="p-4">
    <a href="/dashboard" class:active={$page.url.pathname === '/dashboard'}>
      Home
    </a>
    <a href="/portfolio">Portfolio</a>
    <a href="/roadmap">Roadmap</a>
    <a href="/settings">Settings</a>
  </nav>
</aside>

<!-- Mobile Hamburger + Overlay Menu -->
<button
  class="md:hidden fixed top-4 left-4 z-50"
  on:click={() => mobileMenuOpen = !mobileMenuOpen}
>
  ☰
</button>

{#if mobileMenuOpen}
  <div class="fixed inset-0 bg-black/50 z-40" on:click={() => mobileMenuOpen = false}>
    <nav class="bg-white w-64 h-full p-4">
      <!-- Mobile nav links -->
    </nav>
  </div>
{/if}
```

---

## Context References

**Tech-Spec:** [tech-spec.md](../tech-spec.md) - Primary context document containing:

- **Authentication Flow** (Lines 406-412): Complete auth setup and flow
- **Component Architecture** (Lines 237-253): Layout structure
- **Responsive Design Breakpoints** (Lines 918-935): Mobile/tablet/desktop breakpoints
- **Component Patterns** (Lines 435-465): Standard Svelte component structure
- **UX/UI Considerations** (Lines 1609-1747): Color palette, typography, component patterns
- **Development Setup** (Lines 976-1106): Environment and dependencies
- **Implementation Guide - Phase 2** (Lines 1169-1201): Detailed task breakdown

**Architecture:** See tech-spec.md sections:
- Layout Components (Lines 172-184 in Source Tree Changes)
- UI Primitives (Lines 200-202 in Source Tree Changes)
- Styling Approach (Lines 414-421)
- Accessibility Requirements (Lines 1693-1719)

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
