import { Page, expect } from '@playwright/test';
import BasePage from './base.page';

export default class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getProductTile = (productName: string) =>
    this.iFrame.locator('div#js-product-list article', {
      hasText: productName,
    });

  async assertPageLoaded() {
    await expect(this.iFrame.locator('#js-product-list-header')).toHaveText(
      'Search results'
    );
  }

  async clickOnProduct(productName: string) {
    this.getProductTile(productName).locator('h2').click();
  }

  async assertProductIsVisible(productName: string) {
    await expect(this.getProductTile(productName)).toBeVisible();
  }
}
