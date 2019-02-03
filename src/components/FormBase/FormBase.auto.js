import Base from '../Base.auto';
import FieldInputText from '../FieldInputText/FieldInputText.auto';
import FieldSelect from '../FieldSelect/FieldSelect.auto';

export default class Form extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    async getTextField(name) {
        const field = new FieldInputText(this.driver, this.selector, ` [data-e2e="${name}"]`);
        await field.rootLoaded();
        return field;
    }

    async getSelectField(name) {
        const field = new FieldSelect(this.driver, this.selector, ` [data-e2e="${name}"]`);
        await field.rootLoaded();
        return field;
    }
}
