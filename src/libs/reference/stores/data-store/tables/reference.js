import Reference from '../../../models/reference';

const TABLE_NAME = 'reference';

export const events = {
    CHANGE: 'referenceChange',
};

export default {
    name: TABLE_NAME,
    model: Reference,
    methods: {
        /**
         * @return {Reference}
         */
        getReference() {
            let o = this.getFirstObject(TABLE_NAME);
            if (!o) {
                o = this.create(TABLE_NAME, new Reference());
            }
            return o;
        },

        /**
         * @param {Reference}
         */
        setReference(reference) {
            this.update(TABLE_NAME, reference);
            this.fire(events.CHANGE);
        }
    }
}
