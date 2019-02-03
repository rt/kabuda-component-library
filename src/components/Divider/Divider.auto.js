import Base from '../Base.auto';

export default class Divider extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }
}
