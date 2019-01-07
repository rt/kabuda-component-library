import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Toast.css';
import cx from 'classnames';
import Base from '../Base';

export class Toast extends Base {

    constructor(props) {
        super(props)
        this.state = {
            show: true
        };
    }

    componentDidMount() {
        setTimeout(() => { 
            let state = this.state;
            state.show = false;
            this.setState(state);
        }, 3000);
    }

    render() {
        if (this.state.show) {
            return (
                <div className={cx(s.toast, s.show)} >{this.props.text}</div>
            );
        } else {
            return (
                <div className={cx(s.toast)} >{this.props.text}</div>
            );
        }
    }
};

Toast.propTypes = {
};

export default withStyles(s)(Toast);
