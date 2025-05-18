export class ShoppingPage {
  constructor(page) {
    this.page = page;
    this.shopLink = page.getByRole('link', { name: 'Shop', exact: true });
    this.cartLink = page.locator('a[href="#/cart"]');
    this.stuffedFrog = page.locator('li:has(h4:has-text("Stuffed Frog"))');
    this.totalText = page.locator('strong.total.ng-binding');
  }

  productRow(productName) {
    return this.page.locator('tr').filter({ hasText: productName });
  }

  productPriceCell(productName) {
    return this.productRow(productName).locator('td').nth(1);
  }

  buyButton(productName) {
    return this.page.locator('li:has(h4:has-text("' + productName + '")) a[ng-click="add(item)"]');;
  }
}