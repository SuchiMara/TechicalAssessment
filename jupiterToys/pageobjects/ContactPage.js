export class ContactPage {
  constructor(page) {
    this.page = page;
    this.contactLink = page.getByRole('link', { name: 'Contact' });
    this.forenameInput = page.getByRole('textbox', { name: 'Forename *' });
    this.surnameInput = page.getByRole('textbox', { name: 'Surname' });
    this.emailInput = page.getByRole('textbox', { name: 'Email *' });
    this.messageInput = page.getByRole('textbox', { name: 'Message *' });
    this.submitButton = page.getByRole('link', { name: 'Submit' });
    this.forenameError = page.getByText('Forename is required');
    this.emailError = page.getByText('Email is required');
    this.messageError = page.getByText('Message is required');
    this.seningFeedbackHeading = page.getByRole('heading', { name: 'Sending Feedback' });
    this.successMessage = page.getByText(/Thanks .*?, we appreciate/);
  }
}