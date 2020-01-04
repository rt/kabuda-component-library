// import {init} from '../index';
import SkeletonError from './skeleton-error';
import NetworkError from './network-error';

describe('NetworkError', () => {
    let error;

    describe('#constructor', () => {
        test('should inherit properly', () => {
            error = new NetworkError({}, {});
            expect(error).toBeInstanceOf(SkeletonError);
        });
    });

    describe('#setRequest', () => {
        test('should set request when string', () => {
            error = new NetworkError();
            error.setRequest('{"a":1, "b":2}');
            expect(error.request).toEqual({ a: 1, b: 2 });
        });

        test('should set request NOT JSON REQUEST when string is not a json', () => {
            error = new NetworkError();
            error.setRequest('blah');
            expect(error.request).toBe('NOT JSON REQUEST');
        });

        test('should set request when object', () => {
            error = new NetworkError();
            error.setRequest({ a: 1, b: 2 });
            expect(error.request).toEqual({ a: 1, b: 2 });
        });

        test('should hide creditCard info', () => {
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
            expect(error.request).toEqual({
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

        test('should pass falsy creditCard info', () => {
            error = new NetworkError();
            error.setRequest({
                creditCard: {
                    number: '',
                    securityCode: null,
                    expirationDate: undefined,
                    type: undefined,
                },
            });
            expect(error.request).toEqual({
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
        test.skip('should default error message on bogus response', () => {
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
                expect(error.message).toBe('default message');
            }
        });

        // check with rhys on his change > 146589
        test.skip('should have server error as message property', () => {
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
            expect(error.message).toBe('some server error');
        });
    });
});
