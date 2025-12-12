// create a Playwright test in Typescript for https://www.saucedemo.com/ using GITGUB COPILOT code generation style
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { ProductsPage } from '../../Pages/ProductsPage';
import { CartPage } from '../../Pages/CartPage';   
import { cartData } from '../../test-data/cartData';


test.describe('SauceDemo Product Sorting Tests', () => {

  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let cartPage: CartPage;                       

    test.beforeEach(async ({page})  => {        
    loginPage = new LoginPage(page);
    productsPage= new ProductsPage(page);
    cartPage = new CartPage(page);      
    await page.goto('/');
    await loginPage.login(cartData.user.username,cartData.user.password);
    });

    test('should sort products by Name (A to Z) @sorting', async ({page}) => {
      await productsPage.waitForLoaded();
      await productsPage.sortProductsBy(cartData.sortingOptions[0]); // 'Name (A to Z)'
      const productNames = await productsPage.getAllProductNames();
      const sortedNames = [...productNames].sort();
      expect(productNames).toEqual(sortedNames);
    }); 
    test('should sort products by Name (Z to A) @sorting', async ({page}) => {
      await productsPage.waitForLoaded();
      await productsPage.sortProductsBy(cartData.sortingOptions[1]); // 'Name (Z to A)'
      const productNames = await productsPage.getAllProductNames();
      const sortedNames = [...productNames].sort().reverse();
      expect(productNames).toEqual(sortedNames);
    }); 
    test('should sort products by Price (low to high) @sorting', async ({page}) => {        
        await productsPage.waitForLoaded();
        await productsPage.sortProductsBy(cartData.sortingOptions[2]); // 'Price (low to high)'
        const productPrices = await productsPage.getAllProductPrices();
        const sortedPrices = [...productPrices].sort((a,b) => a - b);
        expect(productPrices).toEqual(sortedPrices);
    }); 
    test('should sort products by Price (high to low) @sorting', async ({page}) => {        
        await productsPage.waitForLoaded();
        await productsPage.sortProductsBy(cartData.sortingOptions[3]); // 'Price (high to low)' 
        const productPrices = await productsPage.getAllProductPrices();
        const sortedPrices = [...productPrices].sort((a,b) => b - a);
        expect(productPrices).toEqual(sortedPrices);
    });                 
});

