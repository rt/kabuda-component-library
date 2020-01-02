import React from 'react';
import Base from '../Base';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';

class Footer extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                © Pebble Fields
            </div>
        );
    }
}

export default withStyles(s)(Footer);
