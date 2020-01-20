import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Inputs.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import cx from 'classnames';
import InputText from '../../../components/InputText';
import InputSelect from '../../../components/InputSelect';
import InputCheckBox from '../../../components/InputCheckBox';
import InputCheckBoxCustom from '../../../components/InputCheckBoxCustom';
import InputRadioButton from '../../../components/InputRadioButton';
import InputRadioButtonCustom from '../../../components/InputRadioButtonCustom';
import InputTextArea from '../../../components/InputTextArea';
import InputStarRating from '../../../components/InputStarRating';
import InputRange from '../../../components/InputRange';
import InputLike from '../../../components/InputLike';
import InputSwitch from '../../../components/InputSwitch';
import Label from '../../../components/Label';

export class Inputs extends Base {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            textArea: '',
            selectedKey: 'female',
            checked: false,
            rangeValue: 50,
            like: false,
            switch: false,
            rating: 3,
            radioModels: [
                {
                    val: 'val1',
                    text: 'Val1',
                },
                {
                    val: 'val2',
                    text: 'Val2',
                },
                {
                    val: 'val3',
                    text: 'Val3',
                },
            ],
            radioSelection: 'val2',
        };

        this.handleTextChange = (name, val) => { this.setState({ text: val }); };
        this.handleTextAreaChange = (name, val) => { this.setState({ textArea: val }); };
        this.handleSelectChange = (val) => { this.setState({ selectedKey: val }); };
        this.handleCheckBoxChange = (name, val) => { this.setState({ checked: val }); };
        this.handleLike = (val) => { this.setState({ like: val }); };
        this.handleSwitch = (val) => { this.setState({ switch: val }); };
        this.handleRange = (val) => { this.setState({ rangeValue: val }); };
        this.handleRadioClick = (name, val) => { this.setState({ radioSelection: val }); };
        this.handleRatingClick = (val) => { this.setState({ rating: val }); };
    }

    getOptions = () => [
        {
            value: 'Male',
            key: 'male',
        },
        {
            value: 'Female',
            key: 'female',
        },
    ]

    getRadios = () => {
        const radios = this.state.radioModels.map((model, index) => (<span key={index} data-e2e="radioContainer"><InputRadioButton
            name="group"
            model={model}
            valuePath="val"
            selection={this.state.radioSelection}
            onClick={this.handleRadioClick}
        /> {model.text}&nbsp;
                                                                     </span>
        ));
        return <div>{radios}</div>;
    }

    getCustomRadios = () => {
        const radios = this.state.radioModels.map((model, index) => (<span key={index} data-e2e="radioContainer"><InputRadioButtonCustom
            name="groupCustom"
            model={model}
            valuePath="val"
            selection={this.state.radioSelection}
            onClick={this.handleRadioClick}
        /> {model.text}&nbsp;
                                                                     </span>
        ));
        return <div>{radios}</div>;
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="">
                    <SubSection>
                        <div key="main">
                            <form>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="textInputLabel" htmlFor="text">
                                                InputText: {this.state.text}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputText
                                                id="text"
                                                name="text"
                                                value={this.state.text}
                                                onChange={this.handleTextChange}
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="textInputAreaLabel" htmlFor="textarea">
                                                InputTextArea: {this.state.textArea}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputTextArea
                                                id="text"
                                                name="text"
                                                value={this.state.textArea}
                                                onChange={this.handleTextAreaChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="selectLabel" htmlFor="gender">
                                                InputSelect: {this.state.selectedKey}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputSelect
                                                onChange={this.handleSelectChange}
                                                keyPath="key"
                                                valuePath="value"
                                                options={this.getOptions()}
                                                selectedKey={this.state.selectedKey}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="checkboxLabel" htmlFor="checkBox">
                                                InputCheckBox: {this.state.checked ? 'true' : 'false'}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputCheckBox
                                                id="checkBox"
                                                name="checkBox"
                                                onChange={this.handleCheckBoxChange}
                                                checked={this.state.checked}
                                            />
                                        </div>
                                        <div>
                                            <InputCheckBoxCustom
                                                id="customCheckBox"
                                                name="checkBox"
                                                onChange={this.handleCheckBoxChange}
                                                checked={this.state.checked}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="radiosLabel">
                                                InputRadioButton: {this.state.radioSelection}
                                            </Label>
                                        </div>
                                        <div>
                                            {this.getRadios()}
                                        </div>
                                        <div>
                                            {this.getCustomRadios()}
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="starRatingLabel">
                                                InputStarRating: {this.state.rating}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputStarRating
                                                onClick={this.handleRatingClick}
                                                rating={this.state.rating}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label htmlFor="range">
                                                InputRange: <output htmlFor="range" id="price">{this.state.rangeValue}</output>
                                            </Label>
                                        </div>
                                        <div>
                                            <InputRange
                                                id="range"
                                                min={0}
                                                max={1000}
                                                value={this.state.rangeValue}
                                                onInput={this.handleRange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="switchLabel" htmlFor="switch">
                                                InputSwitch: {this.state.switch ? 'true' : 'false'}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputSwitch
                                                value={this.state.switch}
                                                onClick={this.handleSwitch}
                                            />&nbsp;
                                            <InputSwitch
                                                type="round"
                                                value={this.state.switch}
                                                onClick={this.handleSwitch}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={s.row}>
                                    <div className={cx(s.column)}>
                                        <div>
                                            <Label data-e2e="likeLabel" htmlFor="like">
                                                InputLike: {this.state.like ? 'true' : 'false'}
                                            </Label>
                                        </div>
                                        <div>
                                            <InputLike
                                                id="like"
                                                like={this.state.like}
                                                onClick={this.handleLike}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
            </div>
        );
    }
}

export default withStyles(s)(Inputs);
