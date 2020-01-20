import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Selection.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Tabs from '../../../components/Tabs';

export class Selection extends Base {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'test2',
        };
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                Selection show as UI state between a set of options.
                <Section title="Tabs and Pills">
                    <SubSection>
                        <div key="main">
                            <p>Tabs and Pills select a diplay but do not change the url.  They always have a selected item.</p>
                            <Tabs
                                array={[
                                    {
                                        text: 'Test1',
                                        key: 'test1',
                                    },
                                    {
                                        text: 'Test2',
                                        key: 'test2',
                                    },
                                    {
                                        text: 'Test3',
                                        key: 'test3',
                                    },
                                ]}
                                keyPath="key"
                                textPath="text"
                                currentSelection={this.state.currentTab}
                                onClick={(key) => { this.setState({ currentTab: key }); }}
                            />

                            <h3>Side</h3>
                            <p>If you need side tabs, see <a href="http://dbtek.github.io/bootstrap-vertical-tabs" target="_blank">here</a> for an example.</p>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>

            </div>
        );
    }
}

export default withStyles(s)(Selection);
