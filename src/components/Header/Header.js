import React from 'react';
import Base from '../Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';

class Header extends Base {

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.banner}>
                    <h1 className={s.bannerTitle} data-e2e="headerTitle">{this.uiData.translations.banner.text}</h1>
                    <p className={s.bannerDesc} data-e2e="headerSubTitle">&nbsp;{this.uiData.translations.banner.subText}</p>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Header);
