import { models } from 'kabuda-liquid';
import Info from './info';

export default class Item extends models.Model {
    constructor(o) {
        super(o);
        o = o || {};

        if (!o.itemName || !o.category) {
            throw new Error('Must have a name and cateogry');
        }

        /** @type {string} */
        this.itemName = o.itemName;
        /** @type {string} */
        this.category = o.category;

        /** @type {Info} */
        this.deserializeProperty(o, 'info', Info, true);
    }
}
