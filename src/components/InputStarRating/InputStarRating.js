import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './InputStarRating.css';
import Base from '../Base';

export class InputStarRating extends Base {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onClick && this.props.onClick(parseFloat(e.target.getAttribute('data-value')));
        e.preventDefault();
    }

    // getList() {
    // let stars = [5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, .5];
    // let list = [];
    // stars.forEach(star => {
    // let cls = Math.ceil(star) === star ? s.full : s.half
    // list.push(
    // <span><input type="radio" id={"star" + star} name="rating" value={star} /><label className={cls} for={"star" + star} title={"Awesome - " + star + " stars"}></label></span>
    // );
    // });
    // return list;
    // }

    render() {
        const { rating, ...rest } = this.props;

        // if i set htmlFor it doesnt work ...
        return (
            <fieldset data-e2e={this.e2e()} onClick={this.handleClick} className={s.rating}>
                <input type="radio" id="star5" name="rating" value="5" checked={rating === 5} readOnly />
                <label className={s.full} htmlFor="star5" data-value="5" title="5 stars" />

                <input type="radio" id="star4half" name="rating" value="4.5" checked={rating === 4.5} readOnly />
                <label className={s.half} htmlFor="star4half" data-value="4.5" title="4.5 stars" />

                <input type="radio" id="star4" name="rating" value="4" checked={rating === 4} readOnly />
                <label className={s.full} htmlFor="star4" data-value="4" title="4 stars" />

                <input type="radio" id="star3half" name="rating" value="3.5" checked={rating === 3.5} readOnly />
                <label className={s.half} htmlFor="star3half" data-value="3.5" title="3.5 stars" />

                <input type="radio" id="star3" name="rating" value="3" checked={rating === 3} readOnly />
                <label className={s.full} htmlFor="star3" data-value="3" title="3 stars" />

                <input type="radio" id="star2half" name="rating" value="2.5" checked={rating === 2.5} readOnly />
                <label className={s.half} htmlFor="star2half" data-value="2.5" title="2.5 stars" />

                <input type="radio" id="star2" name="rating" value="2" checked={rating === 2} readOnly />
                <label className={s.full} htmlFor="star2" data-value="2" title="2 stars" />

                <input type="radio" id="star1half" name="rating" value="1 and a half" checked={rating === 1.5} readOnly />
                <label className={s.half} htmlFor="star1half" data-value="1.5" title="1.5 stars" />

                <input type="radio" id="star1" name="rating" value="1" checked={rating === 1} readOnly />
                <label className={s.full} htmlFor="star1" data-value="1" title="1 star" />

                <input type="radio" id="starhalf" name="rating" value="half" checked={rating === 0.5} readOnly />
                <label className={s.half} htmlFor="starhalf" data-value="0.5" title="0.5 stars" />
            </fieldset>

        );
    }
}

InputStarRating.propTypes = {
    rating: PropTypes.number,
    onClick: PropTypes.func,
};

export default withStyles(s)(InputStarRating);
