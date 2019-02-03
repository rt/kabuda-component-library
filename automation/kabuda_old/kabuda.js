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
const list = fs.readdirSync('./scenarios');
const newList = list.filter(file => file.indexOf('\.json') !== -1 && file.indexOf('\.swp') === -1);

newList.forEach((file) => {
    const s = fs.readFileSync(p.join('scenarios', file), 'utf8');
    const scenario = JSON.parse(s);
    describe(scenario.name, function () {
        this.timeout(99999999);
        let driver;
        this.driver = driver; // give to mocha for catching errors
        before((done) => {
            driver = new webdriver.Builder()
                .forBrowser('chrome')
                // withCapabilities({
                // 'browserName': 'phantomjs',
                // 'phantomjs.binary.path': '../node_modules/phantomjs/bin/phantomjs'
            // }).
                .usingServer('http://localhost:4444/wd/hub')
                .build();

            let url = scenario.url || process.env.AUTOMATION_BASE_URL;
            console.log(`Loading URL: ${url}`);
            url = scenario.path ? url + path : url;
            driver.get(url);
            // Browser Sync thing in the upper right
            // driver.wait(() => {
            // //document(By.id('__bs_notify__')), 5000).then(() => {
            // setTimeout(function() {
            // done();
            // }, 5000);
            // });
            const delay = scenario.delay || 0;
            setTimeout(() => {
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

        scenario.tests.forEach((t) => {
            it(t.name, (done) => {
                kabuda.run(driver, t.actions, done);
            });
        });
    });
});

let kabuda = {

    getXPath(path) {
        let xpath = '';
        const parts = path.split('.');
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (isNaN(parseInt(part, 10))) {
                // path
                xpath += `//*[@data-e2e="${part}"]`;
            } else {
                // index
                xpath += `/*[${part}]`;
            }
        }
        return xpath;
    },

    run(driver, scenario, done) {
        Promise.all(scenario.map((parts) => {
            const fn = parts.shift();
            return kabuda[fn](driver, parts);
        })).then(() => {
            done();
        }).catch((e) => {
            console.log('Taking Screenshot on error ... /automation/shapshot.png');
            driver.takeScreenshot().then((data) => {
                fs.writeFile('./snapshot.png', data.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {
                    if (err) throw err;
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
    getElement(driver, path) {
        const xpath = kabuda.getXPath(path);
        // console.log('XPATH: ' + xpath);
        return driver.findElement(By.xpath(xpath));
    },

    // actions -----------

    /**
     * @return {Promise}
     */
    click(driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).click();
    },

    /**
     * @return {Promise}
     */
    sendKeys(driver, parts) {
        const path = parts.shift();
        const keys = parts.shift();
        return kabuda.getElement(driver, path).sendKeys(keys);
    },

    // input or textarea only otherwise no effect
    clear(driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).clear();
    },

    takeScreenshot(driver, savePath) {
        return driver.takeScreenshot().then((data) => {
            fs.writeFile('./snapshot.png', data.replace(/^data:image\/png;base64,/, ''), 'base64', (err) => {
                if (err) throw err;
            });
        });
    },

    // assert ----------

    /**
     * @return {Promise}
     */
    assertText(driver, parts) {
        const path = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getText().then((text) => {
            expect(text).to.eq(eqText);
        });
    },

    /**
     * @return {Promise}
     */
    assertHasText(driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).getText().then((text) => {
            expect(text.length > 0).to.be.true;
        });
    },

    /**
     * @return {Promise}
     */
    assertAttribute(driver, parts) {
        const path = parts.shift();
        const attr = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getAttribute(attr).then((text) => {
            expect(text).to.eq(eqText);
        });
    },

    // computed style (colors hex values (e.g. #00ff00))
    assertCssValue(driver, parts) {
        const path = parts.shift();
        const cssProp = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getCssValue(cssProp).then(text => text === eqText);
    },

    assertIsDisplayed(driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).isDisplayed().then(val => val);
    },

    assertIsSelected(driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).isSelected().then(val => val);
    },

    assertIsEnabled(driver, parts) {
        const path = parts.shift();
        return kabuda.getElement(driver, path).isEnabled().then(val => val);
    },

    assertTextContains(driver, parts) {
        const path = parts.shift();
        const eqText = parts.shift();
        return kabuda.getElement(driver, path).getText().then(text => text.indexOf(eqText) !== -1);
    },

    // computed location
    assertLocation(driver, parts) {
        const path = parts.shift();
        const x = parts.shift();
        const y = parts.shift();
        return kabuda.getElement(driver, path).getLocation().then(loc => loc.x === x && loc.y === y);
    },

    // computed size of bounding box
    assertSize(driver, parts) {
        const path = parts.shift();
        const width = parts.shift();
        const height = parts.shift();
        return kabuda.getElement(driver, path).getLocation().then(size => size.width === width && size.height === height);
    },

    // until ----------

    untilIsVisible(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsVisible(kabuda.getElement(driver, path)), 10000);
    },

    untilIsNotVisible(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsNotVisible(kabuda.getElement(driver, path)), 1000);
    },

    untilIsDisabled(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsDisabled(kabuda.getElement(driver, path)), 1000);
    },

    untilIsEnabled(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsEnabled(kabuda.getElement(driver, path)), 1000);
    },

    untilIsSelected(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsSelected(kabuda.getElement(driver, path)), 1000);
    },

    untilIsNotSelected(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.elementIsNotSelected(kabuda.getElement(driver, path)), 1000);
    },

    untilIsLocated(driver, parts) {
        const path = parts.shift();
        const xpath = kabuda.getXPath(path);
        console.log(`XPATH: ${xpath}`);
        return driver.wait(until.elementIsLocated(By.xpath(xpath))).then((ele) => {
            console.log('GOOD!');
            console.log(!!ele);
        });
    },

    untilIsStale(driver, parts) {
        const path = parts.shift();
        return driver.wait(until.stalenessOf(kabuda.getElement(driver, path)), 1000);
    },

    untilTextIs(driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.elementTextIs(kabuda.getElement(driver, path), str), 1000);
    },

    untilTextContains(driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.elementTextContains(kabuda.getElement(driver, path), str), 1000);
    },

    untilTextMatches(driver, parts) {
        const path = parts.shift();
        const regex = new RegExp(parts.shift());
        return driver.wait(until.elementTextMatches(kabuda.getElement(driver, path), regex), 1000);
    },

    untilTitleIs(driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.titleIs(kabuda.getElement(driver, path), str), 1000);
    },

    untilTitleContains(driver, parts) {
        const path = parts.shift();
        const str = parts.shift();
        return driver.wait(until.titleContains(kabuda.getElement(driver, path), str), 1000);
    },

    untilTitleMatches(driver, parts) {
        const path = parts.shift();
        const regex = new RegExp(parts.shift());
        return driver.wait(until.titleMatches(kabuda.getElement(driver, path), regex), 1000);
    },
};

