import FormItem from '../../../models/form-item';

const TABLE_NAME = 'formItemState';

export const events = {
    CHANGE: 'formItemStateChange',
};

export default {
    name: TABLE_NAME,
    model: FormItem,
    methods: {

        /**
         * used by table to get any definition
         * @return {FormItem}
         */
        getFirstFormItem() {
            return this.getFirstObject(TABLE_NAME);
        },

        /**
         * @return {Model | null}
         */
        getFormByKey(key) {
            return this.find(TABLE_NAME, item => item.itemKey === key)[0] || null;
        },

        /**
         * @param {FormItem} state
         * @return {FormItem}
         */
        createFormItem(form) {
            return this.create(TABLE_NAME, form);
        },

        /**
         * @param {FormItem} form
         */
        updateFormItem(form) {
            this.update(TABLE_NAME, form);
            this.fire(events.CHANGE, form);
        },

        /**
         * @param {FormItem} form
         */
        removeFormItem(form) {
            this.update(TABLE_NAME, form);
            this.fire(events.CHANGE, form);
        },
    }
}
