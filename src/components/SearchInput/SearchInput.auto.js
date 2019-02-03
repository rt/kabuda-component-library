import Base from '../Base.auto';
import NavList from '../NavList/NavList.auto';

export default class SearchInput extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    /**
     * @param {string} search
     * @return {NavList}
     */
    async inputSearch(search) {
        await this.setValue('inputText', search);

        const nav = new NavList(this.driver, this.selector);
        await nav.rootLoaded();
        return nav;
    }
}
