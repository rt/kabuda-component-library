import { models } from 'kabuda-liquid';

export default class Info extends models.Model {
    constructor(o) {
        super(o);
        o = o || {};

        /** @type {number} */
        this.latitude = o.latitude;
        /** @type {number} */
        this.longitude = o.longitude;
        /** @type {number} */
        this.rating = o.rating || 0;
        /** @type {number} */
        this.price = o.price;
        /** @type {string} */
        this.imgUrl = o.imgUrl;
        /** @type {Array<string>} */
        this.features = o.features || [];
    }
}
