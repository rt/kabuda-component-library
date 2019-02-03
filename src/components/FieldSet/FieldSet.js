import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FieldSet.css';
import Base from '../Base';

export class FieldSet extends Base {
    render() {
        return (
            <fieldset data-e2e={this.e2e()} className={s.fieldset}>
                <legend>{this.props.legend}</legend>
                {this.props.children}
            </fieldset>
        );
    }
}

FieldSet.propTypes = {
    children: PropTypes.node,
};

export default withStyles(s)(FieldSet);
