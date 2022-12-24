export function str2num(str) {
    return [...str]
        .map((i) => (isFinite(Number(i)) === true || i === "." ? i : " "))
        .join("")
        .split(" ")
        .filter((i) => i !== "")
        .map((i) => Number(i))[0];
}
//# sourceMappingURL=str2num.js.map