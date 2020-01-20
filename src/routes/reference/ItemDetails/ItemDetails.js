import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemDetails.css';
import cx from 'classnames';
import Base from '../../../components/Base';
import StarRating from '../../../components/StarRating';
import { models } from '../../../libs/home';

const LookupTable = models.LookupTable;

export class ItemDetails extends Base {
    constructor(props) {
        super(props);

        this.lookupTables = new LookupTable(this.uiData.lookupTables);
    }

    getFeatures = () => this.props.model.info.features.map((feature, index) => {
        const name = this.lookupTables.getName('itemFeatures', feature);
        if (index !== (this.props.model.info.features.length - 1)) {
            return `${name} - `;
        }
        return name;
    });

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.root, s.container)}>
                <h3 data-e2e="title" className={s.title}>{this.props.model.itemName} </h3>
                {this.props.model.info.price} <br />
                {this.lookupTables.getName('itemCategories', this.props.model.category)} <br />
                {this.getFeatures()} <br />
                <div>
                    <StarRating
                        rating={this.props.model.info.rating}
                        maxRating={5}
                    /> {`(${Math.trunc(Math.round(this.props.model.info.rating * 10)) / 10})`}
                </div>

            </div>
        );
    }
}

export default withStyles(s)(ItemDetails);
