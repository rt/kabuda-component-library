import KnownServerError from './known-server-error';
import NetworkError from './network-error';

describe('KnownServerError', () => {
    let error;

    describe('#constructor', () => {
        test('should inherit properly', () => {
            error = new KnownServerError();
            expect(error).toBeInstanceOf(NetworkError);
            expect(error).toBeInstanceOf(KnownServerError);
        });
    });
});
