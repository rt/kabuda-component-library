import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputTextArea.css';
import cx from 'classnames';
import Base from '../Base';

export class InputTextArea extends Base {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }
    
    handleChange(e) {
        //analytics
        this.props.onChange && this.props.onChange(this.props.name, e.target.value);
        if (e.stopPropagation) {  //stopPropagation isnt there on simlulate test???
            e.stopPropagation(); //dont trigger window close handler
        }
    }
    
    handleBlur(e) {
        this.props.onBlur && this.props.onBlur(this.props.name, e.target.value);
    }

    render() {
        const { id, status, name, type, placeholder, value, ...rest} = this.props;

        const cls = [s.root];
        switch (status) {
            case 'error':
                cls.push(s.error)
                break;
            default:
        }
        return (
            <textarea 
                className={cx(...cls)}
                id={id}
                name={name}
                type={type || 'text'}
                placeholder={placeholder}
                value={value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                data-e2e={this.e2e()}
            />
            );
        }
};

InputTextArea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    status: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

export default withStyles(s)(InputTextArea);
