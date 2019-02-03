import moment from 'moment';

export default class DateFormatter {
    /**
     * @param {Date|number} date
     * @param {boolean} showDay
     */
    static formatDate(date, showDay) {
        let dateFormat = 'MM/DD/YY';

        if (showDay) {
            dateFormat = `ddd, ${dateFormat}`;
        }

        return moment(date).utc().format(dateFormat);
    }

    /**
     * @param {Date} date
     * @param {Object} options
     * @param {boolean} options.showDay
     * @param {boolean} options.addFormattingMarkup
     */
    static formatTime(date, options) {
        const timeFormat = 'h:mm:ss a';

        const formattedDate = moment(date).format(timeFormat);

        return formattedDate;
    }
}
