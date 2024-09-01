import { Page, expect } from '@playwright/test';
import BasePage from './base.page';

export default class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.page.goto('');
  }

  async assertIsVisible() {
    await expect(
      this.iFrame.locator('h2', { hasText: 'Popular Products' })
    ).toBeVisible({
      timeout: 15 * 1000,
    });
  }
}
