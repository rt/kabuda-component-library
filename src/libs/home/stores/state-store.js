import { stores, models, utils } from 'kabuda-liquid';
import RouteHistoryManager from '../models/route-history-manager';
import AppState from '../models/app-state';

const tables = {
    APP_STATE: 'appState',
    ROUTE_HISTORY_MANAGER: 'routeHistoryManager',
    FORM: 'form',
};

export const stateEvents = {
    APP_STATE_CHANGE: '1',
    FORM_CHANGE: '4',
};

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
                form: models.Form,
            },
            sessionStorageKey: 'stateStore',
            sessionStorage,
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

    // ----- ROUTE HISTORY

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
    
    // ----- FORM

    /**
     * @param {string} key
     * @return {Model | null}
     */
    getFormByKey(key) {
        return this.find(tables.FORM, item => item.itemKey === key)[0] || null;
    }

    /**
     * @param {models.Form} form
     * @return {models.Form}
     */
    createForm(form) {
        return this.create(tables.FORM, form);
    }

    /**
     * @param {FormItem} form
     */
    updateForm(form) {
        this.update(tables.FORM, form);
        this.fire(events.FORM_CHANGE, form);
    }

    /**
     * @param {FormItem} form
     */
    removeForm(form) {
        this.remove(tables.FORM, form);
        this.fire(events.FORM_CHANGE, form);
    }


}

