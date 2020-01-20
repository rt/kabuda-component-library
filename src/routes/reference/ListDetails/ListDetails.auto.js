import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';
import NavList from '../../../component-library/src/components/NavList/NavList.auto';
import ItemDetailsFlow from '../ItemDetailsFlow/ItemDetailsFlow.auto';

export default class ListDetails extends RouteBase {
    getPath() {
        return '/reference/listDetails';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    async getNav() {
        const nav = new NavList(this.driver, this.selector);
        await nav.rootLoaded();
        return nav;
    }

    async getItemDetailsFlow() {
        const itemDetailsFlow = new ItemDetailsFlow(this.driver, this.selector);
        await itemDetailsFlow.rootLoaded();
        return itemDetailsFlow;
    }
}
