import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccessibilityNote.css';
import cx from 'classnames';
import Base from '../../../components/Base';

class AccessibilityNote extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.root, s.containerFull)}>
                Accessibility: {this.props.children}
            </div>
        );
    }
}
AccessibilityNote.propTypes = {
    children: PropTypes.node.isRequired,
};
export default withStyles(s)(AccessibilityNote);
