import chai from 'chai';
import { addRecentlyViewedRoute, addHistoryRoute } from './route-setup';
import { setupStore } from '../stores/data-store';
import { getStateStore, setupStateStore } from '../stores/state-store';
import RouteHistory from '../models/route-history';

const expect = chai.expect;

describe('#route-setup', () => {

    let store, stateStore;
    before(() => {
        store = setupStore();
        stateStore = setupStateStore();
    });

    beforeEach(() => {
        store.reinitialize();
        stateStore.reinitialize();
    });

    describe('#addRecentlyViewedRoute', () => {

        beforeEach(() => {
            store.reinitialize();
            stateStore.reinitialize();
        });

        it('should add to store', () => {

            addRecentlyViewedRoute('/some/route', 'Name');
            const manager = stateStore.getRouteHistoryManager();

            expect(manager.recentlyViewedRoutes.length).to.eq(1);
        });

    });
    
    describe('#addHistoryRoute', () => {

        beforeEach(() => {
            store.reinitialize();
            stateStore.reinitialize();
        });

        it('should add to store', () => {

            addHistoryRoute(new RouteHistory({
                path: '/some/path',
                timestamp: new Date()
            }));
            const manager = stateStore.getRouteHistoryManager();

            expect(manager.historyRoutes.length).to.eq(1);
        });

    });
});
