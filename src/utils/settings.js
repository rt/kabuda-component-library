import NetworkError from '../errors/network-error';
import Ajax from '../utils/ajax';

let instance = null;
const API_METHOD_PREFIX = 'api';

export default class Settings {

    /**
     */
    constructor() {

        if (instance !== null) {
            return instance;
        }
        
        this.logLevel = { 
            DEBUG: 'debug',
            INFO: 'info',
            WARN: 'warn',
            ERROR: 'error'
        };

        this.customLog = {
            /**
             * used for recording session steps to log on error
             * @type {Array.<object>}
             */
            actions: [],

            /**
             * @type {Array.<object>}
             */
            innerStack: [],

            /**
             * request is recorded when there is a http request error
             */
            request: null
        };

        instance = this;
        return instance;
    }

    static getAllPropertyNames(ClsPrototype) {
        let methods = [];
        if (Object.getPrototypeOf(ClsPrototype)) {
            methods = Settings.getAllPropertyNames(Object.getPrototypeOf(ClsPrototype));
        }
        for (let key of Object.getOwnPropertyNames(ClsPrototype)) {
            methods.push(key);
        }
        return methods;
    }

    /**
     * call this on app load if you want actions server logging, etc.
     * @param {object} actions
     */
    setupActionUI(actions) {
        for (let cls in actions) {
            if (actions[cls].prototype) {
                let methods = Settings.getAllPropertyNames(actions[cls].prototype);
                methods.forEach((method) => {
                    if (method.indexOf(API_METHOD_PREFIX) === 0) {
                        this.interceptActionUI(actions, cls, method);
                    } 
                });
            } else {
                console.log('skeleton warn: this is not a valid action > ' + cls);
            }
        }
    }

    /**
     * @param {object} actions
     * @param {string} cls
     * @param {string} method
     */
    interceptActionUI(actions, cls, method) {
        if (
            actions[cls].prototype.hasOwnProperty(method) && 
                method !== 'constructor' && cls !== 'Promise' &&
                actions[cls].prototype[method] instanceof Function
        ) {

            if (this.DEBUG_LEVEL === 1) {
                console.log('Adding UI interface: ' + cls + '#' + method);
            }

            let settings = this;
            let old = actions[cls].prototype[method];
            /**
             * @return {Promise}
             */
            actions[cls].prototype[method] = function () {

                if (settings.debugLevel === 1) {
                    console.log('----- action: ' + cls + '#' + method + ' -----');
                }

                settings.customLog.actions.unshift(cls + '#' + method);
                settings.customLog.innerStack.length = 0; //clear
                return old.apply(this, arguments).catch((error) => {

                    if (error && error instanceof NetworkError) {
                        settings.customLog.request = error.request;
                    }

                    console.log(JSON.stringify(error));
                    Ajax.post('/log', {
                        type: 'UI error', 
                        stack: error.stack || error.toString() + ' | ' + JSON.stringify(settings.customLog) 
                    }).then((data) => {
                        //console.log(JSON.stringify(data));
                    });
                    throw error;
                });
            };
        }
    }
};

