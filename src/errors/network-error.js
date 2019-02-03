import SkeletonError from './skeleton-error';

export default class NetworkError extends SkeletonError {
    /**
     * @constructor
     * @param {object} request
     * @param {object} response
     * @extends {SkeletonError}
     */
    constructor(request, response) {
        super();

        if (request) {
            this.setRequest(request);
        }

        if (response) {
            this.setResponse(response);
        }
    }

    /**
     * @param {object|string} request
     */
    setRequest(request) {
        // provide some info about what was there
        function hide(val) {
            if (val) {
                return `*** ${val.length} chars ***`;
            }
            return val; // '', null, undefined
        }

        // traverse entire req for creditCard (note: will need to keep this up-to-date with any sensitive data)
        function traverse(o) {
            for (const key in o) {
                // right now looking for payment.creditCard
                if (key === 'creditCard') {
                    const creditCard = o[key];
                    creditCard.number = hide(creditCard.number);
                    creditCard.securityCode = hide(creditCard.securityCode);
                    creditCard.expirationDate = hide(creditCard.expirationDate);
                    creditCard.type = hide(creditCard.type);
                }

                if (o[key] !== null && typeof o[key] === 'object') {
                    traverse(o[key]);
                }
            }
        }

        if (typeof request === 'string') {
            try {
                this.request = JSON.parse(request);
            } catch (e) {
                // wont pass string as it could have sensitive data in it
                this.request = 'NOT JSON REQUEST';
            }
        } else if (typeof request === 'object') {
            this.request = request;
        }

        if (typeof this.request === 'object') {
            traverse(this.request);
        }
    }

    /**
     * @param {object} response
     */
    setResponse(response) {
        try {
            this.response = response;
            this.message = this.response.meta.error.message;
        } catch (err) {
            // this.message = new Settings().defaultError;
        }
    }
}
