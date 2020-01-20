import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DevNote.css';
import cx from 'classnames';
import Base from '../../../components/Base';

class DevNote extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.root, s.containerFull)}>
                DevNote: {this.props.children}
            </div>
        );
    }
}

DevNote.propTypes = {
    children: PropTypes.node,
};

export default withStyles(s)(DevNote);
