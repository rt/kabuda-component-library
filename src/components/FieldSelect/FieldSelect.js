import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FieldSelect.css';
import cx from 'classnames';
import Label from '../Label';
import InputSelect from '../InputSelect';
import Base from '../Base';

export class FieldSelect extends Base {
    constructor(props) {
        super(props);
    }

    getValidations = () => this.props.field.errors.map(error => <div>{this.uiData.validation[error]}</div>)

    getIsRequired = () => (this.props.field.isRequired ? '*' : null)

    // provide a similar interface for form
    handleChange = (val) => {
        this.props.onChange(this.props.field.key, val);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Label>{this.props.field.fieldName} {this.getIsRequired()}</Label>
                <InputSelect
                    options={this.props.field.options}
                    keyPath="key"
                    valuePath="value"
                    status={this.props.field.status}
                    selectedKey={this.props.field.value}
                    onChange={this.handleChange}
                />
                {this.getValidations()}
            </div>
        );
    }
}

FieldSelect.propTypes = {
};

export default withStyles(s)(FieldSelect);
