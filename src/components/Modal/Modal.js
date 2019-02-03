import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Modal.css';
import cx from 'classnames';
import Base from '../Base';
import Button from '../Button';

/**
 * Modal displays a modal dialog with ...
 * Modal does not manage itself, implementor must manage the show/hide
 */
export class Modal extends Base {
    constructor(props) {
        super(props);
        this.getButtons = this.getButtons.bind(this);
        this.getFooter = this.getFooter.bind(this);
        this.getHeader = this.getHeader.bind(this);
    }

    componentDidMount() {
        if (this.closeBtn) {
            this.closeBtn.focus();
        }
    }

    handleClose(e) {
        this.props.onCloseBtnClick(e);
        e.stopPropagation();
    }

    handleContentClick(e) {
        e.stopPropagation();
    }

    handleModalClick(e) {
        if (this.props.isStatic) {
            e.stopPropagation();
        }
    }

    getHeader() {
        if (!this.props.title) {
            return null;
        }
        return (
            <div className={cx(s.header)}>
                <button data-e2e="closeBtn" className={s.closebtn} ref={(button) => { this.closeBtn = button; }}><span onClick={this.handleClose.bind(this)}>&times;</span></button>
                <h1 data-e2e="title" id={this.props.id}>{this.props.title}   <small className={s.smallText}>small text</small></h1>
            </div>
        );
    }

    getFooter() {
        if (!this.props.buttons) {
            return null;
        }

        return (
            <div className={cx(s.footer)}>
                {this.getButtons()}
            </div>
        );
    }

    getButtons() {
        return this.props.buttons.map((button, index) => (
            <Button
                key={index}

            >
                btn
            </Button>
        ));
    }

    render() {
        return (
            <div data-e2e={this.e2e()} onClick={this.handleModalClick.bind(this)} className={s.modal} aria-labelledby={this.props.id}>
                <div onClick={this.handleContentClick.bind(this)} className={cx(s.content, s.animateOpacity)}>
                    {this.getHeader()}
                    <div className={cx(s.body)}>
                        {this.props.children}
                    </div>
                    {this.getFooter()}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    id: PropTypes.string.isRequired, // aria-labelledby
    buttons: PropTypes.array, // Button config
    title: PropTypes.string,
    onCloseBtnClick: PropTypes.func,
    isStatic: PropTypes.bool, // clicking the backdrop will not dismiss
};

export default withStyles(s)(Modal);
