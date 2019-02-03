import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Audio.css';
import cx from 'classnames';
import Base from '../Base';

/**
 */
export class Audio extends Base {
    constructor(props) {
        super(props);
    }


    // You have to wait until the browser knows the duration of the video before you can seek to a particular time.
    componentDidMount() {
        // this.videoRef.addEventListener('loadedmetadata', function() {
        // this.currentTime = 50;
        // }, false);
    }

    render() {
        return (
            <audio
                controls
            >
                <source src={this.props.src} type="audio/mpeg" />
            </audio>
        );
    }
}

export default withStyles(s)(Audio);
