// import DateHelper from './dateFormatter';

describe('Date Formatter', () => {
    describe('formateDate', () => {
        test('returns mm/dd hh:mm:ss formatted time when passed a date', () => {
            // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
            // const date = new Date(99, 0, 24, 11, 33, 30, 0);

            // assert
            // expect(DateHelper.getFormattedDateTime(date)).toBe('1/24 11:33:30');
        });

        test('pads single digit minute and second values with leading zeros', () => {
            // arrange
            // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
            // const date = new Date(99, 0, 4, 11, 3, 2, 0);

            // assert
            // expect(DateHelper.getFormattedDateTime(date)).toBe('1/4 11:03:02');
        });
    });
    // describe('getFormattedDateTime', () => {
    // test('returns mm/dd hh:mm:ss formatted time when passed a date', () => {
    // // arrange
    // // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
    // const date = new Date(99, 0, 24, 11, 33, 30, 0);

    // // assert
    // expect(DateHelper.getFormattedDateTime(date)).toBe('1/24 11:33:30');
    // });

    // test('pads single digit minute and second values with leading zeros', () => {
    // // arrange
    // // The 7 numbers specify the year, month, day, hour, minute, second, and millisecond, in that order
    // const date = new Date(99, 0, 4, 11, 3, 2, 0);

    // // assert
    // expect(DateHelper.getFormattedDateTime(date)).toBe('1/4 11:03:02');
    // });
    // });
});
