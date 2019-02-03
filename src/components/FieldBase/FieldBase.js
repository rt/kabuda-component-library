import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FieldBase.css';
import cx from 'classnames';
import Base from '../Base';
import { models } from 'kabuda-liquid';

// for some reason i couldnt get this to work ...
export class FieldBase extends Base {
    constructor(props) {
        super(props);
    }

    getValidations = () => this.props.field.errors.map((error, index) => <div key={index} data-e2e="validationMessage">{this.uiData.validation[error]}</div>)

    getIsRequired = () => (this.props.field.isRequired ? '*' : null)

    // provide a similar interface for form
    handleChange = (val) => {
        this.props.onChange(this.props.field.key, val);
    }
}

FieldBase.propTypes = {
    field: PropTypes.instanceOf(models.FormField).isRequired,
};

export default withStyles(s)(FieldBase);
