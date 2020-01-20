import React from 'react';
import Base from '../../../components/Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Bar.css';
import cx from 'classnames';
import Link from '../../../components/Link';
import SearchInput from '../../../components/SearchInput';
import logoUrl from './logo-small.png';
import FaBars from 'react-icons/lib/fa/bars';
import { version } from '../../../../package.json';
import { models } from '../../../libs/home';

const AppState = models.AppState;

class Bar extends Base {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        this.props.onClick && this.props.onClick();
    }

    render() {
        const cls = cx(s.root, s.container, this.props.className);
        return (
            <div data-e2e={this.e2e()} className={cx(cls)}>
                <span className={s.nav}>
                    <FaBars onClick={this.handleClick} />
                </span>
                <Link className={s.brand} to="/">
                    <img data-e2e="logoImg" src={logoUrl} alt={this.uiData.translations.brand.text} />
                    <span data-e2e="brandText" >{this.uiData.translations.brand.text}</span>
                    <span className={s.versionTxt}> v{version}</span>
                </Link>
                <div className={s.search}>
                    <SearchInput
                        appState={this.props.appState}
                    />
                </div>
            </div>
        );
    }
}

Bar.propTypes = {
    appState: PropTypes.instanceOf(AppState),
    className: PropTypes.string,
};

export default withStyles(s)(Bar);
