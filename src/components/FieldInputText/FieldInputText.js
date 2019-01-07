import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FieldInputText.css';
import cx from 'classnames';
import Label from '../Label';
//import FieldBase from '../FieldBase';
import Base from '../Base';
import InputText from '../InputText';
import { models } from 'kabuda';

export class FieldInputText extends Base {

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
                    {!this.props.hideLabel && <Label>{this.props.field.fieldName} {this.getIsRequired()} </Label>}
                    <InputText 
                        name={this.props.field.key}
                        status={this.props.field.status}
                        onChange={this.props.onChange}
                        onBlur={this.props.onBlur}
                        value={this.props.field.value}
                        placeholder={this.props.hideLabel && this.props.field.fieldName}
                    /> 
                </div>
                {this.getValidations()}
            </div>
        );
    }
};

FieldInputText.propTypes = {
    field: PropTypes.instanceOf(models.FormField).isRequired,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};


export default withStyles(s)(FieldInputText);
