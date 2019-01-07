import { printError } from '../../utils/utils';
import chai from 'chai';
import ModalsRoute from '../../../src/components/apps/reference/Modals/Modals.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Reference Modals Route', function() {

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

    it('should page and sort properly', async () => {

        const route = new ModalsRoute(driver);
        route.navigate();
        await route.rootLoaded();
        
        //standard open modal
        const standardModal = await route.openStandardModal();
        expect(await standardModal.getTitle()).to.eq('Title small text');

        await standardModal.clickCloseBtn();
        expect(await standardModal.rootNotVisible()).to.be.true;

        //loading modal
        const loadingModal = await route.openLoadingModal();

        //expect disappears
        expect(await loadingModal.rootNotVisible()).to.be.true;

        //getList of itemcards
        //const itemCard = await route.getItemCard(2);
        //expect(await itemCard.getTitle()).to.eq('Name 2');

    });
});


