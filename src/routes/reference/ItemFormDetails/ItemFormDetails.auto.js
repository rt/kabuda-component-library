import webdriver from 'selenium-webdriver';
import Base from '../../../component-library/src/components/Base.auto';
import FormBase from '../../../FormBase/FormBase.auto';

const By = webdriver.By;

export default class ItemFormDetails extends FormBase {
    getId() {
        return this.camelize(this.constructor.name);
    }
}
