
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
  readonly sortDropdown : Locator ;

  constructor(page: Page) {
    super(page);

    this.title = page.locator ('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown=page.locator('select.product_sort_container');  
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

  // using GITGUB COPILOT code generation style to generate methods for sorting products
  //create the locators:
  // -sort dropdown:[data-test="product_sort_container"]
  //product names: .inventory_item_name
  //-product prices: .inventory_item_price
  //
  //Then implement these methods used in sorting_products.spec.ts
  //- getAllProductNames : Promise<string[]>
  //- getAllProductPrices : Promise<number[]
  //generate a method sortProductsBy(option : string) : Promise<void> that selects the given option from the sort dropdown

  async waitForLoaded(timeout = 10000) : Promise<void> {
    await this.title.waitFor({ state: 'visible', timeout });
    await this.sortDropdown .waitFor({ state: 'visible', timeout });
  }
 
  async sortProductsBy(option : string) : Promise<void> {
  await this.sortDropdown.selectOption({ label: option });
  }

  async getAllProductNames() : Promise<string[]> {
    const names = await this.page.locator('.inventory_item_name').allTextContents();
    return names;
  } 
  async getAllProductPrices() : Promise<number[]> {
    const priceStrings = await this.page.locator('.inventory_item_price').allTextContents();
    const prices = priceStrings.map(priceStr => parseFloat(priceStr.replace('$', '')));
    return prices;  
  }

}