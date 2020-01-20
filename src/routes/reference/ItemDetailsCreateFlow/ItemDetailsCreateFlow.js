import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemDetailsCreateFlow.css';
import cx from 'classnames';
import StatusTag from '../StatusTag';
import ItemForm from '../ItemForm';
import ItemFormDetails from '../ItemFormDetails';
import ItemFormLocation from '../ItemFormLocation';
import ItemFormImage from '../ItemFormImage';
import ItemDetails from '../ItemDetails';
import Base from '../../../components/Base';
import Button from '../../../components/Button';
import { stores, models, events } from '../../../libs/reference';

/**
 * ItemDetailsCreateFlow manages the flow state locally but leaves the data/form management to its implementor
 */
export class ItemDetailsCreateFlow extends Base {
    constructor(props) {
        super(props);

        this.state = {
            form: this.props.form,
            view: 'basic',
        };
    }

    componentWillMount() {
        stores.stateStore.getStore().subscribe(events.formItemState.CHANGE, this, (form) => {
            this.setState({ form });
        });
    }

    getCancelBtn = () => (<Button
        data-e2e="cancel"
        onClick={this.props.onCancel}
    >Cancel
    </Button>)

    getSaveBtn = () => (<Button
        data-e2e="save"
        onClick={this.props.onSave}
        variant="primary"
    >Finish
    </Button>)

    getSteps = () => {
        const list = this.uiData.lookupTables.itemFormTabs.map((tab, index) => {
            if (tab.key === this.state.view) {
                return <span key={index} className={cx(s.step, s.active)} />;
            }
            return <span key={index} className={cx(s.step)} />;
        });
        return (<div className={s.stepContainer}>
            {list}
                </div>);
    }

    getView = () => {
        const view = this.state.view;
        switch (view) {
        case 'basic':
            return (
                <div className={s.view}>
                    <h2>Item</h2>
                    <ItemForm
                        form={this.state.form}
                        onChange={this.props.onChange}
                    />
                    <div className={s.controls}>
                        {this.getCancelBtn()}
                        <Button
                            data-e2e="details"
                            onClick={() => { this.setState({ view: 'details' }); }}
                        >Add Details
                        </Button>
                        {this.getSaveBtn()}
                    </div>
                    {this.getSteps()}
                </div>
            );

        case 'details':
            return (
                <div className={s.view}>
                    <h2>Item Details</h2>
                    <StatusTag status="todo" />
                    <ItemFormDetails
                        form={this.state.form}
                        onChange={this.props.onChange}
                    />
                    <div className={s.controls}>
                        {this.getCancelBtn()}
                        <Button
                            data-e2e="back"
                            onClick={() => { this.setState({ view: 'basic' }); }}
                        >Back
                        </Button>
                        <Button
                            data-e2e="back"
                            onClick={() => { this.setState({ view: 'location' }); }}
                        >Next
                        </Button>
                        {this.getSaveBtn()}
                    </div>
                    {this.getSteps()}
                </div>
            );

        case 'location':
            return (
                <div className={s.view}>
                    <h2>Item Location</h2>
                    <StatusTag status="todo" />
                    <ItemFormLocation
                        form={this.state.form}
                        onChange={this.props.onChange}
                    />
                    <div className={s.controls}>
                        {this.getCancelBtn()}
                        <Button
                            data-e2e="back"
                            onClick={() => { this.setState({ view: 'details' }); }}
                        >Back
                        </Button>
                        <Button
                            data-e2e="back"
                            onClick={() => { this.setState({ view: 'image' }); }}
                        >Next
                        </Button>
                        {this.getSaveBtn()}
                    </div>
                    {this.getSteps()}
                </div>
            );
        case 'image':
            return (
                <div className={s.view}>
                    <h2>Item Image Upload</h2>
                    <StatusTag status="todo" />
                    <ItemFormImage
                        form={this.state.form}
                        onChange={this.props.onChange}
                    />
                    <div className={s.controls}>
                        {this.getCancelBtn()}
                        <Button
                            data-e2e="back"
                            onClick={() => { this.setState({ view: 'location' }); }}
                        >Back
                        </Button>
                        {this.getSaveBtn()}
                    </div>
                    {this.getSteps()}
                </div>
            );
        }
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.root, s.container)}>
                {this.getView()}
            </div>
        );
    }
}

ItemDetailsCreateFlow.propTypes = {
    form: PropTypes.instanceOf(models.FormItem),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default withStyles(s)(ItemDetailsCreateFlow);
