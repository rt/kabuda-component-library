import { stores, models } from 'kabuda-liquid';
import UiData from '../models/ui-data';
import User from '../models/user';

const tables = {
    USER: 'user',
    UI_DATA: 'uiData',
    SYSTEM_DATA: 'systemData',
};

let instance = null;
export function getStore() {
    if (instance === null) {

        instance = new DataStore({
            schema: {
                user: User,
                uiData: UiData,
                systemData: models.Model
            }
        });
    }
    return instance;
}

export function setupStore(serverStore, uiData, lang, user, systemData) {

    const store = getStore();
    store.reinitialize();

    if (serverStore) {
        store.deserialize(serverStore);
    }

    if (uiData) {
        store.createUiData(uiData, lang);
    }

    if (user) {
        store.createUser(user.toClient());
    }

    if (systemData) {
        store.createSystemData(new models.Model(systemData));
    }
    return store;
}

export class DataStore extends stores.ClassStore {

    constructor(options) {
        super(options);
        this.deserialize({});
    }

    /**
     * @return {User | null} 
     */
    getUser() {
        return this.getFirstObject(tables.USER);
    }
    
    /**
     * @param {User} user
     */
    createUser(user) {
        this.clearCollection(tables.USER);
        user = this.create(tables.USER, user);
        this.fire(events.USER_CHANGE, user);
    }
    
    getItems() {
        return this.all(tables.ITEM);
    }

    setItems(items) {
        this.setCollection(tables.ITEM, items.map((obj) => {
            return new models.Model(obj);
        }));
        this.fire(events.ITEM_CHANGE);
    }

    createItem(item) {
        this.create(tables.ITEM, item);
        this.fire(events.ITEM_CHANGE);
    }

    createSystemData(systemData) {
        this.create(tables.SYSTEM_DATA, systemData); 
    }

    getSystemData() {
        return this.getFirstObject(tables.SYSTEM_DATA);
    }

    /**
     * Create all ui data
     * @param {object} uiData
     * @param {string} lang
     */
    createUiData(uiData, lang) {
        for (let app in uiData.apps) {
            let data = uiData.apps[app][lang];
            if (data) {
                data.app = app;
                this.create(tables.UI_DATA, new UiData(data)); 
            }
        }
    }

    /**
     * Set the current app (for PF apps only)
     * @param {string} currentApp
     */
    setCurrentUiData(currentApp) {
        let list = this.all(tables.UI_DATA);

        const current = list.find(data => {
            return data.isCurrentApp === true;
        });

        if (current) {
            if (current.app === currentApp) {
                //if its already the current app
                return;
            }

            delete current.isCurrentApp;
            this.update(tables.UI_DATA, current);
        }

        const newCurrent = list.find(data => {
            return data.app === currentApp;
        });
        newCurrent.isCurrentApp = true;
        this.update(tables.UI_DATA, newCurrent);
    }

    /**
     * Get current app ui data
     * @return {UiData}
     */
    getUiData() {
        return this.find(tables.UI_DATA, data => {
            return data.isCurrentApp === true;
        })[0];
    }

    /**
     * Home/Top might access all apps
     * @param {string} name
     * @return {UiData}
     */
    getUiDataByAppName(name) {
        return this.find(tables.UI_DATA, data => {
            return data.app === name;
        })[0];
    }
}

export const events = {
    USER_CHANGE: '1', //users are change when page loads
}
