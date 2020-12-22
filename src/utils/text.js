export function getFirstChar() {
    for (let index = 0; index < arguments.length; index++) {
        if (arguments[index]) {
            return arguments[index].charAt(0);
        }
    }
}