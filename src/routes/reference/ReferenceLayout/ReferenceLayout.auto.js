import webdriver from 'selenium-webdriver';
import Base from '../../../component-library/src/components/Base.auto';
import Tabs from '../../../component-library/src/components/Tabs/Tabs.auto';
import NavList from '../../../component-library/src/components/NavList/NavList.auto';

const By = webdriver.By;

export default class ReferenceLayout extends Base {
    getId() {
        return this.camelize(this.constructor.name);
    }

    clickUiTab() {
        return this.clickTab(0);
    }

    clickDataTab() {
        return this.clickTab(1);
    }

    clickOpsTab() {
        return this.clickTab(2);
    }

    async clickTab(index) {
        const tabs = this.getTabs();
        await tabs.rootLoaded();
        await tabs.clickItem(index);
        const nav = new NavList(this.driver, this.selector);
        await nav.rootLoaded();
        return nav;
    }

    getTabs() {
        return new Tabs(this.driver, this.selector);
    }

    getNav() {
        return new NavList(this.driver, this.selector);
    }
}
