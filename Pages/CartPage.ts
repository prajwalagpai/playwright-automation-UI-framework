import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

//locators
readonly cartItemNames : Locator;
readonly removeButton : Locator;
readonly checkoutButton: Locator;
readonly continueShoppingButton : Locator;

constructor (page : Page){
super(page);

//elements on the cart page
this.cartItemNames = this.page.locator('.cart_item .inventory_item_name');
this.removeButton = this.page.locator('[data-test^="remove-"]');
this.checkoutButton = this.page.locator('#checkout');
this.continueShoppingButton = this.page.locator ('#continue-shopping');

}
// Assert items exist in the cart
async assertItemPresent(productName:string){
    await expect(this.cartItemNames).toContainText(productName);
}

// Assert items not exist in the cart
async assertItemNotPresent(productName : string){
    await expect(this.cartItemNames).not.toContainText(productName);
}
// Remove an item from the cart by name

async removeItem(productName : string){
    const item = this.page.locator('.cart_item').filter({hasText : productName});
    await item.locator('[data-test^="remove-"]').click();
    await expect(item).toHaveCount(0);
}

//Checkout button 
async clickCheckout(){
await this.checkoutButton.click();
}

//continue shopping

async clickContinueShopping(){
    await this.continueShoppingButton.click();
}

}




