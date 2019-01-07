import { printError } from '../../utils/utils';
import chai from 'chai';
import FormRoute from '../../../src/components/apps/reference/Form/Form.auto';
import { getDriver } from '../../config';

const expect = chai.expect;

describe('Form Route', function() {

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

    it('should fill out form and validate', async () => {

        const route = new FormRoute(driver);
        route.navigate();
        await route.rootLoaded();

        const form = await route.getForm();

        //activity
        const activityField = await form.getSelectField('activity');
        expect(await activityField.getLabelText()).to.eq('Register for Activity *');

        await activityField.selectByText('Rafting');
        expect(await activityField.isOptionSelected('rafting')).to.be.true;

        //fist name
        const firstNameField = await form.getTextField('firstName');
        expect(await firstNameField.getLabelText()).to.eq('First *');

        await firstNameField.setInputValue('1234');
        expect(await firstNameField.getValidationsCount()).to.eq(1);

        await firstNameField.setInputValue('Mira');
        expect(await firstNameField.getValidationsCount()).to.eq(0);
        
        //last name
        const lastNameField = await form.getTextField('lastName');
        expect(await lastNameField.getLabelText()).to.eq('Last *');

        await lastNameField.setInputValue('1234');
        expect(await lastNameField.getValidationsCount()).to.eq(1);

        await lastNameField.setInputValue('Tsunoda');
        expect(await lastNameField.getValidationsCount()).to.eq(0);
        
        //gender
        const genderField = await form.getSelectField('gender');
        expect(await genderField.getLabelText()).to.eq('Gender *');

        await genderField.selectByIndex(1);
        expect(await genderField.isOptionSelected('female')).to.be.true;
        
        const creditCardTypeField = await form.getSelectField('creditCardType');
        expect(await creditCardTypeField.getLabelText()).to.eq('Credit Card *');
        await creditCardTypeField.selectByValue('mastercard');
        expect(await creditCardTypeField.isOptionSelected('mastercard')).to.be.true;

        const submitError = await form.findElement('submitError');
        await submitError.click();

        const submitSuccess = await form.findElement('submitSuccess');
        await submitSuccess.click();
    });
});


