import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './SubSection.css';
import Base from '../../../components/Base';

export class SubSection extends Base {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.subSectionMain}>
                    {this.getComponent('main')}
                </div>
                <div className={s.subSectionNotes}>
                    {this.getComponent('notes')}
                </div>
            </div>
        );
    }
}

export default withStyles(s)(SubSection);
