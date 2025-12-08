import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    // SauceDemo locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async open() {
    // baseURL + '/'
    await this.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertOnProductsPage() {
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async assertErrorVisible() {
    await expect(this.errorMessage).toBeVisible();
  }
}
