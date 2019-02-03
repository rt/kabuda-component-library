import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

const By = webdriver.By;

export default class NavList extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async getItemText(index) {
        const el = await this.getDropdownItem(index);
        return el.getText();
    }

    async clickItem(index) {
        const el = await this.getDropdownItem(index);
        const link = await el.findElement(By.css('a'));
        return link.click();
    }

    getDropdownItem(index) {
        return this.getElementAt(index, 'li');
    }

    getItems() {
        return this.getAllElements('li');
    }

    async hasItemWithText(name) {
        const item = await this.getItemByText(name);
        const text = await item.getText();
        return await item.getText(item) === name;
    }

    async getItemByText(name) {
        let error = true;
        while (error) {
            error = false;
            const items = await this.getItems();
            for (let i = 0; i < items.length; i++) {
                try {
                    const item = items[i];
                    const text = await item.getText();
                    if (text === name) {
                        return item;
                    }
                } catch (e) {
                    console.log(e);
                    // might have become stale (delete case)
                    // break and try again
                    error = true;
                    break;
                }
            }
            return null;
        }
    }

    waitForDeleted(name) {
        // return await this.driver.wait(async () => {
        return new Promise(async (resolve) => {
            let found = true;
            // keep doing it until returns false
            while (found) {
                const val = await this.getItemByText(name);
                console.log(`VAL: ${val}`);
                found = val !== null;
            }
            // gets here its was not found
            console.log('FOUND');
            resolve();
            // return true;
        });
        // }, 10000);
    }
}
