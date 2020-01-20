import RouteBase from '../../../component-library/src/components/RouteBase/RouteBase.auto';
import InputSelect from '../../../component-library/src/components/InputSelect/InputSelect.auto';
import InputText from '../../../component-library/src/components/InputText/InputText.auto';
import FilterFeature from '../../../component-library/src/components/FilterFeature/FilterFeature.auto';
import FilterRating from '../../../component-library/src/components/FilterRating/FilterRating.auto';
import ItemCard from '../ItemCard/ItemCard.auto';
import Pager from '../../../component-library/src/components/Pager/Pager.auto';

export default class Filter extends RouteBase {
    getPath() {
        return '/reference/filter';
    }

    getId() {
        return this.camelize(this.constructor.name);
    }

    getItemCard(index) {
        return this.getComponentAt(index, ItemCard);
    }

    // sort
    getSort() {
        return this.getComponent(InputSelect);
    }

    getPager() {
        return this.getComponent(Pager);
    }

    // text search
    getFilterText() {
        return this.getComponent(InputText);
    }

    getInputRange() {
        return this.getComponent(InputRange);
    }

    getFilterRating() {
        return this.getComponent(FilterRating);
    }

    async getFilterFeatureAnd() {
        const filterFeature = new FilterFeature(this.driver, this.selector, '[data-e2e="filterFeatureAnd"]');
        await filterFeature.rootLoaded();
        return filterFeature;
    }

    async getFilterFeatureOr() {
        const filterFeature = new FilterFeature(this.driver, this.selector, '[data-e2e="filterFeatureOr"]');
        await filterFeature.rootLoaded();
        return filterFeature;
    }

    async clickResetButton() {
        const button = await this.findElement('button');
        return button.click();
    }
}
