import { models } from 'kabuda';
import RouteHistory from './route-history';
import RouteDefinition from './route-definition';

export default class RouteHistoryManager extends models.Model {

    /**
     * @params {object} o
     */
    constructor(o) {
        super(o);
        
        this.deserializeArray(o, 'historyRoutes', RouteHistory);
        this.deserializeArray(o, 'recentlyViewedRoutes', RouteDefinition);
    }
    
    getHistoryRoute(to) {
        //adjust by evaluating local route history
        for (let i = this.historyRoutes.length - 1; i >= 0; i--) {
            let routeHistory = this.historyRoutes[i];
            if (routeHistory.path === to || routeHistory.path.startsWith(to + '/')) {
                to = routeHistory.path;
                break;
            }
        }

        return to;
    }

    /**
     * @param {RouteHistory} route
     */
    addRoute(route) {
        this.historyRoutes.push(route);
    }

    /**
     * @param {RouteDefinition} routeDefinition
     */
    addRecentlyViewedRoute(routeDefinition) {
        this.recentlyViewedRoutes.push(routeDefinition);
    }

    /**
     * @param {string} path
     * @param {Array<RouteDefinition>} routeDefinitions : uiData
     * @return {Array<RouteDefinition>}
     */
    getBreadCrumbRoutes(path, routeDefinitions) {
        const routes = [];
        const parts = path.split('/');
        let subPath = '';
        for (const part of parts) {
            subPath += part + '/';
            const subPathShort = subPath.substring(0, subPath.lastIndexOf('/'));
            let route;
            route = routeDefinitions.find(routeDefinition => {
                //seach in main definitions
                return routeDefinition.route === subPathShort;
            });
            if (!route) {
                //search recently viewed (items)
                route = this.recentlyViewedRoutes.find(routeDefinition => {
                    return routeDefinition.route === subPathShort;
                });
            }
            
            if (route) {
                routes.push(route);
            }
        }
        return routes;
    }

    /**
     * Possible enhancements:
     * - handle regluar defined routes (would need to compare historyRoutes to uiData
     * - handle nested!  /path/to/item1/list/childItem1 (need to pass? > /path/to/asterisk/list)
     *
     * @param {Array<string>} paths : any direct child route of these paths (nested?)
     * @return {Array<RouteDefinition>}
    */
    getRecentlyViewedRoutes(paths) {
        return this.recentlyViewedRoutes.reduce((list, routeDefinition) => {
            const route = routeDefinition.route;
            let basePath = route.substring(0, route.lastIndexOf('/'));
            if (basePath === '') {
                basePath = '/';
            }
            for (const path of paths) {
                //no duplicates
                if (basePath === path && !list.some(item => {
                    return item.route === route;
                })) {
                    list.push(routeDefinition);
                }
            }
            return list;
        }, []);
    }
}

