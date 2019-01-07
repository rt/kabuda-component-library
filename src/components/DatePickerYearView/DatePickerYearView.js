import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './DatePickerYearView.css';
import cx from 'classnames';
import Base from '../Base';
import DayPicker from 'react-day-picker';

class DatePickerYearView extends Base {

    constructor(props) {
        super(props);

        this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(day, { selected }) {
        //if allowing unselection
        day = selected ? undefined : day;
        this.props.onDayClick(day, selected);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <DayPicker
                    onDayClick={this.handleDayClick}
                    selectedDays={[this.props.selectedDay]}
                    month={new Date(2017,0)}
                    numberOfMonths={12} 
                    canChangeMonth={false}
                    fixedWeeks 
                />
            </div>
        );
    }
};

DatePickerYearView.propTypes = {
    onDayClick: PropTypes.func
};

export default withStyles(s)(DatePickerYearView);
