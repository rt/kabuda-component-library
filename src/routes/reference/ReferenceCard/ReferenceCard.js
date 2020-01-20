import React from 'react';
import Base from '../../../components/Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReferenceCard.css';
import cx from 'classnames';
import StatusTag from '../StatusTag';
import BreadCrumbs from '../../../components/BreadCrumbs';

class ReferenceCard extends Base {
    constructor(props) {
        super(props);
    }

    /**
     * only matching reference/x, no child routes
     */
    getRouteObject() {
        const parts = this.props.currentPath.split('/');
        const mainPath = parts.slice(0, 3).join('/');
        const pages = this.uiData.routes;
        return pages.find(page => page.route === mainPath);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <h1 className={s.name}>
                    {this.getRouteObject() && this.getRouteObject().text}
                </h1>

                <span className={s.container}>
                    <BreadCrumbs
                        routes={this.props.routes}
                    />
                </span>

                <span>
                    <StatusTag
                        status={this.getRouteObject() && this.getRouteObject().status}
                    />
                </span>
            </div>
        );
    }
}

ReferenceCard.propTypes = {
    routes: PropTypes.array.isRequired,
};
export default withStyles(s)(ReferenceCard);
