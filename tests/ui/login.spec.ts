

import { expect, test } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { ProductsPage } from '../../Pages/ProductsPage';
import { cartData } from '../../test-data/cartData';

test.describe('SauceDemo Login Tests - Postivie Scenarios', () => {

  test('Valid user can login @positive @smoke @ui', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(cartData.user.username,cartData.user.password);

    await loginPage.assertOnProductsPage();
  });

  test('user can logout @positive', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.open();
    await loginPage.login(cartData.user.username,cartData.user.password);

    await productsPage.logout();
  });

 test.describe('SauseDemo Login Tests - Negative Scenarios', () => {
  
  test('Invalid username should show error @negative', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('wrong_user',cartData.user.password);

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );

  });

 test('Invalid password should show error @negative', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(cartData.user.username,'Wrong_password');

    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );

 });

  test('Empty username and password should show error @negative', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('','');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username is required'
    );

  });  

 test('Lockeed-out user should show locked out @negative', async ({page}) => {
 const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('locked_out_user',cartData.user.password);
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );

 });  

});

});
