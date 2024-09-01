import { Page, expect } from '@playwright/test';
import BasePage from './base.page';

export default class OrderConfirmationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // getProductRow = (productName: string) =>
  //   this.iFrame.locator('ul.cart-items li.cart-item', {
  //     hasText: productName,
  //   });

  // async clickProceedButton() {
  //   await this.iFrame
  //     .getByRole('link', { name: 'Proceed to checkout' })
  //     .click();
  // }

  async assertIsVisible() {
    await expect(
      this.iFrame.locator('h3', { hasText: 'Your order is confirmed' })
    ).toBeVisible();
  }

  async assertEmailAddress(email: string) {
    expect(
      this.iFrame.locator('#content-hook_order_confirmation')
    ).toContainText(email);
  }

  async assertProductName(name: string) {
    await expect(this.iFrame.locator('#order-items')).toContainText(name);
  }

  async assertProductPrice(price: string) {
    await expect(this.iFrame.locator('tr.total-value')).toContainText(price);
  }

  async assertShippingMethod(method: string) {
    await expect(this.iFrame.locator('#order-details')).toContainText(
      `Shipping method: ${method}`
    );
  }

  async assertPaymentMethod(method: string) {
    await expect(this.iFrame.locator('#order-details')).toContainText(
      `Payment method: ${method}`
    );
  }
}
