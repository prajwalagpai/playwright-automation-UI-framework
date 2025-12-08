Playwright TypeScript Automation Framework

Modern, scalable end-to-end test automation framework built with Playwright + TypeScript using industry-standard design patterns.

Features

Page Object Model (POM)
Environment-based configuration (dev / test / prod)
Reusable BasePage with shared browser utilities
E2E checkout flow (Saucedemo demo app)
Component-level tests (login, add to cart, remove from cart)
Data-driven testing with TypeScript & JSON
Playwright HTML report + video + screenshot on failure
Azure/GitHub CI pipeline integrated
Modular folder structure for enterprise scaling

Folder Structure

├── config
│   └── environment.ts
├── pages
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── test-data
│   └── users.json
├── tests
│   ├── login.spec.ts
│   ├── add-to-cart.spec.ts
│   ├── cart-remove.spec.ts
│   └── checkout.e2e.spec.ts
├── playwright.config.ts
└── .github/workflows/playwright.yml

Sample Test :

test("User completes checkout flow", async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    await login.goto();
    await login.login("standard_user", "secret_sauce");
    await products.addProductToCartByName("Sauce Labs Backpack");
    await products.openCart();
    await cart.proceedToCheckout();
    await checkout.fillCustomerDetails({
    firstName: "Praj",
    lastName: "Pai",
    postalCode: "3000"
});
    await checkout.finishOrder();
    await checkout.verifySuccessMessage();
});

Installation and Execution :

npm install
npx playwright install
npx playwright test
npx playwright test --project=chromium

Uses GitHub actions to:

Install dependencies
Run Playwright tests headless
Upload HTML report as artifact