import { getComm, getFetch } from '../utils/comm';
import { getStore } from '../stores/data-store';
import User from '../models/user';

export function login(username, password) {
    // post /users   ??? json api
    return getComm().post('/login', { username, password }).then((data) => {
        getStore().createUser(new User(data));
        // history.push('/');
    });
}

export function register(username, password) {
    return getComm().post('/register', { username, password }).then((data) => {
    });
}

export function logout() {
    return new Promise((resolve, reject) => {
        getFetch()('/logout', {
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

export function getUsers() {
    return new Promise((resolve, reject) => {
        getFetch()('/users', {
            method: 'get',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({/}),
            credentials: 'include',
        }).then((res) => {
            res.json().then((res) => {
                getStore().setSomething(res.data);
                resolve();
            });
        });
    });
}

export function updateUsername(username) {
    console.log(`save username to store ${username}`);
}

export function updatePassword(password) {
    console.log(`save password to store ${password}`);
}
