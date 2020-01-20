import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';
import FormBase from '../../../component-library/src/components/FormBase/FormBase.auto';

export default class Form extends RouteBase {
    getPath() {
        return '/reference/form';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    async getForm() {
        const form = new FormBase(this.driver, this.selector, ' [data-e2e="form"]');
        await form.rootLoaded();
        return form;
    }
}
