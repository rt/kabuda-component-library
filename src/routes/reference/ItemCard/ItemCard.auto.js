import webdriver from 'selenium-webdriver';
import Base from '../../../component-library/src/components/Base.auto';

const By = webdriver.By;

export default class ItemCard extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async getTitle() {
        const el = await this.findElement('title');
        return el.getText();
    }
}
