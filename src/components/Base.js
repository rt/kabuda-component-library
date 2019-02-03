import React from 'react';
import PropTypes from 'prop-types';
import { stores } from '../libs/home';
import { utils } from 'kabuda-liquid';

const getStore = stores.dataStore.getStore;

class Base extends React.Component {
    static contextTypes = {
        currentPath: PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.uiData = getStore().getUiData();
        this.systemData = getStore().getSystemData();
    }

    translate = (path) => {
        const translation = utils.GetSet.get(this.uiData.translations, path);
        if (translation === null) {
            return path;
        }
        return translation;
    }

    getParentPath = (path) => {
        const parts = path.split('/');
        parts.pop();
        return parts.join('/');
    }

    getRoutes = () => {
        const parentPath = this.getParentPath(this.context.currentPath);
        return this.uiData.routes.filter(item => parentPath === this.getParentPath(item.route));
    }

    getChildRoutes = () => {
        const parentPathPartsLength = this.context.currentPath.split('/').length;
        return this.uiData.routes.filter((item) => {
            const itemPathPartsLength = item.route.split('/').length;
            return item.route.startsWith(this.context.currentPath) && parentPathPartsLength === itemPathPartsLength - 1;
        });
    }

    /**
     * This is to support multiple outlets
     * @param {string} key
     * @return {Element}
     */
    getComponent = key => this.props.children.filter(comp => comp.key === key)

    /**
     * allow e2e override when specifying a particular instance amound multiple
     */
    e2e = () => this.props['data-e2e'] || this.constructor.name.replace(/^[A-Z]/, ch => ch.toLowerCase())
}

Base.propTypes = {
    e2e: PropTypes.string,
};

export default Base;
