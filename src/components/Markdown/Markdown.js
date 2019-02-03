import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Markdown.css';
import cx from 'classnames';
import Base from '../Base';
import ReactMarkdown from 'react-markdown';

class Markdown extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <ReactMarkdown source={this.props.source} />
            </div>
        );
    }
}

Markdown.propTypes = {
};

export default withStyles(s)(Markdown);
