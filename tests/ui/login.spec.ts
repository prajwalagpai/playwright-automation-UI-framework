

import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { ProductsPage } from '../../Pages/ProductsPage';
import { cartData } from '../../test-data/cartData';

test.describe('SauceDemo Login Tests', () => {

  test('Valid user can login @smoke @ui', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(cartData.user.username,cartData.user.password);

    await loginPage.assertOnProductsPage();
  });

  test('user can logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login(cartData.user.username,cartData.user.password);

    await productsPage.logout();
  });

});
