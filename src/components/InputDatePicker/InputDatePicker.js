import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputDatePicker.css';
import cx from 'classnames';
import Base from '../Base';
import InputText from '../InputText';
import DatePicker from '../DatePicker';
import { actions as homeActions } from '../../libs/home';
import dateFormatter from '../../utils/dateFormatter';

class InputDatePicker extends Base {
    constructor(props) {
        super(props);

        this.overlayKey = null;

        this.state = {
            searchContentTimestamp: 0,
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.getDropdown = this.getDropdown.bind(this);

        this.handleDayClick = this.handleDayClick.bind(this);
    }

    componentWillMount() {
        homeActions.appState.getOverlayId().then((id) => {
            this.overlayKey = id;
        });
    }

    handleDayClick(day, selected) {
        // if allowing unselection
        day = selected ? undefined : day;
        this.props.onDayClick(day);
    }

    handleFocus(name, value) {
        const state = this.state;

        homeActions.appState.setOverlayId(this.overlayKey, true);

        this.setState(state);
    }

    getDropdown() {
        if (this.overlayKey && this.props.appState.overlays[this.overlayKey]) {
            return (
                <div className={cx(s.dropdownContent, s.container)}>
                    <DatePicker
                        onDayClick={this.handleDayClick}
                        selectedDay={this.props.selectedDay}
                    />
                </div>
            );
        }
        return (<div />);
    }
    render() {
        return (
            <div data-e2e={this.e2e()}>
                <InputText
                    name="datePicker"
                    onFocus={this.handleFocus}
                    value={dateFormatter.formatDate(this.props.selectedDay)}
                />
                {this.getDropdown()}
            </div>
        );
    }
}

InputDatePicker.propTypes = {
    onDayClick: PropTypes.func,
};

export default withStyles(s)(InputDatePicker);
