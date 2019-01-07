import { stores, models, utils } from 'kabuda';
import RouteHistoryManager from '../models/route-history-manager';
import AppState from '../models/app-state';

const tables = {
    APP_STATE: 'appState',
    ROUTE_HISTORY_MANAGER: 'routeHistoryManager',
};

export const stateEvents = {
    APP_STATE_CHANGE: '1',
}

let instance = null;

export function getStateStore() {
    return instance;
}

export function setupStateStore(sessionStorage) {

    if (instance === null) {

        if (!sessionStorage) {
            sessionStorage = new utils.MemorySessionStorage();
        }

        instance = new StateStore({
            schema: {
                appState: AppState,
                routeHistoryManager: RouteHistoryManager,
            },
            sessionStorageKey: 'stateStore',
            sessionStorage: sessionStorage,
        });
    }
    return instance;
}

export class StateStore extends stores.SessionStorageStore {

    constructor(options) {
        super(options);
    }
    
    /**
     * @return {AppState} 
     */
    getAppState() {
        let state = this.getFirstObject(tables.APP_STATE);
        if (!state) {
            state = this.create(tables.APP_STATE, new AppState({}));
        }
        return state;
    }
    
    /**
     * @param {AppState} state
     */
    setAppState(state) {
        this.update(tables.APP_STATE, state);
        this.fire(stateEvents.APP_STATE_CHANGE, state);
    }

    //----- ROUTE HISTORY

    /**
     * @return {RouteHistoryManager}
     */
    getRouteHistoryManager() {
        let manager = this.getFirstObject(tables.ROUTE_HISTORY_MANAGER);
        if (!manager) {
            manager = this.create(tables.ROUTE_HISTORY_MANAGER, new RouteHistoryManager({}));
        }
        return manager;
    }
    
    /**
     * @param {RouteHistoryManager} manager
     */
    updateRouteHistoryManager(manager) {
        this.update(tables.ROUTE_HISTORY_MANAGER, manager);
    }

}

