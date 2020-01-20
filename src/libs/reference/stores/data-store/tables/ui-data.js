// import UiData from '../../../models/uiData';
//
// const TABLE_NAME = 'uiData';
//
// export const events = {
//     CHANGE: 'uiDataChange',
// };
//
// export default {
//     name: TABLE_NAME,
//     model: UiData,
//     methods: {
//     /**
//      * Create all ui data
//      * @param {object} uiData
//      * @param {string} lang
//      */
//     // createUiData(uiData, lang) {
//     // for (let app in uiData.apps) {
//     // let data = uiData.apps[app][lang];
//     // if (data) {
//     // data.app = app;
//     // this.create(TABLE_NAME, new UiData(data));
//     // }
//     // }
//     // }
//
//     /**
//      * Set the current app (for PF apps only)
//      * @param {string} currentApp
//      */
//     // setCurrentUiData(currentApp) {
//     // let list = this.all(TABLE_NAME);
//
//     // const current = list.find(data => {
//     // return data.isCurrentApp === true;
//     // });
//
//     // if (current) {
//     // if (current.app === currentApp) {
//     // //if its already the current app
//     // return;
//     // }
//
//     // delete current.isCurrentApp;
//     // this.update(TABLE_NAME, current);
//     // }
//
//     // const newCurrent = list.find(data => {
//     // return data.app === currentApp;
//     // });
//     // newCurrent.isCurrentApp = true;
//     // this.update(TABLE_NAME, newCurrent);
//     // }
//
//     /**
//      * Get current app ui data
//      * @return {UiData}
//      */
//     // getUiData() {
//     // return this.find(TABLE_NAME, data => {
//     // return data.isCurrentApp === true;
//     // })[0];
//     // }
//
//     }
// }
