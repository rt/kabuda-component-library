import chai from 'chai';
import { setupStore } from './state-store';

const expect = chai.expect;

describe('data-store', () => {
    let store;
    before(() => {
        store = setupStore();
    });

    beforeEach(() => {
        store.reinitialize();
    });

    // describe('#createUiData', () => {

    // it('should create all apps ui data for a given language, then set current app', () => {
    // store.createUiData({
    // apps: {
    // a: {
    // en: {},
    // ja: {}
    // },
    // b: {
    // en: {},
    // ja: {}
    // }
    // }
    // }, 'en');

    // store.setCurrentUiData('b');

    // let currentUiData = store.getUiData();

    // expect(currentUiData.app).to.eq('b');
    // expect(currentUiData.isCurrentApp).to.be.true;

    // store.setCurrentUiData('a');
    // currentUiData = store.getUiData();
    // expect(currentUiData.app).to.eq('a');
    // expect(currentUiData.isCurrentApp).to.be.true;
    // });

    // });
});
