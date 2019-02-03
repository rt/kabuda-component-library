import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputNumber.css';
import cx from 'classnames';
import Base from '../Base';

export class InputNumber extends Base {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        // analytics
        this.props.onChange && this.props.onChange(this.props.name, parseInt(e.target.value, 10));
        if (e.stopPropagation) { // stopPropagation isnt there on simlulate test???
            e.stopPropagation(); // dont trigger window close handler
        }
    }

    handleBlur = (e) => {
        this.props.onBlur && this.props.onBlur(this.props.name, e.target.value);
    }

    handleFocus = (e) => {
        this.props.onFocus && this.props.onFocus(this.props.name, e.target.value);
        if (e.stopPropagation) { // stopPropagation isnt there on simlulate test???
            e.stopPropagation(); // dont trigger window close handler
        }
    }

    handleClick = (e) => {
        if (e.stopPropagation) { // stopPropagation isnt there on simlulate test???
            e.stopPropagation(); // dont trigger window close handler
        }
    }

    render() {
        const {
            id, status, name, type, placeholder, value, ...rest
        } = this.props;
        const cls = [s.input];
        switch (status) {
        case 'error':
            cls.push(s.error);
            break;
        default:
        }

        return (
            <input
                className={cx(...cls)}
                id={id}
                name={name}
                type="number"
                step={this.props.step}
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onClick={this.handleClick}
                data-e2e={this.e2e()}
            />
        );
    }
}

InputNumber.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    status: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
};

export default withStyles(s)(InputNumber);
