import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CVContours.css';
import Base from '../../../components/Base';
import Section from '../Section';
import SubSection from '../SubSection';
import Image from '../../../components/Image';
import Hr from '../../../components/Hr';
import Modal from '../../../components/Modal';
import Loader from '../../../components/Loader';
import InputFile from '../../../components/InputFile';
import Scripts from '../../../utils/scripts';
import InputRadioButton from '../../../components/InputRadioButton';
import InputSelect from '../../../components/InputSelect';
import InputRange from '../../../components/InputRange';

export class CVContours extends Base {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,

            contours: {
                num: 0,
                cx: null,
                cy: null,
            },
        };
    }

    componentDidMount() {
        Scripts.getOpenCv(document).then(() => {
            this.setState({ isLoading: false });
            const myImg = document.getElementById('myImg');
            myImg.onload = () => {
                this.src = cv.imread('myImg');
                this.drawContours(this.src);
                // this.houghCircles(this.src);
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

    houghCircles = (src) => {
        const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8U);
        const dst1 = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

        const lower = [82, 7, 0, 0];
        const upper = [174, 61, 40, 255];

        const low = new cv.Mat(src.rows, src.cols, src.type(), lower);
        const high = new cv.Mat(src.rows, src.cols, src.type(), upper);
        cv.inRange(src, low, high, dst);

        const circles = new cv.Mat();
        const color = new cv.Scalar(255, 0, 0);
        cv.HoughCircles(dst, circles, cv.HOUGH_GRADIENT, 1, 45, 75, 40, 0, 0);
        // draw circles
        console.log(`SIZE: ${circles.cols}`);
        for (let i = 0; i < circles.cols; ++i) {
            const x = circles.data32F[i * 3];
            const y = circles.data32F[i * 3 + 1];
            const radius = circles.data32F[i * 3 + 2];
            const center = new cv.Point(x, y);
            cv.circle(dst1, center, radius, color);
        }
        cv.imshow('drawContours', dst1);

        dst.delete();
        dst1.delete();
    }

    /**
     * For better accuracy, use binary images. apply threshold or canny edge detection (object is white, background black).
     * Since opencv 3.2 source image is not modified by this function.
     */
    drawContours = (src) => {
        const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
        const dst1 = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

        const lower = [82, 7, 0, 0];
        const upper = [174, 61, 40, 255];

        const low = new cv.Mat(src.rows, src.cols, src.type(), lower);
        const high = new cv.Mat(src.rows, src.cols, src.type(), upper);
        cv.inRange(src, low, high, dst);

        const M = cv.Mat.ones(2, 2, cv.CV_8U);
        const anchor = new cv.Point(-1, -1);
        cv.erode(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
        cv.dilate(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();

        cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
        // cv.findContours(src, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_NONE);

        console.log(`SIZE: ${contours.size()}`);
        if (contours.size() > 0) {
            let max = null;
            let maxSize = 0;
            for (let i = 0; i < contours.size(); ++i) {
                const contour = contours.get(i);
                const area = cv.contourArea(contour, false);
                if (area > maxSize) {
                    maxSize = area;
                    max = i;
                }
                const color = new cv.Scalar(255, 255, 255);
                cv.drawContours(dst1, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
            }


            const theContour = contours.get(max);
            console.log(`MAX: ${max}`);
            console.log(`AREA: ${maxSize}`);
            const circle = cv.minEnclosingCircle(theContour);
            console.log(`RADIUS: ${circle.radius}`);
            const circleColor = new cv.Scalar(255, 0, 0);
            cv.circle(dst1, circle.center, circle.radius, circleColor, 1);

            const moments = cv.moments(theContour, false);
            const x = moments.m10 / moments.m00;
            const y = moments.m01 / moments.m00;
            console.log(`CENTER: ${x}, ${y}`);
        }

        cv.imshow('drawContours', dst1);

        this.contourApprox(src, contours, hierarchy);


        const data = {
            num: contours.size(),
        };

        // moments
        const cnt = contours.get(0);
        // You can try more different parameters
        const Moments = cv.moments(cnt, false);
        data.cx = Moments.m10 / Moments.m00;
        data.cy = Moments.m01 / Moments.m00;

        data.area = cv.contourArea(cnt, false);
        data.perimeter = cv.arcLength(cnt, true);

        dst.delete();
        dst1.delete();
        contours.delete();
        hierarchy.delete();

        this.setState({ contours: data });
    }

    contourApprox = (src, contours, hierarchy) => {
        const dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

        const poly = new cv.MatVector();
        // approximates each contour to polygon
        for (let i = 0; i < contours.size(); ++i) {
            const tmp = new cv.Mat();
            const cnt = contours.get(i);
            // You can try more different parameters
            cv.approxPolyDP(cnt, tmp, 3, true);
            poly.push_back(tmp);
            cnt.delete(); tmp.delete();
        }
        // draw contours with random Scalar
        for (let i = 0; i < contours.size(); ++i) {
            // let color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
            const color = new cv.Scalar(255, 255, 255);
            cv.drawContours(dst, poly, i, color, 1, 8, hierarchy, 0);
        }
        cv.imshow('approxContours', dst);
        dst.delete();
        poly.delete();
    }

    render() {
        return (
            <div data-e2e={this.e2e()} className={s.root}>
                <Section title="Image Input">
                    <SubSection>
                        <div key="main">
                            <InputFile
                                onChange={this.handleFileChange}
                            />
                            <div>
                                <Image id="myImg" alt="Picture of sports" />
                            </div>
                            <Hr />

                            <h3>Draw Contours</h3>
                            <p />
                            <div className={s.row}>
                                <div className={cx(s.column)}>
                                    <canvas id="drawContours" />
                                    <canvas id="approxContours" />
                                </div>
                                <div className={cx(s.column)}>
                                    <ul>
                                        <li>Contours: {this.state.contours.num}</li>
                                        <li>First Contour Centrod: Cx({this.state.contours.cx}), Cy({this.state.contours.cy})</li>
                                        <li>First Contour Area: {this.state.contours.area}</li>
                                        <li>First Contour Perimeter: {this.state.contours.perimeter}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div key="notes" />
                    </SubSection>
                </Section>
                { this.state.isLoading && <Modal id="loadingModal" appState={this.props.appState}><Loader /></Modal> }
            </div>
        );
    }
}

export default withStyles(s)(CVContours);
