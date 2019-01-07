import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './LoadingPanel.css';
import cx from 'classnames';
import Base from '../Base';

export class LoadingPanel extends Base {

    constructor(props) {
        super(props);

        this.getContents = this.getContents.bind(this);
    }

    getContents() {
        if (this.props.isLoading) {
            return (
                <Loader />
            );
        } else {
            return this.props.children;
        }
    };

    render() {
        return (
            <div data-e2e={this.e2e()} aria-live="assertive" role="status">
                {this.getContents()}
            </div>
        );
    }
};

LoadingPanel.propTypes = {
};

export default withStyles(s)(LoadingPanel);
