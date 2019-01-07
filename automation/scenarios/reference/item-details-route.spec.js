import { printError } from '../../utils/utils';
import chai from 'chai';
import ItemDetailsRoute from '../../../src/components/apps/reference/ListDetails/ListDetails.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Reference List Details Route', function() {

    //e2e tests are too slow for default Mocha timeout
    this.timeout(30000);

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

    it('should select and edit and item', async () => {

        const newName = 'New Name';
        const newerName = 'Newer Name';
        const itemIndex = 2;

        const route = new ItemDetailsRoute(driver);
        route.navigate();
        await route.rootLoaded();

        const nav = await route.getNav();
        await nav.clickItem(itemIndex);

        const flow = await route.getItemDetailsFlow();
        await flow.rootLoaded();
        
        let form = await flow.clickEdit();
        let nameField = await form.getTextField('name');
        await nameField.setInputValue(newName);
        
        let details = await flow.clickSave();
        expect(await details.getTitle()).to.eq(newName);

        //verify changed in nav
        expect(await nav.getItemText(itemIndex)).to.eq(newName);
        
        //edit again
        form = await flow.clickEdit();
        nameField = await form.getTextField('name');
        await nameField.setInputValue(newerName);
        
        details = await flow.clickSave();
        expect(await details.getTitle()).to.eq(newerName);
        
        expect(await nav.getItemText(itemIndex)).to.eq(newerName);
        
        let items = await nav.getItems();

        //delete
        await flow.clickDelete();

        //we need to wait for it to not be there
        await nav.waitForDeleted(newerName);
        expect(await nav.getItemByText(newerName)).to.be.null;
        
    });
});


