import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Code.css';
import Base from '../Base';

export class Code extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <pre data-e2e={this.e2e()} className={s.pre}>
                <code className={s.code}>
                    {this.props.text}
                </code>
            </pre>
        );
    }
}

Code.propTypes = {
    text: PropTypes.string,
};

export default withStyles(s)(Code);
