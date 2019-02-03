import accounting from 'accounting';

class NumberFormatter {
    static isInt(n) {
        if (n === '' || n === null) {
            return false;
        }

        return n % 1 === 0;
    }

    static scrubFormatting(value) {
        return accounting.unformat(value);
    }

    /**
    */
    static formatCurrency(amount, addHtmlFormatting, useCurrencyCode) {
        // this would need to be in config (per app)
        const currencyFormat = {
            currencyCode: 'USD',
            currencySymbol: '$',
            decimalPlaces: 2,
            decimalsSeparator: '.',
            local: null,
            prefix: '$',
            prefixCurrencySymbol: true,
            suffix: '',
            thousandsSeparator: ',',
        };

        return accounting.formatMoney(amount, {
            symbol: useCurrencyCode ? currencyFormat.currencyCode : currencyFormat.currencySymbol,
            precision: currencyFormat.decimalPlaces,
            thousand: currencyFormat.thousandsSeparator,
            decimal: currencyFormat.decimalsSeparator,
            format: {
                pos: currencyFormat.prefixCurrencySymbol ? '%s' + '%v' : '%v' + '%s',
                neg: currencyFormat.prefixCurrencySymbol ? '%s' + '-%v' : '-%v' + '%s',
                zero: currencyFormat.prefixCurrencySymbol ? '%s' + '%v' : '%v' + '%s',
            },
        });
    }

    /**
    */
    static formatNumber(amount) {
        // this would need to be in config (per app)
        const numberFormat = {
            currencyCode: 'USD',
            currencySymbol: '$',
            decimalPlaces: 2,
            decimalsSeparator: '.',
            local: null,
            prefix: '$',
            prefixCurrencySymbol: true,
            suffix: '',
            thousandsSeparator: ',',
        };

        return accounting.formatNumber(amount, {
            precision: 0,
            thousand: numberFormat.thousandsSeparator,
        });
    }
}


export default NumberFormatter;
