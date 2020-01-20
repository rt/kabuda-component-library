import { models } from 'kabuda-liquid';

/**
 * The filter is a custom filter that controls filter flow using individual filter methods
 * You must call init() anytime the data set changes
 * Filter doesnt store the data set as filter will be put in session storage (but it does store the result set)
 */
export default class Filter extends models.Model {
    constructor(o) {
        super(o);

        /** @type {string} */
        this.sortBy = o.sortBy || null;

        /** @type {number} */
        this.currentPage = o.currentPage || 1;

        /** @type {number} */
        this.itemsPerPage = o.itemsPerPage || 10;

        /**
         * some widgets need the result set (map, full calendar)
         * @type {Array.<object>}
         */
        this.resultSet = o.resultSet || null;

        this.deserializeProperty(o, 'filterText', models.FilterText);
        this.deserializeProperty(o, 'filterStarRating', models.FilterStarRating);
        this.deserializeProperty(o, 'filterPrice', models.FilterPrice);
        this.deserializeProperty(o, 'filterFeature', models.FilterFeature);
        this.deserializeProperty(o, 'filterFeatureOR', models.FilterFeature);
        this.deserializeProperty(o, 'filterGeo', models.FilterGeo);
    }

    filter(items) {
        this.resetFilterCounts();

        let resultSet = items.filter((item) => {
            // Star rating filter counts are calculated before filtering is applied.
            this.filterStarRating.addFilterCounts(item);

            if (!this.filterText.filterItem(item)) {
                return false;
            }

            if (!this.filterPrice.filterItem(item)) {
                return false;
            }

            if (!this.filterStarRating.filterItem(item)) {
                return false;
            }

            if (!this.filterFeature.filterItem(item)) {
                return false;
            }

            if (!this.filterFeatureOR.filterItem(item)) {
                return false;
            }

            // if (!this.filterGeo.filterItem(item)) {
            // return false;
            // }

            this.filterFeature.addFilterCounts(item);
            this.filterFeatureOR.addFilterCounts(item);

            return true;
        });

        resultSet = this.doSort(resultSet);

        this.resultSet = resultSet;

        this.pages = this.getPages(items);

        this.pageItems = this.getCurrentPage();
    }

    init(items) {
        this.filterPrice.init(items);
        this.filterStarRating.init(items);
        this.filterFeature.init(items);
        this.filterFeatureOR.init(items);

        this.filter(items);
    }

    resetFilterCounts() {
        this.filterFeature.resetFilterCounts();
        this.filterFeatureOR.resetFilterCounts();
        this.filterStarRating.resetFilterCounts();
    }

    /**
     * might need advanced sorting
     */
    doSort(items) {
        return items.sort((o1, o2) => {
            switch (this.sortBy) {
            case 'score':
                return o2.score - o1.score;

            case 'name':
                return o1.itemName.toLowerCase().localeCompare(o2.itemName.toLowerCase());

            case 'priceAsc':
                return o1.info.price - o2.info.price;

            case 'priceDesc':
                return o2.info.price - o1.info.price;

            case 'rating':
                return this.filterStarRating.sortItem(o1, o2);
                    // tiebreaker when you need global data
                    // if (result === 0) {
                    // }
                    // return result;
            }
            return 0;
        });
    }

    getCurrentPage() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.resultSet.slice(startIndex, endIndex);
    }

    getPages() {
        const numPages = this.resultSet.length > 0 ? Math.ceil(this.resultSet.length / this.itemsPerPage) : 1;
        const pages = [];
        for (let i = 0; i < numPages; i++) {
            pages.push({
                number: i + 1,
                isSelected: (i + 1) === this.currentPage,
            });
        }
        return pages;
    }

    changePage(page, items) {
        this.currentPage = page;
        return this.filter(items);
    }

    isOnFirstPage() {
        return this.currentPage === 1;
    }

    isOnLastPage() {
        return this.currentPage === this.pages.length;
    }

    goToPrevPage(items) {
        this.currentPage = this.currentPage - 1;
        return this.filter(items);
    }

    goToNextPage(items) {
        this.currentPage = this.currentPage + 1;
        return this.filter(items);
    }

    changeFeatureSelection(key, value, items) {
        this.filterFeature.changeFeatureSelection(key, value);
        return this.filter(items);
    }

    changeFeatureSelectionOR(key, value, items) {
        this.filterFeatureOR.changeFeatureSelection(key, value);
        return this.filter(items);
    }
}
