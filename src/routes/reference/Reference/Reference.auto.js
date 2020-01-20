import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';

export default class Reference extends RouteBase {
    getPath() {
        return '/reference';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    getTitle() {
        return this.getText('title');
    }
}
