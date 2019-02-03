import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Tooltip.css';
import cx from 'classnames';
import Base from '../Base';

export class Tooltip extends Base {
    render() {
        return (
            <div className={s.tooltip}>{this.props.text}
                <span className={s.tooltiptext}>{this.props.tooltip}</span>
            </div>
        );
    }
}

Tooltip.propTypes = {
};

export default withStyles(s)(Tooltip);
