import NumberFormatter from './numberFormatter';

describe('Number Formatter', () => {
    // describe('getCurrencyFormattedNumber', () => {
    // test('returns $5.50 when passed 5.5', () => {
    // expect(NumberFormatter.getCurrencyFormattedNumber(5.5)).toBe('$5.50');
    // });
    // });

    describe('isInt', () => {
        test('returns true when passed 0', () => {
            expect(NumberFormatter.isInt(0)).toBe(true);
        });

        test('returns false when passed an empty string', () => {
            expect(NumberFormatter.isInt('')).toBe(false);
        });

        test('returns true when passed int as a string', () => {
            expect(NumberFormatter.isInt('5')).toBe(true);
        });
    });

    describe('scrubFormatting', () => {
        test('strips commas and decimals', () => {
            expect(NumberFormatter.scrubFormatting('1,234.56')).toBe(1234.56);
        });
    });

    // describe('getFormattedNumber', () => {
    // test('returns 0 if passed 0', () => {
    // expect(NumberFormatter.getFormattedNumber(0)).toBe(0);
    // });

    // test('returns empty string if passed empty string', () => {
    // expect(NumberFormatter.getFormattedNumber('')).toBe('');
    // });
    // });
});
