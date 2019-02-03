import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Video.css';
import cx from 'classnames';
import Base from '../Base';

/**
 *  MP4, WebM, and Ogg
 *  It is a good idea to always include width and height attributes. If height and width are not set, the page might flicker while the video loads.
 */
export class Video extends Base {
    constructor(props) {
        super(props);
    }


    // You have to wait until the browser knows the duration of the video before you can seek to a particular time.
    componentDidMount() {
        // this.videoRef.addEventListener('loadedmetadata', function() {
        // this.currentTime = 50;
        // }, false);
    }

    handleClick = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop; // need to add window.pageYOffset or scrolledContainerElement.scrollTop
        console.log(`X: ${x}`);
        console.log(`Y: ${y}`);

        console.log(e.target.clientWidth);
        console.log(e.target.clientHeight);
    }

    render() {
        const {
            type, src, responsive, ...rest
        } = this.props;
        if (this.props.autoPlay) {
            return (
                <video
                    autoPlay
                    className={cx(responsive ? s.responsive : s.normal)}
                    onClick={this.handleClick}
                >
                    <source src={src} type="video/mp4" />
                </video>
            );
        }
        return (
            <video
                className={cx(responsive ? s.responsive : s.normal)}
                onClick={this.handleClick}
            >
                <source src={src} type="video/mp4" />
            </video>
        );
    }
}

export default withStyles(s)(Video);
