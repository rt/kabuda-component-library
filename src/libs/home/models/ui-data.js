import { models } from 'kabuda';
import LookupTable from './lookup-table';
import RouteDefinition from './route-definition';

export default class UiData extends models.Model {

    constructor(o) {
        super(o);

        this.deserializeProperty(o, 'translations', models.Model);

        this.deserializeMap(o, 'lookupTables', Array, LookupTable);
        this.deserializeMap(o, 'forms', models.Form);
        this.deserializeArray(o, 'routes', RouteDefinition);
    }

    getRouteTitle(path) {
        const route = this.routes.find(route => {
            return route.route === path;
        });
        return route && route.text;
    }

}
