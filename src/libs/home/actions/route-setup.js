import { getStore } from '../stores/data-store';
import { getStateStore } from '../stores/state-store';
import RouteDefinition from '../models/route-definition';


/**
 * @param {string} route
 * @param {string} name
 */
export function addRecentlyViewedRoute(route, name) {
    return new Promise((resolve, reject) => {
        const stateStore = getStateStore();
        const store = getStore();
        const uiData = store.getUiData();
        const manager = stateStore.getRouteHistoryManager();
        manager.addRecentlyViewedRoute(new RouteDefinition({
            text: name,
            route,
        }));
        stateStore.updateRouteHistoryManager(manager);
        resolve();
    });
}

/**
 * @param {RouteHistory} route
 */
export function addHistoryRoute(route) {
    return new Promise((resolve, reject) => {
        const stateStore = getStateStore();
        const manager = stateStore.getRouteHistoryManager();
        manager.historyRoutes.push(route);
        stateStore.updateRouteHistoryManager(manager);
    });
}
