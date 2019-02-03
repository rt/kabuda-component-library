import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

import { setup as referenceSetup } from '../libs/reference';
import { stores as homeStores, setup as homeSetup } from '../libs/home';
import uiData from '../ui-data';

process.env.NODE_ENV = 'test';
process.env.SKELETON_DB_NAME = 'unit';

// For components
// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
['.css', '.scss', '.md', '.png', '.jpg', '.jpeg', '.gif', '.svg'].forEach((ext) => {
    require.extensions[ext] = () => null;
});

before(() => {
    chai.use(sinonChai);
    chai.use(chaiAsPromised);
    chai.should();
});

beforeEach(() => {
    const store = homeSetup({
        uiData,
        lang: 'en',
    });
    store.setCurrentUiData('reference');

    homeStores.stateStore.getStateStore().reinitialize();

    referenceSetup(null, null, null, null);
});

afterEach(() => {
    // this.sandbox.restore();
});


require('babel-register');
