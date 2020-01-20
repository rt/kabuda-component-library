import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DatePickers.css';
import cx from 'classnames';
import Base from '../../../components/Base';
import DatePicker from '../../../components/DatePicker';
import DatePickerRange from '../../../components/DatePickerRange';
import DatePickerYearView from '../../../components/DatePickerYearView';
import InputDatePicker from '../../../components/InputDatePicker';
import Tabs from '../../../components/Tabs';
import Label from '../../../components/Label';
import dateFormatter from '../../../utils/dateFormatter';

export class DatePickers extends Base {
    constructor(props) {
        super(props);

        this.state = {
            selectedDay: new Date(),
            currentTab: 'various',
        };

        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick(key) {
        const state = this.state;
        state.currentTab = key;
        this.setState(state);
    }

    handleDayClick(day) {
        const state = this.state;
        state.selectedDay = day;
        this.setState(state);
    }

    getView() {
        if (this.state.currentTab === 'various') {
            return (
                <div>
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            <div>
                                <Label data-e2e="dayLabel" htmlFor="like">
                                    DatePicker: {dateFormatter.formatDate(this.state.selectedDay)}
                                </Label>
                            </div>
                            <div>
                                <DatePicker
                                    selectedDay={this.state.selectedDay}
                                    onDayClick={this.handleDayClick}
                                />
                            </div>
                        </div>
                        <div className={cx(s.column)}>
                            <div>
                                <Label data-e2e="dayLabel" htmlFor="like">
                                    InputDatePicker: {dateFormatter.formatDate(this.state.selectedDay)}
                                </Label>
                            </div>
                            <div>
                                <InputDatePicker
                                    appState={this.props.appState}
                                    placeholder="MM/DD/YYYY"
                                    selectedDay={this.state.selectedDay}
                                    onDayClick={this.handleDayClick}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            <div>
                                <Label data-e2e="dayLabel" htmlFor="like">
                                    Range Selection
                                </Label>
                            </div>
                            <div>
                                <DatePickerRange
                                    selectedDay={this.state.selectedDay}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className={s.row}>
                <div className={cx(s.column)}>
                    <div>
                        <Label data-e2e="dayLabel" htmlFor="like">
                                    Year View: {dateFormatter.formatDate(this.state.selectedDay)}
                        </Label>
                    </div>
                    <div>
                        <DatePickerYearView
                            onDayClick={this.handleDayClick}
                            selectedDay={this.state.selectedDay}
                        />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <section>
                    <Tabs
                        array={[{ text: 'Various', key: 'various' }, { text: 'Year View', key: 'year' }]}
                        keyPath="key"
                        textPath="text"
                        currentSelection={this.state.currentTab}
                        onClick={this.handleTabClick}
                    />
                    {this.getView()}
                </section>
            </div>
        );
    }
}

export default withStyles(s)(DatePickers);
