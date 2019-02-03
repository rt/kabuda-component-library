// http://thenewcode.com/757/Playing-With-The-HTML5-range-Slider-Input
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputRange.css';
import cx from 'classnames';
import Base from '../Base';

export class InputRange extends Base {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.props.onInput && this.props.onInput(parseInt(e.target.value, 10));
    }

    render() {
        const {
            id, min, max, value, ...rest
        } = this.props;

        return (
            <input
                data-e2e={this.e2e()}
                id={id}
                className={s.slider}
                type="range"
                min={min}
                max={max}
                value={value}
                step="1"
                onChange={this.handleInput}
            />
        );
    }
}

InputRange.propTypes = {
    id: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.string,
    value: PropTypes.number,
    onInput: PropTypes.func,
};

export default withStyles(s)(InputRange);
