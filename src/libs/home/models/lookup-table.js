import { models } from 'kabuda';

export default class LookupTable extends models.Model {

    constructor(o) {
        super(o);

        this.key = o.key || '';
        this.name = o.name || '';
    }

    getName(table, key) {
        const rec = this[table].find((item) => {
            return item.key === key;
        });

        return rec ? rec.name : key;
    }

}
