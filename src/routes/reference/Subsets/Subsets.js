import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Subsets.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';

export class Subsets extends Base {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="Subsets">
                    <SubSection>
                        <div key="main" />
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Subsets);
