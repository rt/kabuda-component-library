import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Hr.css';
import Base from '../Base';

export class Hr extends Base {

    render() {
        return (
            <hr role="presentation" />
        );
    }
};

export default withStyles(s)(Hr);
