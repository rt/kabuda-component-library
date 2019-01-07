import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ModalClosable.css';
import cx from 'classnames';
import Button from '../Button';
import Base from '../Base';

/**
 */
export class ModalClosable extends Base {

    constructor(props) {
        super(props);
        //this.getButtons = this.getButtons.bind(this);
    }

    componentDidMount() {
        //todo: would like to focus on closeBtn but this needs to be a selectable
        this.closeBtn.focus();
    }

    handleContentClick(e) {
        e.stopPropagation();
    }

    handleModalClick(e) {
        if (this.props.isStatic) {
            e.stopPropagation();
        }
    }
    handleClose(e) {
        this.props.onCloseBtnClick(e);
        e.stopPropagation();
    }

    render() {
        return (
            <div data-e2e={this.e2e()} onClick={this.handleModalClick.bind(this)} className={s.modal} >
                <span className={s.close} ref={(span) => {this.closeBtn = span}} onClick={this.handleClose.bind(this)}>&times;</span>

                <div onClick={this.handleContentClick.bind(this)} className={cx(s.content, s.animateOpacity)}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

ModalClosable.propTypes = {
    onCloseBtnClick: PropTypes.func,
    isStatic: PropTypes.bool            //clicking the backdrop will not dismiss
};

export default withStyles(s)(ModalClosable);
