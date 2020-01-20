import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Tables.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Table from '../../../components/Table';
import InputSelect from '../../../components/InputSelect';
import Pager from '../../../components/Pager';
import { actions, stores, events } from '../../../libs/reference';
import { models } from '../../../libs/home';

const LookupTable = models.LookupTable;

export class Tables extends Base {
    constructor(props) {
        super(props);

        // initialize state
        const stateStore = stores.stateStore.getStore();
        const filter = stateStore.getFilter();

        this.state = {
            lookupTables: new LookupTable(this.uiData.lookupTables),
            filter,
            items: props.items,
            sortOptions: this.uiData.lookupTables.filterSortOptions,
        };

        // manage state
        stateStore.subscribe(events.filterState.CHANGE, this, (filter) => {
            const state = this.state;
            state.filter = filter;
            this.setState(state);
        });

        this.sortItems = this.sortItems.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
    }

    sortItems(val) {
        actions.items.apiSortItems(val, this.state.items);
    }

    handleChangePage(key) {
        actions.items.apiChangePage(key, this.state.items);
    }

    handlePrevPage(key) {
        actions.items.apiPrevPage(key, this.state.items);
    }

    handleNextPage(key) {
        actions.items.apiNextPage(key, this.state.items);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="Layout1">
                    <SubSection>
                        <div key="main">
                            <InputSelect
                                onChange={this.sortItems}
                                keyPath="key"
                                valuePath="name"
                                options={this.state.sortOptions}
                                selectedKey={this.state.filter.sortBy}
                            />
                            <Table
                                form={this.props.form}
                                items={this.state.filter.pageItems}
                                displayFields={[
                                    {
                                        path: 'itemName',
                                    },
                                    {
                                        path: 'info.rating',
                                    },
                                    {
                                        path: 'info.price',
                                    },
                                    {
                                        path: 'category',
                                        lookupTable: 'itemCategories',
                                    },
                                ]}
                                lookupTables={this.state.lookupTables}
                            />
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <Pager
                                    onSelection={this.handleChangePage}
                                    onPrev={this.handlePrevPage}
                                    onNext={this.handleNextPage}
                                    pages={this.state.filter.pages}
                                />
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Tables);
