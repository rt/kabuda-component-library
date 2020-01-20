import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListDetails.css';
import Base from '../../../components/Base';
import NavList from '../../../components/NavList';
import Link from '../../../components/Link';
import Button from '../../../components/Button';
import ItemDetailsFlow from '../ItemDetailsFlow';
import ItemDetailsCreateFlow from '../ItemDetailsCreateFlow';
import { actions, stores } from '../../../libs/reference';

/**
 * ListDetails manages the data, determines what flows to initiate.  The flows themselves are resuable components.
 * The nav can contain all items, might be a good place to try react-virtual (only render the viewport) or react-infinite scrolling
*/
export class ListDetails extends Base {
    static contextTypes = {
        history: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.state = {
            createBtnDisabled: false,
        };
    }

    handleCreateSave = () => {
        actions.items.createItem('create').then((item) => {
            this.context.history.push(`${item.route}/show`);
        });
    }

    handleCreateCancel = () => {
        actions.items.clearItemForm('create').then(() => {
            this.context.history.push('/reference/listDetails');
        });
    }

    handleCreateChange = (fieldKey, value) => {
        actions.items.updateItemFormValue('create', fieldKey, value);
    }

    handleDelete = (key) => {
        actions.items.deleteItem(key).then(() => {
            this.context.history.push('/reference/listDetails');
        });
    }

    getDetails = () => {
        if (this.props.currentItem) {
            if (this.props.currentItem === 'create') {
                return (<ItemDetailsCreateFlow
                    form={stores.stateStore.getStore().getFormByKey('create')}
                    onSave={this.handleCreateSave}
                    onCancel={this.handleCreateCancel}
                    onChange={this.handleCreateChange}
                />);
            }
            return (<ItemDetailsFlow
                state={this.props.state}
                form={stores.stateStore.getStore().getFormByKey(this.props.currentItem.id)}
                model={this.props.currentItem}
                onDelete={this.handleDelete}
            />);
        }
        return <h1>Items are ...</h1>;
    }

    getMobileBody = () => {
        if (this.props.isListView) {
            return (
                <div className={s.mobileNav}>
                    <Button
                        onClick={this.create}
                        disabled={this.props.currentItem === 'create'}
                    >Create
                    </Button>
                    <NavList
                        array={this.props.items}
                        textPath="itemName"
                    />
                </div>
            );
        }
        return (
            <div className={s.innerMain}>
                <div className={s.backLink}>
                    <Link to="/reference/listDetails" ignoreHistory>Back to list </Link>
                </div>
                {this.getDetails()}
            </div>
        );
    }

    create = () => {
        this.context.history.push('/reference/listDetails/create');
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <div className={cx(s.list)}>
                    <Button
                        onClick={this.create}
                        disabled={this.props.currentItem === 'create'}
                    >Create
                    </Button>
                    <NavList
                        array={this.props.items}
                        textPath="itemName"
                    />
                </div>
                <div className={cx(s.main)}>
                    {this.getMobileBody()}
                </div>
            </div>
        );
    }
}

ListDetails.propTypes = {
    items: PropTypes.array.isRequired,
    currentItem: PropTypes.object,
    state: PropTypes.string,
};


export default withStyles(s)(ListDetails);
