import {expect,Page,Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    readonly firstNameInput : Locator;
    readonly lastNameInput : Locator;
    readonly postalcodeInput : Locator;
    readonly continueButton : Locator;
    readonly cancelButton : Locator;
    readonly summaryContainer : Locator;
    readonly finishButton : Locator;
    readonly backHomeButton : Locator;
    readonly completeHeader : Locator;

    constructor( page : Page ) {
    super(page);

    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalcodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.summaryContainer = page.locator ('.summary_info');
    this.finishButton = page.locator('[data-test="finish"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.completeHeader = page.locator ('[data-test="complete-header"]');
    }

    // setp 1 : Fill your details
    async fillCheckoutInformation(firstName : string, lastName:string,postalCode : string) : Promise<void>{
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalcodeInput.fill(postalCode);
    }
    // setp 2 : Continue on overview page
    async continueToOverview() : Promise<void> {
        await this.continueButton.click();
    }
    // step 3 : Assert as we are one the overview page
    async assertOnOverviewPage(expectedItemName ? : string) : Promise<void>{
        await expect(this.summaryContainer).toBeVisible();

        if(expectedItemName){
            await expect(this.page.locator('.cart_item .inventory_item_name', { hasText :expectedItemName })
        ).toBeVisible();
        }

    }

    // step 4 : Finish Checkout
    async finishCheckout() : Promise<void> {
        await this.finishButton.click();
    }

    // step 5 : Assert Success page
    async assertOrderCompleted() : Promise<void> {
        await expect(this.completeHeader).toBeVisible();
        await expect(this.completeHeader).toHaveText('Thank you for your order!');
    }

    // step 6 : Back home to products
    async backToProducst() : Promise<void> {
    await this.backHomeButton.click();    
    }
    







};
