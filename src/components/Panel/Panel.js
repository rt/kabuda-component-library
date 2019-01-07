import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Panel.css';
import cx from 'classnames';
import Base from '../Base';

class Panel extends Base {

    constructor(props) {
        super(props);
    }

    render() {
        let cls = null;
        cls = cx(s.panel);
        return (
            <div data-e2e={this.e2e()} className={cls}>
                {this.props.children}
            </div>
        );
    }
};

export default withStyles(s)(Panel);
