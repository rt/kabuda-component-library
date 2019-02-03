import { models } from 'kabuda-liquid';

export default class RouteHistory extends models.Model {
    /**
     * @params {object} o
     */
    constructor(o) {
        super(o);

        /** @type {string} */
        this.path = this.path || null;

        /** @type {Date} */
        this.timestamp = this.timestamp || new Date();
    }
}
