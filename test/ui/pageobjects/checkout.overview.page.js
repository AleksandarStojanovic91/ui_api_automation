import {expect as expectChai} from "chai";

const BasePage = require('./base.page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class CheckoutOverviewPage extends BasePage {
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

    get itemTotalPrice() {
        return $('.summary_subtotal_label');
    }

    get tax() {
        return $('.summary_tax_label');
    }

    get totalPrice() {
        return $('.summary_total_label');
    }

    get finishBtn() {
        return $('//a[text()="FINISH"]');
    }

    /**
     * Verifies product details, name, description and price
     * @param productsDetails name,desc,price
     */
    verifyProductDetails(productsDetails) {
        for (let i = 0; i < productsDetails.length; i++) {
            expectChai(productsDetails[i][0]).to.equal(this.productNames[i].getText());
            expectChai(productsDetails[i][1]).to.equal(this.productDescriptions[i].getText());
            expectChai(productsDetails[i][2]).to.equal(this.productPrices[i].getText());
        }
    }

    /**
     * Verifies item total price
     * @param productsDetails
     */
    verifyItemTotalPrice(productsDetails) {
        let itemTotalPrice = 0.0;
        for (let i = 0; i < productsDetails.length; i++) {
            itemTotalPrice += parseFloat(this.productPrices[i].getText().replace('$', ''));
        }
        expectChai(itemTotalPrice.toString()).to.equal(this.itemTotalPrice.getText().replace('Item total: $', ''));
    }

    /**
     * Verifies total price
     * @param productsDetails
     */
    verifyTotalPrice(productsDetails) {
        let totalPrice = 0.0;
        for (let i = 0; i < productsDetails.length; i++) {
            totalPrice += parseFloat(this.productPrices[i].getText().replace('$', ''));
        }
        totalPrice += parseFloat(this.tax.getText().replace('Tax: $', ''));
        expectChai(totalPrice.toString()).to.equal(this.totalPrice.getText().replace('Total: $', ''));
    }

    /**
     * Clicks the finish button
     */
    finish() {
        this.finishBtn.click();
    }
}

module.exports = new CheckoutOverviewPage();