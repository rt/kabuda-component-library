import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reference.css';
import Base from '../../../components/Base';
import Hr from '../../../components/Hr';
import { stores, events } from '../../../libs/reference';

class Reference extends Base {
    constructor(props) {
        super(props);

        const store = stores.dataStore.getStore();
        this.state = store.getReference();

        store.subscribe(events.reference.CHANGE, this, () => {
            this.setState(store.getReference());
        });
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <p>Reference provides the patterns for the current application for mainly developers.  Developers can extend reference to show new patterns, components, etc.  Reference should not be used in the main application and
                    Reference specific routes and components are contained within the reference route.  Reference can easily be removed from production.
                </p>

                <Hr />

                <h5>isomorphic</h5>
                <a target="_blank" href="https://facebook.github.io/react/">React</a><br />
                <a target="_blank" href="https://github.com/kriasoft/universal-router">universal-router</a><br />
                <a target="_blank" href="https://github.com/kriasoft/react-starter-kit">react-starter-kit</a><br />
                <Hr />

                <h5>css</h5>
                <a target="_blank" href="https://github.com/kriasoft/isomorphic-style-loader">isomorphic-style-loader</a><br />
                <Hr />

                <h5>other dependencies</h5>
                <a target="_blank" href="https://www.npmjs.com/package/moment">moment</a><br />
                <a target="_blank" href="https://www.npmjs.com/package/accounting">accounting</a><br />
                <a target="_blank" href="https://www.npmjs.com/package/kabuda">accounting</a><br />
                <Hr />

                <h5>3rd party components</h5>
                <a target="_blank" href="https://github.com/intljusticemission/react-big-calendar">react-big-calendar</a><br />
                <a target="_blank" href="https://github.com/Hacker0x01/react-datepicker">react-datepicker</a><br />
                <Hr />

                <h5>Web Accessibility</h5>
                <a target="_blank" href="https://www.w3.org/TR/wai-aria/roles">aria roles</a><br />
            </div>
        );
    }
}

export default withStyles(s)(Reference);
