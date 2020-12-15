import date from './date';

export function isChristmas() {
    const christmas = '1225';
    const currDate = date.getDateStringWithoutYear();

    if (currDate === christmas) {
        return true;
    } else {
        return false;
    }
}