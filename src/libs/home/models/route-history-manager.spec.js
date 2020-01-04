import RouteHistoryManager from './route-history-manager';
import RouteDefinition from './route-definition';
import RouteHistory from './route-history';

describe('RouteHistoryManager', () => {
    let model;

    describe('#deserialize', () => {
        test('should deserialize properties', () => {
            model = new RouteHistoryManager({
                historyRoutes: [{ path: 'blah' }],
                recentlyViewedRoutes: [{ text: 'Item Name' }],
            });

            expect(model.historyRoutes[0]).toBeInstanceOf(RouteHistory);
            expect(model.recentlyViewedRoutes[0]).toBeInstanceOf(RouteDefinition);
        });
    });

    describe('#getBreadCrumbRoutes', () => {
        test('should return array of route definitions for a given path', () => {
            const path = '/reference/itemDetails';
            const routeDefinitions = [
                {
                    text: 'Reference',
                    route: '/reference',
                },
                {
                    text: 'Item Details',
                    route: '/reference/itemDetails',
                },
                {
                    text: 'Tables',
                    route: '/reference/tables',
                },
            ];
            model = new RouteHistoryManager({});
            const routes = model.getBreadCrumbRoutes(path, routeDefinitions);

            expect(routes.length).toBe(2);
            expect(routes[0].text).toBe('Reference');
            expect(routes[1].text).toBe('Item Details');
        });

        test('should look thru recently viewed routes to get item text ', () => {
            const path = '/reference/itemDetails/ID2';
            const routeDefinitions = [
                {
                    text: 'Reference',
                    route: '/reference',
                },
                {
                    text: 'Item Details',
                    route: '/reference/itemDetails',
                },
                {
                    text: 'Tables',
                    route: '/reference/tables',
                },
            ];
            model = new RouteHistoryManager({
                recentlyViewedRoutes: [
                    {
                        text: 'Item 1',
                        route: '/reference/itemDetails/ID1',
                    },
                    {
                        text: 'Item 2',
                        route: '/reference/itemDetails/ID2',
                    },
                ],
            });
            const routes = model.getBreadCrumbRoutes(path, routeDefinitions);

            expect(routes.length).toBe(3);
            expect(routes[0].text).toBe('Reference');
            expect(routes[1].text).toBe('Item Details');
            expect(routes[2].text).toBe('Item 2');
        });
    });

    describe('#getRecentlyViewedRoutes', () => {
        test('should return array of recently viewed route definitions if childs of the given paths', () => {
            const path = '/reference/itemDetails';
            const routeDefinitions = [
                {
                    text: 'Reference',
                    route: '/reference',
                },
                {
                    text: 'Item Details',
                    route: '/reference/itemDetails',
                },
                {
                    text: 'Tables',
                    route: '/reference/tables',
                },
                {
                    text: 'Item 1',
                    route: '/reference/itemDetails/ID1',
                },
            ];
            model = new RouteHistoryManager({
                recentlyViewedRoutes: routeDefinitions,
            });
            let routes = model.getRecentlyViewedRoutes(['/reference']);

            expect(routes.length).toBe(2);
            expect(routes[0].text).toBe('Item Details');
            expect(routes[1].text).toBe('Tables');

            routes = model.getRecentlyViewedRoutes(['/reference', '/']);

            expect(routes.length).toBe(3);
            expect(routes[0].text).toBe('Reference');
            expect(routes[1].text).toBe('Item Details');
            expect(routes[2].text).toBe('Tables');

            routes = model.getRecentlyViewedRoutes(['/reference', '/reference/itemDetails']);

            expect(routes.length).toBe(3);
            expect(routes[0].text).toBe('Item Details');
            expect(routes[1].text).toBe('Tables');
            expect(routes[2].text).toBe('Item 1');
        });

        test('should not include duplicates', () => {
            const path = '/reference/itemDetails';
            const routeDefinitions = [
                {
                    text: 'Reference',
                    route: '/reference',
                },
                {
                    text: 'Item Details',
                    route: '/reference/itemDetails',
                },
                {
                    text: 'Item Details',
                    route: '/reference/itemDetails',
                },
            ];
            model = new RouteHistoryManager({
                recentlyViewedRoutes: routeDefinitions,
            });
            const routes = model.getRecentlyViewedRoutes(['/reference']);

            expect(routes.length).toBe(1);
            expect(routes[0].text).toBe('Item Details');
        });
    });
});
