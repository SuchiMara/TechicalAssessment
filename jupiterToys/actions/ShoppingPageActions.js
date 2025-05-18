import { expect } from '@playwright/test';
import { ShoppingPage } from '../pageobjects/ShoppingPage';
import { parse } from 'path';

export class ShoppingPageActions {
  constructor(page) {
    this.shoppingPage = new ShoppingPage(page);
    this.page = page;
  }

  async navigateToShop() {
    await this.shoppingPage.shopLink.click();
  }

  async verifyShoppingPageLoaded() {
    await this.shoppingPage.stuffedFrog.waitFor({ state: 'visible' });
  }

  async buyProduct(productName, quantity) {
    for (let i = 0; i < quantity; i++) {
      await this.shoppingPage.buyButton(productName).click();
    }
  }

  async navigateToCart() {
    await this.shoppingPage.cartLink.click();
  }

  async verifyCartItem(productName, expectedQty, expectedPrice, expectedSubtotal) {
    const row = this.page.getByRole('row', { name: new RegExp(`${productName}.*`) });
    const qtyInput = row.getByRole('spinbutton');
    const priceCell = row.locator('td').nth(1);
    const subtotalCell = row.locator('td').nth(3);

    await expect(qtyInput).toHaveValue(expectedQty.toString());
    await expect(priceCell).toHaveText(`$${expectedPrice.toFixed(2)}`);
    await expect(subtotalCell).toHaveText(`$${expectedSubtotal.toFixed(2)}`);
  }

  async verifyCartTotal(expectedTotal) {
    const totalText = await this.shoppingPage.totalText.textContent();
    const total = parseFloat(totalText.replace('Total: ', '').trim());
    console.log('************* expectedTotal: ${expectedTotal}, total: ${total}');
    expect(total).toBeCloseTo(expectedTotal, 2);
  }
}