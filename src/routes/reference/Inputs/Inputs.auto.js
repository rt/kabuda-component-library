import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';
import InputText from '../../../component-library/src/components/InputText/InputText.auto';
import InputSelect from '../../../component-library/src/components/InputSelect/InputSelect.auto';
import InputCheckBox from '../../../component-library/src/components/InputCheckBox/InputCheckBox.auto';
import InputRadioButton from '../../../component-library/src/components/InputRadioButton/InputRadioButton.auto';
import InputSwitch from '../../../component-library/src/components/InputSwitch/InputSwitch.auto';
import InputLike from '../../../component-library/src/components/InputLike/InputLike.auto';
import InputStarRating from '../../../component-library/src/components/InputStarRating/InputStarRating.auto';

export default class Inputs extends RouteBase {
    getPath() {
        return '/reference/inputs';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    async getForm() {
        const form = new Form(this.driver, this.selector, ' [data-e2e="form"]');
        await form.rootLoaded();
        return form;
    }

    setInputTextValue(val) {
        return this.setValue('inputText', val);
    }

    setInputTextAreaValue(val) {
        return this.setValue('inputTextArea', val);
    }

    async setSelectValue(val) {
        const select = await this.getComponent(InputSelect);
        return select.selectOptionByValue(val);
    }

    async clickCheckbox() {
        const checkbox = await this.getComponent(InputCheckBox);
        return checkbox.click();
    }

    async setRadio(index) {
        const radio = await this.getInnerComponentAt(index, 'radioContainer', InputRadioButton);
        return radio.click();
    }

    async setStarRating(val) {
        const starRating = await this.getComponent(InputStarRating);
        return starRating.setStarRating(val);
    }

    async clickSwitch() {
        const switchEl = await this.getComponent(InputSwitch);
        return switchEl.click();
    }

    async clickLike() {
        const like = await this.getComponent(InputLike);
        return like.click();
    }
}
