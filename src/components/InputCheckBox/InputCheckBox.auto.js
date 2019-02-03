import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

const By = webdriver.By;

export default class InputCheckBox extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async click() {
        const el = await this.getElement();
        return el.click();
    }
}
