import { translate, pluralize } from './translator';

describe('#translator', () => {
    let model;
    beforeEach(() => {
    });

    afterEach(() => {
    });

    describe('#translate', () => {
        test('should translate with no parameters', () => {
            expect(translate('hello')).toEqual('hello');
        });

        test('should translate with parameters', () => {
            const s = translate('hello #person1# and #person2#', {
                person1: 'remi',
                person2: 'mira',
            });
            expect(s).toEqual('hello remi and mira');
        });
    });

    describe('#pluralize', () => {
        // test('should throw if no number value', () => {
        // expect(pluralize(undefined, 'hello')).toThrow(Error);
        // });

        test('should get appropriate string', () => {
            const o = {
                zero: 'zero',
                one: 'one',
                twoOrMore: 'twoOrMore',
            };

            expect(pluralize(0, o)).toEqual('zero');
            expect(pluralize(1, o)).toEqual('one');
            expect(pluralize(2, o)).toEqual('twoOrMore');
            expect(pluralize(9, o)).toEqual('twoOrMore');
        });

        test('should pluralize with parameters', () => {
            const o = {
                zero: '#number# people for #name#',
                one: '#number# person here for #name#',
                twoOrMore: '#number# people here for #name#',
            };

            const params = {
                name: 'ryan',
            };

            expect(pluralize(0, o, params)).toEqual('0 people for ryan');
            expect(pluralize(1, o, params)).toEqual('1 person here for ryan');
            expect(pluralize(2, o, params)).toEqual('2 people here for ryan');
            expect(pluralize(9, o, params)).toEqual('9 people here for ryan');
        });
    });
});
