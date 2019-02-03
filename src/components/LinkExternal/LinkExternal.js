import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './LinkExternal.css';
import cx from 'classnames';
import Base from '../Base';

/**
 * a link might not have enough description for a11y, allow aria-label attribute
 * target="_blank"
 * rel="noopener" https://mathiasbynens.github.io/rel-noopener/
 * add <span class="sr-only">SRNOTATION_OPEN_IN_NEW_WINDOW</span>  > Link will open in new window.
*/
export class LinkExternal extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        const { href, children, ...props } = this.props;

        if (href.startsWith('#')) {
            // animation > https://github.com/madebysource/animated-scrollto/blob/master/animatedScrollTo.js
            return (
                <a data-e2e={this.e2e()} href={href} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <a data-e2e={this.e2e()} href={href} {...props} rel="noopener" target="_blank">
                <span className={s.srOnly}>Link will open in new window.</span>
                {children}
            </a>
        );
    }
}

LinkExternal.propTypes = {
    href: PropTypes.string, // url or #id
    children: PropTypes.node,
};

export default withStyles(s)(LinkExternal);
