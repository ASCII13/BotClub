import Cookies from 'js-cookie';

const KEY_MODE = 'mode';
const KEY_KEYWORDS = 'keywords';

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