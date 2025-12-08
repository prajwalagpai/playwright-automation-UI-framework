
import { test, expect} from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { ProductsPage } from "../../Pages/ProductsPage";
import { cartData } from "../../test-data/cartData";
import { CartPage } from "../../Pages/CartPage";

test ('user can add a product to the cart',async({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.login(cartData.user.username,cartData.user.password);
    
    // Optional : Check title
    await expect(productsPage.title).toHaveText('Products');

    // Add item
    await productsPage.addItemToCartByName(cartData.productsToAdd[0]);

    //Validate the cart count
    await productsPage.isTeemInCartBadge(1);

    //open cart
    await productsPage.openCart();

    //verify products appears in the cart page
    await cartPage.assertItemPresent(cartData.productsToAdd[0]);

    
});