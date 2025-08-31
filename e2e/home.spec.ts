import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display welcome message and get started button', async ({ page }) => {
    // Navigate to the root URL
    await page.goto('/');

    // Assert that an h1 element contains the text 'Hello, Meal Planner!'
    await expect(page.locator('h1')).toContainText('Hello, Meal Planner!');

    // Assert that a button with the name 'Get Started' is visible
    await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
  });
});
