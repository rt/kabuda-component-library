import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReferenceTag.css';
import cx from 'classnames';
import Base from '../../../components/Base';

class ReferenceTag extends Base {

    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    static contextTypes = {
        uiData: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
    }

    getTitle() {

    }

    render() {
        return (
            <div>
                <h1>{this.getTitle()}</h1>
            </div>
        );
    }
}

ReferenceTag propTypes = {
};

export default withStyles(s)(ReferenceTag);
