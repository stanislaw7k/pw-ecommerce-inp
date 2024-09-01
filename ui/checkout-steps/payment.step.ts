import { Page, expect } from '@playwright/test';
import BasePage from '../base.page';

export default class PaymentStep extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectPaymentOption(paymentOption: string) {
    await this.iFrame.getByLabel(paymentOption).check();
  }

  async checkTermsCheckbox() {
    await this.iFrame.getByLabel('I agree to the terms of service').check();
  }

  async clickPlaceOrder() {
    await this.iFrame.getByRole('button', { name: 'Place Order' }).click();
  }

  async assertIsVisible() {
    await expect(this.iFrame.locator('#payment-confirmation')).toBeVisible();
  }

  async assertPaymentMethods(paymentMethods: string[]) {
    paymentMethods.forEach(async (option) => {
      await expect(this.iFrame.locator('div.payment-options')).toContainText(
        option
      );
    });
  }
}
