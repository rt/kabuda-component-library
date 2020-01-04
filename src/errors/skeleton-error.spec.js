import SkeletonError from './skeleton-error';

describe('SkeletonError', () => {
    let error;

    describe('#constructor', () => {
        test('should inherit properly', () => {
            error = new SkeletonError();
            expect(error).toBeInstanceOf(SkeletonError);
        });
    });
});
