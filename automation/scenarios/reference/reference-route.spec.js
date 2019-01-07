import { printError } from '../../utils/utils';
import chai from 'chai';
import Reference from '../../../src/components/apps/reference/Reference/Reference.auto';
import ReferenceLayout from '../../../src/components/apps/reference/ReferenceLayout/ReferenceLayout.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Reference Route', function() {

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

    it('should be able to use tabs to display lists', async () => {

        const route = new Reference(driver);
        route.navigate();
        await route.rootLoaded();

        const referenceLayout = new ReferenceLayout(driver);
        await referenceLayout.rootLoaded();

        let nav = referenceLayout.getNav();
        
        //expect ui tab displayed
        expect(await nav.hasItemWithText('Basic Elements, Typography')).to.be.true;
        //click() > assert route url, etc.
    
        nav = await referenceLayout.clickDataTab();
        expect(await nav.hasItemWithText('Filtering')).to.be.true;
        //click() > assert route url, etc.
        
        nav = await referenceLayout.clickOpsTab();
        expect(await nav.hasItemWithText('Online Migrations')).to.be.true;
        //click() > assert route url, etc.

    });
});


