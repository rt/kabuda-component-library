import NetworkError from './network-error';

export default class KnownServerError extends NetworkError {
    /**
     * @constructor
     * @param {object} request
     * @param {object} response
     * @extends {NetworkError}
     */
    constructor(request, response) {
        super(request, response);
    }
}
