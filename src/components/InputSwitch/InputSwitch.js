import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputSwitch.css';
import cx from 'classnames';
import Base from '../Base';

export class InputSwitch extends Base {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.onClick(!this.props.value);
    }

    render() {
        const { type, value, ...rest } = this.props;

        if (type === 'round') {
            return (
                <label data-e2e={this.e2e()} className={s.switch}>
                    <input type="checkbox" onChange={this.handleClick} checked={value} />
                    <div className={cx(s.slider, s.round)} />
                </label>
            );
        }
        return (
            <label data-e2e={this.e2e()} className={s.switch}>
                <input type="checkbox" onChange={this.handleClick} checked={value} />
                <div className={s.slider} />
            </label>
        );
    }
}

InputSwitch.propTypes = {
    type: PropTypes.string,
    value: PropTypes.bool,
    onClick: PropTypes.func,
};
export default withStyles(s)(InputSwitch);
