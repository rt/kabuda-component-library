import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

const By = webdriver.By;

export default class Tabs extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async clickItem(index) {
        const el = await this.getDropdownItem(index);
        const link = await el.findElement(By.css('a'));
        return link.click();
    }

    getDropdownItem(index) {
        return this.getElementAt(index, 'li');
    }
}
