export function replaceMatch(key, value, payload) {
    return (payload?.split(";") ?? [])
        .map((a) => (new RegExp(`${key}:`).test(a) ? `${key}:${value}` : a))
        .join(";");
}
//# sourceMappingURL=replacematch.js.map