import React from 'react';
import Base from '../../../components/Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ReferenceList.css';
import cx from 'classnames';
import NavList from '../../../components/NavList';
import Divider from '../../../components/Divider';

class ReferenceList extends Base {
    constructor(props) {
        super(props);
    }

    getReferenceItemsByCategory = selection => this.props.routes.filter(item =>
    // remove third part stuff from ui (displayed in separate list)
        item.category === selection && item.subCategory !== 'ui-third-party')

    getReferenceItemsBySubCategory = selection => this.props.routes.filter(item => item.subCategory === selection)

    getThirdPartyUiComponents(selection) {
        if (selection === 'ui') {
            return (
                <div>
                    <Divider>third party</Divider>
                    <NavList
                        array={this.getReferenceItemsBySubCategory('ui-third-party')}
                        onSelection={this.props.onSelection}
                    />
                </div>
            );
        }
        return null;
    }

    render() {
        const selection = this.props.selection;
        return (
            <nav data-e2e={this.e2e()} className={cx(s.root, s.animateOpacity)}>
                <NavList
                    array={this.getReferenceItemsByCategory(selection)}
                    onSelection={this.props.onSelection}
                />
                {this.getThirdPartyUiComponents(selection)}
            </nav>
        );
    }
}

ReferenceList.propTypes = {
    selection: PropTypes.string.isRequired,
    onSelection: PropTypes.func,
    routes: PropTypes.array,
};
export default withStyles(s)(ReferenceList);
