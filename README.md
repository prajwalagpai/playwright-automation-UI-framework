# Playwright UI Automation Framework (TypeScript)

A clean, scalable, and fully functional **UI Automation Framework** built using **Playwright + TypeScript**.  
This project showcases modern automation principles including Page Object Model (POM), reusable components, 
multi-environment configuration, CI/CD integration, and test reporting.


##  Key Features

- **Playwright + TypeScript** modern automation stack  
- **Page Object Model (POM)** with reusable selectors and actions  
- **Environment-based execution** (test, stg)  
- **Reusable test data** via JSON  
- **Visual test artifacts** → Screenshot + Video + Trace  
- **CI/CD using GitHub Actions**  
- **Supports parallel execution**  
- **HTML Reporter** integrated  
- (Optional) **AI-Powered Test Failure Analysis** support

##  Project Structure

playwright-automation-UI-framework
│
├── config/
│   └── environment.ts        # Environment-specific base URLs
├── Pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── BasePage.ts           # Reusable helpers (click, type, wait, etc.)
├── test-data/
│   ├── cartData.json         # User + product test data
├── tests/ui/
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   ├── add-to-cart.spec.ts
│   ├── cart-remove-continue.spec.ts
│   └── checkout.e2e.spec.ts
├── utils/
│   └── aiClient.ts (optional) # AI error analysis helper
├── playwright.config.ts      # Global configuration
├── package.json
└── README.md

## Page Object Model (POM)

Each workflow step in your application is abstracted into page classes.

Example:

```ts
await loginPage.login(username, password);
await productsPage.addItemToCartByName("Sauce Labs Backpack");
await cartPage.clickCheckout();
await checkoutPage.fillCheckoutInformation(first, last, postal) 
```
## Environment Configuration

Your framework supports multiple environments (`test`, `stg`).
```
environment.ts:
playwright.config.ts:

```
##  Test Reports

Playwright generates:
-  Screenshots  
-  Video recordings  
-  Trace viewer  
-  HTML Report  

 Open report:

```
npx playwright show-report
```
## Optional: AI-Powered Failure Analysis

When enabled:

- Captures failed test details  
- Sends to AI model  
- Returns debugging suggestions  

This module (`aiClient.ts`) is optional and can be enabled later.

---

## CI/CD Pipeline — GitHub Actions

This project includes a full CI pipeline that:

- Installs dependencies  
- Installs Playwright browsers  
- Runs tests  
- Uploads HTML report  
- Executes across multiple environments

.playwright.yml:

```yaml
name: Playwright Tests
```

## ▶️ Running Tests Locally

Clone:

git clone https://github.com/prajwalagapi/playwright-automation-UI-framework.git
cd playwright-automation-UI-framework

Install dependencies:
npm install

Install browsers:
npx playwright install

##  Author

**Prajwala Pai**  
Melbourne, Australia  
QA Automation Engineer – Playwright | API | DevOps

---

⭐ If you like this project, please star the repository!
