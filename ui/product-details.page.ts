import { Page } from '@playwright/test';
import BasePage from './base.page';

export default class ProductDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickAddToCartButton() {
    await this.iFrame.getByRole('button', { name: 'Add to cart' }).click();
  }
}
