import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputCheckBox.css';
import cx from 'classnames';
import Base from '../Base';

export class InputCheckBox extends Base {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        // might be used in delegation
        if (this.props.onChange) {
            this.props.onChange(this.props.name, e.target.checked);
        }
    }

    render() {
        const {
            id, name, checked, ...rest
        } = this.props;

        return (
            <input
                className={s.input}
                id={id}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={this.handleChange}
                data-e2e={this.e2e()}
            />
        );
    }
}

InputCheckBox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};

export default withStyles(s)(InputCheckBox);
