import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputRadioButton.css';
import Base from '../Base';

export class InputRadioButton extends Base {

    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    handleClick(e) {
        this.props.onClick(this.props.name, this.getValue());
    }

    getValue() {
        return this.props.model[this.props.valuePath];
    }

    render() {

        return (
            <input
                className={s.input}
                id={this.props.id}
                name={this.props.name}
                type="radio"
                value={this.getValue()}
                onChange={this.handleClick}
                data-e2e={this.e2e()}
                checked={this.props.selection === this.getValue()}
            />
        );
    }
};

InputRadioButton.propTypes = {
    model: PropTypes.object,
    name: PropTypes.string.isRequired,
    selection: PropTypes.string,
    valuePath: PropTypes.string
};

export default withStyles(s)(InputRadioButton);
