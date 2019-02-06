import { models } from 'kabuda-liquid';
import { getStateStore } from '../stores/state-store';

/**
 * @param {string} formKey
 * @param {string} fieldKey
 * @param {string|number} value
 */
export function updateFormValue(formKey, fieldKey, value) {
    return new Promise((resolve) => {
        const store = getStore();
        const form = store.getFormByKey(formKey);

        const field = form.getField(fieldKey);
        if (field.arrayFormId) {
            // array
            field.forms = value;
        } else {
            form.changeValue(fieldKey, value);
        }
        store.updateForm(form);
        resolve();
    });
}

/**
 * Initialize to form data to item data (ie. when transaction starts or canceled)
 * Assumes the form already exists
 * @param {string} formKey
 */
export function initForm(formKey, item, uiData) {
    return new Promise((resolve) => {
        const store = getStore();
        const form = store.getFormByKey(formKey);
        form.fromData(item, uiData.forms);
        store.updateForm(form);
        resolve();
    });
}

/**
 * @param {string} formKey
 */
export function clearForm(formKey) {
    return new Promise((resolve) => {
        const stateStore = getStore();
        const form = stateStore.getFormByKey(formKey);
        form.clearData();
        stateStore.updateForm(form);
        resolve();
    });
}

