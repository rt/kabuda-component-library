import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './DatePickerRange.css';
import cx from 'classnames';
import Base from '../Base';
import DayPicker from 'react-day-picker';

/**
 * The DatePickerRange should event up dateStart and dateEnd
 * The implementor will set the source
 */
class DatePickerRange extends Base {

    constructor(props) {
        super(props);

        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day, { selected }) {
        //if allowing unselection
        day = selected ? undefined : day;
        this.props.onDayClick(day);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <DayPicker
                    numberOfMonths={2}
                    //selectedDays={[new Date(), { new Date(), new Date() }]}
                    onDayClick={this.handleDayClick}
                    fixedWeeks
                />
            </div>
        );
    }
};

DatePickerRange.propTypes = {
    onDayClick: PropTypes.func
};

export default withStyles(s)(DatePickerRange);
