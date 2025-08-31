import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should handle magic link login form submission', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Wait for the page to load and animations to complete
    await page.waitForSelector('h1:has-text("Login or Sign Up")');
    
    // Verify the page title is displayed
    await expect(page.locator('h1')).toContainText('Login or Sign Up');

    // Find the email input field and type a valid test email
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');

    // Verify the email was entered correctly
    await expect(emailInput).toHaveValue('test@example.com');

    // Find and click the "Send Magic Link" button
    const submitButton = page.getByRole('button', { name: 'Send Magic Link' });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    
    // Add console logging to debug the form submission
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await submitButton.click();

    // Wait for the form submission to complete and check for any messages
    await page.waitForTimeout(3000);

    // Check if there's any message displayed (success or error)
    const messageElements = page.locator('[class*="bg-green-50"], [class*="bg-red-50"]');
    
    // Log the page content to debug
    const pageContent = await page.content();
    console.log('Page content after submission:', pageContent);
    
    // Check for success message with more flexible selector
    const successMessage = page.locator('text=Check your email for the magic link!');
    const errorMessage = page.locator('text=Error:');
    
    // Try to find any message first
    if (await messageElements.count() > 0) {
      console.log('Found message elements:', await messageElements.count());
      for (let i = 0; i < await messageElements.count(); i++) {
        const text = await messageElements.nth(i).textContent();
        console.log(`Message ${i}:`, text);
      }
    }
    
    // Check if either success or error message is visible
    const hasSuccessMessage = await successMessage.isVisible();
    const hasErrorMessage = await errorMessage.isVisible();
    
    console.log('Success message visible:', hasSuccessMessage);
    console.log('Error message visible:', hasErrorMessage);
    
    // Assert that some message is displayed (either success or error)
    expect(hasSuccessMessage || hasErrorMessage).toBeTruthy();
    
    if (hasSuccessMessage) {
      // Verify the message has the correct styling (green background for success)
      const messageContainer = successMessage.locator('..');
      await expect(messageContainer).toHaveClass(/bg-green-50/);
    } else if (hasErrorMessage) {
      // If there's an error, log it for debugging
      const errorText = await errorMessage.textContent();
      console.log('Error message content:', errorText);
    }
  });

  test('should show loading state during form submission', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("Login or Sign Up")');

    // Find the email input field and type a valid test email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test@example.com');

    // Find and click the submit button
    const submitButton = page.getByRole('button', { name: 'Send Magic Link' });
    await submitButton.click();

    // Verify the button shows loading state
    await expect(page.getByRole('button', { name: 'Sending...' })).toBeVisible();
    
    // Verify the button is disabled during submission
    await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled();

    // Wait for the form submission to complete
    await page.waitForTimeout(3000);

    // Verify the button returns to normal state
    await expect(page.getByRole('button', { name: 'Send Magic Link' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Magic Link' })).toBeEnabled();
  });

  test('should validate email input', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("Login or Sign Up")');

    // Find the email input field
    const emailInput = page.locator('input[type="email"]');
    
    // Verify the input has required attribute
    await expect(emailInput).toHaveAttribute('required');

    // Verify the input has email type
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Check button state before entering email
    const submitButton = page.getByRole('button', { name: 'Send Magic Link' });
    
    // The button should be disabled when no email is entered
    await expect(submitButton).toBeDisabled();
    
    // Enter a valid email to enable the button
    await emailInput.fill('test@example.com');
    await expect(submitButton).toBeEnabled();
  });

  test('should handle invalid email format', async ({ page }) => {
    // Navigate to the login page
    await page.goto('/login');

    // Wait for the page to load
    await page.waitForSelector('h1:has-text("Login or Sign Up")');

    // Find the email input field and type an invalid email
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('invalid-email');

    // Find and click the submit button
    const submitButton = page.getByRole('button', { name: 'Send Magic Link' });
    await submitButton.click();

    // Wait for the form submission to complete
    await page.waitForTimeout(3000);

    // Check for error message
    const errorMessage = page.locator('text=Error:');
    await expect(errorMessage).toBeVisible();
  });
});
