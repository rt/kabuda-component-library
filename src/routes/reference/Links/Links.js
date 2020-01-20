import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Links.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Code from '../../../components/Code';
import Link from '../../../components/Link';
import LinkExternal from '../../../components/LinkExternal';
import NavList from '../../../components/NavList';
import SkipLinks from '../../../components/SkipLinks';
import BreadCrumbs from '../../../components/BreadCrumbs';
import Hr from '../../../components/Hr';
import { stores } from '../../../libs/home';

const getStateStore = stores.stateStore.getStateStore;

export class Links extends Base {
    static contextTypes = {
        currentPath: PropTypes.string,
    };


    constructor(props) {
        super(props);

        this.state = {
            navLinks: this.uiData.routes.filter(routeObj => (
                routeObj.route === '/reference/typography' ||
                    routeObj.route === '/reference/colors' ||
                    routeObj.route === '/reference/devices'
            )),
        };
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <p>Links direct you to a new route url.  They are always represented by an anchor tag, and there is a difference between internal and external links.  They may or may not be stateful.  Links are expected to be triggered through the Enter key</p>
                <Section title="Internal and External Links">
                    <SubSection>
                        <div key="main">
                            <p>
                                Internal Link: <Link to="/login">Log in!</Link>
                            </p>
                            <p>
                                External Links: <LinkExternal href="http://www.pebblefields.com">Pebble Fields</LinkExternal>
                            </p>
                            <p>
                                Section Links: <LinkExternal href="#skip-nav-links">#skip-nav-links</LinkExternal>
                            </p>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Navigation List">
                    <SubSection>
                        <div key="main">
                            A common format of a list of links.  This can be displayed in a <Link to="/reference/modals">timely fashion</Link> as well.
                            <h3>Vertical</h3>
                            <NavList
                                array={this.state.navLinks}
                            />

                            <h3>Horizontal</h3>
                            <NavList
                                array={this.state.navLinks}
                                isHorizontal
                                delimitter="|"
                                startDelimitter="|"
                                endDelimitter="|"
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <Section title="Breadcrumbs">
                    <SubSection>
                        <div key="main">
                            Current Path: <BreadCrumbs
                                routes={getStateStore().getRouteHistoryManager().getBreadCrumbRoutes(this.context.currentPath, this.uiData.routes)}
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                <section className={s.section}>
                    <h2 id="skip-nav-links" tabIndex={-1} >Skip Navigation Links</h2>
                    Allow users to bypass sections like header to skip to the main content.  Tab here to see, or <LinkExternal href="#mainContentId">click me</LinkExternal> to show below.
                    <div className={s.subSection}>
                        <div className={s.subSectionMain}>
                            <div style={{ position: 'relative' }}>
                                <SkipLinks
                                    list={[
                                        {
                                            id: 'mainContentId',
                                            href: '#main',
                                            text: 'To main content',
                                        },
                                        {
                                            href: '#footer',
                                            text: 'To footer content',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className={s.subSectionNotes} />
                    </div>
                </section>
                <Section title="Recently Viewed">
                    <SubSection>
                        <div key="main">
                            Show your recently selected items from <Link to="/reference/listDetails">items</Link>
                            <NavList
                                array={getStateStore().getRouteHistoryManager().getRecentlyViewedRoutes([
                                    '/reference/listDetails',
                                ])}
                            />
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>

        );
    }
}

export default withStyles(s)(Links);
