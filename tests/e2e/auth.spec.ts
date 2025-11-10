import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
	test('should redirect unauthenticated users to login', async ({ page }) => {
		// Try to access protected dashboard without authentication
		await page.goto('/dashboard');

		// Should redirect to login
		await expect(page).toHaveURL(/\/login/);
	});

	test('should show login page with email and password fields', async ({ page }) => {
		await page.goto('/login');

		// Check for ION branding
		await expect(page.getByRole('heading', { name: /sign in to ion/i })).toBeVisible();

		// Check for form fields
		await expect(page.getByPlaceholder(/email address/i)).toBeVisible();
		await expect(page.getByPlaceholder(/password/i)).toBeVisible();
		await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
	});

	test('should show error on invalid credentials', async ({ page }) => {
		await page.goto('/login');

		// Fill in invalid credentials
		await page.getByPlaceholder(/email address/i).fill('invalid@example.com');
		await page.getByPlaceholder(/password/i).fill('wrongpassword');

		// Submit form
		await page.getByRole('button', { name: /sign in/i }).click();

		// Should show error message
		await expect(page.getByText(/invalid/i)).toBeVisible();
	});

	// Note: Successful login test would require a test user in Supabase
	// This can be set up in CI/CD with test database credentials
	test.skip('should login successfully with valid credentials', async ({ page }) => {
		await page.goto('/login');

		// Fill in valid test credentials (would need to be set up)
		await page.getByPlaceholder(/email address/i).fill('test@example.com');
		await page.getByPlaceholder(/password/i).fill('testpassword');

		// Submit form
		await page.getByRole('button', { name: /sign in/i }).click();

		// Should redirect to dashboard
		await expect(page).toHaveURL(/\/dashboard/);

		// Should see dashboard content
		await expect(page.getByRole('heading', { name: /executive dashboard/i })).toBeVisible();

		// Should see logout button
		await expect(page.getByRole('button', { name: /logout/i })).toBeVisible();
	});

	test.skip('should logout successfully', async ({ page }) => {
		// Assumes user is already logged in
		await page.goto('/dashboard');

		// Click logout
		await page.getByRole('button', { name: /logout/i }).click();

		// Should redirect to login
		await expect(page).toHaveURL(/\/login/);
	});
});
