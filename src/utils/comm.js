
import fetch from '../core/fetch';

// ----- encapsulate comm logic

// right now because routes need fetch (depends on Promise > multiple implementations) global cookies is easier
// we can revisit when Promise is native
export default class Comm {
    static get(url, data) {
        console.log(url);
        // return new Promise((resolve, reject) => {
        return fetch(url, {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({}),
            credentials: 'include',
        }).then((res) => {
            const ret = res.json();
            console.log(`GET: ${JSON.stringify(ret)}`);
            if (ret.meta && ret.meta.csrfToken) {
                Comm.csrfToken = ret.meta.csrfToken;
            }
            // resolve(ret.data);
        }).catch((e) => {
            console.log(`ERROR: ${JSON.stringify(e)}`);
            // check meta for server errors
            // reject(e);
        });

        // });
    }
}

