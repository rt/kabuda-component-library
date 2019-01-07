import { printError } from '../../utils/utils';
import chai from 'chai';
import Home from '../../../src/components/apps/home/Home/Home.auto';
import Admin from '../../../src/components/apps/home/Admin/Admin.auto';
import Bar from '../../../src/components/apps/home/Bar/Bar.auto';
import Register from '../../../src/components/apps/home/Register/Register.auto';
import { getDriver } from '../../config';
import UIDATA from '../../../src/ui-data';
const uiData = UIDATA.apps.home.en;

const expect = chai.expect;

describe('Registration', function() {

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

    //need to clear automation db ...
    it.skip('should register a new user and log them in', async function() {

        const homeRoute = new Home(driver);
        homeRoute.navigate();
        await homeRoute.rootLoaded();

        const bar = new Bar(driver);
        await bar.rootLoaded();

        expect(await bar.getRegisterText()).to.equal('Register');
        await bar.clickRegister();
        
        const registerRoute = new Register(driver);
        await registerRoute.rootLoaded();
        await registerRoute.inputUsername('tester@example.com');
        await registerRoute.inputPassword('tester');
        await registerRoute.clickRegisterBtn();
    
        await homeRoute.rootLoaded();
        //expect(await homeRoute.getFeature1()).to.equal(uiData.translations.shootout.title);
        
        await bar.clickLogout();
    });

    it('should not be able to register with bad creds');

});


