import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './SkipLinks.css';
import cx from 'classnames';
import Base from '../Base';

/**
 * SkipLinks allows for a11y links so the user can jump directly to content without having to tab through menus, etc.
 * You should probably put tabindex="-1" on the target element to make it focus-able
*/
export class SkipLinks extends Base {
    constructor(props) {
        super(props);

        this.getList = this.getList.bind(this);
    }

    getList() {
        return this.props.list.map(item => (
            <li>
                <a id={item.id} href={item.href} className={s.skip}>{item.text}</a>
            </li>
        ));
    }

    render() {
        const { ...rest } = this.props;

        return (
            <ul
                data-e2e={this.e2e()}
                className={s.root}
            >
                {this.getList()}
            </ul>
        );
    }
}

SkipLinks.propTypes = {
};

export default withStyles(s)(SkipLinks);
