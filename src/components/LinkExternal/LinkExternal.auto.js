import Base from '../Base.auto';

export default class LinkExternal extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }
}
