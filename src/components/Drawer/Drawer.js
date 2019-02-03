import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactTransitionGroup from 'react-transition-group';
import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Drawer.css';
import cx from 'classnames';
import FadeAndSlideTransition from '../transitions/FadeAndSlideTransition';
import Base from '../Base';

/**
*/
export class Drawer extends Base {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const el = ReactDOM.findDOMNode(this.refs.rootDiv)
        // const style = window.getComputedStyle(el, null);
        // this.refs.rootDiv.style.height = style.getPropertyValue('height');
        // setTimeout(() => {
        // this.refs.rootDiv.style.display = 'block';
        // this.refs.rootDiv.style.height = '0px';
        // setTimeout(() => {
        // this.refs.rootDiv.style.height = '0px';
        // }, 2000);
        // }, 2000);
    }
    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <FadeAndSlideTransition in={this.props.drawerState} duration={500}>
                    {this.props.children}
                </FadeAndSlideTransition>
            </div>
        );
    }
}

Drawer.propTypes = {
    open: PropTypes.bool,
    children: PropTypes.node,
};

export default withStyles(s)(Drawer);
