import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Chip.css';
import cx from 'classnames';
import Base from '../Base';

/**
 * - make image optional
*/
class Chip extends Base {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleClose = () => { this.setState({ closed: true }); };
    }

    render() {
        return this.state.closed ? null : (
            <span data-e2e={this.e2e()} className={cx(s.root)}>
                <img src={this.props.img} alt={this.props.alt} />
                {this.props.text}
                &nbsp;<span onClick={this.handleClose} className={s.closebtn}>&times;</span>
            </span>
        );
    }
}

Chip.propTypes = {
};

export default withStyles(s)(Chip);
