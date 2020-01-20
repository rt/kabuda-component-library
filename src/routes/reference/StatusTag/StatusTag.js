import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './StatusTag.css';
import cx from 'classnames';
import Base from '../../../components/Base';

class StatusTag extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        let color = null;
        switch (this.props.status) {
        case 'todo':
            color = 'todo'; // good to go (probably nothing on the page)
            break;
        case 'deprecated':
            color = 'deprecated'; // watch out
            break;
        case 'dev':
            color = 'dev'; // warning that still in dev
            break;
        case 'done':
            color = 'done'; // like the rest of the site
            break;
        }
        const cls = [s.container, s.tag, s[color]];
        if (this.props.className) {
            cls.push(this.props.className);
        }
        return (
            <span data-e2e={this.e2e()} className={cx(...cls)}>
                {this.props.status}
            </span>
        );
    }
}

StatusTag.propTypes = {
};

export default withStyles(s)(StatusTag);
