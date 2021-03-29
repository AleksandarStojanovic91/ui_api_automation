/**
 * Main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
module.exports = class BasePage {
    /**
     * Opens a page
     * @param url url of the page (e.g. https://www.google.com)
     */
    open(url) {
        return browser.url(url)
    }
}