import Cookies from 'js-cookie';


const KEY_KEYWORDS = 'keywords';

export function setKeywords(keywords) {
    return Cookies.set(KEY_KEYWORDS, keywords);
}

export function getKeywords() {
    return Cookies.get(KEY_KEYWORDS);
}