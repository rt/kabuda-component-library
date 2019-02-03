import React from 'react';
import Home from './components/Home';


export default {

    path: '/',

    children: [
        {
            path: '/',
            async action(context) {
                const title = 'test';// getStore().getUiData().getRouteTitle(context.baseUrl + context.path);
                return {
                    title,
                    component: <Home title={title} />,
                };
            },
        },
        // {
        //     path: '/login',
        //     action(context) {
        //         const title = getStore().getUiData().getRouteTitle(context.baseUrl + context.path);
        //         return {
        //             title: title,
        //             component: <Layout><Login title={title}/></Layout>,
        //         };
        //     },
        //
        // },
        // {
        //     path: '/register',
        //     action(context) {
        //         const title = getStore().getUiData().getRouteTitle(context.baseUrl + context.path);
        //         return {
        //             title,
        //             component: <Layout><Register title={title} /></Layout>,
        //         };
        //     },
        //
        // },


    ],

};
