import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Popover.css';
import cx from 'classnames';
import { actions as homeActions } from '../../libs/home';
import Base from '../Base';

export class Popover extends Base {

    constructor(props) {
        super(props)

        this.overlayKey = null;

        this.getPopup = this.getPopup.bind(this);
    }

    componentWillMount() {

        homeActions.appState.getOverlayId().then(id => {
            this.overlayKey = id;
        });

    }

    showPopup(e) {
        homeActions.appState.setOverlayId(this.overlayKey, true);

        //note: this stops propagation for the div when both inner div is displayed or not
        //this stops it from being caught by the close overlay handler
        e.stopPropagation();
        //e.nativeEvent.stopImmediatePropagation();
    }

    getPopup() {
        if (this.props.appState.overlays[this.overlayKey]) {
            return (
                <span className={cx(s.popuptext, s.show)}>{this.props.popover}</span>
                );
        } else {
            return null;
        }
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.popup)} onClick={this.showPopup.bind(this)}>{this.props.text}
                {this.getPopup()}
            </div>
        );
    }
};

export default withStyles(s)(Popover);
