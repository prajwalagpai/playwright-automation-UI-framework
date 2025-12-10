import { test, expect, type TestInfo } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { ProductsPage } from '../../Pages/ProductsPage';
import { CartPage } from '../../Pages/CartPage';
import { CheckoutPage } from '../../Pages/CheckoutPage';
import { cartData } from '../../test-data/cartData'
import { analyzeFailure } from '../../utils/aiClient';

test.describe ('Checkout - Positive E2E scenarios @negative', () =>{

test('E2E: user can complete checkout successfully', async ({ page }, testInfo: TestInfo ) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  try {
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

} catch (error : any){

  // AI Analysis happens here
  const analysis = await analyzeFailure({
   testName: testInfo.title,
   error: error?.stack || String(error),
   url: page.url(), 
  });

  console.log("\n====AI Failure Analysis===");
  console.log(analysis);
  console.log("============================\n");

  throw error; //keep original failure for playwright reporting
}
});
});

test.describe ('Checkout - Negative scenarios @negative', () => {
let loginPage: LoginPage;
let productsPage: ProductsPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({page})  => {
loginPage = new LoginPage(page);
productsPage= new ProductsPage(page);
cartPage = new CartPage(page);
checkoutPage = new CheckoutPage(page);

await page.goto('/');
await loginPage.login(cartData.user.username,cartData.user.password);

await productsPage.addItemToCartByName(cartData.productsToAdd[0]);
await productsPage.openCart(); // or goToCart()

await cartPage.clickCheckout();
});

test('should show error when the Firstname is empty @negative', async ({page}) => {
await checkoutPage.fillCheckoutInformation('',cartData.user.lastname,cartData.user.postalcode);

await checkoutPage.continueToOverview(); 
await checkoutPage.assertErrorMessage ('Error: First Name is required');
});

test('should show error message with the Lastname is empty @nagative', async ({page}) => {
await checkoutPage.fillCheckoutInformation(cartData.user.firstname,'',cartData.user.postalcode);

await checkoutPage.continueToOverview();
await checkoutPage.assertErrorMessage('Error: Last Name is required');
});

test('should show error message when the postcode is empty @negative', async ({page}) => {
await checkoutPage.fillCheckoutInformation(cartData.user.firstname, cartData.user.lastname,'');

await checkoutPage.continueToOverview();
await checkoutPage.assertErrorMessage('Error: Postal Code is required');
});

test('should show error message when all the fields are empty @negative', async ({page}) => {
await checkoutPage.fillCheckoutInformation('','','');

await checkoutPage.continueToOverview();
await checkoutPage.assertErrorMessage('Error: First Name is required');
});
});

