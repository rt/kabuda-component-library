import chai from 'chai';
import SkeletonError from './skeleton-error';

chai.expect();

const expect = chai.expect;

describe('SkeletonError', () => {

    let error;

    describe('#constructor', () => {

        it('should inherit properly', () => {
            
            error = new SkeletonError();
            expect(error).to.be.instanceof(SkeletonError);
        });
    });

});
