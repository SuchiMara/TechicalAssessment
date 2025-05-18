export class HomePage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Jupiter Toys' });
    this.startShoppingLink = page.getByRole('link', { name: 'Start Shopping »' });
  }
}