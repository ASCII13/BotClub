export function getDateStringWithoutYear() {
    const date = new Date();
    const month =  date.getMonth() + 1;
    const day = date.getDate();

    return month.toString() + day.toString();
}