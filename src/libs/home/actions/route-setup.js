import { getComm, getFetch } from '../utils/comm';
import { getStore } from '../stores/data-store';
import { getStateStore } from '../stores/state-store';
import User from '../models/user';
import RouteDefinition from '../models/route-definition';

//setup routes execute on both the server and client
//try to think about SEO
//data is rendered but no state

export function init() {
    return new Promise((resolve, reject) => {
        getFetch()('/init', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then(res => {
            res.json().then((res) => {
                getStore().createUser(new User(res.data.user));
                resolve();
            }).catch(e => {
                resolve();
            });
        });
    });
}


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
            route: route
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
