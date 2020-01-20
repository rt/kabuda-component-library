import Item from './models/item';
import Info from './models/info';
import Filter from './models/filter';
import FormEx from './models/form-ex';
import FormItem from './models/form-item';
import Reference from './models/reference';
import * as itemActions from './actions/items';
import * as referenceActions from './actions/reference';
import * as stateStore from './stores/state-store/state-store';
import * as dataStore from './stores/data-store/data-store';
import { events as userEvents } from './stores/data-store/tables/user';
import { events as itemEvents } from './stores/data-store/tables/item';
import { events as referenceEvents } from './stores/data-store/tables/reference';
import { events as filterStateEvents } from './stores/state-store/tables/filter-state';
import { events as formExStateEvents } from './stores/state-store/tables/form-ex-state';
import { events as formItemStateEvents } from './stores/state-store/tables/form-item-state';
import formItemForm from './forms/form-item';
import formExForm from './forms/form-ex';

export const stores = {
    dataStore,
    stateStore,
};

export const events = {
    user: userEvents,
    item: itemEvents,
    reference: referenceEvents,
    filterState: filterStateEvents,
    formExState: formExStateEvents,
    formItemState: formItemStateEvents,
};

export function setup(_dataStore, sessionStorage) {
    dataStore.setupStore(_dataStore);
    stateStore.setupStore(sessionStorage);
}

export const models = {
    Item,
    Info,
    Filter,
    FormItem,
    FormEx,
    Reference,
};

export const actions = {
    items: itemActions,
    reference: referenceActions,
};

export const forms = {
    formItem: formItemForm,
    formEx: formExForm,
}
