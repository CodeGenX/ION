import { test, expect } from '@playwright/test';

test.describe('Executive Dashboard', () => {
	test('should redirect unauthenticated users to login', async ({ page }) => {
		// Try to access dashboard without authentication
		await page.goto('/dashboard');

		// Should redirect to login
		await expect(page).toHaveURL(/\/login/);
	});

	// Note: These tests would require a test user in Supabase
	// They are skipped by default and can be enabled in CI/CD with test credentials
	test.skip('should display all 6 dashboard widgets when authenticated', async ({ page }) => {
		// This test assumes user is already authenticated
		// In CI/CD, you would handle authentication first
		await page.goto('/dashboard');

		// Verify we're on the dashboard page
		await expect(page).toHaveURL(/\/dashboard/);

		// Check for dashboard title
		await expect(page.getByRole('heading', { name: /executive dashboard/i })).toBeVisible();

		// Check that all 6 widgets are visible
		await expect(page.getByText(/portfolio health/i)).toBeVisible();
		await expect(page.getByText(/value delivery/i)).toBeVisible();
		await expect(page.getByText(/active initiatives/i)).toBeVisible();
		await expect(page.getByText(/team health/i)).toBeVisible();
		await expect(page.getByText(/risk indicators/i)).toBeVisible();
		await expect(page.getByText(/recent updates/i)).toBeVisible();
	});

	test.skip('should display Portfolio Health Widget with RAG breakdown', async ({ page }) => {
		await page.goto('/dashboard');

		// Look for Portfolio Health widget
		const portfolioWidget = page.locator('text=Portfolio Health').locator('..');

		// Check for total initiatives count
		await expect(portfolioWidget).toBeVisible();

		// Check for RAG status indicators (should have red, amber, green pills)
		const statusPills = portfolioWidget.locator('[class*="rounded-full"]');
		await expect(statusPills).toHaveCount(3); // Red, Amber, Green
	});

	test.skip('should display Value Delivery Widget with progress ring', async ({ page }) => {
		await page.goto('/dashboard');

		// Look for Value Delivery widget
		const valueWidget = page.locator('text=Value Delivery').locator('..');

		// Check widget is visible
		await expect(valueWidget).toBeVisible();

		// Check for SVG progress ring
		const progressRing = valueWidget.locator('svg');
		await expect(progressRing).toBeVisible();

		// Check for value text (should contain $ symbol)
		await expect(valueWidget.locator('text=/\\$/i')).toBeVisible();
	});

	test.skip('should display Active Initiatives Widget with initiative list', async ({ page }) => {
		await page.goto('/dashboard');

		// Look for Active Initiatives widget
		const initiativesWidget = page.locator('text=Active Initiatives').locator('..');

		// Check widget is visible
		await expect(initiativesWidget).toBeVisible();

		// Check for initiative count
		await expect(initiativesWidget).toContainText(/\d+/); // Should contain a number
	});

	test.skip('should display Team Health Widget with health gauge', async ({ page }) => {
		await page.goto('/dashboard');

		// Look for Team Health widget
		const teamWidget = page.locator('text=Team Health').locator('..');

		// Check widget is visible
		await expect(teamWidget).toBeVisible();

		// Check for health score gauge (SVG)
		const gauge = teamWidget.locator('svg');
		await expect(gauge).toBeVisible();

		// Check for metrics (cycle time, velocity)
		await expect(teamWidget).toContainText(/cycle time/i);
		await expect(teamWidget).toContainText(/velocity/i);
	});

	test.skip('should display Risk Indicators Widget with risks list', async ({ page }) => {
		await page.goto('/dashboard');

		// Look for Risk Indicators widget
		const riskWidget = page.locator('text=Risk Indicators').locator('..');

		// Check widget is visible
		await expect(riskWidget).toBeVisible();

		// Should display risks or "No active risks" message
		const hasRisks = await riskWidget.locator('[class*="border-l-4"]').count();
		const hasNoRisksMessage = await riskWidget.getByText(/no active risks/i).isVisible();

		expect(hasRisks > 0 || hasNoRisksMessage).toBeTruthy();
	});

	test.skip('should display Recent Updates Widget with activity feed', async ({ page }) => {
		await page.goto('/dashboard');

		// Look for Recent Updates widget
		const updatesWidget = page.locator('text=Recent Updates').locator('..');

		// Check widget is visible
		await expect(updatesWidget).toBeVisible();

		// Should display activities or "No recent activity" message
		const hasActivities = await updatesWidget.locator('[class*="rounded-lg"]').count();
		const hasNoActivityMessage = await updatesWidget.getByText(/no recent activity/i).isVisible();

		expect(hasActivities > 0 || hasNoActivityMessage).toBeTruthy();
	});

	test.skip('should have responsive grid layout', async ({ page }) => {
		// Test desktop layout (3 columns)
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto('/dashboard');

		const grid = page.locator('div[class*="grid"]').first();
		await expect(grid).toHaveClass(/lg:grid-cols-3/);

		// Test tablet layout (2 columns)
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(grid).toHaveClass(/md:grid-cols-2/);

		// Test mobile layout (1 column)
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(grid).toHaveClass(/grid-cols-1/);
	});

	test.skip('should display loading states while fetching data', async ({ page }) => {
		// Slow down network to see loading states
		await page.route('**/api/trpc/**', async (route) => {
			await new Promise(resolve => setTimeout(resolve, 1000));
			await route.continue();
		});

		await page.goto('/dashboard');

		// Check for skeleton loading states (should have animate-pulse class)
		const skeletons = page.locator('[class*="animate-pulse"]');
		await expect(skeletons.first()).toBeVisible();

		// Wait for loading to complete
		await page.waitForTimeout(2000);

		// Skeletons should be gone
		await expect(skeletons.first()).not.toBeVisible();
	});

	test.skip('should handle error states gracefully', async ({ page }) => {
		// Intercept API calls and return errors
		await page.route('**/api/trpc/**', async (route) => {
			await route.abort('failed');
		});

		await page.goto('/dashboard');

		// Should show error messages
		await expect(page.getByText(/failed to load/i).first()).toBeVisible();

		// Should show retry buttons
		await expect(page.getByRole('button', { name: /retry/i }).first()).toBeVisible();
	});

	test.skip('should have no console errors on page load', async ({ page }) => {
		const consoleErrors: string[] = [];

		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});

		await page.goto('/dashboard');

		// Wait for page to fully load
		await page.waitForLoadState('networkidle');

		// Check that there are no console errors
		expect(consoleErrors).toHaveLength(0);
	});

	test.skip('should maintain navigation and logout functionality', async ({ page }) => {
		await page.goto('/dashboard');

		// Check that sidebar navigation is visible
		await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /portfolio/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /roadmap/i })).toBeVisible();
		await expect(page.getByRole('link', { name: /settings/i })).toBeVisible();

		// Check logout button is visible
		await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
	});
});
