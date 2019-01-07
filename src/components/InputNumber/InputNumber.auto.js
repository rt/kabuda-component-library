import Base from '../Base.auto';

export default class InputNumber extends Base {

    getId() {
        return this.camelize(this.constructor.name);
    }


}
