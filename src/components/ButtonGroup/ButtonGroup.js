import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './ButtonGroup.css';
import cx from 'classnames';
import Base from '../Base';
import Button from '../Button';

export class ButtonGroup extends Base {
    
    constructor(props) {
        super(props);
    }

    getButtons = () => {
        return this.props.buttons.map((btnConfig, index) => {
            return <Button
                key={index}
                onClick={btnConfig.onClick}
                variant={btnConfig.variant}
                size={btnConfig.size}
            >{btnConfig.text}
            </Button>
        });
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={cx(s.root, this.props.isVert ? s.vert : s.hor)}>
                {this.getButtons()}
            </div>
        );
    }
};

ButtonGroup.propTypes = {
    buttons: PropTypes.array,
    isVert: PropTypes.bool,
};

export default withStyles(s)(ButtonGroup);
