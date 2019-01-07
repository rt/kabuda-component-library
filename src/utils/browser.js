

export default class Scripts {

    static getVideo(document,) {

        let video = document.getElementById('videoInput');
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occured! " + err);
            });

        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        let dst = new cv.Mat(video.height, video.width, cv.CV_8UC1);
        let cap = new cv.VideoCapture(video);

            const FPS = 30;
            function processVideo() {
                let begin = Date.now();
                // start processing.
                cap.read(src);


                const lower = [82, 7, 0, 0];
                const upper = [174, 61, 40, 255];

                let low = new cv.Mat(src.rows, src.cols, src.type(), lower);
                let high = new cv.Mat(src.rows, src.cols, src.type(), upper);
                cv.inRange(src, low, high, dst);

                let M = cv.Mat.ones(2, 2, cv.CV_8U);
                let anchor = new cv.Point(-1, -1);
                cv.erode(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
                cv.dilate(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());


                let contours = new cv.MatVector();
                let hierarchy = new cv.Mat();

                cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
                
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
                        let color = new cv.Scalar(255, 255, 255);
                        cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
                    }

                }

                cv.imshow('canvasOutput', dst);
                // schedule the next one.
                let delay = 1000/FPS - (Date.now() - begin);
                setTimeout(processVideo, delay);
            };
            processVideo();
    }


}
