import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Panels.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Alert from '../../../components/Alert';
import AccessibilityNote from '../AccessibilityNote';
import DevNote from '../DevNote';

export class Panels extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="Panel">
                    <SubSection>
                        <div key="main">
                            <p>A panel adds top and bottom margins to a container</p>
                            <div className={cx(s.panel)}>
                                I am a panel.
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>

                <Section title="Notes">
                    <SubSection>
                        <div key="main">
                            <p>A note is a colored panel to describe something with a special meaning.  There are two notes used here AccessibilityNote and DevNote</p>
                            <AccessibilityNote>
                                Note
                            </AccessibilityNote>
                            <DevNote>
                                Note
                            </DevNote>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>

                <Section title="Alerts">
                    <SubSection>
                        <div key="main">
                            <p>Alerts are closable panels</p>
                            <Alert type="danger">
                                <h3>Danger!</h3>
                                <p>Color danger indicates something negative</p>
                            </Alert>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>

            </div>
        );
    }
}

export default withStyles(s)(Panels);
