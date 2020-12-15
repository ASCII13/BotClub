export function getDateStringWithoutYear() {
    let date = new Date();
    let month =  date.getMonth + 1;
    let day = date.getDay();

    return month + day;
}