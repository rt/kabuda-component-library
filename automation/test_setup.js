//import fs from 'fs';
//import { driver } from './config';

before(function() {
});

beforeEach(function () {
    //console.log('TESTING ...');
});

afterEach(function () {
    //if (this.currentTest.state == 'failed') {
        //console.log('Taking Screenshot on error ... /automation/shapshot.png');
        //this.currentTest.driver.takeScreenshot().then(function(data) {
            //console.log('Writing ...');
            //fs.writeFile('./snapshot.png', data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                //if(err) throw err;
            //});
        //});
    //}
});

after(function() {
    //probably need single instance of config
    //driver.quit();
});

//
require('babel-register');
