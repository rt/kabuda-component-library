import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';
const By = webdriver.By;

export default class InputStarRating extends Base {

    getId() {
        return this.camelize(this.constructor.name);
    }

    /**
     * @param {number} val
     * @return {Promise}
     */
    async setStarRating(val) {
        const el = await this.getElement();
        //const label = await el.findElement(By.css(childSelector));

        //special case: selenium will throw a not visible error
        //this label needs 0px width/height which makes it not visible 
        const childSelector = 'label[data-value="' + val + '"]';
        const fullSelector = this.selector + ' ' + childSelector; 
        return this.driver.executeScript(`document.querySelector('${fullSelector}').click()`);
    }
    
}
