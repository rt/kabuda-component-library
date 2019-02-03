import fs from 'fs';

export const printError = async function (driver) {
    console.log('Taking Screenshot on error ... /automation/shapshot.png');
    const data = await driver.takeScreenshot();
    return fs.writeFile('./snapshot.png', data.replace(/^data:image\/png;base64,/, ''), 'base64');
};

// export const sleep = function(ms) {
    // return new Promise((resolve) => {
// setTimeout(() => {
// resolve();
// }, 100);
    // });
// };
