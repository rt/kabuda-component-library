import React from 'react';
import Base from '../Base';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SurfaceBar.css';

class SurfaceBar extends Base {
    static propTypes = {
        children: PropTypes.node.isRequired,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                {React.cloneElement(this.props.children)}
            </div>
        );
    }
}

export default withStyles(s)(SurfaceBar);
