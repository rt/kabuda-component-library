import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Base from '../../../../components/Base';
import NavList from '../../../../components/NavList';
import Link from '../../../../components/Link';


class Home extends Base {
    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.container}>
                    <h2>About</h2>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Home);
