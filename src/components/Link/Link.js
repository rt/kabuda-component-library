import React from 'react';
import PropTypes from 'prop-types';
import Events from '../../utils/events';
import Base from '../Base';
import { stores } from '../../libs/home';

const getStateStore = stores.stateStore.getStateStore;


/**
 * a link might not have enough description for a11y, allow aria-label attribute
*/
class Link extends Base {
    
    static contextTypes = {
        history: PropTypes.object
    };

    constructor(props) {
        super(props);
        
    }

    handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
            //return control to caller
            return;
        }

        if (Events.isModifiedEvent(event) || !Events.isLeftClickEvent(event)) {
            return;
        }

        if (event.defaultPrevented === true) {
            return;
        }

        event.preventDefault();

        let to = this.props.to;
        if (!this.props.ignoreHistory) {
            to = getStateStore().getRouteHistoryManager().getHistoryRoute(to);
        }
        this.context.history.push(to);
    };

    render() {
        const { to, children, ignoreHistory, ...props } = this.props;
        return <a data-e2e={this.e2e()} href={to} {...props} onClick={this.handleClick}>{children}</a>;
    }
}

Link.propTypes = {
    to: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
    ignoreHistory: PropTypes.bool,
};

export default Link;
