import { Page } from '@playwright/test';
import BasePage from '../base.page';

export default class PersonalInfoStep extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillFirstName(firstName: string) {
    await this.iFrame.locator('#field-firstname').fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.iFrame.locator('#field-lastname').fill(lastName);
  }

  async fillEmail(email: string) {
    await this.iFrame.locator('#checkout-guest-form #field-email').fill(email);
  }

  async checkCheckbox(name: string) {
    await this.iFrame.getByLabel(name).check();
  }

  async checkRequiredConsent() {
    await this.checkCheckbox(
      'I agree to the terms and conditions and the privacy policy'
    );
    await this.checkCheckbox('Customer data privacy');
  }

  async clickContinue() {
    await this.iFrame.getByRole('button', { name: 'Continue' }).click();
  }
}
