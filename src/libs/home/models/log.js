import { models } from 'kabuda';

export default class Log extends models.Model {

    constructor(o) {
        super(o);
    }

    toString() {
        return this.type + ': ' +  this.text;
    }

}
