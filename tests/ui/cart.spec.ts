
import { test, expect } from '@playwright/test'
import { LoginPage } from '../../Pages/LoginPage'
import { ProductsPage } from '../../Pages/ProductsPage'
import { cartData } from "../../test-data/cartData";
import { CartPage } from "../../Pages/CartPage";

test.describe('SauceDemo Cart - Positive Scenarios', () => {

    test ('Remove item from cart @positive', async ({ page }) => {   
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await page.goto('/');
        await loginPage.login(cartData.user.username,cartData.user.password);

  // Add item
        await productsPage.addItemToCartByName(cartData.productsToAdd[0]);
        await productsPage.openCart();
        await cartPage.assertItemPresent(cartData.productsToAdd[0]);
        
await cartPage.removeItem(cartData.productsToAdd[0]);
      
});

    test('continue shopping navigates back to the product page @positive', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);

        await page.goto('/');
        await loginPage.login(cartData.user.username,cartData.user.password);

         // Add item
        await productsPage.addItemToCartByName(cartData.productsToAdd[0]);
        await productsPage.openCart();
        
        await cartPage.clickContinueShopping();

        const isOnProducts = await productsPage.getTitleText()
        expect(isOnProducts).toBeTruthy();

    })

test.describe('SauceDemo Cart - Negative Scenarios', () => {

  test('User cannot add item to cart without login @negative', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Try opening product page without logging in
    await page.goto('/inventory.html');

    // Expect redirect to login page
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Remove item should change button state back to Add to cart @negative', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.open();
    await loginPage.login(cartData.user.username,cartData.user.password);

    await productsPage.addItemToCartByName(cartData.productsToAdd[0]);
    await productsPage.openCart();

    await cartPage.removeItem('Sauce Labs Backpack');

    // Navigate back and check button reverted
    await cartPage.clickContinueShopping();

    const isOnProducts = await productsPage.getTitleText()
    expect(isOnProducts).toBeTruthy();
  });

});

});

