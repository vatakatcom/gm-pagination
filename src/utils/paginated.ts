import { MenuFlavor } from "@grammyjs/menu";
import { Context } from "grammy";

export interface Button<C extends Context = Context> {
	text: string;
	payload: string;
	callback?: (ctx: C) => void;
}

export interface RowButton<C extends Context = Context> extends Button<C> {
	submenu?: string;
}

interface Result<C extends Context = Context> {
	rows: RowButton<C>[];
	pagination: Button<C & MenuFlavor>[];
	count: number;
	index: number;
	empty: null[];
}

const enum Pagination {
	FIRST = "« $",
	PREV = "‹ $",
	STAY = "· $ ·",
	NEXT = "$ ›",
	LAST = "$ »",
	EMPTY = "$",
}

export function paginated<C extends Context = Context>(
	array: RowButton<C>[],
	pageSize: number,
	index: number
): Result<C> {
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
	const result: Result<C> = {
		rows,
		count: pagesCount,
		pagination: [],
		empty: [],
		index: pageNumber,
	};

	if (isEmptyRows) for (let i = 0; i < emptyCount; i++) result.empty.push(null);

	if (isOne) {
		result.pagination.push({ text: "", payload: "" }, { text: "", payload: "" });
		return result;
	}

	if (isCountLessPagination)
		for (let i = 1; i <= pagesCount; i++)
			result.pagination.push(button(i, i === pageNumber ? Pagination.STAY : Pagination.EMPTY));

	// Start list
	if (!isCountLessPagination && !isMiddle && isStart) {
		for (let i = 1; i <= 3; i++)
			result.pagination.push(button(i, i === pageNumber ? Pagination.STAY : Pagination.EMPTY));
		result.pagination.push(button(4, Pagination.NEXT), button(pagesCount, Pagination.LAST));
	}

	// Middle list
	if (!isCountLessPagination && isMiddle)
		result.pagination.push(
			button(1, Pagination.FIRST),
			button(pageNumber - 1, Pagination.PREV),
			button(pageNumber, Pagination.STAY),
			button(pageNumber + 1, Pagination.NEXT),
			button(pagesCount, Pagination.LAST)
		);

	// End list
	if (!isCountLessPagination && !isMiddle && isEnd) {
		result.pagination.push(button(1, Pagination.FIRST), button(pagesCount - 3, Pagination.PREV));
		for (let i = 2; i >= 0; i--)
			result.pagination.push(
				button(pagesCount - i, pagesCount - i === pageNumber ? Pagination.STAY : Pagination.EMPTY)
			);
	}

	return result;
}

function button<C extends Context = Context>(
	num: number,
	text: Pagination
): Button<C & MenuFlavor> {
	return {
		text: text.replace("$", String(num)),
		payload: `p:${String(num)}`,
		callback: (ctx) => ctx.menu.update(),
	};
}
