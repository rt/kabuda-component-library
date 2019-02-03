import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

export default class InputLike extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async click() {
        const el = await this.getElement();
        return el.click();

        // special case: selenium will not clickable at x,y error
        // return this.driver.executeScript(`document.querySelector('${this.selector}').click()`);
    }
}
