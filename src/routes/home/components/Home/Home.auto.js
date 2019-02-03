import RouteBase from '../../../RouteBase/RouteBase.auto';

export default class Home extends RouteBase {
    getPath() {
        return '/';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    getFeature1() {
        return this.getText('feature1');
    }
}
