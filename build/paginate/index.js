export function paginate(array, pageSize, index) {
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
    const pagination = [];
    const empty = [];
    if (isEmptyRows) {
        for (let i = 0; i < emptyCount; i++) {
            empty.push(null);
        }
    }
    if (isOne)
        return {
            rows,
            count: pagesCount,
            pagination: [
                { text: "", payload: "" },
                { text: "", payload: "" },
            ],
            empty,
            index: pageNumber,
        };
    if (isCountLessPagination) {
        for (let i = 1; i <= pagesCount; i++) {
            pagination.push(button(i, i === pageNumber ? "\u00B7 $ \u00B7" /* Pagination.STAY */ : "$" /* Pagination.EMPTY */));
        }
    }
    else {
        if (isMiddle) {
            // Middle list
            pagination.push(button(1, "\u00AB $" /* Pagination.FIRST */));
            pagination.push(button(pageNumber - 1, "\u2039 $" /* Pagination.PREV */));
            pagination.push(button(pageNumber, "\u00B7 $ \u00B7" /* Pagination.STAY */));
            pagination.push(button(pageNumber + 1, "$ \u203A" /* Pagination.NEXT */));
            pagination.push(button(pagesCount, "$ \u00BB" /* Pagination.LAST */));
        }
        else {
            if (isStart) {
                // Start list
                for (let i = 1; i <= 3; i++) {
                    pagination.push(button(i, i === pageNumber ? "\u00B7 $ \u00B7" /* Pagination.STAY */ : "$" /* Pagination.EMPTY */));
                }
                pagination.push(button(4, "$ \u203A" /* Pagination.NEXT */));
                pagination.push(button(pagesCount, "$ \u00BB" /* Pagination.LAST */));
            }
            if (isEnd) {
                // End list
                pagination.push(button(1, "\u00AB $" /* Pagination.FIRST */));
                pagination.push(button(pagesCount - 3, "\u2039 $" /* Pagination.PREV */));
                for (let i = 2; i >= 0; i--) {
                    pagination.push(button(pagesCount - i, pagesCount - i === pageNumber ? "\u00B7 $ \u00B7" /* Pagination.STAY */ : "$" /* Pagination.EMPTY */));
                }
            }
        }
    }
    return { rows, count: pagesCount, pagination, empty, index: pageNumber };
}
function button(num, text) {
    return {
        text: text.replace("$", String(num)),
        payload: `p:${String(num)}`,
    };
}
//# sourceMappingURL=index.js.map