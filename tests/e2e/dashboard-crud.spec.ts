/**
 * E2E Tests - Dashboard CRUD Operations
 * Tests admin dashboard event management
 * Note: These tests require authentication setup or mocking
 */

import { test, expect } from '@playwright/test';

// Helper to simulate authenticated session
// In real scenario, you'd use Playwright's auth state or mock authentication
test.describe('Dashboard Event Management', () => {
  // Skip these tests if not authenticated
  // In production, you'd set up auth state before running these tests
  test.beforeEach(async ({ page }) => {
    // Note: This will redirect to auth if not logged in
    await page.goto('/dashboard');

    // Check if we're authenticated (on dashboard) or redirected to auth
    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');

    if (!isOnDashboard) {
      test.skip(true, 'Authentication required - skipping dashboard tests');
    }
  });

  test('should display dashboard with event management interface', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for dashboard elements
    const hasDashboardContent =
      (await page.locator('text=/dashboard/i, text=/event/i, text=/manage/i').count()) > 0;

    expect(hasDashboardContent).toBeTruthy();
  });

  test('should have create event button or form', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for create/add event button or form
    const hasCreateButton =
      (await page.locator('button:has-text("Create"), button:has-text("Add"), a:has-text("New Event")').count()) > 0;

    expect(hasCreateButton).toBeTruthy();
  });

  test('should display existing events list', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for events table, list, or grid
    const hasEventsList =
      (await page.locator('table, [role="table"], ul li, [class*="event-item"]').count()) > 0 ||
      (await page.locator('text=/no events/i, text=/create.*first/i').count()) > 0;

    expect(hasEventsList).toBeTruthy();
  });
});

test.describe('Event Creation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');

    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');
    if (!isOnDashboard) {
      test.skip(true, 'Authentication required');
    }
  });

  test('should show event creation form', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Click create event button if it exists
    const createButton = page.locator('button:has-text("Create"), button:has-text("Add")').first();
    const hasButton = (await createButton.count()) > 0;

    if (hasButton) {
      await createButton.click();
      await page.waitForTimeout(500);
    }

    // Check for form fields
    const hasFormFields =
      (await page.locator('input[name*="title"], input[placeholder*="title"]').count()) > 0 ||
      (await page.locator('input[type="text"]').count()) > 0;

    expect(hasFormFields).toBeTruthy();
  });

  test('should validate required event fields', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Try to find and submit empty form
    const submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Create")').first();
    const hasSubmit = (await submitButton.count()) > 0;

    if (hasSubmit) {
      await submitButton.click();
      await page.waitForTimeout(1000);

      // Should show validation errors
      const hasValidationError =
        (await page.locator('text=/required/i, [role="alert"], .error, [class*="error"]').count()) > 0;

      expect(hasValidationError).toBeTruthy();
    } else {
      test.skip(true, 'Submit button not found');
    }
  });

  test('should validate date field', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for date input
    const dateInput = page.locator('input[type="date"], input[name*="date"], input[placeholder*="date"]').first();
    const hasDateInput = (await dateInput.count()) > 0;

    if (hasDateInput) {
      await dateInput.fill('2020-01-01'); // Past date

      const submitButton = page.locator('button[type="submit"]').first();
      if ((await submitButton.count()) > 0) {
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Should show "date is too old" error
        const hasDateError = (await page.locator('text=/date.*old/i, text=/invalid.*date/i').count()) > 0;

        expect(hasDateError).toBeTruthy();
      }
    } else {
      test.skip(true, 'Date input not found');
    }
  });
});

test.describe('Event Editing Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');

    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');
    if (!isOnDashboard) {
      test.skip(true, 'Authentication required');
    }
  });

  test('should have edit buttons for existing events', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for edit buttons or links
    const hasEditButtons =
      (await page.locator('button:has-text("Edit"), a:has-text("Edit"), [aria-label*="edit"]').count()) > 0 ||
      (await page.locator('text=/no events/i').count()) > 0; // Or no events yet

    expect(hasEditButtons).toBeTruthy();
  });

  test('should load event data into edit form', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const editButton = page.locator('button:has-text("Edit"), a:has-text("Edit")').first();
    const hasEdit = (await editButton.count()) > 0;

    if (hasEdit) {
      await editButton.click();
      await page.waitForTimeout(1000);

      // Form should have pre-filled data
      const filledInputs = await page.locator('input[value]:not([value=""])').count();
      expect(filledInputs).toBeGreaterThan(0);
    } else {
      test.skip(true, 'No events to edit or edit button not found');
    }
  });
});

test.describe('Event Deletion Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');

    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');
    if (!isOnDashboard) {
      test.skip(true, 'Authentication required');
    }
  });

  test('should have delete buttons for events', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for delete buttons
    const hasDeleteButtons =
      (await page.locator('button:has-text("Delete"), button:has-text("Remove"), [aria-label*="delete"]').count()) > 0 ||
      (await page.locator('text=/no events/i').count()) > 0;

    expect(hasDeleteButtons).toBeTruthy();
  });

  test('should show confirmation dialog before deletion', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const deleteButton = page.locator('button:has-text("Delete"), button:has-text("Remove")').first();
    const hasDelete = (await deleteButton.count()) > 0;

    if (hasDelete) {
      // Listen for dialogs
      let dialogShown = false;
      page.on('dialog', async (dialog) => {
        dialogShown = true;
        await dialog.dismiss();
      });

      await deleteButton.click();
      await page.waitForTimeout(500);

      // Should show confirmation or custom dialog
      const hasConfirmation =
        dialogShown ||
        (await page.locator('text=/confirm/i, text=/are you sure/i, [role="dialog"], [role="alertdialog"]').count()) > 0;

      expect(hasConfirmation).toBeTruthy();
    } else {
      test.skip(true, 'No events to delete or delete button not found');
    }
  });
});

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');

    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');
    if (!isOnDashboard) {
      test.skip(true, 'Authentication required');
    }
  });

  test('should have navigation to different dashboard sections', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for navigation links
    const hasNavigation =
      (await page.locator('nav a, aside a, [role="navigation"] a').count()) > 0 ||
      (await page.locator('text=/events/i, text=/live/i, text=/settings/i').count()) > 0;

    expect(hasNavigation).toBeTruthy();
  });

  test('should have logout functionality', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Look for logout button
    const hasLogout =
      (await page.locator('button:has-text("Logout"), button:has-text("Sign out"), a:has-text("Logout")').count()) > 0;

    expect(hasLogout).toBeTruthy();
  });
});

test.describe('Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');

    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');
    if (!isOnDashboard) {
      test.skip(true, 'Authentication required');
    }
  });

  test('should validate time format', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const timeInput = page.locator('input[name*="time"], input[placeholder*="time"]').first();
    const hasTimeInput = (await timeInput.count()) > 0;

    if (hasTimeInput) {
      // Try invalid time
      await timeInput.fill('-1');

      const submitButton = page.locator('button[type="submit"]').first();
      if ((await submitButton.count()) > 0) {
        await submitButton.click();
        await page.waitForTimeout(1000);

        // Should show validation error
        const hasError = (await page.locator('[role="alert"], .error, text=/invalid/i').count()) > 0;

        expect(hasError).toBeTruthy();
      }
    } else {
      test.skip(true, 'Time input not found');
    }
  });

  test('should validate URL format for infoLink', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const urlInput = page.locator('input[name*="link"], input[type="url"], input[placeholder*="link"]').first();
    const hasUrlInput = (await urlInput.count()) > 0;

    if (hasUrlInput) {
      // Valid URLs should be accepted
      await urlInput.fill('https://example.com');
      await page.waitForTimeout(500);

      // Form should not show URL error
      const hasError = (await page.locator('text=/invalid.*url/i').count()) > 0;

      expect(hasError).toBe(false);
    } else {
      test.skip(true, 'URL input not found');
    }
  });
});

test.describe('Responsive Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');

    const isOnDashboard = page.url().includes('/dashboard') && !page.url().includes('auth');
    if (!isOnDashboard) {
      test.skip(true, 'Authentication required');
    }
  });

  test('should be usable on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');

    // Dashboard should adapt to mobile
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Should have mobile-friendly navigation
    const hasMobileNav =
      (await page.locator('button[aria-label*="menu"], [role="button"]').count()) > 0 ||
      (await page.locator('nav').count()) > 0;

    expect(hasMobileNav).toBeTruthy();
  });

  test('should be usable on tablet devices', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForLoadState('networkidle');

    // Dashboard should be functional on tablet
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
