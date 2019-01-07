import { printError } from '../../utils/utils';
import chai from 'chai';
import FilteringRoute from '../../../src/components/apps/reference/Filter/Filter.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Filtering Route', function() {

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

    //bug: this will work but cards are generated weird .. double check
    it.skip('should page and sort properly', async () => {

        const route = new FilteringRoute(driver);
        route.navigate();
        await route.rootLoaded();
        
        //getList of itemcards
        const itemCard = await route.getItemCard(2);
        expect(await itemCard.getTitle()).to.eq('Name 2');

    });
});


