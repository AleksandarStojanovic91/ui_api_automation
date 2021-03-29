const BasePage = require('./base.page');

/**
 * Sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends BasePage {
    /**
     * Defining selectors using getter methods
     */
    get inputUsername() {
        return $('#user-name')
    }

    get inputPassword() {
        return $('#password')
    }

    get btnSubmit() {
        return $('#login-button')
    }

    get loginErrorMessageElement() {
        return $('//h3[@data-test="error"]')
    }

    get errorButton() {
        return $('.error-button')
    }

    /**
     * Call this method to login with username and password
     * @param username username
     * @param password password
     */
    login(username, password) {
        this.inputUsername.setValue(username);
        this.inputPassword.setValue(password);
        this.btnSubmit.click();
    }

    /**
     * Returns login error message
     * @returns {ThenArg<ReturnType<ElementCommandsType["getText"]>>}
     */
    loginErrorMessage() {
        return this.loginErrorMessageElement.getText();
    }
}

module.exports = new LoginPage();
