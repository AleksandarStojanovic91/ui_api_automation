import {expect as expectChai} from "chai";

const BasePage = require('./base.page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class CheckoutCompletePage extends BasePage {
    /**
     * Defining selectors using getter methods
     */
    get thankYouTitle() {
        return $('.complete-header');
    }

    get yourOrderText() {
        return $('.complete-text');
    }

    get ponyLogo() {
        return $('.pony_express');
    }

    get finishTitle() {
        return $('.subheader');
    }

    /**
     * Verifies finish page information
     */
    verifyFinish() {
        expectChai(this.thankYouTitle.getText()).to.equal('THANK YOU FOR YOUR ORDER');
        expectChai(this.yourOrderText.getText()).to.equal('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        expect(this.ponyLogo).toBeDisplayed();
        expectChai(this.finishTitle.getText()).to.equal('Finish');
    }
}

module.exports = new CheckoutCompletePage();