import { getDateStringWithoutYear } from './date';

export function isChristmas() {
    const christmas = '1225';
    const currDate = getDateStringWithoutYear();

    if (currDate === christmas) {
        return true;
    } else {
        return false;
    }
}