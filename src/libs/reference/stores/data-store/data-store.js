import { stores, models } from 'kabuda-liquid';
import Reference from '../../models/reference';
import user from './tables/user';
import item from './tables/item';
import reference from './tables/reference';
// import uiData from './tables/ui-data';

let instance = null;
export function getStore() {
    if (instance === null) {
        instance = new DataStore({
            schema: { },
        });
        instance.addTable(user);
        instance.addTable(item);
        instance.addTable(reference);
        // instance.addTable(uiData);
    }
    return instance;
}

// export function setupStore(serverStore, uiData, lang, user, systemData) {
export function setupStore(serverStore) {
    const store = getStore();
    store.reinitialize();

    if (serverStore) {
        store.deserialize(serverStore);
    }

    // if (uiData) {
    // store.createUiData(uiData, lang);
    // }

    // if (user) {
    //     store.createUser(user.toClient());
    // }

    // if (systemData) {
    // store.createSystemData(new models.Model(systemData));
    // }
    return store;
}

export class DataStore extends stores.ClassStore {
    constructor(options) {
        super(options);
        this.deserialize({});
    }
}

