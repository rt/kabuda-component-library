import { getStore } from '../stores/data-store/data-store';
import User from '../models/user';

//TODO: get rid of this
import Ajax from '../../../utils/ajax';


export function init() {
    return new Promise((resolve, reject) => {
        fetch('/init', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then((res) => {
            res.json().then((res) => {
                getStore().createUser(new User(res.data.user));
                resolve(data);
            }).catch((e) => {
                resolve();
            });
        });
    });
}


export function login(username, password) {
    // post /users   ??? json api
    return Ajax.post('/login', { username, password }).then((data) => {
        getStore().createUser(new User(data));
        // history.push('/');
    });
}

export function register(username, password) {
    return Ajax.post('/register', { username, password }).then((data) => {
    });
}

export function logout() {
    return new Promise((resolve, reject) => {
        fetch('/logout', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        }).then((res) => {
            res.json().then((res) => {
                window.location.assign('/');
                resolve();
            });
        });
    });
}

export function setReferenceRoute() {
    return new Promise((resolve, reject) => {
        const store = getStore();
        const reference = store.getReference();
        reference.currentPanel = reference.currentPanel || 'typography';
        store.setReference(reference);
        resolve();
    });
}
/**
 * @param {string}
 */
export function changePanel(panel) {
    const store = getStore();
    const reference = store.getReference();
    reference.currentPanel = panel;
    store.setReference(reference);
}

