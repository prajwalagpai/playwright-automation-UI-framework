import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { ProductsPage } from '../../Pages/ProductsPage';
import { CartPage } from '../../Pages/CartPage';
import { CheckoutPage } from '../../Pages/CheckoutPage';
import { cartData } from '../../test-data/cartData';

test('E2E: user can complete checkout successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await page.goto('/');
  await loginPage.login(
    cartData.user.username,
    cartData.user.password
  );

  // 2. Add item to cart
  await productsPage.addItemToCartByName(cartData.productsToAdd[0]);
  await productsPage.openCart(); // or goToCart()

  // 3. Go to checkout
  await cartPage.clickCheckout();

  // 4. Fill checkout info
  await checkoutPage.fillCheckoutInformation(
    cartData.user.firstname,
    cartData.user.lastname,
    cartData.user.postalcode
  );
  await checkoutPage.continueToOverview();

  // 5. Validate summary page
  await checkoutPage.assertOnOverviewPage(cartData.productsToAdd[0]);

  // 6. Finish and validate order completion
  await checkoutPage.finishCheckout();
  await checkoutPage.assertOrderCompleted();
});
