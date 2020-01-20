import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import router from './router';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import { models, setup as homeSetup } from './libs/home';
import { setup as referenceSetup, stores as referenceStores } from './libs/reference';
import uiData from './ui-data';

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at:', p, 'reason:', reason);
    // send entire app down. Process manager will restart it
    process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', 1);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//
// Register API middleware
// -----------------------------------------------------------------------------


// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
    try {
        const css = new Set();

        // Enables critical path CSS rendering
        // https://github.com/kriasoft/isomorphic-style-loader
        const insertCss = (...styles) => {
            // eslint-disable-next-line no-underscore-dangle
            styles.forEach(style => css.add(style._getCss()));
        };

        //determine the language to server 
        const supportedLanguages = ['en', 'ja'];
        //this tries to find the best match between the server supported languages and the browser requested ones
        console.log('Browser Locales (Requested): ' + req.headers['accept-language']);
        const lang = req.acceptsLanguages('en', 'ja') || 'en';  

        //general stores
        const store = homeSetup({
            fetch: nodeFetch,
            uiData: uiData,
            lang: lang,
            systemData: {
                versionTag: process.env.APP_TAG
            }
        });

        //reference stores
        referenceSetup(null, null, nodeFetch);
        
        store.setCurrentUiData('home');

        const data = {};
        data.styles = [{ id: 'css', cssText: [...css].join('') }];

        const scripts = new Set();
        const addChunk = chunk => {
            if (chunks[chunk]) {
                chunks[chunk].forEach(asset => scripts.add(asset));
            } else if (__DEV__) {
                throw new Error(`Chunk with name '${chunk}' cannot be found`);
            }
        };
        addChunk('client');
        // if (route.chunk) addChunk(route.chunk);
        // if (route.chunks) route.chunks.forEach(addChunk);

        data.scripts = Array.from(scripts);

        data.store = `
            var __store__ = ${JSON.stringify(store.serialize())};
            var __referenceStore__ = ${JSON.stringify(referenceStores.dataStore.getStore().serialize())};
        `.trim();

        const html = ReactDOM.renderToStaticMarkup(<Html config={config} {...data} />);
        res.status(200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        next(err);
    }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(pe.render(err));
    const html = ReactDOM.renderToStaticMarkup(
        <Html
            config={config}
            title="Internal Server Error"
            description={err.message}
            styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
        >
            {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
        </Html>,
    );
    res.status(err.status || 500);
    res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
if (!module.hot) {
    app.listen(config.port, () => {
        console.info(`The server is running at http://localhost:${config.port}/`);
    });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('./router');
}

export default app;
