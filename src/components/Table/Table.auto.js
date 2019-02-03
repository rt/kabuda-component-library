import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

const By = webdriver.By;

export default class Table extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    /**
     * @return {Promise}
     */
    async getRowCount() {
        const el = await this.getElement();
        const trs = await el.findElements(By.css('tbody > tr'));
        return trs.length;
    }

    /**
     * @return {Promise}
     */
    async getColCount() {
        const el = await this.getElement();
        // based on header cols
        const ths = await el.findElements(By.css('thead > tr > th'));
        return ths.length;
    }

    /**
     * @param {number} index
     * @return {Promise}
     */
    async getColHeaderText(index) {
        const el = await this.getElement();
        // based on header cols
        const th = await el.findElement(By.css(`thead > tr > th:nth-child(${index + 1})`));
        return th.getText();
    }

    /**
     * @return {Promise}
     */
    async getCellText(x, y) {
        const el = await this.getElement();
        const tr = await el.findElement(By.css(`tbody > tr:nth-child(${x + 1})`));
        const td = await tr.findElement(By.css(`td:nth-child(${y + 1})`));
        return td.getText();
    }
}
