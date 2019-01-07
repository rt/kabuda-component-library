import { printError } from '../../utils/utils';
import chai from 'chai';
import Reference from '../../../src/components/apps/reference/Reference/Reference.auto';
import Bar from '../../../src/components/apps/reference/Bar/Bar.auto';
import FilteringRoute from '../../../src/components/apps/reference/Filter/Filter.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Bar > Search Input', function() {

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

    it('can find and navigate to filtering route', async () => {

        const referenceRoute = new Reference(driver);
        referenceRoute.navigate();
        await referenceRoute.rootLoaded();

        let bar = new Bar(driver);
        await bar.rootLoaded();

        let searchInput = bar.getSearchInput();
        let dropdown = await searchInput.inputSearch('filter');
        expect(await dropdown.getItemText(0)).to.equal('Filtering');
        await dropdown.clickItem(0);
        
        const filteringRoute = new FilteringRoute(driver);
        await filteringRoute.rootLoaded();
        
        bar = new Bar(driver);
        await bar.rootLoaded();

        searchInput = bar.getSearchInput();
        dropdown = await searchInput.inputSearch('typo');
        expect(await dropdown.getItemText(0)).to.equal('Basic Elements, Typography');
        await dropdown.clickItem(0);

    });
});


