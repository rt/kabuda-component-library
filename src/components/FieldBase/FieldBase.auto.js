import Base from '../Base.auto';

export default class FieldInputBase extends Base {

    getLabelText() {
        return this.getText('label');
    }

    async getValidationsCount() {
        const validations = await this.getAllElements('[data-e2e="validationMessage"]');
        return validations.length;
    }

}
