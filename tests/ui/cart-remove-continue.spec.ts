
import { test, expect } from '@playwright/test'
import { LoginPage } from '../../Pages/LoginPage'
import { ProductsPage } from '../../Pages/ProductsPage'
import { cartData } from "../../test-data/cartData";
import { CartPage } from "../../Pages/CartPage";

test.describe('Cart functionalities', () => {

    test ('Remove item from cart', async ({ page }) => {   
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

    test('continue shopping navigates back to the product page', async ({ page }) => {
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


});

