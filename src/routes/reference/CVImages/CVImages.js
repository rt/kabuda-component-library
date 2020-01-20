import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CVImages.css';
import Base from '../../../components/Base';
import Image from '../../../components/Image';
import Hr from '../../../components/Hr';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import InputFile from '../../../components/InputFile';
import Scripts from '../../../utils/scripts';
import InputRadioButton from '../../../components/InputRadioButton';
import InputSelect from '../../../components/InputSelect';
import InputRange from '../../../components/InputRange';
import CVUpperLowerMaskControls from '../CVUpperLowerMaskControls';

export class CVImages extends Base {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            colorConversions: [
                {
                    key: 'COLOR_RGBA2GRAY',
                    value: 'RGB to Gray',
                },
                {
                    key: 'COLOR_RGB2HSV',
                    value: 'RGB to HSV',
                },
            ],
            colorConversionSelection: 'COLOR_RGBA2GRAY',

            lowerMask: [82, 7, 0, 0],
            upperMask: [174, 61, 49, 255],

            thresholdMethods: [
                {
                    val: 'threshold',
                    text: 'Basic',
                },
                {
                    val: 'adaptiveThreshold',
                    text: 'Adaptive',
                },
            ],
            thresholdMethodSelection: 'threshold',
            thresholdTypeSelection: 'THRESH_BINARY',
            thresholdValue: 150,

        };
    }

    componentDidMount() {
        Scripts.getOpenCv(document).then(() => {
            this.setState({ isLoading: false });

            const myImg = document.getElementById('myImg');

            myImg.onload = () => {
                this.src = cv.imread('myImg');
                console.log(`image width: ${this.src.cols}\n` +
                    `image height: ${this.src.rows}\n` +
                    `image size: ${this.src.size().width}*${this.src.size().height}\n` +
                    `image depth: ${this.src.depth()}\n` +
                    `image channels ${this.src.channels()}\n` +
                    `image type: ${this.src.type()}\n`);


                this.colorConversion(this.src, this.state.colorConversionSelection);
                this.threshold(this.src, this.state.thresholdMethodSelection, this.state.thresholdTypeSelection, this.state.thresholdValue);
                this.mask(this.src);
            };
            myImg.src = '/bball.jpg';
        });
    }

    handleFileChange = (files) => {
        if (files && files.length > 0) {
            const fr = new FileReader();
            fr.onload = () => {
                document.getElementById('myImg').src = fr.result;
            };
            fr.readAsDataURL(files[0]);
        }
    }

    // ----- COLOR -----
    //

    colorConversion = (src, colorConversion) => {
        const dst = new cv.Mat();
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow('colorConversion', dst);
        dst.delete();
    }

    handleColorConversionChange = (val) => {
        this.setState({ colorConversionSelection: val });
        this.colorConversion(this.src, val);
    }

    // ----- MASK -----
    //

    mask = (src) => {
        const dst = new cv.Mat();

        const low = new cv.Mat(src.rows, src.cols, src.type(), this.state.lowerMask);
        const high = new cv.Mat(src.rows, src.cols, src.type(), this.state.upperMask);
        cv.inRange(src, low, high, dst);

        cv.imshow('mask', dst);
        dst.delete();
    }

    handleMaskChange = (lowerMaskScalar, upperMaskScalar) => {
        this.setState({ lowerMask: lowerMaskScalar, upperMask: upperMaskScalar });
        this.mask(this.src);
    }

    // ----- THRESHOLD -----
    //
    getThresholdOptions = () => [
        {
            value: 'THRESH_BINARY',
            key: 'THRESH_BINARY',
        },
        {
            value: 'THRESH_BINARY_INV',
            key: 'THRESH_BINARY_INV',
        },
        {
            value: 'THRESH_TRUNC',
            key: 'THRESH_TRUNC',
        },
        {
            value: 'THRESH_TOZERO',
            key: 'THRESH_TOZERO',
        },
        {
            value: 'THRESH_OTSU',
            key: 'THRESH_OTSU',
        },
        {
            value: 'THRESH_TRIANGLE',
            key: 'THRESH_TRIANGLE',
        },
    ].filter((val) => {
        if (this.state.thresholdMethodSelection === 'adaptiveThreshold') {
            return val.value === 'THRESH_BINARY' || val.value === 'THRESH_BINARY_INV';
        }
        return true;
    })

    handleThresholdChange = (val) => {
        this.setState({ thresholdValue: val });
        this.threshold(this.src, this.state.thresholdMethodSelection, this.state.thresholdTypeSelection, val);
    }

    handleThresholdTypeChange = (val) => {
        this.setState({ thresholdTypeSelection: val });
        this.threshold(this.src, this.state.thresholdMethodSelection, val, this.state.thresholdValue);
    }

    getThresholdRadios = () => {
        const radios = this.state.thresholdMethods.map((model, index) => (<span key={index} data-e2e="radioContainer"><InputRadioButton
            name="thresholdMethods"
            model={model}
            valuePath="val"
            selection={this.state.thresholdMethodSelection}
            onClick={this.handleThresholdMethodChange}
        /> {model.text}&nbsp;
                                                                          </span>
        ));
        return <div>{radios}</div>;
    }

    handleThresholdMethodChange = (name, val) => {
        this.setState({ thresholdMethodSelection: val });
        this.threshold(this.src, val, this.state.thresholdTypeSelection, this.state.thresholdValue);
    }

    threshold = (src, method, type, threshold) => {
        // let dst = new cv.Mat();
        const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

        switch (method) {
        case 'threshold':
            cv.threshold(src, dst, threshold, 255, cv[type]);
            break;

        case 'adaptiveThreshold':
            // algorithm calculate the threshold for a small regions of the image
            cv.adaptiveThreshold(src, dst, threshold, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv[type], 3, 2);
            break;
        }

        cv.imshow('threshold', dst);
        dst.delete();
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <section>
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            <InputFile
                                onChange={this.handleFileChange}
                            />
                        </div>
                        <div className={cx(s.column)}>
                            <Image id="myImg" alt="Picture of sports" />
                        </div>
                    </div>

                    <h3>Color Conversion</h3>
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            <div>
                                <InputSelect
                                    onChange={this.handleColorConversionChange}
                                    keyPath="key"
                                    valuePath="value"
                                    options={this.state.colorConversions}
                                    selectedKey={this.state.colorConversionSelection}
                                />
                            </div>
                        </div>
                        <div className={cx(s.column)}>
                            <canvas id="colorConversion" />
                        </div>
                    </div>

                    <h3>Mask</h3>
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            <CVUpperLowerMaskControls
                                lowerMask={this.state.lowerMask}
                                upperMask={this.state.upperMask}
                                onChange={this.handleMaskChange}
                            />
                        </div>
                        <div className={cx(s.column)}>
                            <canvas id="mask" />
                        </div>
                    </div>

                    <h3>Threshold</h3>
                    <div className={s.row}>
                        <div className={cx(s.column)}>

                            {this.getThresholdRadios()}
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                            Threshold: {this.state.thresholdValue}
                                </div>
                                <div className={cx(s.column)}>
                                    <InputRange
                                        id="range"
                                        min={0}
                                        max={255}
                                        value={this.state.thresholdValue}
                                        onInput={this.handleThresholdChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <InputSelect
                                    onChange={this.handleThresholdTypeChange}
                                    keyPath="key"
                                    valuePath="value"
                                    options={this.getThresholdOptions()}
                                    selectedKey={this.state.selectedKey}
                                />
                            </div>
                        </div>
                        <div className={cx(s.column)}>
                            <canvas id="threshold" />
                        </div>
                    </div>

                </section>
                { this.state.isLoading && <Modal id="loadingModal" appState={this.props.appState}><Loader /></Modal> }
            </div>
        );
    }
}

export default withStyles(s)(CVImages);
