import { setupStore } from '../stores/data-store';

describe('data-store', () => {
    let store;
    beforeAll(() => {
        store = setupStore();
    });

    beforeEach(() => {
        store.reinitialize();
    });

    describe('#createUiData', () => {
        test('should create all apps ui data for a given language, then set current app', () => {
            store.createUiData({
                apps: {
                    a: {
                        en: {},
                        ja: {},
                    },
                    b: {
                        en: {},
                        ja: {},
                    },
                },
            }, 'en');

            store.setCurrentUiData('b');

            let currentUiData = store.getUiData();

            expect(currentUiData.app).toBe('b');
            expect(currentUiData.isCurrentApp).toBe(true);

            store.setCurrentUiData('a');
            currentUiData = store.getUiData();
            expect(currentUiData.app).toBe('a');
            expect(currentUiData.isCurrentApp).toBe(true);
        });
    });
});
