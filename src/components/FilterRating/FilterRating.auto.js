import Base from '../Base.auto';

export default class FilterRating extends Base {

    getId() {
        return this.camelize(this.constructor.name);
    }

}
