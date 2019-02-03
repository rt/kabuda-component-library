import Base from '../Base.auto';

export default class InputText extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }
}
