import { printError } from '../../utils/utils';
import chai from 'chai';
import Inputs from '../../../src/components/apps/reference/Inputs/Inputs.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Reference Inputs Route', function() {

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

    it('should show inputs and binding externally', async () => {

        const route = new Inputs(driver);
        route.navigate();
        await route.rootLoaded();

        await route.setInputTextValue('inputting text ...');
        expect(await route.getText('textInputLabel')).to.eq('InputText: inputting text ...');

        await route.setInputTextAreaValue('inputting textarea ...');
        expect(await route.getText('textInputAreaLabel')).to.eq('InputTextArea: inputting textarea ...');
        
        await route.setSelectValue('male');
        expect(await route.getText('selectLabel')).to.eq('InputSelect: male');
        
        await route.clickCheckbox();
        expect(await route.getText('checkboxLabel')).to.eq('InputCheckBox: true');
        
        await route.setRadio(2);
        expect(await route.getText('radiosLabel')).to.eq('InputRadioButton: val3');
        
        await route.setStarRating(4.5);
        expect(await route.getText('starRatingLabel')).to.eq('InputStarRating: 4.5');

        await route.clickSwitch();
        expect(await route.getText('switchLabel')).to.eq('InputSwitch: true');
        
        await route.clickLike();
        expect(await route.getText('likeLabel')).to.eq('InputLike: true');

        //todo: inputRange 


    });
});


