import fs from 'fs';
import p from 'path';
import webdriver from 'selenium-webdriver';
import chai from 'chai';

const until = webdriver.until;
const By = webdriver.By;
const expect = chai.expect;

/**
 * NOTES
 * css: [data-e2e="aaa"]:nth-child(1) [data-e2e="bbb"]
 * xpath: //*[@data-e2e="aaa"]/*[1]//[@data-e2e="bbb"]
 * phantomjs cant do nth-child() yet > temporarily using xpath
 *
 * phantomjs getText might not work!
 */
let list = fs.readdirSync('./scenarios'); 
let newList = list.filter(file => {
    return file.indexOf('\.json') !== -1 && file.indexOf('\.swp') === -1;
});

newList.forEach(file => {

    let s = fs.readFileSync(p.join('scenarios', file), 'utf8');
    let scenario = JSON.parse(s);
    describe(scenario.name, function () {
        this.timeout(99999999);
        let driver;
        this.driver = driver; //give to mocha for catching errors
        before((done) => {
            driver = new webdriver.Builder().
                forBrowser('chrome').
                //withCapabilities({
                //'browserName': 'phantomjs',
                //'phantomjs.binary.path': '../node_modules/phantomjs/bin/phantomjs'
            //}).
            usingServer('http://localhost:4444/wd/hub').
            build();

            let url = scenario.url || process.env.AUTOMATION_BASE_URL;
            console.log('Loading URL: '  + url);
            url = scenario.path ? url + path : url;
            driver.get(url);
            //Browser Sync thing in the upper right
            //driver.wait(() => {
                ////document(By.id('__bs_notify__')), 5000).then(() => {
                //setTimeout(function() {
                    //done();
                //}, 5000);
            //});
            let delay = scenario.delay || 0;
            setTimeout(function() {
                done();
            }, delay);
        });

        beforeEach(() => {
        });

        afterEach(() => {
        });

        after(() => {
            driver.quit();
        });

        scenario.tests.forEach(t => {
            it(t.name, done => {
                kabuda.run(driver, t.actions, done);
            });
        });
    });

});

let kabuda = {

    getXPath: function (path) {
        let xpath = '';
        const parts = path.split('.');
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            if (isNaN(parseInt(part, 10))) {
                //path
                xpath += '//*[@data-e2e="' + part + '"]';
            } else {
                //index
                xpath += '/*[' + part + ']';
            }
        }
        return xpath;
    },

    run: function (driver, scenario, done) {
        Promise.all(scenario.map(parts => {
            let fn = parts.shift();
            return kabuda[fn](driver, parts);
        })).then(() => {
            done();
        }).catch(e => {
            console.log('Taking Screenshot on error ... /automation/shapshot.png');
            driver.takeScreenshot().then(function(data) {
                fs.writeFile('./snapshot.png', data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                    if(err) throw err;
                });
            });
            throw e;
        });
    },

    /**
     * @param {WebDriver} driver
     * @param {string} path
     * @return {WebElementPromise}
     */
    getElement: function (driver, path) {
        const xpath = kabuda.getXPath(path);
        //console.log('XPATH: ' + xpath);
        return driver.findElement(By.xpath(xpath));
    },

    //actions -----------
    
    /**
     * @return {Promise}
     */
    click: function (driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).click();
    },
    
    /**
     * @return {Promise}
     */
    sendKeys: function (driver, parts) {
        const path = parts.shift();
        const keys = parts.shift();
        return kabuda.getElement(driver, path).sendKeys(keys);
    },

    //input or textarea only otherwise no effect
    clear: function (driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).clear();
    },

    takeScreenshot: function (driver, savePath) {
        return driver.takeScreenshot().then(function(data) {
            fs.writeFile('./snapshot.png', data.replace(/^data:image\/png;base64,/,''), 'base64', function(err) {
                if(err) throw err;
            });
        })
    },

    //assert ----------
    
    /**
     * @return {Promise}
     */
    assertText: function (driver, parts) {
        const path = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getText().then(text => {
            expect(text).to.eq(eqText);
        });
    },
    
    /**
     * @return {Promise}
     */
    assertHasText: function (driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).getText().then(text => {
            expect(text.length > 0).to.be.true;
        });
    },

    /**
     * @return {Promise}
     */
    assertAttribute: function (driver, parts) {
        const path = parts.shift();
        const attr = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getAttribute(attr).then(text => {
            expect(text).to.eq(eqText);
        });
    },
    
    //computed style (colors hex values (e.g. #00ff00))
    assertCssValue: function (driver, parts) {
        const path = parts.shift();
        const cssProp = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getCssValue(cssProp).then(text => {
            return text === eqText;
        });
    },
    
    assertIsDisplayed: function (driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).isDisplayed().then(val => {
            return val;
        });
    },
    
    assertIsSelected: function (driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).isSelected().then(val => {
            return val;
        });
    },

    assertIsEnabled: function (driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).isEnabled().then(val => {
            return val;
        });
    },

    assertTextContains: function (driver, parts) {
        const path = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getText().then(text => {
            return text.indexOf(eqText) !== -1;
        });
    },
    
    //computed location
    assertLocation: function (driver, parts) {
        const path = parts.shift();
        const x = parts.shift();
        const y = parts.shift();
        return kabuda.getElement(driver, path).getLocation().then(loc => {
            return loc.x === x && loc.y === y;
        });
    },
    
    //computed size of bounding box
    assertSize: function (driver, parts) {
        const path = parts.shift();
        const width = parts.shift();
        const height = parts.shift();
        return kabuda.getElement(driver, path).getLocation().then(size => {
            return size.width === width && size.height === height;
        });
    },

    //until ----------

    untilIsVisible: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsVisible(kabuda.getElement(driver, path)), 10000);
    },

    untilIsNotVisible: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsNotVisible(kabuda.getElement(driver, path)), 1000);
    },

    untilIsDisabled: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsDisabled(kabuda.getElement(driver, path)), 1000);
    },
    
    untilIsEnabled: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsEnabled(kabuda.getElement(driver, path)), 1000);
    },
    
    untilIsSelected: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsSelected(kabuda.getElement(driver, path)), 1000);
    },
    
    untilIsNotSelected: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsNotSelected(kabuda.getElement(driver, path)), 1000);
    },
    
    untilIsLocated: function (driver, parts) {
        const path = parts.shift();
        const xpath = kabuda.getXPath(path);
        console.log('XPATH: ' + xpath);
        return driver.wait(until.elementIsLocated(By.xpath(xpath))).then((ele) => {
            console.log('GOOD!');
            console.log(!!ele);
        });
    },

    untilIsStale: function (driver, parts) {
        const path = parts.shift();
        return driver.wait(until.stalenessOf(kabuda.getElement(driver, path)), 1000);
    },

    untilTextIs: function (driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.elementTextIs(kabuda.getElement(driver, path), str), 1000);
    },

    untilTextContains: function (driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.elementTextContains(kabuda.getElement(driver, path), str), 1000);
    },
    
    untilTextMatches: function (driver, parts) {
        const path = parts.shift();
        const regex = new RegExp(parts.shift());
        return driver.wait(until.elementTextMatches(kabuda.getElement(driver, path), regex), 1000);
    },

    untilTitleIs: function (driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.titleIs(kabuda.getElement(driver, path), str), 1000);
    },

    untilTitleContains: function (driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.titleContains(kabuda.getElement(driver, path), str), 1000);
    },
    
    untilTitleMatches: function (driver, parts) {
        const path = parts.shift();
        const regex = new RegExp(parts.shift());
        return driver.wait(until.titleMatches(kabuda.getElement(driver, path), regex), 1000);
    }
}

