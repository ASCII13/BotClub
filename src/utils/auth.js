import Cookies from 'js-cookie';


const KEY_COOKIE = 'cookie';
const KEY_USERNAME = 'username';

export function getCookie() {
    return Cookies.get(KEY_COOKIE);
}

export function setCookie(cookie) {
    return Cookies.set(KEY_COOKIE, cookie);
}

export function getUsername() {
    return Cookies.get(KEY_USERNAME);
}

export function setUsername(name) {
    return Cookies.set(KEY_USERNAME, name);
}

export function removeUsername() {
    return Cookies.remove(KEY_USERNAME);
}