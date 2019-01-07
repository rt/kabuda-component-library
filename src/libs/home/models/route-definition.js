import { models } from 'kabuda';

/**
 * RouteDefinition is the main route meta data currently defined in uiData
 * but also used for recently viewed routes.
 */
export default class RouteDefinition extends models.Model {

    /**
     * @params {object} o
     */
    constructor(o) {
        super(o);

        /**@type {string}*/
        this.text = this.text || null;

        /**@type {string}*/
        this.route = this.route || null;
        
        /**@type {string}*/
        this.category = this.category || null;

        /**@type {string}*/
        this.icon = this.icon || null;

        /**@type {Date}*/
        this.timestamp = this.timestamp || new Date();
    }

}
