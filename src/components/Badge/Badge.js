import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Badge.css';
import cx from 'classnames';
import Base from '../Base';

export class Badge extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        const { number, type, ...rest } = this.props;

        let cls = null;
        switch (type) {
        default:
            cls = cx(s.tag, s.className);
        }

        return (
            <span data-e2e={this.e2e()} className={cls}>
                {number}
            </span>
        );
    }
}

Badge.propTypes = {
    number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

export default withStyles(s)(Badge);
