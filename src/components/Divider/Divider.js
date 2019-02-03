import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Divider.css';
import cx from 'classnames';
import Base from '../Base';

/**
*/
export class Divider extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, ...rest } = this.props;

        return (
            <div data-e2e={this.e2e()} className={s.root}>
                {this.props.children}
            </div>
        );
    }
}

Divider.propTypes = {
    children: PropTypes.node,
};

export default withStyles(s)(Divider);
