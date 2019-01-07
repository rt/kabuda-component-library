import webdriver from 'selenium-webdriver';

export const baseUrl = process.env.AUTOMATION_BASE_URL || `localhost:3001`;

export const getDriver = function() {

    const capabilities = {
        browserName: 'chrome',
        chromeOptions: {
            //mobileEmulation: {
                //deviceName: "Nexus 5"
            //},
            //args: ['--disable-plugins']
        }

    };

    const builder = new webdriver.Builder();

    builder.withCapabilities(capabilities);

    if (process.env.USE_GRID === 'true') {
        builder.usingServer('http://localhost:4444/wd/hub');
        //builder.usingServer('http://192.168.86.220:4444/wd/hub');
    }

    const driver = builder.build();

    return driver;
};
