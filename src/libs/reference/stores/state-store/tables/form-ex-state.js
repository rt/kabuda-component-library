import FormEx from '../../../models/form-ex';

const TABLE_NAME = 'formExState';

export const events = {
    CHANGE: 'formExStateChange',
};

export default {
    name: TABLE_NAME,
    model: FormEx,
    methods: {
        /**
         * @return {FormEx}
         */
        getFormEx() {
            return this.getFirstObject(TABLE_NAME);
        },

        /**
         * @param {FormEx} form
         * @return {FormEx}
         */
        createFormEx(form) {
            return this.create(TABLE_NAME, form);
        },

        /**
         * @param {FormEx} form
         */
        updateFormEx(form) {
            this.update(TABLE_NAME, form);
            this.fire(events.CHANGE, form);
        },

    }
}
