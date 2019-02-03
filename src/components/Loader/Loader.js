import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Loader.css';
import cx from 'classnames';
import Base from '../Base';

export class Loader extends Base {
    render() {
        return (
            <div data-e2e={this.e2e()} role="progressbar" aria-valuetext="loading contents" className={cx(s.loader, this.props.className)} />
        );
    }
}

export default withStyles(s)(Loader);
