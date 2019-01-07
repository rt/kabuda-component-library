import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NavList.css';
import Link from '../Link';
import Base from '../Base';
import { utils } from 'kabuda';
import { stores } from '../../libs/home';

const getStateStore = stores.stateStore.getStateStore;

class NavList extends Base {

    static contextTypes = {
        currentPath: PropTypes.string.isRequired,
        history: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        e.preventDefault();
        let to = e.target.dataset.key || e.target.parentElement.dataset.key;
        if (to.startsWith('http')) {
            window.location = to;
            return;
        }

        this.props.onSelection && this.props.onSelection(to);
        
        if (!this.props.ignoreHistory) {
            to = getStateStore().getRouteHistoryManager().getHistoryRoute(to);
        }
        this.context.history.push(to);
    }

    formatDelimitter = (text) => {
        return <span aria-hidden="true" role="presentation" className={s.spacer}>&nbsp;{text}&nbsp;</span> 
    }

    getDelimitter = (length, index) => {
        if (this.props.isHorizontal) {
            if ((length - 1) !== index) { 
                return this.formatDelimitter(this.props.delimitter);
            } else {
                if (this.props.endDelimitter) {
                    return this.formatDelimitter(this.props.endDelimitter);
                } else {
                    return ' ';
                }
            }
        } else {
            return null;
        }
    }
    
    getStartDelimitter = (index) => {
        if (index === 0 && this.props.isHorizontal && this.props.startDelimitter) {
            return this.formatDelimitter(this.props.startDelimitter);
        } else {
            return null;
        }
    }

    getList = () => {

        const length = this.props.array.length;
        const textPath = this.props.textPath || 'text';

        return this.props.array.map((item, index) => {

            const cls = (!this.props.suppressSelectedHighlight && (this.context.currentPath === item.route || this.context.currentPath.startsWith(item.route + '/'))) ? s.highlight : s.item;

            if (this.props.isHorizontal) {
                return (
                    <li className={cx(s.item, s.itemHor)} 
                        data-key={item.route} 
                        key={item.route}>

                        {this.getStartDelimitter(index)}
                        <a 
                            className={cls}
                            href={item.route}
                            data-e2e={item.e2e} 
                            style={this.props.style}
                        >
                            {utils.GetSet.get(item, textPath)}
                        </a>
                        {this.getDelimitter(length, index)}
                    </li>
                );
            } else {
                return (
                    <li className={cx(cls, s.itemVert)}
                        data-key={item.route} 
                        key={item.route}>
                        <a 
                            href={item.route}
                            data-e2e={item.e2e} 
                        >
                            {utils.GetSet.get(item, textPath)}
                        </a>
                    </li>
                );
            }
        });
    }

    render() {
        const cls = this.props.isHorizontal ? s.navHor : s.navVert;
        return (
            <ul 
                onClick={this.handleClick}
                className={cx(s.nav, cls)} 
                role="navigation"
                data-e2e={this.e2e()}
            >
            {this.getList()}
            </ul>
        );
    }

}

NavList.propTypes = {
    textPath: PropTypes.string,
    suppressSelectedHighlight: PropTypes.bool,
};

export default withStyles(s)(NavList);
