import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';

export default class InputRange extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }
}
