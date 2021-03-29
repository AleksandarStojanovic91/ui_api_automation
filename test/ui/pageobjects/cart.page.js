import {expect as expectChai} from "chai";

const BasePage = require('./base.page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class CartPage extends BasePage {
    /**
     * Defining selectors using getter methods
     */
    get productNames() {
        return $$('.inventory_item_name');
    }

    get productDescriptions() {
        return $$('.inventory_item_desc');
    }

    get productPrices() {
        return $$('.inventory_item_price');
    }

    get checkoutBtn() {
        return $('//a[text()=\'CHECKOUT\']');
    }

    /**
     * Verifies product details, name, description and price
     * @param productsDetails name,desc,price
     */
    verifyProductDetails(productsDetails) {
        for (let i = 0; i < productsDetails.length; i++) {
            expectChai(productsDetails[i][0]).to.equal(this.productNames[i].getText());
            expectChai(productsDetails[i][1]).to.equal(this.productDescriptions[i].getText());
            expectChai(productsDetails[i][2]).to.equal("$" + this.productPrices[i].getText());
        }
    }

    /**
     * Clicks the checkout button
     */
    checkout() {
        this.checkoutBtn.click();
    }
}

module.exports = new CartPage();
