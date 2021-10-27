export function getDateStringWithoutYear() {
    const date = new Date();
    const month =  date.getMonth() + 1;
    const day = date.getDate();

    return month.toString() + day.toString();
}
export function getDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}-${month}-${day}`;
}