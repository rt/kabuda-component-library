import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Section.css';
import Base from '../../../components/Base';

export class Section extends Base {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section data-e2e={this.e2e()} className={s.root}>
                <h2>{this.props.title}</h2>
                {this.props.children}
            </section>
        );
    }
}


export default withStyles(s)(Section);
