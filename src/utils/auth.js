import Cookies from 'js-cookie';

const KEY_USER = 'user';
const KEY_COOKIE = 'cookie';

export function getCookie() {
    return Cookies.get(KEY_COOKIE);
}

export function setCookie(cookie) {
    return Cookies.set(KEY_COOKIE, cookie);
}

export function removeCookie() {
    return Cookies.remove(KEY_COOKIE);
}

export function getUser() {
    return Cookies.get(KEY_USER);
}

export function setUser(user) {
    return Cookies.set(KEY_USER, user);
}

export function removeUser() {
    return Cookies.remove(KEY_USER);
}