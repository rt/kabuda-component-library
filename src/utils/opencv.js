
// assumes browser opencv

export default class OpenCv {
    /**
     * @param {cv.Mat} src
     * @param {cv.Mat} dst
     */
    static erodeDilate(src, dst) {
        const M = cv.Mat.ones(2, 2, cv.CV_8U);
        const anchor = new cv.Point(-1, -1);
        cv.erode(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
        cv.dilate(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    }

    /**
     * @param {cv.Mat} src
     * @param {cv.Mat} dst
     * @param {Array} lower
     * @param {Array} upper
     */
    static inRange(src, dst, lower, upper) {
        const low = new cv.Mat(src.rows, src.cols, src.type(), lower);
        const high = new cv.Mat(src.rows, src.cols, src.type(), upper);
        cv.inRange(src, low, high, dst);
    }

    /**
     * @param {} contours
     * @param {} hierarchy
     * @param {cv.Mat} dst
     * pts?
     */
    static drawContours(contours, hierarchy, dst) {
        if (contours.size() > 0) {
            let max = 0;
            let maxSize = 0;
            for (let i = 0; i < contours.size(); ++i) {
                const contour = contours.get(i);
                const area = cv.contourArea(contour, false);
                if (area > maxSize) {
                    maxSize = area;
                    max = i;
                }
                const color = new cv.Scalar(255, 255, 255);
                cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
            }

            const theContour = contours.get(max);
            const circle = cv.minEnclosingCircle(theContour);
            const circleColor = new cv.Scalar(255, 0, 0);
            cv.circle(dst, circle.center, circle.radius, circleColor, 1);

            // draw line?
            // cv.line(pts)
        }
    }

    static getContourCenter(cnt) {
        const moments = cv.moments(cnt, false);
        const x = moments.m10 / moments.m00;
        const y = moments.m01 / moments.m00;
        return { x, y };
    }
}
