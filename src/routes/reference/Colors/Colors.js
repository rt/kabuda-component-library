import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Colors.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import AccessibilityNote from '../AccessibilityNote';
import Link from '../../../components/Link';
import Code from '../../../components/Code';
import Hr from '../../../components/Hr';

export class Colors extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <Section title="Colors">
                    <SubSection>
                        <div key="main">
                            Components will use a combination of colors to create fixed things.

                            <h3>Primary Colors</h3>

                            <div>
                                <div className={cx(s.black, s.container)}>
                                    black: #000;
                                </div>
                                <div className={cx(s.initial, s.container)}>
                                    initial: #fff;
                                </div>
                                <div className={cx(s.primary, s.container)}>
                                    primary: #9b4dca;
                                </div>
                                <div className={cx(s.secondary, s.container)}>
                                    secondary: #606c76;
                                </div>
                                <div className={cx(s.tertiary, s.container)}>
                                    tertiary: #f4f5f6;
                                </div>
                                <div className={cx(s.quaternary, s.container)}>
                                    quaternary: #d1d1d1;
                                </div>
                                <div className={cx(s.quinary, s.container)}>
                                    quinary: #e1e1e1;
                                </div>
                            </div>
                            <Hr />
                            <div>
                                <div className={cx(s.success, s.container)}>
                                    success: #396f3a;
                                </div>
                                <div className={cx(s.warning, s.container)}>
                                    warning: #f59f00;
                                </div>
                                <div className={cx(s.danger, s.container)}>
                                    danger: #c92a2a;
                                </div>
                                <div className={cx(s.info, s.container)}>
                                    info: #0b7285;
                                </div>
                            </div>
                        </div>
                        <div key="notes">
                            <AccessibilityNote>
                                Check that your colors meet accessbility requirements, <a target="_blank" href="http://webaim.org/resources/contrastchecker/"> color contrast checker
                                </a>
                            </AccessibilityNote>
                        </div>
                    </SubSection>
                </Section>
                <Section title="Style Consistency">
                    <SubSection>
                        <div key="main">
                            <div>
                                <p>
                Along with <Link to="/reference/colors">color classes</Link>, a set of classes are provided to enforce consistency inside of components.
                This is so that you have consistent <code>padding</code>, <code>margin</code>, <code>border</code>, <code>text-size</code>, etc.
                                </p>

                                <Code
                                    text={`
<Card>
    <h2>Title</h2>
    <p>...</p>
</Card>
                                    `.trim()}
                                />

                                <h3>Inheritance</h3>
                                <p>Some components are top level or provide the top environment and will never be nested.  These components are fully customizable and are usually pretty discrete in the application.  Other components are reused in other components' context.  These are considered <code>Nestable</code> components and they should allow configuration so accomodate the implementor.  In general, inheritance is avoided to prevent unpredictable behavior.  If configuration is a nuisance on frequently used components or you need one-off specialized color schemes, consider making a new component to lock the configurations in place.
                                </p>
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Colors);
