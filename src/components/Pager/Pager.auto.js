import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

const By = webdriver.By;

export default class Pager extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    /**
     * @return {Promise}
     */
    async clickPrev() {
        const el = await this.getElement();
        const aPrev = await el.findElement(By.css('a:first-child'));
        return aPrev.click();
    }

    /**
     * @return {Promise}
     */
    async clickNext() {
        const el = await this.getElement();
        const aPrev = await el.findElement(By.css('a:last-child'));
        return aPrev.click();
    }

    /**
     * @param {number} pageNo:  no the index
     * @return {Promise}
     */
    async clickPage(pageNo) {
        const el = await this.getElement();
        // prev takes up the first slot
        const aPage = await el.findElement(By.css(`a:nth-child(${pageNo + 1})`));
        return aPage.click();
    }

    /**
     * @return {Promise}
     */
    async getSelectedPage() {
        const el = await this.getElement();
        const children = await el.findElements(By.tagName('a'));
        // only page in between prev / next buttons
        for (let i = 1; i < children.length - 1; i++) {
            const child = children[i];
            const cls = await child.getAttribute('class');
            if (cls.toLowerCase().includes('active')) {
                return parseInt(await child.getText(), 10);
            }
        }
        return null;
    }
}
