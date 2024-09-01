import { Page, expect } from '@playwright/test';
import BasePage from './base.page';

export default class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getProductRow = (productName: string) =>
    this.iFrame.locator('ul.cart-items li.cart-item', {
      hasText: productName,
    });

  async clickProceedButton() {
    await this.iFrame
      .getByRole('link', { name: 'Proceed to checkout' })
      .click();
  }

  async assertIsVisible() {
    await expect(this.iFrame.locator('h1')).toHaveText('Shopping Cart');
  }

  async assertProductDetails(productName: string, price: string) {
    await expect(this.getProductRow(productName)).toBeVisible();

    await expect(
      this.getProductRow(productName).locator('span.product-price')
    ).toHaveText(price);
  }
}
