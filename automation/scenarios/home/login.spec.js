import { printError } from '../../utils/utils';
import chai from 'chai';
import Home from '../../../src/components/apps/home/Home/Home.auto';
import Admin from '../../../src/components/apps/home/Admin/Admin.auto';
import Login from '../../../src/components/apps/home/Login/Login.auto';
import Bar from '../../../src/components/apps/home/Bar/Bar.auto';
import { getDriver } from '../../config';
import UIDATA from '../../../src/ui-data';
const uiData = UIDATA.apps.home.en;

const expect = chai.expect;

describe('Login', function() {

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

    it('should login with valid creds', async function() {

        const homeRoute = new Home(driver);
        homeRoute.navigate();
        await homeRoute.rootLoaded();

        const bar = new Bar(driver);
        await bar.rootLoaded();

        expect(await bar.getLoginText()).to.equal('Login');
        await bar.clickLogin();
        
        const loginRoute = new Login(driver);
        await loginRoute.rootLoaded();
        await loginRoute.inputUsername('admin@example.com');
        await loginRoute.inputPassword('admin');
        await loginRoute.clickLoginBtn();
    
        await homeRoute.rootLoaded();
        //expect(await homeRoute.getFeature1()).to.equal(uiData.translations.shootout.title);
        
        await bar.clickLogout();
    });

    it('should redirect to page you were on', async function() {
        const adminRoute = new Admin(driver);
        await adminRoute.navigate();
         
        //not logged in, should go to login route
        const loginRoute = new Login(driver);
        await loginRoute.rootLoaded();
        
        await loginRoute.inputUsername('admin@example.com');
        await loginRoute.inputPassword('admin');
        await loginRoute.clickLoginBtn();

        //back in admin
        //await adminRoute.rootLoaded();
        //expect(await adminRoute.getTitle()).to.eq('Admin Page');
    });

    it('should not be able to login with bad creds');

    it('should logout when clicking Logout');
});


