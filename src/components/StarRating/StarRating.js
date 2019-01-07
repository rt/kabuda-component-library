import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './StarRating.css';
import cx from 'classnames';
import Base from '../Base';

export class StarRating extends Base {

    render() {
        const { percentage, ...rest} = this.props;

        const getStyle = () => {
            return {
                width: (this.props.rating/this.props.maxRating * 100) + '%'
            }
        };

        return (
            <span className={s.starRatingsCss}>
                <span className={s.starRatingsCssTop} style={getStyle()}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </span>
                <span className={s.starRatingsCssBottom}>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                    <span>★</span>
                </span>
            </span>

        );
    }
};

StarRating.propTypes = {
};

export default withStyles(s)(StarRating);
