import chai from 'chai';
// import {init} from '../index';
import SkeletonError from './skeleton-error';
import NetworkError from './network-error';

chai.expect();

const expect = chai.expect;

describe('NetworkError', () => {
    let error;

    describe('#constructor', () => {
        it('should inherit properly', () => {
            error = new NetworkError({}, {});
            expect(error).to.be.instanceof(SkeletonError);
        });
    });

    describe('#setRequest', () => {
        it('should set request when string', () => {
            error = new NetworkError();
            error.setRequest('{"a":1, "b":2}');
            expect(error.request).to.deep.equal({ a: 1, b: 2 });
        });

        it('should set request NOT JSON REQUEST when string is not a json', () => {
            error = new NetworkError();
            error.setRequest('blah');
            expect(error.request).to.equal('NOT JSON REQUEST');
        });

        it('should set request when object', () => {
            error = new NetworkError();
            error.setRequest({ a: 1, b: 2 });
            expect(error.request).to.deep.equal({ a: 1, b: 2 });
        });

        it('should hide creditCard info', () => {
            error = new NetworkError();
            error.setRequest({
                payment: {
                    creditCard: {
                        number: '1234',
                        securityCode: '555',
                        expirationDate: '12/16',
                        type: 'VISA',
                    },
                },
            });
            expect(error.request).to.deep.equal({
                payment: {
                    creditCard: {
                        number: '*** 4 chars ***',
                        securityCode: '*** 3 chars ***',
                        expirationDate: '*** 5 chars ***',
                        type: '*** 4 chars ***',
                    },
                },
            });
        });

        it('should pass falsy creditCard info', () => {
            error = new NetworkError();
            error.setRequest({
                creditCard: {
                    number: '',
                    securityCode: null,
                    expirationDate: undefined,
                    type: undefined,
                },
            });
            expect(error.request).to.deep.equal({
                creditCard: {
                    number: '',
                    securityCode: null,
                    expirationDate: undefined,
                    type: undefined,
                },
            });
        });
    });

    describe('#setResponse', () => {
        it.skip('should default error message on bogus response', () => {
            init({
                defaultErrorMessage: 'default message',
            });
            error = new NetworkError();
            const bogusResponses = [{}, undefined, 'blah', { meta: {} }];
            for (let i = 0; i < bogusResponses.length - 1; i++) {
                const response = bogusResponses[i];
                error.setResponse({
                    responseText: JSON.stringify(response),
                });
                expect(error.message).to.be.equal('default message');
            }
        });

        // check with rhys on his change > 146589
        it.skip('should have server error as message property', () => {
            error = new NetworkError();
            const response = {
                meta: {
                    error: {
                        message: 'some server error',
                    },
                },
            };
            error.setResponse({
                responseText: JSON.stringify(response),
            });
            expect(error.message).to.be.equal('some server error');
        });
    });
});
