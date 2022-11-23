export function str2num(str) {
    return [...str]
        .map((i) => {
        if (isFinite(i) === true || i === ".") {
            return i;
        }
        else {
            return " ";
        }
    })
        .join("")
        .split(" ")
        .filter((i) => i != "")
        .map((i) => Number(i))[0];
}
//# sourceMappingURL=str2num.js.map