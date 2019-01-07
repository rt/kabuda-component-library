import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Alert.css';
import cx from 'classnames';
import Base from '../Base';

class Alert extends Base {

    constructor(props) {
        super(props);
        
        this.state = {}
        this.handleClose = () => { this.setState( {closed: true} ) };
    }

    render() {
        let cls = null;
        switch (this.props.type) {
            case 'danger':
                cls = cx(s.panel, s.danger);
                break;
        }
        return this.state.closed ? null : (
            <div data-e2e={this.e2e()} className={cls}>
                <span onClick={this.handleClose} className={s.closebtn}>&times;</span>
                {this.props.children}
            </div>
        );
    }
};

Alert.propTypes = {
    type: PropTypes.string,    
    children: PropTypes.node,
};

export default withStyles(s)(Alert);
