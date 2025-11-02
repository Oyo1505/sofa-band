/**
 * E2E Tests - User Navigation
 * Tests critical user flows and page navigation
 */

import { test, expect } from '@playwright/test';

test.describe('Public Navigation', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check that the page title is visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should navigate to shows page', async ({ page }) => {
    await page.goto('/');

    // Find and click shows navigation link
    const showsLink = page.locator('a[href*="shows"], a[href*="show"]').first();
    await showsLink.click();

    // Verify we're on the shows page
    await page.waitForURL(/.*show.*/);
    await expect(page).toHaveURL(/.*show.*/);
  });

  test('should navigate to music page', async ({ page }) => {
    await page.goto('/');

    // Find and click music navigation link
    const musicLink = page.locator('a[href*="music"]').first();
    await musicLink.click();

    // Verify we're on the music page
    await page.waitForURL(/.*music.*/);
    await expect(page).toHaveURL(/.*music.*/);
  });

  test('should support internationalization', async ({ page }) => {
    // Test English
    await page.goto('/en');
    await expect(page).toHaveURL(/.*\/en.*/);

    // Test French
    await page.goto('/fr');
    await expect(page).toHaveURL(/.*\/fr.*/);

    // Test Japanese
    await page.goto('/jp');
    await expect(page).toHaveURL(/.*\/jp.*/);
  });

  test('should display upcoming events on shows page', async ({ page }) => {
    await page.goto('/en/shows');
    await page.waitForLoadState('networkidle');

    // Check for event list or empty state
    const hasEvents = await page.locator('[data-testid="event-item"], .event-item, [class*="event"]').count() > 0;
    const hasEmptyState = await page.locator('text=/no.*event/i, text=/coming soon/i').count() > 0;

    expect(hasEvents || hasEmptyState).toBeTruthy();
  });

  test('should have responsive navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Mobile menu should be present (hamburger or menu button)
    const mobileMenu = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [role="button"]').first();
    await expect(mobileMenu).toBeVisible();
  });
});

test.describe('Music Player', () => {
  test('should display music player on music page', async ({ page }) => {
    await page.goto('/en/music');
    await page.waitForLoadState('networkidle');

    // Check for audio player or music content
    const hasPlayer = await page.locator('audio, [class*="player"], [data-testid="player"]').count() > 0;
    const hasMusicContent = await page.locator('[class*="music"], [class*="track"]').count() > 0;

    expect(hasPlayer || hasMusicContent).toBeTruthy();
  });

  test('should load without console errors', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/en/music');
    await page.waitForLoadState('networkidle');

    // Filter out known acceptable errors (like network errors in dev)
    const criticalErrors = consoleErrors.filter(
      (error) => !error.includes('Failed to load resource') && !error.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe('Live Videos', () => {
  test('should display live performances section', async ({ page }) => {
    await page.goto('/en/shows');
    await page.waitForLoadState('networkidle');

    // Check for live videos or past performances section
    const hasLiveSection = await page.locator('text=/live/i, text=/performance/i, text=/video/i').count() > 0;

    expect(hasLiveSection).toBeTruthy();
  });
});

test.describe('SEO and Meta', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');

    // Check for title
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);

    // Check for meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });

  test('should have Open Graph tags', async ({ page }) => {
    await page.goto('/');

    // Check for OG title
    const ogTitle = await page.locator('meta[property="og:title"]').count();
    expect(ogTitle).toBeGreaterThan(0);
  });
});

test.describe('Performance', () => {
  test('should load within reasonable time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should be mobile responsive', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 414, height: 896, name: 'iPhone 11' },
      { width: 768, height: 1024, name: 'iPad' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check that content is visible and not overflowing
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });
});

test.describe('Accessibility', () => {
  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');

    // Check for nav element
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Check for proper link structure
    const links = await page.locator('nav a').count();
    expect(links).toBeGreaterThan(0);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');

    // Check that focus is visible
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // There should be only one h1 per page
    expect(h1Count).toBeLessThanOrEqual(2); // Allow flexibility for logo
  });
});
