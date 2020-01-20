import { stores, utils } from 'kabuda-liquid';
import filterState from './tables/filter-state';
import formExState from './tables/form-ex-state';
import formItemState from './tables/form-item-state';

let instance = null;

export function getStore() {
    return instance;
}

export function setupStore(sessionStorage) {
    if (instance === null) {
        if (!sessionStorage) {
            sessionStorage = new utils.MemorySessionStorage();
        }

        instance = new StateStore({
            schema: {},
            sessionStorageKey: 'referenceStateStore',
            sessionStorage,
        });
        instance.addTable(filterState);
        instance.addTable(formExState);
        instance.addTable(formItemState);
    }
    return instance;
}

export class StateStore extends stores.SessionStorageStore {
    constructor(options) {
        super(options);
    }
}

