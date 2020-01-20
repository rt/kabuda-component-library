import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemForm.css';
import cx from 'classnames';
import FieldInputText from '../../../components/FieldInputText';
import FieldSelect from '../../../components/FieldSelect';
import Base from '../../../components/Base';
import { stores } from '../../../libs/home';

const getStore = stores.dataStore.getStore;
const getStateStore = stores.stateStore.getStateStore;
const stateEvents = stores.stateStore.stateEvents;

export class ItemForm extends Base {
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
                        <FieldInputText
                            data-e2e="name"
                            field={this.props.form.getField('itemName')}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                <div className={s.row}>
                    <div className={s.column}>
                        <FieldSelect
                            data-e2e="category"
                            field={this.getCategoryField('category')}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
            </form>
        );
    }
}


export default withStyles(s)(ItemForm);
