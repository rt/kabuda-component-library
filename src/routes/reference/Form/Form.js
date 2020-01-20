import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './Form.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import FieldInputText from '../../../components/FieldInputText';
import FieldSelect from '../../../components/FieldSelect';
import Button from '../../../components/Button';
import FieldSet from '../../../components/FieldSet';
import { stores, events } from '../../../libs/reference';

export class Form extends Base {
    constructor(props) {
        super(props);

        this.state = {
            form: props.form,
        };

        this.handleChange = this.handleChange.bind(this);
        this.getField = this.getField.bind(this);
        this.submitFail = this.submitFail.bind(this);
        this.submitSuccess = this.submitSuccess.bind(this);
    }

    componentWillMount() {
        this.stateStore = stores.stateStore.getStore();
        this.stateStore.subscribe(events.formExState.CHANGE, this, () => {
            const state = this.state;
            state.form = this.stateStore.getFormEx();
            this.setState(state);
        });
    }

    componentDidUnMount() {
        // unsubscribe
    }

    handleChange(fieldKey, value) {
        const form = this.stateStore.getFormEx();
        form.changeValue(fieldKey, value);
        this.stateStore.updateFormEx(form);
    }

    submitFail() {
        const form = this.stateStore.getFormEx();
        form.checkRequired();
        this.stateStore.updateFormEx(form);
    }

    submitSuccess() {
    }

    getField(key) {
        return this.state.form.getField(key);
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <Section title="">
                    <SubSection>
                        <div key="main">
                            <form data-e2e="form">
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <FieldSelect
                                            data-e2e="activity"
                                            options={this.getField('activity').options}
                                            field={this.getField('activity')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="firstName"
                                            field={this.getField('firstName')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="lastName"
                                            field={this.getField('lastName')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className={s.column}>
                                        <FieldSelect
                                            data-e2e="gender"
                                            options={this.getField('gender').options}
                                            field={this.getField('gender')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="date"
                                            field={this.getField('date')}
                                        />
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="couponCode"
                                            field={this.getField('couponCode')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <FieldSet
                                    legend="Credit Card"
                                >
                                    <div className={s.row}>
                                        <div className={s.column}>
                                            <FieldSelect
                                                data-e2e="creditCardType"
                                                options={this.getField('creditCard').options}
                                                field={this.getField('creditCard')}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={s.row}>
                                        <div className={s.column}>
                                            <FieldInputText
                                                data-e2e="creditCardNumber"
                                                field={this.getField('creditCardNumber')}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={s.column}>
                                            <FieldInputText
                                                data-e2e="cvv"
                                                field={this.getField('cvv')}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className={s.column}>
                                            <FieldInputText
                                                data-e2e="expirationDate"
                                                field={this.getField('expirationDate')}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                </FieldSet>
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="address"
                                            field={this.getField('address')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="phone"
                                            field={this.getField('phone')}
                                            value=""
                                        />
                                    </div>
                                    <div className={s.column}>
                                        <FieldInputText
                                            data-e2e="email"
                                            field={this.getField('email')}
                                            onBlur={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={s.column}>
                                        <Button
                                            data-e2e="submitError"
                                            variant="secondary"
                                            onClick={this.submitFail}
                                        >Submit (fake error)
                                        </Button>
                                        <Button
                                            data-e2e="submitSuccess"
                                            variant="primary"
                                            onClick={this.submitSuccess}
                                        >Submit (fake success)
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Form);
