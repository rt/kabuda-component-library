import { addRecentlyViewedRoute, addHistoryRoute } from './route-setup';
import { setupStore } from '../stores/data-store';
import { getStateStore, setupStateStore } from '../stores/state-store';
import RouteHistory from '../models/route-history';

describe('#route-setup', () => {
    let store,
        stateStore;
    beforeAll(() => {
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

        test('should add to store', () => {
            addRecentlyViewedRoute('/some/route', 'Name');
            const manager = stateStore.getRouteHistoryManager();

            expect(manager.recentlyViewedRoutes.length).toBe(1);
        });
    });

    describe('#addHistoryRoute', () => {
        beforeEach(() => {
            store.reinitialize();
            stateStore.reinitialize();
        });

        test('should add to store', () => {
            addHistoryRoute(new RouteHistory({
                path: '/some/path',
                timestamp: new Date(),
            }));
            const manager = stateStore.getRouteHistoryManager();

            expect(manager.historyRoutes.length).toBe(1);
        });
    });
});
