import Settings from './settings';

describe.skip('settings', () => {
    /**
     * this is an injector function once applied it remains
     * on all actions for the duration of the tests
     */
    describe('#setupActionUI', () => {
        test('should setup action top methods to handle errors and log to the server ...', (done) => {
            // stubServerLogging();

            const actions = {};
            // create a dummy class
            actions.MyClass = class extends Base {
                constructor() {
                    super();
                }

                apiDummyMethod() {
                    return new Promise(((resolve, reject) => {
                        // throw new Error('blah');
                        const a = {};
                        const b = a.b.c;
                    }));
                }
            };

            const settings = new Settings();
            settings.setupActionUI({}, {}, actions);

            const action = new actions.MyClass();
            action.logErrorMessage = sinon.spy;

            let caught = false;
            action.apiDummyMethod().catch((error) => {
                // error should be thrown to be caught by implementor
                caught = true;
                expect(error).toBeInstanceOf(Error);
                expect(action.logErrorMessage).toHaveBeenCalled(); // this isn't working with es6
                done();
            });
        });
    });
});

