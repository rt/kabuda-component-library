import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './FilterFeature.css';
import cx from 'classnames';
import Base from '../Base';
import InputCheckBox from '../InputCheckBox';
import Badge from '../Badge';

export class FilterFeature extends Base {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.getChildren = this.getChildren.bind(this);
    }

    handleClick(e) {
        const input = e.target;
        this.props.onClick(input.name, input.checked);
    }

    getChildren() {
        return this.props.features.map(feature => (
            <li key={feature.key} className={cx(s.line)}>
                <InputCheckBox name={feature.key} checked={feature.isSelected} className={cx(s.checkbox)} />
                <span className={cx(s.name)}>{feature.name}</span>
                <Badge className={cx(s.count)} number={feature.filterCount} />
            </li>
        ));
    }

    render() {
        return (
            <div data-e2e={this.e2e()}>
                <ul className={s.list} onClick={this.handleClick}>
                    {this.getChildren()}
                </ul>
            </div>
        );
    }
}

FilterFeature.propTypes = {
};

export default withStyles(s)(FilterFeature);
