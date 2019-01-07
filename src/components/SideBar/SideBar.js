import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './SideBar.css';
import cx from 'classnames';
import Base from '../Base';

export class SideBar extends Base {
    render() {
        return (
            <div className={cx(s.container)}>
                {this.props.children}
            </div>
        );
    }
};

SideBar.propTypes = {
};

export default withStyles(s)(SideBar);
