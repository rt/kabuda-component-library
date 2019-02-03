import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './BlockQuote.css';
import Base from '../Base';

export class BlockQuote extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        const getText = () => `"${this.props.text}"`;
        return (
            <blockquote data-e2e={this.e2e()}>
                {getText()}
                <br /><br />
                <strong>{this.props.author}</strong>
            </blockquote>
        );
    }
}

BlockQuote.propTypes = {
    text: PropTypes.string,
    author: PropTypes.string,
};

export default withStyles(s)(BlockQuote);
