import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemFormLocation.css';
import cx from 'classnames';
import InputGoogleMap from '../../../components/InputGoogleMap';
import Base from '../../../components/Base';

export class ItemFormLocation extends Base {
    constructor(props) {
        super(props);
    }

    getCategoryField = (key) => {
        const field = this.props.form.getField(key);
        field.options = this.uiData.lookupTables.itemCategories.map(cat =>
            // fields need key/value
            ({
                key: cat.key,
                value: cat.name,
            }));
        return field;
    }

    render() {
        return (
            <form data-e2e={this.e2e()}>
                <div className={s.row}>
                    <div className={s.column}>
                        <InputGoogleMap
                            data-e2e="map"
                            field={this.props.form.getField('info.rating')}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
            </form>
        );
    }
}


export default withStyles(s)(ItemFormLocation);
