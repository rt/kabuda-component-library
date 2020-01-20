import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './FormDynamic.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import FieldInputText from '../../../components/FieldInputText';
import FieldSelect from '../../../components/FieldSelect';
import Button from '../../../components/Button';
import Label from '../../../components/Label';
import InputTextArea from '../../../components/InputTextArea';
import Tabs from '../../../components/Tabs';
import CodeEditor from '../../../components/CodeEditor';
import { models } from '../../../libs/reference';

export class FormDynamic extends Base {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'config',
            form: new models.FormEx(props.config),
            config: JSON.stringify(props.config, null, 4),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleCodeEditorChange = val => this.setState({ config: val });
        this.getField = this.getField.bind(this);
        this.submit = this.submit.bind(this);
        this.getView = this.getView.bind(this);
    }

    handleChange(fieldKey, value) {
        const state = this.state;
        state.form.changeValue(fieldKey, value);
        this.setState(state);
    }

    handleTabClick(key) {
        const state = this.state;
        state.currentTab = key;
        if (key === 'output') {
            state.form = new models.FormEx(JSON.parse(this.state.config));
        }
        this.setState(state);
    }

    submit() {
        // const stateStore = getStateStore();
        // let form = stateStore.getFormEx();
        // form.checkRequired();
        // stateStore.updateFormEx(form);
    }

    getField(key) {
        return this.state.form.getField(key);
    }

    getFields() {
        // another way to create dynamically is wo/jsx React.createElement
        const components = {
            FieldInputText,
            FieldSelect,
        };

        return this.state.form.fields.map((field, index) => {
            const Component = components[field.component];
            return (<div key={index} className={s.row}>
                <div className={s.column}>
                    <Component
                        key={index}
                        field={this.getField(field.key)}
                        onChange={this.handleChange}
                    />
                </div>
                    </div>);
        });
    }

    getView() {
        if (this.state.currentTab === 'config') {
            return (
                <div>
                    <Label>Config</Label>
                    <CodeEditor
                        onChange={this.handleCodeEditorChange}
                        source={this.state.config}
                    />
                </div>
            );
        }
        return (
            <div className={s.column}>
                {this.getFields()}
                <div className={s.row}>
                    <div className={s.column}>
                        <Button
                            variant="primary"
                            onClick={this.submit}
                        >Submit
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="">
                    <SubSection>
                        <div key="main">
                            <Tabs
                                array={[{ text: 'Config', key: 'config' }, { text: 'Output', key: 'output' }]}
                                keyPath="key"
                                textPath="text"
                                currentSelection={this.state.currentTab}
                                onClick={this.handleTabClick}
                            />
                            {this.getView()}
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(FormDynamic);
