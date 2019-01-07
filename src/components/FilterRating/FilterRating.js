import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FilterRating.css';
import cx from 'classnames';
import Base from '../Base';
import StarRating from '../StarRating';
import InputCheckBox from '../InputCheckBox';
import Badge from '../Badge';

/**
 */
export class FilterRating extends Base {

    static MAX_RATING = 5;

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.getInputs = this.getInputs.bind(this);
    }

    handleChange(name, val) {
        let ratings = this.props.ratings;
        let changedRating = ratings.find(rating => {
            return rating.value.toString() === name;
        });
        changedRating.isSelected = !changedRating.isSelected;
        this.props.onRatingChange(ratings);
    }

    getInputs() {
        const list = [];
        this.props.ratings.forEach((rating) => {
            list.push(
                <div className={cx(s.line)} key={rating.value}>
                    <InputCheckBox 
                        name={rating.value.toString()}
                        checked={rating.isSelected}
                        onChange={this.handleChange}
                    />
                    <span className={cx(s.stars)}>
                        <StarRating
                            rating={rating.value}
                            maxRating={FilterRating.MAX_RATING}
                        />
                    </span>
                    <Badge number={rating.filterCount} />
                </div>
            );
        });
        return list;
    };

    render() {
        return (
            <div data-e2e={this.e2e()}>
                {this.getInputs()}
            </div>
        );
    }
};

FilterRating.propTypes = {
};

export default withStyles(s)(FilterRating);
