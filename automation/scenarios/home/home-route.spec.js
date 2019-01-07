import { printError } from '../../utils/utils';
import chai from 'chai';
import Home from '../../../src/components/apps/home/Home/Home.auto';
import { getDriver } from '../../config';
import UIDATA from '../../../src/ui-data';
const uiData = UIDATA.apps.home.en;

const expect = chai.expect;

describe('Home Route', function() {

    //e2e tests are too slow for default Mocha timeout
    this.timeout(10000);

    let driver = null;
    before(function() {
        driver = getDriver();
    });

    afterEach(async function() {
        if (this.currentTest.state == 'failed') {
            printError(driver);
        }
    });

    after(function () {
        return driver.quit();
    });

    it('displays home stuff', async () => {

        const homeRoute = new Home(driver);
        homeRoute.navigate();
        await homeRoute.rootLoaded();

        //expect(await homeRoute.getFeature1()).to.equal(uiData.translations.shootout.title);
    });
});


