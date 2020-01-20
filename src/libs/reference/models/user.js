import { models } from 'kabuda-liquid';

import crypto from 'crypto';

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
const genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
};
/*
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = function (password, salt) {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt,
        passwordHash: value,
    };
};

export default class User extends models.Model {
    constructor(o) {
        super(o);

        this.roles = this.roles || [];
        this.permissions = this.permissions || [];
        this.userId = typeof (this.userId) === 'number' ? this.userId : null;
        this.passwordHash = this.passwordHash || null;
        this.passwordSalt = this.passwordSalt || null;
    }

    /**
     * password is never set or persisted
     * @param {string} password
     */
    generatePasswordHash(password) {
        const salt = genRandomString(16); /** Gives us salt of length 16 */
        const passwordData = sha512(password, salt);
        this.passwordHash = passwordData.passwordHash;
        this.passwordSalt = passwordData.salt;
    }

    /**
     * @param {string} password
     * @return {boolean}
     */
    validatePassword(password) {
        const passwordData = sha512(password, this.passwordSalt);
        return this.passwordHash === passwordData.passwordHash;
    }

    /**
     * @return {boolean}
     */
    isAnnonymous() {
        return this.userId === null;
    }

    /**
     * @param {string} role
     * @return {boolean}
     */
    isInRole(role) {
        return this.roles.indexOf(role) !== -1;
    }

    /**
     * @param {string} permission
     * @return {boolean}
     */
    hasPermission(permission) {
        return this.permissions.indexOf(permission) !== -1;
    }

    /**
     * for adjustments when sending to client side
    */
    toClient() {
        this.passwordHash = null;
        this.passwordSalt = null;
        return this;
    }
}
