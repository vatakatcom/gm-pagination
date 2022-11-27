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
	const pagination: Button<C & MenuFlavor>[] = [];
	const empty: null[] = [];

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
			pagination.push(button(i, i === pageNumber ? Pagination.STAY : Pagination.EMPTY));
		}
	} else {
		if (isMiddle) {
			// Middle list
			pagination.push(button(1, Pagination.FIRST));
			pagination.push(button(pageNumber - 1, Pagination.PREV));
			pagination.push(button(pageNumber, Pagination.STAY));
			pagination.push(button(pageNumber + 1, Pagination.NEXT));
			pagination.push(button(pagesCount, Pagination.LAST));
		} else {
			if (isStart) {
				// Start list
				for (let i = 1; i <= 3; i++) {
					pagination.push(button(i, i === pageNumber ? Pagination.STAY : Pagination.EMPTY));
				}

				pagination.push(button(4, Pagination.NEXT));
				pagination.push(button(pagesCount, Pagination.LAST));
			}
			if (isEnd) {
				// End list
				pagination.push(button(1, Pagination.FIRST));
				pagination.push(button(pagesCount - 3, Pagination.PREV));

				for (let i = 2; i >= 0; i--) {
					pagination.push(
						button(
							pagesCount - i,
							pagesCount - i === pageNumber ? Pagination.STAY : Pagination.EMPTY
						)
					);
				}
			}
		}
	}

	return {
		rows,
		count: pagesCount,
		pagination,
		empty,
		index: pageNumber,
	};
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
