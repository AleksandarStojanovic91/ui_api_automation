import {expect as expectChai} from 'chai';
import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'

const data = require('../test_data/data.json');

describe('Sauce Demo - Login test suite - positive scenarios', () => {
    beforeEach(() => {
        browser.url('https://www.saucedemo.com/');
    })
    Object.entries(data.users).forEach(([variant, user]) => {
        it('should login a ' + variant, () => {
            LoginPage.login(user.username, user.password);
            if (user.username === 'locked_out_user') {
                expectChai(LoginPage.loginErrorMessage()).to.equal(data.loginErrorMessages.lockedOutUser);
                expect(LoginPage.errorButton).toBeDisplayed();
            } else {
                expectChai(browser.getUrl()).to.equal('https://www.saucedemo.com/inventory.html');
                expect(InventoryPage.productsTitle).toBeDisplayed();
                expect(InventoryPage.productsGrid).toBeDisplayed();
            }
        });
    });
})
describe('Sauce Demo - Login test suite - negative scenarios', () => {
    beforeEach(() => {
        browser.url('https://www.saucedemo.com/');
    })
    Object.entries(data.invalidUsers).forEach(([variant, user]) => {
        it('should not login with ' + variant, () => {
            LoginPage.login(user.username, user.password);
            expectChai(LoginPage.loginErrorMessage()).to.equal(user.expectedErrorMessage);
            expect(LoginPage.errorButton).toBeDisplayed();
        });
    });
})