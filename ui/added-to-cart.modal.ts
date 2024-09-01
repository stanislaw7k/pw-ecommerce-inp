import { Page, expect } from '@playwright/test';
import BasePage from './base.page';

export default class AddedToCartModal extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickProceedButton() {
    await this.iFrame
      .getByRole('link', { name: 'Proceed to checkout' })
      .click();
  }

  async assertIsVisible() {
    await expect(
      this.iFrame.locator('#myModalLabel', {
        hasText: 'Product successfully added to your shopping cart',
      })
    ).toBeVisible();
  }
}
