import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Tabs.css';
import cx from 'classnames';
import Base from '../Base';

export class Tabs extends Base {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.getCategories = this.getCategories.bind(this);
    }

    handleClick(e) {
        this.props.onClick(e.target.getAttribute('data-key'));
    }

    getCategories() {
        return this.props.array.map((item) => {
            const cls = item[this.props.keyPath] === this.props.currentSelection ? s.linkSelected : s.link;
            return (
                <li
                    className={s.item}
                    data-key={item[this.props.keyPath]}
                    key={item[this.props.keyPath]}
                >
                    <a
                        className={cls}
                        data-key={item[this.props.keyPath]}
                    >{item[this.props.textPath]}
                    </a>

                </li>
            );
        });
    }

    render() {
        let cls = null;
        if (this.props.className) {
            cls = cx(s.nav, this.props.className);
        } else {
            cls = s.nav;
        }

        return (
            <ul
                data-e2e="tabs"
                className={cls}
                onClick={this.handleClick}
            >{this.getCategories()}
            </ul>
        );
    }
}

Tabs.propTypes = {
    array: PropTypes.array.isRequired,
    keyPath: PropTypes.string.isRequired,
    textPath: PropTypes.string.isRequired,
    selection: PropTypes.string,
};

export default withStyles(s)(Tabs);
