import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class NavbarSection extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async searchFor(searchPhrase: string) {
    await this.iFrame.getByPlaceholder('Search our catalog').fill(searchPhrase);
    await this.iFrame.getByPlaceholder('Search our catalog').press('Enter');
  }
}
