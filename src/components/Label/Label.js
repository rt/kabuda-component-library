import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Label.css';
import Base from '../Base';

export class Label extends Base {
    render() {
        return (
            <label data-e2e={this.e2e()} htmlFor={this.props.for} className={s.label}>
                {this.props.children}
            </label>
        );
    }
}

export default withStyles(s)(Label);
