import User from '../../../models/user';

const TABLE_NAME = 'user';

export const events = {
    CHANGE: 'userChange',
};

export default {
    name: TABLE_NAME,
    model: User,
    methods: {
        /**
         * @return {User | null}
         */
        getUser() {
            return this.getFirstObject(TABLE_NAME);
        },

        /**
         * @param {User} user
         */
        createUser(user) {
            this.clearCollection(TABLE_NAME);
            user = this.create(TABLE_NAME, user);
            this.fire(events.CHANGE, user);
        }
    }
}
