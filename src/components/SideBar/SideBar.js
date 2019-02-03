import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './SideBar.css';
import Base from '../Base';

export class SideBar extends Base {
    render() {
        return (
            <div className={s.root}>
                {this.props.children}
            </div>
        );
    }
}

export default withStyles(s)(SideBar);
