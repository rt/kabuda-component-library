import AppState from './models/app-state';
import Log from './models/log';
import LookupTable from './models/lookup-table';
import RouteDefinition from './models/route-definition';
import RouteHistoryManager from './models/route-history-manager';
import RouteHistory from './models/route-history';
import UiData from './models/ui-data';
import User from './models/user';
import * as appStateActions from './actions/app-state';
import * as routeSetupActions from './actions/route-setup';
import * as usersActions from './actions/usersActions';
import * as stateStore from './stores/state-store';
import * as dataStore from './stores/data-store';

export const stores = {
    dataStore,
    stateStore,
};

export function setup(options) {
    const store = dataStore.setupStore(options.dataStore, options.uiData, options.lang, options.user, options.systemData);
    stateStore.setupStateStore(options.sessionStorage);
    return store;
}

export const models = {
    AppState,
    Log,
    LookupTable,
    RouteDefinition,
    RouteHistoryManager,
    RouteHistory,
    UiData,
    User,
};

export const actions = {
    appState: appStateActions,
    routeSetup: routeSetupActions,
    users: usersActions,
};

export const uiData = {
};
