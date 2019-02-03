import FieldBase from '../FieldBase/FieldBase.auto';
import InputSelect from '../InputSelect/InputSelect.auto';

export default class FieldSelect extends FieldBase {
    getId() {
        return this.camelize(this.constructor.name);
    }

    getInputSelect() {
        return this.getComponent(InputSelect);
    }

    async selectByIndex(index) {
        const select = await this.getInputSelect();
        return select.selectOptionByIndex(index);
    }

    async selectByValue(value) {
        const select = await this.getInputSelect();
        return select.selectOptionByValue(value);
    }

    async selectByText(text) {
        const select = await this.getInputSelect();
        return select.selectOptionByText(text);
    }

    async isOptionSelected(optVal) {
        const select = await this.getInputSelect();
        return select.isSelected(optVal);
    }
}
