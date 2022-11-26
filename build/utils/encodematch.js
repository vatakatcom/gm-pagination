export function encodeMatch(str, match) {
    const result = {};
    const arr = str?.split(";") ?? [];
    match.forEach((b) => {
        arr.forEach((a) => {
            if (new RegExp(`${b}:`).test(a)) {
                result[b] = Number(a.replace(`${b}:`, ""));
                if (Number.isNaN(result[b]))
                    result[b] = a.replace(`${b}:`, "");
            }
        });
    });
    return result;
}
//# sourceMappingURL=encodematch.js.map