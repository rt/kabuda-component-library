import React from 'react';
import Base from '../../../components/Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ReferenceLayout.css';
import Bar from '../Bar';
import Hr from '../../../components/Hr';
import ReferenceList from '../ReferenceList';
import ArticleContainer from '../../../components/ArticleContainer';
import FadeAndSlideTransition from '../../../components/transitions/FadeAndSlideTransition';
import Tabs from '../../../components/Tabs';
import ReferenceCard from '../ReferenceCard';
import { stores } from '../../../libs/home';

const getStateStore = stores.stateStore.getStateStore;

class ReferenceLayout extends Base {
    static contextTypes = {
        currentPath: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {};

        // tab change but the selected item does not change
        this.handleTabClick = (key) => { this.setState({ isTabBrowsing: true, currentTab: key }); };
        this.handleBarMenuClick = () => { this.setState({ showMenu: true }); };
    }

    componentDidMount = () => {
        // disable document scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * getCategorySelection based on the tab selected or the current path
     */
    getCategorySelection() {
        let selection = null;

        if (this.context.currentPath === '/reference' && !this.state.isTabBrowsing) {
            // if landing on /reference for the first time
            selection = 'ui';
        } else if (this.state.isTabBrowsing) {
            selection = this.state.currentTab;
        } else {
            const pathParts = this.context.currentPath.split('/');
            const referencePath = pathParts.slice(0, 3).join('/');
            const item = this.uiData.routes.find(item => referencePath === item.route);
            if (item) {
                selection = item.category;
            }
        }
        return selection;
    }

    getTabs = () => {
            return (
                <Tabs
                    array={this.uiData.lookupTables.categories}
                    keyPath="key"
                    textPath="name"
                    currentSelection={this.getCategorySelection()}
                    onClick={this.handleTabClick}
                />
            );
        return null;
    }

    handleSelection = (route, isMobile) => {
        if (isMobile) {
            this.setState({ isTabBrowsing: false });
        } else {
            this.setState({ isTabBrowsing: false, showMenu: false });
        }
    }

    getMobileBody = () => {
        let ret;
        if (this.state.showMenu) {
            ret = (
                <div className={s.articleContents}>
                    <div className={s.tabs}>
                        {this.getTabs()}
                    </div>
                    <ReferenceList
                        selection={this.getCategorySelection()}
                        onSelection={route => this.handleSelection(route, true)}
                        routes={this.uiData.routes}
                    />
                </div>
            );
        } else {
            ret = (
                <div className={s.articleContents}>
                    <div className={s.articleHeader}>
                        <ReferenceCard
                            currentPath={this.context.currentPath}
                            routes={getStateStore().getRouteHistoryManager().getBreadCrumbRoutes(this.context.currentPath, this.uiData.routes)}
                        />
                    </div>
                    <div className={s.articleBody}>
                        {React.cloneElement(this.props.children, { appState: this.props.appState })}
                    </div>
                </div>
            );
        }
        return ret;
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.topBar}>
                    <Bar
                        array={this.uiData.nav}
                        appState={this.props.appState}
                        onClick={this.handleBarMenuClick}
                    />
                </div>
                <div className={cx(s.content)}>
                    <div className={cx(s.nav, s.container)}>
                        <div className={s.tabs}>
                            {this.getTabs()}
                        </div>
                        <ReferenceList
                            selection={this.getCategorySelection()}
                            onSelection={route => this.handleSelection(route, false)}
                            routes={this.uiData.routes}
                        />
                    </div>

                    <div className={cx(s.article, s.container)}>
                        <ArticleContainer>
                            {this.getMobileBody()}
                        </ArticleContainer>
                    </div>
                </div>
            </div>
        );
    }
}

ReferenceLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withStyles(s)(ReferenceLayout);
