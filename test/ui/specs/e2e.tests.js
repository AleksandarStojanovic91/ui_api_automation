import LoginPage from '../pageobjects/login.page'
import InventoryPage from '../pageobjects/inventory.page'
import CartPage from '../pageobjects/cart.page'
import CheckoutStepOnePage from '../pageobjects/checkout.step.one.page'
import CheckoutOverviewPage from '../pageobjects/checkout.overview.page'
import CheckoutCompletePage from '../pageobjects/checkout.complete.page'

const data = require('../test_data/data.json');

describe('Sauce Demo - End to end tests - Buy products', () => {
    before(() => {
        browser.url('https://www.saucedemo.com/');
    })
    it('should buy some products', () => {
        //Login to Sauce Demo
        LoginPage.login(data.users.standard_user.username, data.users.standard_user.password);

        //Verify that I am logged in
        InventoryPage.validateLogin();
        //Add products to the cart and get products names, descriptions and prices
        const productsDetails = [
            InventoryPage.addProductAndGetInfoInd("Sauce Labs Backpack"),
            InventoryPage.addProductAndGetInfoInd("Sauce Labs Bike Light"),
            InventoryPage.addProductAndGetInfoInd("Sauce Labs Bolt T-Shirt")
        ];
        //Verify that there is a shopping cart badge with 3 products shown
        InventoryPage.verifyShoppingCartBadge(3);
        //Go to my shopping cart
        InventoryPage.goToMyShoppingCart();

        //Verify that products details in my shopping cart matches products added
        CartPage.verifyProductDetails(productsDetails);
        //Proceed to checkout
        CartPage.checkout();

        //Fill in checkout information details
        CheckoutStepOnePage.fillCheckoutInformation("Aleksandar", "Stojanovic", "12345");
        //Proceed to checkout overview
        CheckoutStepOnePage.continue();

        //Again verify product details
        CheckoutOverviewPage.verifyProductDetails(productsDetails);
        //Verify item total price
        CheckoutOverviewPage.verifyItemTotalPrice(productsDetails);
        //Verify Total price
        CheckoutOverviewPage.verifyTotalPrice(productsDetails);

        //Finish
        CheckoutOverviewPage.finish();
        //Verify finish page
        CheckoutCompletePage.verifyFinish();
    });
});