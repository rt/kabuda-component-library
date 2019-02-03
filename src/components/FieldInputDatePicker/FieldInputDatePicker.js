import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FieldInputDatePicker.css';
import cx from 'classnames';
import Label from '../Label';
import InputDatePicker from '../InputDatePicker';
// import FieldBase from '../FieldBase';
import Base from '../Base';

export class FieldInputDatePicker extends Base {
    constructor(props) {
        super(props);
    }

    getValidations = () => this.props.field.errors.map((error, index) => <div key={index} data-e2e="validationMessage">{this.uiData.validation[error]}</div>)

    getIsRequired = () => (this.props.field.isRequired ? '*' : null)

    // provide a similar interface for form
    handleChange = (val) => {
        this.props.onChange(this.props.field.key, val);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Label>{this.props.field.fieldName} {this.getIsRequired()}</Label>
                <InputDatePicker
                    appState={this.props.appState}
                    status={this.props.field.status}
                    placeholder="MM/DD/YYYY"
                    selectedDay={this.props.field.value}
                    onDayClick={this.handleChange}
                />
                {this.getValidations()}
            </div>
        );
    }
}

FieldInputDatePicker.propTypes = {
};

export default withStyles(s)(FieldInputDatePicker);
