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
import { getComm as _getComm, setComm , getFetch as _getFetch, setFetch} from './utils/comm';

export const stores = {
    dataStore: dataStore,
    stateStore: stateStore,
};

export function setup(options) {
    const store = dataStore.setupStore(options.dataStore, options.uiData, options.lang, options.user, options.systemData);
    stateStore.setupStateStore(options.sessionStorage);

    setComm(options.comm);
    setFetch(options.fetch);

    return store;
}

export const getComm = _getComm;
export const getFetch = _getFetch;

export const models = {
    AppState: AppState,
    Log: Log,
    LookupTable: LookupTable,
    RouteDefinition: RouteDefinition,
    RouteHistoryManager: RouteHistoryManager,
    RouteHistory: RouteHistory,
    UiData: UiData,
    User: User
};

export const actions = {
    appState: appStateActions,
    routeSetup: routeSetupActions,
    users: usersActions
};

export const uiData = {
};
