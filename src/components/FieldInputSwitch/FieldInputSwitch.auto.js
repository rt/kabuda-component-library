import FieldBase from '../FieldBase/FieldBase.auto';

export default class FieldInputText extends FieldBase {
    getId() {
        return this.camelize(this.constructor.name);
    }

    setInputValue(value) {
        return this.setValue('inputText', value);
    }
}
