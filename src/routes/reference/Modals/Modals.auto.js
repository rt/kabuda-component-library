import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';
import Modal from '../../../component-library/src/components/Modal/Modal.auto';

export default class Modals extends RouteBase {
    getPath() {
        return '/reference/modals';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    async openStandardModal() {
        const button = await this.findElement('openStandardModalBtn');
        await button.click();

        const modal = new Modal(this.driver, this.selector);
        await modal.rootLoaded();
        return modal;
    }

    async openLoadingModal() {
        const button = await this.findElement('openLoadingModal');
        await button.click();

        const modal = new Modal(this.driver, this.selector);
        await modal.rootLoaded();
        return modal;
    }
}
