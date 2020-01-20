import chai from 'chai';
// import { getGames } from './games';
// import ServerSessionStorage from '../stores/server-session-store';
import { getStore, setupStore } from '../stores/state-store/state-store';
// import RouteHistory from '../models/route-history';

const expect = chai.expect;

describe('#games', () => {
    let store,
        stateStore;
    before(() => {
        // store = setupStore();
        // stateStore = setupStateStore();
    });

    beforeEach(() => {
        // store.reinitialize();
        // stateStore.reinitialize();
    });

    describe('#addRecentlyViewedRoute', () => {

        // beforeEach(() => {
        // store.reinitialize();
        // stateStore.reinitialize();
        // });

        // it('should add to store', () => {

        // addRecentlyViewedRoute('/some/route', 'Name');
        // const manager = stateStore.getRouteHistoryManager();

        // expect(manager.recentlyViewedRoutes.length).to.eq(1);
        // });

    });
});
