import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './CodeEditor.css';
import cx from 'classnames';
import Base from '../Base';

class CodeEditor extends Base {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} ></div>
        );
    }
};

CodeEditor.propTypes = {
};

export default withStyles(s)(CodeEditor);
