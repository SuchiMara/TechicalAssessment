import { expect } from '@playwright/test';
import { ContactPage } from '../pageobjects/ContactPage';

export class ContactPageActions {
    constructor(page) {
        this.contactPage = new ContactPage(page);
    }

    async navigateToContactPage() {
        await this.contactPage.contactLink.click();
    }

    async verifyContactPageIsLoaded() {
        await this.contactPage.submitButton.waitFor({ state: 'visible' });
    }

    async submitForm() {
        await this.contactPage.submitButton.click();
    }

    async verifyMandatoryErrors() {
        await expect(this.contactPage.forenameError).toBeVisible();
        await expect(this.contactPage.emailError).toBeVisible();
        await expect(this.contactPage.messageError).toBeVisible();
    }

    async fillMandatoryFields({ forename, email, message }) {
        await this.contactPage.forenameInput.fill(forename);
        await this.contactPage.emailInput.fill(email);
        await this.contactPage.messageInput.fill(message);
    }

    async verifyErrorsGone() {
        await expect(this.contactPage.forenameError).toBeHidden();
        await expect(this.contactPage.emailError).toBeHidden();
        await expect(this.contactPage.messageError).toBeHidden();
    }

    async waitForFeedbackSendingToDisappear() {
    await this.contactPage.seningFeedbackHeading.waitFor({ state: 'hidden' });
}

    async verifySuccess() {
        await expect(this.contactPage.successMessage).toBeVisible();
    }
}