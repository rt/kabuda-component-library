import Base from '../Base.auto';

export default class Modal extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async getTitle() {
        const el = await this.findElement('title');
        return el.getText();
    }

    async clickCloseBtn() {
        const el = await this.findElement('closeBtn');
        return el.click();
    }
}
