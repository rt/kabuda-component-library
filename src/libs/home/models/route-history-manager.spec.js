import chai from 'chai';
import RouteHistoryManager from './route-history-manager';
import RouteDefinition from './route-definition';
import RouteHistory from './route-history';

const expect = chai.expect;

describe('RouteHistoryManager', () => {
    let model;

    describe('#deserialize', () => {
        it('should deserialize properties', () => {
            model = new RouteHistoryManager({
                historyRoutes: [{ path: 'blah' }],
                recentlyViewedRoutes: [{ text: 'Item Name' }],
            });

            expect(model.historyRoutes[0]).to.be.instanceof(RouteHistory);
            expect(model.recentlyViewedRoutes[0]).to.be.instanceof(RouteDefinition);
        });
    });

    describe('#getBreadCrumbRoutes', () => {
        it('should return array of route definitions for a given path', () => {
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

            expect(routes.length).to.eq(2);
            expect(routes[0].text).to.eq('Reference');
            expect(routes[1].text).to.eq('Item Details');
        });

        it('should look thru recently viewed routes to get item text ', () => {
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

            expect(routes.length).to.eq(3);
            expect(routes[0].text).to.eq('Reference');
            expect(routes[1].text).to.eq('Item Details');
            expect(routes[2].text).to.eq('Item 2');
        });
    });

    describe('#getRecentlyViewedRoutes', () => {
        it('should return array of recently viewed route definitions if childs of the given paths', () => {
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

            expect(routes.length).to.eq(2);
            expect(routes[0].text).to.eq('Item Details');
            expect(routes[1].text).to.eq('Tables');

            routes = model.getRecentlyViewedRoutes(['/reference', '/']);

            expect(routes.length).to.eq(3);
            expect(routes[0].text).to.eq('Reference');
            expect(routes[1].text).to.eq('Item Details');
            expect(routes[2].text).to.eq('Tables');

            routes = model.getRecentlyViewedRoutes(['/reference', '/reference/itemDetails']);

            expect(routes.length).to.eq(3);
            expect(routes[0].text).to.eq('Item Details');
            expect(routes[1].text).to.eq('Tables');
            expect(routes[2].text).to.eq('Item 1');
        });

        it('should not include duplicates', () => {
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

            expect(routes.length).to.eq(1);
            expect(routes[0].text).to.eq('Item Details');
        });
    });
});
