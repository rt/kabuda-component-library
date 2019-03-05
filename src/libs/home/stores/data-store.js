import { stores, models } from 'kabuda-liquid';
import UiData from '../models/ui-data';

const tables = {
    UI_DATA: 'uiData',
    SYSTEM_DATA: 'systemData',
};

export const events = {
};

let instance = null;
export function getStore() {
    if (instance === null) {
        instance = new DataStore({
            schema: {
                uiData: UiData,
                systemData: models.Model,
            },
        });
    }
    return instance;
}

export function setupStore(serverStore, uiData, lang, systemData) {
    const store = getStore();
    store.reinitialize();

    if (serverStore) {
        store.deserialize(serverStore);
    }

    if (uiData) {
        store.createUiData(uiData, lang);
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
        for (const app in uiData.apps) {
            const data = uiData.apps[app][lang];
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
        const list = this.all(tables.UI_DATA);

        const current = list.find(data => data.isCurrentApp === true);

        if (current) {
            if (current.app === currentApp) {
                // if its already the current app
                return;
            }

            delete current.isCurrentApp;
            this.update(tables.UI_DATA, current);
        }

        const newCurrent = list.find(data => data.app === currentApp);
        newCurrent.isCurrentApp = true;
        this.update(tables.UI_DATA, newCurrent);
    }

    /**
     * Get current app ui data
     * @return {UiData}
     */
    getUiData() {
        return this.find(tables.UI_DATA, data => data.isCurrentApp === true)[0];
    }

    /**
     * Home/Top might access all apps
     * @param {string} name
     * @return {UiData}
     */
    getUiDataByAppName(name) {
        return this.find(tables.UI_DATA, data => data.app === name)[0];
    }
}

