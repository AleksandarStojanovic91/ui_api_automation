const BasePage = require('./base.page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class CheckoutStepOnePage extends BasePage {
    /**
     * Defining selectors using getter methods
     */
    get firstName() {
        return $('#first-name');
    }

    get lastName() {
        return $('#last-name');
    }

    get zipCode() {
        return $('#postal-code');
    }

    get continueBtn() {
        return $('//input[@value=\'CONTINUE\']');
    }

    /**
     * Clicks the continue button
     */
    continue() {
        this.continueBtn.click();
    }

    /**
     * Fills in the checkout information firstname, lastname and zip code
     * @param firstName
     * @param lastName
     * @param zip
     */
    fillCheckoutInformation(firstName, lastName, zip) {
        this.firstName.setValue(firstName);
        this.lastName.setValue(lastName);
        this.zipCode.setValue(zip);
    }
}

module.exports = new CheckoutStepOnePage();
