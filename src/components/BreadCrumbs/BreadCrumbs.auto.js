import Base from '../Base.auto';

export default class BreadCrumbs extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }
}
