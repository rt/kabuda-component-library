import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Pager.css';
import cx from 'classnames';
import Base from '../Base';

export class Pager extends Base {
    constructor(props) {
        super(props);

        this.getList = this.getList.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getList() {
        return this.props.pages.map((page) => {
            if (page.isSelected) {
                return <a key={page.number} data-key={page.number} className={s.active} href="#">{page.number}</a>;
            }
            return <a key={page.number} data-key={page.number} href="#">{page.number}</a>;
        });
    }

    handleClick(e) {
        const key = e.target.dataset.key;
        switch (key) {
        case 'prev':
            this.props.onPrev();
            break;

        case 'next':
            this.props.onNext();
            break;

        default:
            this.props.onSelection(parseInt(key));
            break;
        }
    }

    render() {
        return (
            <div data-e2e={this.e2e()} onClick={this.handleClick} className={cx(s.pagination)}>
                <a key="prev" data-key="prev" href="#">&laquo;</a>
                { this.getList() }
                <a key="next" data-key="next" href="#">&raquo;</a>
            </div>
        );
    }
}

export default withStyles(s)(Pager);
