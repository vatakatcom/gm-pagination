export function paginated(array, pageSize, index) {
    const pagesCount = Math.ceil(array.length / pageSize);
    const pageNumber = index > pagesCount ? pagesCount : index;
    const rows = array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    const emptyCount = pageSize - (rows.length % pageSize);
    const isMiddle = pageNumber > 3 && pagesCount - pageNumber >= 3;
    const isEmptyRows = emptyCount < pageSize && pageNumber === pagesCount;
    const isOne = pagesCount === 1;
    const isCountLessPagination = pagesCount <= 5;
    const isStart = pageNumber <= 3;
    const isEnd = pagesCount - pageNumber < 3;
    const result = {
        rows,
        count: pagesCount,
        pagination: [],
        empty: [],
        index: pageNumber,
    };
    if (isEmptyRows)
        for (let i = 0; i < emptyCount; i++)
            result.empty.push(null);
    if (isOne) {
        result.pagination.push({ text: "", payload: "" }, { text: "", payload: "" });
        return result;
    }
    if (isCountLessPagination)
        for (let i = 1; i <= pagesCount; i++)
            result.pagination.push(button(i, i === pageNumber ? "\u00B7 $ \u00B7" /* Pagination.STAY */ : "$" /* Pagination.EMPTY */));
    // Start list
    if (!isCountLessPagination && !isMiddle && isStart) {
        for (let i = 1; i <= 3; i++)
            result.pagination.push(button(i, i === pageNumber ? "\u00B7 $ \u00B7" /* Pagination.STAY */ : "$" /* Pagination.EMPTY */));
        result.pagination.push(button(4, "$ \u203A" /* Pagination.NEXT */), button(pagesCount, "$ \u00BB" /* Pagination.LAST */));
    }
    // Middle list
    if (!isCountLessPagination && isMiddle)
        result.pagination.push(button(1, "\u00AB $" /* Pagination.FIRST */), button(pageNumber - 1, "\u2039 $" /* Pagination.PREV */), button(pageNumber, "\u00B7 $ \u00B7" /* Pagination.STAY */), button(pageNumber + 1, "$ \u203A" /* Pagination.NEXT */), button(pagesCount, "$ \u00BB" /* Pagination.LAST */));
    // End list
    if (!isCountLessPagination && !isMiddle && isEnd) {
        result.pagination.push(button(1, "\u00AB $" /* Pagination.FIRST */), button(pagesCount - 3, "\u2039 $" /* Pagination.PREV */));
        for (let i = 2; i >= 0; i--)
            result.pagination.push(button(pagesCount - i, pagesCount - i === pageNumber ? "\u00B7 $ \u00B7" /* Pagination.STAY */ : "$" /* Pagination.EMPTY */));
    }
    return result;
}
function button(num, text) {
    return {
        text: text.replace("$", String(num)),
        payload: `p:${String(num)}`,
        callback: (ctx) => ctx.menu.update(),
    };
}
//# sourceMappingURL=paginated.js.map