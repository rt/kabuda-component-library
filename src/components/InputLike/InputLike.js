import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputLike.css';
import cx from 'classnames';
import Base from '../Base';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';

export class InputLike extends Base {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick(!this.props.like);
    }

    render() {
        const { id, like, ...rest } = this.props;

        if (like) {
            return (<FaThumbsUp data-e2e={this.e2e()} onClick={this.handleClick} className={cx(s.like)} />);
        }
        return (<FaThumbsDown data-e2e={this.e2e()} onClick={this.handleClick} className={cx(s.like)} />);
    }
}

export default withStyles(s)(InputLike);
