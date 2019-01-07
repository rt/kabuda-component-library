import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputFile.css';
import cx from 'classnames';
import Base from '../Base';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';

export class InputFile extends Base {

    constructor(props) {
        super(props);
        
        this.state = {
            fileName: this.props.defaultName || 'Choose a file ...'
        }
    }

    handleChange = (e) => {
        var fileName = '';
        if( e.target.files && e.target.files.length > 1 ) {
            fileName = ( e.target.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', e.target.files.length );
        } else {
            fileName = e.target.value.split( '\\' ).pop();
        }

        this.setState({fileName: fileName || 'Choose a file ...'});

        //leave it to the implementor?
        //URL.createObjectURL(e.target.files[0]);
        this.props.onChange && this.props.onChange(e.target.files);

    }

    render() {

        const { id, like, ...rest} = this.props;

        return (
            <span className={s.root}>
                <input 
                    onChange={this.handleChange} 
                    type="file" 
                    name="file" 
                    id="file" 
                    className={s.inputFile} 
                    data-multiple-caption="{count} files selected"
                    multiple
                />
                <label htmlFor="file">{this.state.fileName}</label>
            </span>
        );
    }
};

export default withStyles(s)(InputFile);
