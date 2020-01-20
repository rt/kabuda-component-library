import webdriver from 'selenium-webdriver';
import Base from '../../../component-library/src/components/Base.auto';
import SearchInput from '../../../component-library/src/components/SearchInput/SearchInput.auto';

const until = webdriver.until;
const By = webdriver.By;

export default class Bar extends Base {
    static elements = {
        logoImg: 'logoImg',
        brandText: 'brandText',
    };

    getId() {
        return this.camelize(this.constructor.name);
    }

    getSearchInput() {
        return new SearchInput(this.driver, this.selector);
    }

    getLoginLink() {
        return this.findElement('loginLink');
    }

    getLoginText() {
        return this.getLoginLink().getText();
    }

    clickLogin() {
        return this.getLoginLink().click();
    }

    getLogoutLink() {
        return this.findElement('logoutLink');
    }

    getLogoutText() {
        return this.getLogoutLink().getText();
    }

    clickLogout() {
        return this.getLogoutLink().click();
    }

    getRegisterLink() {
        return this.findElement('registerLink');
    }

    getRegisterText() {
        return this.getRegisterLink().getText();
    }

    clickRegister() {
        return this.getRegisterLink().click();
    }

    getReferenceLink() {
        return this.findElement('referenceLink');
    }

    getReferenceText() {
        return this.getReferenceLink().getText();
    }

    clickReference() {
        return this.getReferenceLink().click();
    }
}
