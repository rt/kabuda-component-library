import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './BreadCrumbs.css';
import cx from 'classnames';
import Base from '../Base';
import NavList from '../NavList';

/**
 * BreadCrumbs uses route data to get text for parent paths
 * Final item path text is retrieved from recent views in the RouteHistoryManager
*/
export class BreadCrumbs extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span data-e2e={this.e2e()}>
                <NavList
                    isHorizontal
                    delimitter="/"
                    startDelimitter="/"
                    array={this.props.routes}
                    suppressSelectedHighlight
                    ignoreHistory
                />
            </span>
        );
    }
}

BreadCrumbs.propTypes = {
    routes: PropTypes.array.isRequired,
};

export default withStyles(s)(BreadCrumbs);
