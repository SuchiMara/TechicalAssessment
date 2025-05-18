import { test } from '@playwright/test';
import { HomePageActions } from '../actions/HomePageActions';
import { ContactPageActions } from '../actions/ContactPageActions';
import { ShoppingPageActions } from '../actions/ShoppingPageActions';
import shoppingTestData from './shoppingTestData.json';

let homePageActions;
let contactPageActions;
let shoppingPageActions;

test.beforeEach(async ({ page }) => {
    homePageActions = new HomePageActions(page);
    contactPageActions = new ContactPageActions(page);
    shoppingPageActions = new ShoppingPageActions(page);
});

async function goToContactPage(homePageActions, contactPageActions) {
    await homePageActions.navigateToHomePage();
    await homePageActions.verifyHomePageIsLoaded();
    await contactPageActions.navigateToContactPage();
    await contactPageActions.verifyContactPageIsLoaded();
}

test('Test Case 1: Contact form mandatory field validation', async () => {
    await goToContactPage(homePageActions, contactPageActions);

    await contactPageActions.submitForm();
    await contactPageActions.verifyMandatoryErrors();

    await contactPageActions.fillMandatoryFields({
        forename: 'Suchi',
        email: 'suchi@example.com',
        message: 'test'
    });
    await contactPageActions.verifyErrorsGone();
    await contactPageActions.submitForm();
    await contactPageActions.waitForFeedbackSendingToDisappear();
    await contactPageActions.verifySuccess();
});

for (let i = 1; i <= 5; i++) {
    test(`Test Case 2 [Run ${i}/5]:  Successful submission`, async () => {
        await goToContactPage(homePageActions, contactPageActions);

        await contactPageActions.fillMandatoryFields({
            forename: 'Suchi',
            email: 'suchi@example.com',
            message: 'test'
        });

        await contactPageActions.submitForm();
        await contactPageActions.waitForFeedbackSendingToDisappear();
        await contactPageActions.verifySuccess();
    });
}

test('Test Case 3: Shopping cart and total validation', async () => {
    await homePageActions.navigateToHomePage();
    await shoppingPageActions.navigateToShop();
    await shoppingPageActions.verifyShoppingPageLoaded();

    for (const product of shoppingTestData.products) {
        await shoppingPageActions.buyProduct(product.name, product.quantity);
    }

    await shoppingPageActions.navigateToCart();

    let expectedTotal = 0;
    for (const product of shoppingTestData.products) {
        const subtotal = product.quantity * product.price;
        expectedTotal += subtotal;
        await shoppingPageActions.verifyCartItem(product.name, product.quantity, product.price, subtotal);
    }

    await shoppingPageActions.verifyCartTotal(expectedTotal);
});