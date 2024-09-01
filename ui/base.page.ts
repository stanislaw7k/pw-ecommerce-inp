import { Page, FrameLocator } from '@playwright/test';

export default class BasePage {
  page: Page;
  iFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.iFrame = page.frameLocator('#framelive');
  }
}
