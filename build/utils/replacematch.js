export function replaceMatch(key, value, payload) {
    const arr = payload.split(";") ?? [];
    return arr
        .map((a) => {
        if (new RegExp(`${key}:`).test(a))
            return `${key}:${value}`;
        return a;
    })
        .join(";");
}
//# sourceMappingURL=replacematch.js.map