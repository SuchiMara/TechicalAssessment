import { HomePage } from '../pageobjects/HomePage';

export class HomePageActions {
  constructor(page) {
    this.homePage = new HomePage(page);
    this.page = page;
  }

  async navigateToHomePage() {
    await this.page.goto('https://jupiter.cloud.planittesting.com/#/');
  }

  async verifyHomePageIsLoaded() {
    await this.homePage.heading.waitFor({ state: 'visible' });
    await this.homePage.startShoppingLink.waitFor({ state: 'visible' });
  }

}