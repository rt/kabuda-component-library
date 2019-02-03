import React from 'react';
import PropTypes from 'prop-types';
import { actions as homeActions, stores, models } from '../libs/home';

const ContextType = {
    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    insertCss: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
    currentPath: PropTypes.string.isRequired,
    history: PropTypes.object,
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
// class App extends React.PureComponent {
class App extends React.Component {
    constructor(props) {
        super(props);

        const store = stores.dataStore.getStore();
        store.subscribe(stores.dataStore.events.BLAH, this, () => {
            // console.log('BLAH Store fired');
        });

        this.state = {
            appState: new models.AppState({
                overlays: {},
            }),
            data: {
                items: [], // stores.dataStore.getStore().getItems()
            },
        };
    }

    static propTypes = {
        context: PropTypes.shape(ContextType).isRequired,
        children: PropTypes.element.isRequired,
    };

    static childContextTypes = ContextType;

    getChildContext() {
        return this.props.context;
    }

    // this wont be called on the server
    componentDidMount() {
        // console.log('App MOUNTED');
        const stateStore = stores.stateStore.getStateStore();
        // we have to set here because it is the first time we can get the state store (afaik)
        stateStore.setAppState(this.state.appState);

        stateStore.subscribe(stores.stateStore.stateEvents.APP_STATE_CHANGE, this, (appState) => {
            // console.log('state store fired');

            const state = this.state;
            state.appState = appState;
            this.setState(state);
        });

        window.onclick = function (event) {
            // console.log('App: handle window click');
            homeActions.appState.closeOverlays();
        };

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(() => { console.log('Service Worker Registered'); });
        }
    }

    componentDidUnMount() {
        // console.log('App UNMOUNTED');
    }

    render() {
        // console.log('render: App');
        return React.cloneElement(this.props.children, { appState: this.state.appState });
    }
}

export default App;
