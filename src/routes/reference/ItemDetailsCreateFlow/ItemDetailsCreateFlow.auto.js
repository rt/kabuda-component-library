import webdriver from 'selenium-webdriver';
import Base from '../../../component-library/src/components/Base.auto';
import ItemForm from '../ItemForm/ItemForm.auto';
import ItemDetails from '../ItemDetails/ItemDetails.auto';

const By = webdriver.By;

export default class ItemDetailsCreateFlow extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async clickEdit() {
        const el = await this.findElement('edit');
        await el.click();
        return this.getItemForm();
    }

    async clickDelete() {
        const el = await this.findElement('delete');
        await el.click();
    }

    async clickSave() {
        const el = await this.findElement('save');
        await el.click();
        return this.getItemDetails();
    }

    async clickCancel() {
        const el = await this.findElement('cancel');
        await el.click();
        return this.getItemDetails();
    }

    async getItemForm() {
        const form = new ItemForm(this.driver, this.selector);
        await form.rootLoaded();
        return form;
    }

    async getItemDetails() {
        const itemDetails = new ItemDetails(this.driver, this.selector);
        await itemDetails.rootLoaded();
        return itemDetails;
    }
}
