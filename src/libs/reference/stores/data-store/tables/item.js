import { models } from 'kabuda-liquid';
import Item from '../../../models/item';

const TABLE_NAME = 'item';

export const events = {
    CHANGE: 'itemChange',
};

export default {
    name: TABLE_NAME,
    model: models.Model, //Item?  
    methods: {

        getItems() {
            return this.all(TABLE_NAME);
        },

        setItems(items) {
            this.setCollection(TABLE_NAME, items.map(obj => new models.Model(obj)));
            this.fire(events.CHANGE);
        },

        createItem(item) {
            this.create(TABLE_NAME, item);
            this.fire(events.CHANGE);
        },

        /**
         * @param {string} id
         * @return {models.Model | null}
         */
        getItemByKey(id) {
            return this.find(TABLE_NAME, item => item.id === id)[0] || null;
        },

        updateItem(item) {
            this.update(TABLE_NAME, item);
            this.fire(events.CHANGE);
        },

        removeItem(item) {
            this.remove(TABLE_NAME, item);
            this.fire(events.CHANGE);
        }
    }
}
