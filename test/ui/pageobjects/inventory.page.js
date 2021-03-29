import {expect as expectChai} from "chai";

const BasePage = require('./base.page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends BasePage {
    /**
     * Defining selectors using getter methods
     */
    get productsTitle() {
        return $('.product_label')
    }

    get productsGrid() {
        return $('#inventory_container')
    }

    get shoppingCart() {
        return $('#shopping_cart_container > a');
    }

    get shoppingCartBadge() {
        return $('#shopping_cart_container span');
    }

    /**
     * Validates successful login
     */
    validateLogin() {
        expectChai(browser.getUrl()).to.equal('https://www.saucedemo.com/inventory.html');
        expect(this.productsTitle).toBeDisplayed();
        expect(this.productsGrid).toBeDisplayed();
    }

    /**
     * Adds selected product to the cart and returns product details information
     * @param prodName
     * @returns {(*|jQuery|string)[]}
     */
    addProductAndGetInfoInd(prodName) {
        $('//div[text()="' + prodName + '"]/../../..//button').click();
        let name = $('//div[text()="' + prodName + '"]').getText();
        let desc = $('//div[text()="' + prodName + '"]/../../div[@class="inventory_item_desc"]').getText();
        let price = $('//div[text()="' + prodName + '"]/../../../div/div[@class="inventory_item_price"]').getText();
        return [name, desc, price];
    }

    /**
     * Clicks the shopping cart icon
     */
    goToMyShoppingCart() {
        this.shoppingCart.click();
    }

    /**
     * Verify shopping cart badge and products number
     * @param products
     */
    verifyShoppingCartBadge(products) {
        expect(this.shoppingCartBadge).toBeDisplayed();
        expectChai(this.shoppingCartBadge.getText()).to.equal(products.toString());
    }

}

module.exports = new InventoryPage();
