import { getStore } from '../stores/data-store/data-store';
import { getStore as getStateStore } from '../stores/state-store/state-store';
import Filter from '../models/filter';
import Item from '../models/item';
import FormItem from '../models/form-item';
import formItemForm from '../forms/form-item';

//TODO: get rid of this
import Ajax from '../../../utils/ajax';

export function getItems() {
    return new Promise((resolve) => {
        const store = getStore();
        const items = store.getItems();

        if (items.length === 0) {
            fetch('/reference/items', {
                method: 'get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                res.json().then((res) => {
                    const items = res.data.map(item => Object.assign({ route: `/reference/listDetails/${item.id}` }, item));
                    store.setItems(items);
                    resolve(store.getItems());
                });
            });
        } else {
            resolve(items);
        }
    });
}

export async function getCurrentItem(id) {
    const items = await getItems();
    return items.find(item => item.id.toString() === id.toString());
}

/**
 * Ensure a form instance for each item
 * @param (string) itemKey
 */
export async function ensureForm(itemKey) {
    const stateStore = getStateStore();
    let form = stateStore.getFormByKey(itemKey);
    if (!form) {
        form = new FormItem(formItemForm);
        form.itemKey = itemKey;
        if (itemKey !== 'create') {
            const currentItem = await getCurrentItem(itemKey);
            form.fromData(currentItem);
        }
        stateStore.createFormItem(form);
    }
}


/**
 * Initialize to form data to item data (ie. when transaction starts or canceled)
 * @param {string} itemKey
 */
export function initItemForm(itemKey) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const form = stateStore.getFormByKey(itemKey);

        const store = getStore();
        const item = store.getItemByKey(itemKey);

        form.fromData(item);
        stateStore.updateFormItem(form);
        resolve();
    });
}

export function clearItemForm(itemKey) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const form = stateStore.getFormByKey(itemKey);

        // const store = getStore();
        // let item = store.getItemByKey(itemKey);

        form.clearData();
        stateStore.updateFormItem(form);
        resolve();
    });
}

export function updateItemFormValue(itemKey, fieldKey, value) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const form = stateStore.getFormByKey(itemKey);
        form.changeValue(fieldKey, value);
        stateStore.updateFormItem(form);
        resolve();
    });
}

export function createItem(itemKey) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const form = stateStore.getFormByKey(itemKey);
        form.checkRequired();
        stateStore.updateFormItem(form);

        const item = form.getData();
        return Ajax.postJson('/reference/items', item).then((res) => {
            const item = res.data;
            const frontEndItem = Object.assign({ route: `/reference/listDetails/${item.id}` }, item);
            const store = getStore();
            store.createItem(new Item(frontEndItem));

            form.clearData();
            stateStore.updateFormItem(form);
            resolve(frontEndItem);
        });
    });
}

export function updateItem(itemKey) {
    const stateStore = getStateStore();
    const form = stateStore.getFormByKey(itemKey);
    form.checkRequired();
    stateStore.updateFormItem(form);
    const store = getStore();
    const item = store.getItemByKey(itemKey);
    const newItem = Object.assign(item, form.getData());
    return Ajax.put('/reference/items', itemKey, newItem).then((res) => {
        store.updateItem(Object.assign(newItem, res.data));
    });
}

export function deleteItem(itemKey) {
    const stateStore = getStateStore();
    const form = stateStore.getFormByKey(itemKey);
    stateStore.removeFormItem(form);
    return Ajax.delete('/reference/items', itemKey).then(() => {
        const store = getStore();
        const item = store.getItemByKey(itemKey);
        store.removeItem(item);
    });
}

export function apiSortItems(val, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.sortBy = val;
        filter.filter(items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiChangePage(key, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.changePage(key, items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiPrevPage(key, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        if (filter.isOnFirstPage()) {
            return;
        }
        filter.goToPrevPage(items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiNextPage(key, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        if (filter.isOnLastPage()) {
            return;
        }
        filter.goToNextPage(items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiChangeFeatureSelection(key, val, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.changeFeatureSelection(key, val, items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiChangeFeatureSelectionOR(key, val, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.changeFeatureSelectionOR(key, val, items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiChangeRating(val, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.filterStarRating.allAvailableStarRatings = val;
        filter.filter(items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiTextChange(val, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.filterText.text = val;
        filter.filter(items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

export function apiPriceChange(val, items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const filter = stateStore.getFilter();
        filter.filterPrice.priceRangeMaximum = val;
        filter.filter(items);
        stateStore.updateFilter(filter);
        resolve();
    });
}

function getNewFilter(items, uiData) {
    const filter = new Filter({
        sortBy: 'blah',
        itemsPerPage: 10,
        filterText: {},
        filterStarRating: {},
        filterPrice: {},
        filterFeature: {
            allFeatures: uiData.lookupTables.filterFeatureList,
        },
        filterFeatureOR: {
            allFeatures: uiData.lookupTables.filterFeatureList,
            type: 'OR',
        },
    });
    filter.init(items);
    return filter;
}

export function apiInitFilter(items, uiData) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        let filter = stateStore.getFilter();
        if (!filter) {
            filter = getNewFilter(items, uiData);
            stateStore.createFilter(filter);
        } else {
            filter.init(items);
            stateStore.updateFilter(filter);
        }
        resolve();
    });
}

export function apiResetFilter(items) {
    return new Promise((resolve) => {
        const stateStore = getStateStore();
        const oldFilter = stateStore.getFilter();
        const newFilter = getNewFilter(items);
        newFilter.setId(oldFilter.getId());
        stateStore.updateFilter(newFilter);
        resolve();
    });
}
