import Filter from '../../../models/filter';

const TABLE_NAME = 'filterState';

export const events = {
    CHANGE: 'filterStateChange',
};

export default {
    name: TABLE_NAME,
    model: Filter,
    methods: {
        /**
         * @return {Filter}
         */
        getFilter() {
            return this.getFirstObject(TABLE_NAME);
        },

        /**
         * @param {Filter} form
         * @return {Filter}
         */
        createFilter(filter) {
            return this.create(TABLE_NAME, filter);
        },
        /**
         * @param {Filter} filter
         */
        updateFilter(filter) {
            this.update(TABLE_NAME, filter);
            this.fire(events.CHANGE, filter);
        },
    }
}
