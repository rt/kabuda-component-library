import Base from '../Base.auto';

export default class FilterFeature extends Base {

    getId() {
        return this.camelize(this.constructor.name);
    }

}
