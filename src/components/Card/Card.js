import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Card.css';
import cx from 'classnames';
import Base from '../Base';

export class Card extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.card8, s.containerFull)}>
                {this.props.children}
            </div>
        );
    }
}

Card.propTypes = {
    children: PropTypes.node,
};

export default withStyles(s)(Card);
