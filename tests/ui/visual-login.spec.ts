import {test,expect, Locator} from '@playwright/test'
import { LoginPage } from '../../Pages/LoginPage'

test.describe('Login page visual regression tests @regression', () => {
    let loginPage : LoginPage;
    let loginBox: Locator;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage (page);
        await loginPage.open();
        loginBox = page.locator('#login_button_container');
    }); 

    test('Login page - default state @regression', async ({page}) => {
        await expect (loginBox).toHaveScreenshot( 'login-box-default.png');
    });

    test('Login page - error state @regression', async ({page}) => {
        await loginPage.login('invalid_user','invalid_password');
        await loginPage.assertErrorVisible();
        await expect (loginBox).toHaveScreenshot( 'login-box-error.png');
    }); 

});