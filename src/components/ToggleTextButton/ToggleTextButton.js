import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ToggleTextButton.css';
import cx from 'classnames';
import Base from '../Base';

export class ToggleTextButton extends Base {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.onClick(!this.props.model);
    }

    render() {
        const { model, trueText, falseText } = this.props;

        return (<a
            data-e2e={this.e2e()}
            href="#0"
            onClick={this.handleClick}
            className={s.root}
            role="button"
        >
            {model ? trueText : falseText}
        </a>);
    }
}

ToggleTextButton.propTypes = {
    model: PropTypes.bool.isRequired,
    trueText: PropTypes.string.isRequired,
    falseText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
export default withStyles(s)(ToggleTextButton);
