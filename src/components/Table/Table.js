import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Table.css';
import cx from 'classnames';
import Base from '../Base';
import { utils } from 'kabuda';

export class Table extends Base {
    
    constructor(props) {
        super(props);

    }

    getHeaderText = (displayField) => {
        //if there's a text property use that
        if (displayField.text) {
            return this.translate(displayField.text);
        }

        const formField = this.props.form.fields.find(field => {
            return field.key === displayField.path;
        });

        if (formField) {
            return formField.fieldName;
        }
    }

    getHeader = () => {

        if (this.props.displayFields) {
            return this.props.displayFields.map((displayField, index) => {
                return <th key={index}>{this.getHeaderText(displayField)}</th>;
            });
        } 

    }

    rowClick = (e, item, index) => {
        this.props.onRowClick && this.props.onRowClick(item, index);
    }

    getItems = () => {

        function isEven(num) {
            return num % 2 === 0;
        }

        return this.props.items.map((item, index) => {
            let classes = [];
            if (this.props.selectedIndex === index) {
                classes.push(s.selectedRow);
            } else {
                classes.push(isEven(index) ? s.evenRow : s.oddRow);
            }

            return <tr className={cx(...classes)} onClick={(e) => {this.rowClick(e, item, index)}} key={index}>{this.getRow(item)}</tr>;
        });
    }

    getRow = (item) => {

        if (this.props.displayFields) {
            return this.props.displayFields.map((displayField, index)=> {
                let val = null;
                if (displayField.fn) {
                    val = displayField.fn(item);
                } else if (displayField.lookupTable) {
                    val = this.props.lookupTables.getName(displayField.lookupTable, item[displayField.path]);
                } else {
                    val = utils.GetSet.get(item, displayField.path);
                }
                return <td key={index}>{val}</td>;
            });
        } 
    }

    render() {
        return (
            <table data-e2e={this.e2e()} className={s.tableAll}>
                <thead>
                    <tr>{this.getHeader()}</tr>
                </thead>
                <tbody>
                    {this.getItems()}
                </tbody>
            </table>
        );
    }
};

Table.propTypes = {
    items: PropTypes.array,
    onRowClick: PropTypes.func,
    displayFields: PropTypes.array,
    selectedIndex: PropTypes.number,
};

export default withStyles(s)(Table);
