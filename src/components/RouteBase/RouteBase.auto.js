import webdriver from 'selenium-webdriver';
import Base from '../Base.auto';
import { baseUrl } from '../../../automation/config';

export default class RouteBase extends Base {
    /**
     * route path (ie /login)
     * @abstract
     * @return {string}
     */
    getPath() {
    }

    /**
     * change or url in the browser to this routes path
     * usually used when just testing one route
     */
    navigate() {
        this.driver.navigate().to(baseUrl + this.getPath());
    }
}
