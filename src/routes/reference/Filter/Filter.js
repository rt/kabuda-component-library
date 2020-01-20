import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Filter.css';
import Base from '../../../components/Base';
import Tabs from '../../../components/Tabs';
import AccessibilityNote from '../AccessibilityNote';
import Button from '../../../components/Button';
import InputText from '../../../components/InputText';
import InputSelect from '../../../components/InputSelect';
import Hr from '../../../components/Hr';
import InputRange from '../../../components/InputRange';
import FilterRating from '../../../components/FilterRating';
import FilterFeature from '../../../components/FilterFeature';
import FilterGoogleMap from '../../../components/FilterGoogleMap';
import FilterCalendar from '../../../components/FilterCalendar';
import Pager from '../../../components/Pager';
import ItemCard from '../ItemCard';
import Label from '../../../components/Label';
import { actions, stores, events } from '../../../libs/reference';
import FaFilter from 'react-icons/lib/fa/filter';

/**
*/
export class Filter extends Base {
    constructor(props) {
        super(props);

        // initialize state
        const stateStore = stores.stateStore.getStore();
        const filter = stateStore.getFilter();

        this.state = {
            currentTab: 'list',
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

        this.handleTabClick = (currentTab) => { this.setState({ currentTab }); };

        this.getMobileBody = this.getMobileBody.bind(this);
        this.getFilter = this.getFilter.bind(this);
        this.sortItems = this.sortItems.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleFeatureChange = this.handleFeatureChange.bind(this);
        this.handleFeatureChangeOR = this.handleFeatureChangeOR.bind(this);
        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleFilterIconClick = this.handleFilterIconClick.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }
    getView() {
        switch (this.state.currentTab) {
        case 'list':
            return (
                <div>
                    <div>
                        <InputSelect
                            onChange={this.sortItems}
                            keyPath="key"
                            valuePath="name"
                            options={this.state.sortOptions}
                            selectedKey={this.state.filter.sortBy}
                        />
                        <div className={s.list}>
                            {this.getList()}
                        </div>
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            <Pager
                                onSelection={this.handleChangePage}
                                onPrev={this.handlePrevPage}
                                onNext={this.handleNextPage}
                                pages={this.state.filter.pages}
                            />
                        </div>
                    </div>
                </div>
            );

        case 'map':
            return (
                <div>
                    uses <a target="_blank" href="https://github.com/fullstackreact/google-maps-react">google-maps-react</a><br />
                    considered <a target="_blank" href="https://github.com/fullstackreact/google-maps-react">google-maps-react</a> but seemed to force you to use <a target="_blank" href="https://github.com/acdlite/recompose">recompose</a>.
                    <FilterGoogleMap />
                </div>
            );
        case 'calendar':
            return (
                <div>
                    uses <a target="_blank" href="https://github.com/intljusticemission/react-big-calendar">react-big-calendar</a><br />
                    <FilterCalendar />
                </div>
            );
        }
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

    handleFeatureChange(key, value) {
        actions.items.apiChangeFeatureSelection(key, value, this.state.items);
    }

    handleFeatureChangeOR(key, value) {
        actions.items.apiChangeFeatureSelectionOR(key, value, this.state.items);
    }

    handleRatingChange(val) {
        actions.items.apiChangeRating(val, this.state.items);
    }

    handleTextChange(name, val) {
        actions.items.apiTextChange(val, this.state.items);
    }

    handlePriceChange(val) {
        actions.items.apiPriceChange(val, this.state.items);
    }

    handleFilterIconClick() {
        this.setState({ showMenu: !this.state.showMenu });
    }

    resetFilters() {
        actions.items.apiResetFilter(this.state.items);
    }

    getList() {
        return this.state.filter.pageItems.map((item, index) => (
            <ItemCard
                key={index}
                model={item}
            />
        ));
    }

    getFilter() {
        return (
            <div>
                <section className={s.section}>
                    <div className={s.container}>
                        <InputText
                            name="searchInput"
                            placeholder="Search ..."
                            onChange={this.handleTextChange}
                        />
                    </div>
                    <div className={s.panel}>
                        <Label for="priceSlider">Price </Label>
                        <span className={cx(s.filterRange)}>
                            <InputRange
                                id="priceSlider"
                                className={cx(s.inputRange)}
                                min={this.state.filter.filterPrice.priceRangeMinimumPosition}
                                max={this.state.filter.filterPrice.priceRangeMaximumPosition}
                                value={this.state.filter.filterPrice.priceRangeMaximum}
                                onInput={this.handlePriceChange}
                            />
                            <span className={cx(s.spacer)}>&nbsp;</span>
                            <output htmlFor="priceSlider">
                                {this.state.filter.filterPrice.priceRangeMaximum}
                            </output>
                        </span>
                    </div>
                    <div className={s.panel}>
                        <Label>Rating</Label>
                        <FilterRating
                            ratings={this.state.filter.filterStarRating.allAvailableStarRatings}
                            onRatingChange={this.handleRatingChange}
                        />
                    </div>
                    <div className={s.panel}>
                        <Label>Feature (AND)</Label>
                        <FilterFeature
                            data-e2e="filterFeatureAnd"
                            features={this.state.filter.filterFeature.allAvailableFeatures}
                            onClick={this.handleFeatureChange}
                        />
                    </div>
                    <div className={s.panel}>
                        <Label>Feature (OR)</Label>
                        <FilterFeature
                            data-e2e="filterFeatureOr"
                            features={this.state.filter.filterFeatureOR.allAvailableFeatures}
                            onClick={this.handleFeatureChangeOR}
                        />
                    </div>
                    <div className={s.panel}>
                        <Button onClick={this.resetFilters}>Reset</Button>
                    </div>
                </section>
            </div>
        );
    }

    getMobileBody() {
        if (this.state.showMenu) {
            return this.getFilter();
        }
        return (
            <div>
                <Tabs
                    array={[{ text: 'List', key: 'list' }, { text: 'Map', key: 'map' }, { text: 'Calendar', key: 'calendar' }]}
                    keyPath="key"
                    textPath="text"
                    currentSelection={this.state.currentTab}
                    onClick={this.handleTabClick}
                />
                {this.getView()}
            </div>
        );
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={s.layout}>
                    <div className={cx(s.filter)}>
                        {this.getFilter()}
                    </div>
                    <div className={cx(s.main)}>
                        <div className={s.filterIcon}><FaFilter onClick={this.handleFilterIconClick} /></div>
                        {this.getMobileBody()}
                    </div>
                </div>
                <AccessibilityNote>
                    Stars could be completely useless to screen readers and you could use <code>aria-hidden="true"</code> to hide the filter and just add the value with <code>"sr-only"</code>
                </AccessibilityNote>

            </div>
        );
    }
}

export default withStyles(s)(Filter);
