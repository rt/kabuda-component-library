
export default class Scripts {
    static getOpenCv(document) {
        return new Promise((resolve, reject) => {
            let el = document.getElementById('opencvlib');
            if (!el) {
                el = document.createElement('script');
                el.id = 'opencvlib';
                el.addEventListener('load', () => {
                    // resolve(cv); i couldn't do this, is cv too big???
                    resolve();
                });

                el.addEventListener('error', () => {
                    console.log('couldnt load opencv');
                });

                el.src = 'https://docs.opencv.org/3.3.1/opencv.js';
                const tar = document.getElementsByTagName('head')[0];
                tar.appendChild(el);
            } else {
                resolve();
            }
        });
    }
}
