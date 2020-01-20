import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemFormDetails.css';
import cx from 'classnames';
import FieldInputText from '../../../components/FieldInputText';
import FieldSelect from '../../../components/FieldSelect';
import DatePickerRange from '../../../components/DatePickerRange';
import Base from '../../../components/Base';

export class ItemFormDetails extends Base {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    getCategoryField = (key) => {
        const field = this.props.form.getField(key);
        field.options = this.uiData.lookupTables.filterFeatureList.map(cat =>
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
                            data-e2e="rating"
                            field={this.props.form.getField('info.rating')}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                <div className={s.row}>
                    <div className={s.column}>
                        <FieldSelect
                            data-e2e="features"
                            field={this.getCategoryField('info.features')}
                            onChange={this.props.onChange}
                        />
                    </div>
                </div>
                <div className={s.row}>
                    <div className={s.column}>
                        <DatePickerRange
                            selectedDay={this.state.selectedDay}
                        />
                    </div>
                </div>
            </form>
        );
    }
}


export default withStyles(s)(ItemFormDetails);
