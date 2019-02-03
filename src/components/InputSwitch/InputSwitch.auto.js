import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

export default class InputSwitch extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async click() {
        const el = await this.getElement();
        return el.click();
    }
}
