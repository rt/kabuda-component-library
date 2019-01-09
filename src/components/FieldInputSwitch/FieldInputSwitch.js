import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FieldInputSwitch.css';
import cx from 'classnames';
import Label from '../Label';
//import FieldBase from '../FieldBase';
import Base from '../Base';
import InputSwitch from '../InputSwitch';
import { models } from 'kabuda-liquid';

export class FieldInputSwitch extends Base {

    constructor(props) {
        super(props);
    }
    
    getValidations = () => {
        return this.props.field.errors.map((error, index) => {
            return <div key={index} data-e2e="validationMessage">{this.uiData.validation[error]}</div>;
        });
    }
    
    getIsRequired = () => {
        return this.props.field.isRequired ? '*' : null;
    }

    //provide a similar interface for form
    handleChange = (val) => {
        this.props.onChange(this.props.field.key, val);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.labelInputContainer}>
                    <Label>{this.props.field.fieldName} {this.getIsRequired()} </Label>
                    <InputSwitch 
                        type="round"
                        name={this.props.field.key}
                        status={this.props.field.status}
                        onClick={this.handleChange}
                        value={this.props.field.value}
                    /> 
                </div>
                {this.getValidations()}
            </div>
        );
    }
};

FieldInputSwitch.propTypes = {
    field: PropTypes.instanceOf(models.FormField).isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};


export default withStyles(s)(FieldInputSwitch);
