import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ItemFormImage.css';
import cx from 'classnames';
import FieldInputText from '../../../components/FieldInputText';
import FieldSelect from '../../../components/FieldSelect';
import Base from '../../../components/Base';

export class ItemFormImage extends Base {
    constructor(props) {
        super(props);
    }

    handleUploadFile = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        data.append('name', 'some value user types');
        data.append('description', 'some value user types');
        // '/files' is your node.js route that triggers our middleware
        // axios.post('/files', data).then((response) => {
        // console.log(response); // do something with the response
        // });
    }

    render() {
        return (
            <form data-e2e={this.e2e()}>
                <div className={s.row}>
                    <div className={s.column}>
                        <input type="file" onChange={this.handleUploadFile} />
                    </div>
                </div>
            </form>
        );
    }
}


export default withStyles(s)(ItemFormImage);
