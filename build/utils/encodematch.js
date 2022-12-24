export function encodeMatch(str, match) {
    const result = {};
    match.forEach((key) => {
        const keyString = `${key}:`;
        (str?.split(";") ?? []).forEach((item) => {
            if (new RegExp(keyString).test(item)) {
                const pureItem = item.replace(keyString, "");
                result[key] = Number(pureItem);
                if (Number.isNaN(result[key]))
                    result[key] = pureItem;
            }
        });
    });
    return result;
}
//# sourceMappingURL=encodematch.js.map