import { Page, expect } from '@playwright/test';
import BasePage from '../base.page';

export default class ShippingStep extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectShippingMethod(method: string) {
    await this.iFrame
      .locator('[class="h6 carrier-name"]', { hasText: method })
      .click();
  }

  async clickContinue() {
    await this.iFrame.getByRole('button', { name: 'Continue' }).click();
  }

  async assertIsVisible() {
    await expect(this.iFrame.locator('.delivery-options')).toBeVisible();
  }
}
