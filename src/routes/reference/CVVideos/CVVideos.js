import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CVVideos.css';
import Base from '../../../components/Base';
import Scripts from '../../../utils/scripts';
import OpenCv from '../../../utils/opencv';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import Tabs from '../../../components/Tabs';
import CVUpperLowerMaskControls from '../CVUpperLowerMaskControls';


export class CVVideos extends Base {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            processingTime: 0,
            imageProcess: 'ballTrack',
            lowerMask: [82, 7, 0, 0],
            upperMask: [174, 61, 49, 255],
        };
    }

    componentDidMount() {
        Scripts.getOpenCv(document).then(() => {
            this.setState({ isLoading: false });

            const video = document.getElementById('videoInput');
            navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    console.log(`An error occured! ${err}`);
                });

            this.processVideo(
                new cv.VideoCapture(video),
                new cv.Mat(video.height, video.width, cv.CV_8UC4),
                new cv.Mat(video.height, video.width, cv.CV_8UC1),
                'canvasOutput',
                this.processImage.bind(this),
            );
        });
    }

    processVideo = (cap, src, dst, outputId, fn) => {
        const FPS = 30;
        const begin = Date.now();
        // start processing.
        cap.read(src);

        fn(src, dst);

        cv.imshow(outputId, dst);
        // schedule the next one.
        const delay = 1000 / FPS - (Date.now() - begin);
        setTimeout(() => {
            this.processVideo(cap, src, dst, outputId, fn);
        }, delay);

        this.setState({ processingTime: delay.toFixed(2) });
    }
    processImage(src, dst) {
        switch (this.state.imageProcess) {
        case 'ballTrack':
            this.ballTrack(src, dst);
            break;

        case 'opticalFlow':
            break;
        }
    }

    handleMaskChange = (lowerMaskScalar, upperMaskScalar) => {
        this.setState({ lowerMask: lowerMaskScalar, upperMask: upperMaskScalar });
    }

    ballTrack(src, dst) {
        OpenCv.inRange(src, dst, this.state.lowerMask, this.state.upperMask);
        OpenCv.erodeDilate(dst, dst);

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        OpenCv.drawContours(contours, hierarchy, dst);
    }

    getControls = (imageProcess) => {
        switch (imageProcess) {
        case 'ballTrack':
            return (
                <div>
                    <CVUpperLowerMaskControls
                        lowerMask={this.state.lowerMask}
                        upperMask={this.state.upperMask}
                        onChange={this.handleMaskChange}
                    />
                </div>
            );
            break;
        }

        return null;
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <section>
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            Original
                            <div>FPS: {this.state.processingTime}</div>
                        </div>
                        <div className={cx(s.column)}>
                            <video id="videoInput" width="320" height="240" />
                        </div>
                    </div>
                    <Tabs
                        array={[
                            {
                                text: 'Ball Track',
                                key: 'ballTrack',
                            },
                            {
                                text: 'Optical Flow',
                                key: 'opticalFlow',
                            },
                        ]}
                        keyPath="key"
                        textPath="text"
                        currentSelection={this.state.imageProcess}
                        onClick={(key) => { this.setState({ imageProcess: key }); }}
                    />
                    <div className={s.row}>
                        <div className={cx(s.column)}>
                            {this.getControls(this.state.imageProcess)}
                        </div>
                        <div className={cx(s.column)}>
                            <canvas id="canvasOutput" width="320" height="240" />
                        </div>
                    </div>
                </section>
                { this.state.isLoading && <Modal id="loadingModal" appState={this.props.appState}><Loader /></Modal> }
            </div>
        );
    }
}

export default withStyles(s)(CVVideos);
