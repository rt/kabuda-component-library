import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputSelect.css';
import cx from 'classnames';
import Base from '../Base';

export class InputSelect extends Base {

    constructor(props) {
        super(props);

        this.getOptions = this.getOptions.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onChange && this.props.onChange(e.target.value);
    }

    getOptions() {

        let options = [];
        if (this.props.prompt) {
        }
        this.props.options.forEach((opt, index) => {
            options.push(
                this.props.keyPath === '.' ? <option key={index} value={opt}>{opt}</option> : <option key={index} value={opt[this.props.keyPath]}>
                    {opt[this.props.valuePath]}
                </option> 
            );
        });
        return options;
    }
    
    render() {

        const { id, selectedKey, status, ...rest} = this.props;

        const cls = [s.root];
        switch (status) {
            case 'error':
                cls.push(s.error)
                break;
            default:
        }

        return (
            <select
                data-e2e={this.e2e()}
                id={id}
                className={cx(...cls)}
                onChange={this.handleChange}
                value={selectedKey}
            >
                {this.getOptions()}
            </select>
        );
    }
};

InputSelect.propTypes = {
    status: PropTypes.string,
    prompt: PropTypes.string,
    options: PropTypes.array,
    keyPath: PropTypes.string.isRequired,
    valuePath: PropTypes.string,
    onChange: PropTypes.func,
};

export default withStyles(s)(InputSelect);
