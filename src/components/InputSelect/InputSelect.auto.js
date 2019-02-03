import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

const By = webdriver.By;

export default class InputSelect extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    /**
     * @param {number} index
     * @return {Promise}
     */
    async selectOptionByIndex(index) {
        const select = await this.getElement();
        await select.click();
        const option = await select.findElement(By.css(`option:nth-child(${index + 1})`));
        return option.click();
    }

    /**
     * @param {string} val
     * @return {Promise}
     */
    async selectOptionByValue(val) {
        const select = await this.getElement();
        await select.click();
        const option = await select.findElement(By.css(`option[value="${val}"]`));
        return option.click();
    }

    /**
     * @param {string} val
     * @return {Promise}
     */
    async isSelected(val) {
        const select = await this.getElement();
        const option = await select.findElement(By.css(`option[value="${val}"]`));
        return option.isSelected();
    }

    /**
     * @param {string} txt
     * @return {Promise}
     */
    async selectOptionByText(txt) {
        const select = await this.getElement();
        await select.click();
        const options = await select.findElements(By.tagName('option'));
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            const text = await option.getText();
            if (text === txt) {
                return option.click();
            }
        }
        return null;
    }
}
