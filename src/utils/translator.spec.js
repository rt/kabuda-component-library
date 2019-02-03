import chai from 'chai';
import { translate, pluralize } from './translator';

const expect = chai.expect;

describe('#translator', () => {
    let model;
    beforeEach(() => {
    });

    afterEach(() => {
    });

    describe('#translate', () => {
        it('should translate with no parameters', () => {
            expect(translate('hello')).to.eq('hello');
        });

        it('should translate with parameters', () => {
            const s = translate('hello #person1# and #person2#', {
                person1: 'remi',
                person2: 'mira',
            });
            expect(s).to.eq('hello remi and mira');
        });
    });

    describe('#pluralize', () => {
        // it('should throw if no number value', () => {
        // expect(pluralize(undefined, 'hello')).to.throw(Error);
        // });

        it('should get appropriate string', () => {
            const o = {
                zero: 'zero',
                one: 'one',
                twoOrMore: 'twoOrMore',
            };

            expect(pluralize(0, o)).to.eq('zero');
            expect(pluralize(1, o)).to.eq('one');
            expect(pluralize(2, o)).to.eq('twoOrMore');
            expect(pluralize(9, o)).to.eq('twoOrMore');
        });

        it('should pluralize with parameters', () => {
            const o = {
                zero: '#number# people for #name#',
                one: '#number# person here for #name#',
                twoOrMore: '#number# people here for #name#',
            };

            const params = {
                name: 'ryan',
            };

            expect(pluralize(0, o, params)).to.eq('0 people for ryan');
            expect(pluralize(1, o, params)).to.eq('1 person here for ryan');
            expect(pluralize(2, o, params)).to.eq('2 people here for ryan');
            expect(pluralize(9, o, params)).to.eq('9 people here for ryan');
        });
    });
});
