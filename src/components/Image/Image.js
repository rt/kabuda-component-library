import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Image.css';
import cx from 'classnames';
import Base from '../Base';

export class Image extends Base {
    constructor(props) {
        super(props);
    }

    handleClick = (e) => {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        console.log(`X: ${x}`);
        console.log(`Y: ${y}`);

        console.log(e.target.clientWidth);
        console.log(e.target.clientHeight);
    }

    render() {
        // todo: should make actual types not class pass thru
        // let cls = null;
        // switch (this.props.type) {
        // case 'circle':
        // cls = 'circle';

        // break;
        // }
        const {
            type, src, responsive, ...rest
        } = this.props;

        let responsiveCls;
        switch (responsive) {
        case 'width':
            responsiveCls = s.responsive;
            break;
        case 'height':
            responsiveCls = s.responsiveHeight;
            break;
        default:
            responsiveCls = s.normal;
        }

        return (
            <img
                src={src}
                className={cx(responsiveCls, s[type])}
                onClick={this.handleClick}
                {...rest}
            />
        );
    }
}

export default withStyles(s)(Image);
