import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './ColorSliders.css';
import Base from '../Base';
import InputRange from '../InputRange';

export class ColorSliders extends Base {
    
    constructor(props) {
        super(props);

    }

    handleChange = (index, val) => {
        const scalar = this.props.scalar;
        scalar.splice(index, 1, val);

        this.props.onChange(scalar);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.sliderRow}>
                    <div>
                        Red: {this.props.scalar[0]}
                    </div>
                    <div className={s.sliderCol}>
                        <InputRange
                            id="range"
                            min={0}
                            max={255}
                            value={this.props.scalar[0]}
                            onInput={val => {this.handleChange(0, val)}}
                        />
                    </div>
                </div>
                <div className={s.sliderRow}>
                    <div>
                        Green: {this.props.scalar[1]}
                    </div>
                    <div className={cx(s.sliderCol)}>
                        <InputRange
                            id="range"
                            min={0}
                            max={255}
                            value={this.props.scalar[1]}
                            onInput={val => {this.handleChange(1, val)}}
                        />
                    </div>
                </div>
                <div className={s.sliderRow}>
                    <div>
                        Blue: {this.props.scalar[2]}
                    </div>
                    <div className={cx(s.sliderCol)}>
                        <InputRange
                            id="range"
                            min={0}
                            max={255}
                            value={this.props.scalar[2]}
                            onInput={val => {this.handleChange(2, val)}}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

ColorSliders.propTypes = {
    scalar: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(s)(ColorSliders);
