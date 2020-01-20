import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemDetailsFlow.css';
import cx from 'classnames';
import ItemForm from '../ItemForm';
import ItemDetails from '../ItemDetails';
import ItemFormDetails from '../ItemFormDetails';
import ItemFormLocation from '../ItemFormLocation';
import ItemFormImage from '../ItemFormImage';
import Base from '../../../components/Base';
import Tabs from '../../../components/Tabs';
import Link from '../../../components/Link';
import { actions, stores, events } from '../../../libs/reference';

export class ItemDetailsFlow extends Base {
    static contextTypes = {
        history: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            form: this.props.form,
            currentForm: 'basic',
        };
    }

    componentWillMount() {
        stores.stateStore.getStore().subscribe(events.formItemState.CHANGE, this, (form) => {
            this.setState({ form });
        });
    }

    handleChange = (fieldKey, value) => {
        actions.items.updateItemFormValue(this.props.model.id, fieldKey, value);
    }

    handleSave = () => {
        actions.items.updateItem(this.props.model.id).then(() => {
            this.context.history.push(`${this.props.model.route}/show`);
        });
    }

    handleCancel = () => {
        actions.items.initItemForm(this.props.model.id).then(() => {
            this.context.history.push(`${this.props.model.route}/show`);
        });
    }

    getForm = () => {
        switch (this.state.currentForm) {
        case 'basic':
            return (<ItemForm
                form={this.state.form}
                onChange={this.handleChange}
            />);
        case 'details':
            return (<ItemFormDetails
                form={this.state.form}
                onChange={this.handleChange}
            />);
        case 'location':
            return (<ItemFormLocation
                form={this.state.form}
                onChange={this.handleChange}
            />);
        case 'image':
            return (<ItemFormImage
                form={this.state.form}
                onChange={this.handleChange}
            />);
        }
    }

    getView = () => {
        if (this.props.state === 'edit') {
            return (
                <div className={s.view}>
                    <Tabs
                        array={this.uiData.lookupTables.itemFormTabs}
                        keyPath="key"
                        textPath="name"
                        currentSelection={this.state.currentForm}
                        onClick={(key) => { this.setState({ currentForm: key }); }}
                    />
                    {this.getForm()}
                </div>
            );
        }
        return (
            <div className={s.view}>
                <ItemDetails
                    model={this.props.model}
                />
            </div>
        );
    }

    getControls = () => {
        if (this.props.state === 'edit') {
            return (
                <div className={s.controls}>
                    <div>
                        <Link
                            data-e2e="save"
                            onClick={this.handleSave}
                        >save
                        </Link>
                        <span aria-hidden="true" role="presentation"> | </span>
                        <Link
                            data-e2e="cancel"
                            onClick={this.handleCancel}
                        >cancel
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className={s.controls}>
                <div>
                    <Link
                        data-e2e="edit"
                        to={`${this.props.model.route}/edit`}
                    >edit
                    </Link>
                    <span aria-hidden="true" role="presentation"> | </span>
                    <Link
                        data-e2e="delete"
                        onClick={() => { this.props.onDelete(this.props.model.id); }}
                    >delete
                    </Link>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.root, s.container)}>
                {this.getControls()}
                {this.getView()}
            </div>
        );
    }
}

ItemDetailsFlow.propTypes = {
    onDelete: PropTypes.func.isRequired,
};

export default withStyles(s)(ItemDetailsFlow);
