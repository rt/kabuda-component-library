import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Devices.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Code from '../../../components/Code';
import Link from '../../../components/Link';
import DevNote from '../DevNote';

export class Devices extends Base {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <Section title="Devices">
                    <SubSection>
                        <div key="main">
                            <p>
                                The Mobile First is the design strategy that takes priority development for mobile devices like smartphones and tablets. It means all styles outside of a media queries apply to all devices, then larger screens are targeted for enhancement.
                            </p>
                            <p>
                                Depending on the requirements and weighing the benefits of <i>graceful degradation</i> vs <i>progressive enhancement</i> can lead to whether you want to develop mobile first or non-mobile first.  It is also possible that separate apps/paths are more productive if the application flow is considerable different between desktop and mobile.
                            </p>
                            <p>
                                Here's are typical breakpoints.
                            </p>

                            <Code
                                text={`
     /*==========  Mobile First ==========*/

    /* Custom, iPhone Retina */ 
    @media only screen and (min-width : 320px) { }

    /* Extra Small Devices, Phones */ 
    @media only screen and (min-width : 480px) { }

    /* Small Devices, Tablets */
    @media only screen and (min-width : 768px) { }

    /* Medium Devices, Desktops */
    @media only screen and (min-width : 992px) { }

    /* Large Devices, Wide Screens */
    @media only screen and (min-width : 1200px) { }


    /*==========  Non-Mobile First ==========*/

    /* Large Devices, Wide Screens */
    @media only screen and (max-width : 1200px) { }

    /* Medium Devices, Desktops */
    @media only screen and (max-width : 992px) { }

    /* Small Devices, Tablets */
    @media only screen and (max-width : 768px) { }

    /* Extra Small Devices, Phones */ 
    @media only screen and (max-width : 480px) { }

    /* Custom, iPhone Retina */ 
    @media only screen and (max-width : 320px) { }
            `.trim()}
                            />
                        </div>
                        <div key="notes">
                            <DevNote>
                                I do like the way <a href="https://github.com/contra/react-responsive">react-responsive</a> handles media queries but considering the extra work for server rendering, I'll stick to @media queries.
                            </DevNote>
                        </div>
                    </SubSection>
                </Section>
                <Section title="Grid">
                    <SubSection>
                        <div key="main">
                            <div>
                                <p>
                                    The current grid is borrowed from Milligram and uses flexbox.  The grid is a easy way to organize content.  It is also responsive.  This grid is defined <Link to="/reference/devices">Mobile First</Link>.
                                </p>

                                <Code
                                    text={`
                    @media (min-width: 768px) {
                        .row {
                            flex-direction: row;
                            margin-left: -1.0rem;
                            width: calc(100% + 2.0rem);

                            .column {
                                margin-bottom: inherit;
                                padding: 0 1.0rem;
                            }
                        }
                    }`.trim()
                                    }
                                />


                                <h3>Examples</h3>
                                <div className={s.row}>
                                    <div className={cx(s.column, s.cell)}>.column </div>
                                    <div className={cx(s.column, s.cell)}>.column </div>
                                    <div className={cx(s.column, s.cell)}>.column </div>
                                    <div className={cx(s.column, s.cell)}>.column </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column, s.cell)}>.column </div>
                                    <div className={cx(s.column, s.column50, s.columnOffset25, s.cell)}>.column column-50 column-offset-25</div>
                                </div>
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Devices);
