export function encodeMatch(str) {
    const result = {
        p: 1,
    };
    const arr = str?.split(";") ?? [];
    arr.forEach((a) => {
        if (new RegExp("p:").test(a)) {
            result.p = Number(a.replace("p:", ""));
        }
        if (new RegExp("c:").test(a)) {
            result.c = Number(a.replace("c:", ""));
        }
        if (new RegExp("s:").test(a)) {
            result.s = Number(a.replace("s:", ""));
        }
    });
    return result;
}
//# sourceMappingURL=index.js.map