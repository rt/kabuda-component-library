import { models } from 'kabuda-liquid';

export default class Reference extends models.Model {
    /**
     * @params {object} o
     */
    constructor(o) {
        super(o);

        /** @type {string} */
        this.currentPanel = this.currentPanel || null;
    }
}
