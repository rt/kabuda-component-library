import chai from 'chai';
import KnownServerError from './known-server-error';
import NetworkError from './network-error';

chai.expect();

const expect = chai.expect;

describe('KnownServerError', () => {

    let error;

    describe('#constructor', () => {

        it('should inherit properly', () => {
            error = new KnownServerError();
            expect(error).to.be.instanceof(NetworkError);
            expect(error).to.be.instanceof(KnownServerError);
        });
    });

});
