import webdriver from 'selenium-webdriver';

const until = webdriver.until;
const By = webdriver.By;

export default class Base {
    /**
     * @constructor
     * @param {webdriver} driver
     * @param {string} parentSelector
     * @param {string} childSelector : sometimes we specify nth-child ... thus need selector not just childId
     */
    constructor(driver, parentSelector, childSelector) {
        this.driver = driver;
        this.selector = (parentSelector || '') + this._getLocalSelector(childSelector);
    }

    /**
     * Set component id, or for routes the starting point (usually 'layout')
     * @abstract
     */
    getId() {
        throw new Error('Must implement getId()');
    }

    camelize(name) {
        return name.replace(/^[A-Z]/, ch => ch.toLowerCase());
    }

    /**
     * @param {string} childSelector
     * @return {string}
     */
    _getLocalSelector(childSelector) {
        return childSelector || this.id2Selector(this.getId());
    }

    /**
     * return full selector for child
     * @param {string} childId
     * @return {string}
     */
    _getChildSelector(childId) {
        return this.selector + this.id2Selector(childId);
    }

    id2Selector(id) {
        return ` [data-e2e="${id}"]`;
    }

    /**
     * @return {Promise}
     */
    getElement() {
        return this.driver.findElement(By.css(this.selector));
    }

    /**
     * need to use xpath
     * @return {Promise}
     */
    // getElementByText(text) {
    // //xpath: /[>[@data-e2e="aaa"]/*[1]//[@data-e2e="bbb"]
    // return this.driver.findElement(By.xpath(this.selector));
    // }

    /**
     * @param {*} : component class
     * @return {Promise}
     */
    async getComponent(Component) {
        const component = new Component(this.driver, this.selector);
        await component.rootLoaded();
        return component;
    }

    /**
     * find element by childId
     * @param {string} childId
     * @return {Promise}
     */
    findElement(childId) {
        return this.driver.findElement(By.css(this._getChildSelector(childId)));
    }

    /**
     * @param {string} childId
     * @param {string} value
     * @return {Promise}
     */
    async setValue(childId, value) {
        const el = await this.findElement(childId);
        await el.clear();
        return el.sendKeys(value);
    }

    /**
     * @param {string} childId
     * @return {Promise}
     */
    click(childId) {
        return this.findElement(childId).click();
    }

    /**
     * @return {Promise}
     */
    rootLoaded() {
        return this.driver.wait(until.elementLocated(By.css(this.selector)));
    }

    /**
     * @return {Promise}
     */
    rootNotVisible() {
        return this.driver.wait(async () => {
            const elements = await this.driver.findElements(By.css(this.selector));
            return elements.length === 0;
        });
        // }, 10000, 'The element was still present when it should have disappeared.');
    }

    /**
     * @param {string} childId
     * @return {Promise}
     */
    async getText(childId) {
        const el = await this.findElement(childId);
        return el.getText();
    }

    /**
     * use when need to get elements, usually simple stuff where a component is not needed
     * @param {string} customSelector : child selector relative to this component
     * @return {Promise}
     */
    getAllElements(childCssSelector) {
        const childSelector = `${this.selector} ${childCssSelector}`;
        return this.driver.findElements(By.css(childSelector));
    }

    /**
     * @param {number} index
     * @param {string} childCssSelector
     * @return {Promise}
     */
    async getElementAt(index, childCssSelector) {
        const childSelector = `${this.selector} ${childCssSelector}:nth-child(${index + 1})`;
        await this.driver.wait(until.elementLocated(By.css(childSelector)));
        return this.driver.findElement(By.css(childSelector));
    }

    /**
     * untested
     * @param {*} Component
     * @return {Promise}
     */
    async getAllComponents(Component) {
        const childSelector = `${this.selector} ${this._getChildSelector(this.camelize(Component.name))}`;
        const elements = await this.driver.findElements(By.css(childSelector));
        return elements.map((ele, index) => new Component(this.driver, this.selector, ` ${this._getChildSelector(this.camelize(Component.name))}:nth-child(${index})`));
    }

    /**
     * @param {number} index
     * @param {*} Component
     * @return {Promise}
     */
    async getComponentAt(index, Component) {
        const relativeSelector = ` [data-e2e="${this.camelize(Component.name)}"]:nth-child(${index + 1})`;
        const childSelector = this.selector + relativeSelector;
        await this.driver.wait(until.elementLocated(By.css(childSelector)));
        const component = new Component(this.driver, this.selector, relativeSelector);
        await component.rootLoaded();
        return component;
    }

    /**
     * get component where nested inside an element (use a childId for this element)
     * @param {number} index
     * @param {*} Component
     * @return {Promise}
     */
    async getInnerComponentAt(index, childId, Component) {
        const relativeSelector = ` [data-e2e="${childId}"]:nth-child(${index + 1}) [data-e2e="${this.camelize(Component.name)}"]`;
        const childSelector = this.selector + relativeSelector;
        await this.driver.wait(until.elementLocated(By.css(childSelector)));
        const component = new Component(this.driver, this.selector, relativeSelector);
        await component.rootLoaded();
        return component;
    }
}
