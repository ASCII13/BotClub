import Cookies from 'js-cookie';

const KEY_MODE = 'mode';
const KEY_KEYWORDS = 'keywords';
const KEY_FIXED_HEADER = 'fixedHeader';

export function setKeywords(keywords) {
    return Cookies.set(KEY_KEYWORDS, keywords);
}

export function getKeywords() {
    return Cookies.get(KEY_KEYWORDS);
}

export function setMode(mode) {
    return Cookies.set(KEY_MODE, mode);
}

export function getMode() {
    return Cookies.get(KEY_MODE);
}

export function isFixedHeader() {
    return Boolean(Number(Cookies.get(KEY_FIXED_HEADER)));
}

export function setHeaderStatus(val) {
    let state;
    if (val) {
        state = 1;
    } else {
        state = 0;
    }
    return Cookies.set(KEY_FIXED_HEADER, state);
}