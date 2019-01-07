import Base from '../Base.auto';

export default class SkipLinks extends Base {

    getId() {
        return this.camelize(this.constructor.name);
    }

}
