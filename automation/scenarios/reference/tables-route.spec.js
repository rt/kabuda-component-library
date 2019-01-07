import { printError } from '../../utils/utils';
import chai from 'chai';
import TablesRoute from '../../../src/components/apps/reference/Tables/Tables.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Reference Tables Route', function() {

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

        const route = new TablesRoute(driver);
        route.navigate();
        await route.rootLoaded();
        
        const table = await route.getTable();

        //10 rows per page
        expect(await table.getRowCount()).to.eq(10);

        //4 columns
        expect(await table.getColCount()).to.eq(4);

        //expect(await table.getCellText(0,0)).to.eq('Name 49');
        
        //proper headers 
        expect(await table.getColHeaderText(0)).to.eq('Name');
        expect(await table.getColHeaderText(1)).to.eq('Rating');
        expect(await table.getColHeaderText(2)).to.eq('Price');
        expect(await table.getColHeaderText(3)).to.eq('Category');

        const sort = await route.getInputSelect();
        await sort.selectOptionByIndex(1);

        //sort by asc
        //expect to start on page 1

        //pager
        const pager = await route.getPager();
        expect(await pager.getSelectedPage()).to.eq(1);

        await pager.clickNext();
        expect(await pager.getSelectedPage()).to.eq(2);

        await pager.clickPrev();
        expect(await pager.getSelectedPage()).to.eq(1);

        await pager.clickPage(4);
        expect(await pager.getSelectedPage()).to.eq(4);
    });
});


