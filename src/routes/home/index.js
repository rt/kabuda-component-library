import React from 'react';
import Home from './components/Home';
import Layout from '../../components/Layout';

export default {
    action(context) {
        const title = 'Home';
        return {
            title,
            component: (
                <Layout><Home title={title} /></Layout>
            ),
        };
    },
};
