import { Page } from '@playwright/test';
import BasePage from '../base.page';

export default class AddressesStep extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async fillAddress1(address1: string) {
    await this.iFrame.locator('#field-address1').fill(address1);
  }

  async fillPostalCode(postalCode: string) {
    await this.iFrame.locator('#field-postcode').fill(postalCode);
  }

  async fillCity(city: string) {
    await this.iFrame.locator('#field-city').fill(city);
  }

  async selectCountry(country: string) {
    await this.iFrame.locator('#field-id_country').selectOption(country);
  }

  async selectState(state: string) {
    await this.iFrame.locator('#field-id_state').selectOption(state);
  }

  async clickContinue() {
    await this.iFrame.getByRole('button', { name: 'Continue' }).click();
  }
}
