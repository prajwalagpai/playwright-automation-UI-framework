
import { promises } from 'dns';
import { BasePage } from './BasePage';
import { Locator, Page, expect } from '@playwright/test';
import { stringify } from 'querystring';

export class ProductsPage extends BasePage {
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly title: Locator;
  readonly cartIcon : Locator;
  readonly cartBadge : Locator;
  readonly inventoryItems : Locator;

  constructor(page: Page) {
    super(page);

    this.title = page.locator ('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.inventoryItems = page.locator('.inventory_item');
  }
//-----------------------Basic Actions--------------------
  async getTitleText() : Promise<string | null>{
    return this.title.textContent();
  }
  async openMenu() : Promise<void>{
    await this.menuButton.click();
  }
  async openCart() : Promise<void>{
    await this.cartIcon.click();
  }
//------------------Product Helpers---------------------------

async logout() {
    await expect(this.page.locator('.title')).toHaveText('Products');

    await this.menuButton.click();
    await this.logoutLink.click();

    // after logout, user should be redirected back to login page
    await expect(this.page.locator('[data-test="username"]')).toBeVisible();
  }

async addItemToCartByName(productName : string) : Promise<void>{
const item = this.inventoryItems.filter({ hasText : productName});
await item.locator('button:has-text("Add to Cart")').click();
}

async isTeemInCartBadge(expectedcount : number) : Promise<void>{
await expect(this.cartBadge).toHaveText(String(expectedcount));
}
}
