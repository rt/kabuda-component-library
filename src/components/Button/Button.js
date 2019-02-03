import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.css';
import cx from 'classnames';
import Base from '../Base';

/**
 * Button handles role="button"
 * type (reset, submit)?
 * always use <button> not <input type="button" />
 */
export class Button extends Base {
    static propTypes = {
        type: PropTypes.string,
        variant: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        children: PropTypes.node,
        buttonRef: PropTypes.func, // this is if the parent component needs to set focus on the button (dom el)
    };

    handleClick = (e) => {
        this.props.onClick(e, this.props.data);
        e.preventDefault();
    }

    render() {
        const variant = this.props.variant || 'default';
        const size = this.props.size || '';
        const block = this.props.isBlock ? 'block' : '';
        const cls = cx(s.button, s[variant], s[size], s[block], this.props.className);

        return (
            <button
                data-e2e={this.e2e()}
                disabled={this.props.disabled}
                className={cls}
                onClick={this.handleClick}
                ref={this.props.buttonRef}
            >
                {this.props.children}
            </button>
        );
    }
}


export default withStyles(s)(Button);
