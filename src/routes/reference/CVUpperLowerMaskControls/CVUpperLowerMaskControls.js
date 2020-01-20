import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CVUpperLowerMaskControls.css';
import Base from '../../../components/Base';
import InputRadioButton from '../../../components/InputRadioButton';
import ColorSliders from '../../../components/ColorSliders';

export class CVUpperLowerMaskControls extends Base {
    constructor(props) {
        super(props);

        this.state = {

            lowerMask: this.props.lowerMask || [],
            upperMask: this.props.upperMask || [],

            maskSeletionOptions: [
                {
                    val: 'lower',
                    text: 'Lower',
                },
                {
                    val: 'upper',
                    text: 'Upper',
                },
            ],
            maskSelection: 'lower',

        };
    }

    handleLowerMaskChange = (scalar) => {
        this.props.onChange(scalar, this.props.upperMask);
    }

    handleUpperMaskChange = (scalar) => {
        this.props.onChange(this.props.lowerMask, scalar);
    }


    getRadios = () => {
        const radios = this.state.maskSeletionOptions.map((model, index) => (<span key={index} data-e2e="radioContainer"><InputRadioButton
            name="maskSelection"
            model={model}
            valuePath="val"
            selection={this.state.maskSelection}
            onClick={this.handleMaskSelectionChange}
        /> {model.text}&nbsp;
                                                                             </span>
        ));
        return <div>{radios}</div>;
    }

    handleMaskSelectionChange = (name, val) => {
        this.setState({ maskSelection: val });
    }

    getControls = () => {
        if (this.state.maskSelection === 'lower') {
            return (
                <div>
                    <div><b>Lower</b></div>
                    <ColorSliders
                        scalar={this.state.lowerMask}
                        onChange={this.handleLowerMaskChange}
                    />
                </div>
            );
        }
        return (
            <div>
                <div><b>Upper</b></div>
                <ColorSliders
                    scalar={this.state.upperMask}
                    onChange={this.handleUpperMaskChange}
                />
            </div>
        );
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                {this.getRadios()}
                {this.getControls()}
            </div>
        );
    }
}

export default withStyles(s)(CVUpperLowerMaskControls);
