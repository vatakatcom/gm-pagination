import type { Context } from "grammy";
import type { MenuRange } from "@grammyjs/menu";
import { paginated, RowButton } from "./utils/paginated.js";
import { encodeMatch } from "./utils/encodematch.js";
import { replaceMatch } from "./utils/replacematch.js";
import { str2num } from "./utils/str2num.js";

export function usePagination<C extends Context = Context>(
	getButtons: (ctx: C) => Promise<RowButton<C>[]>,
	pageSize = 5
): (ctx: C, range: MenuRange<C>) => Promise<MenuRange<C>> {
	return async (ctx, range) => {
		const match = ctx.match as string;
		const { p } = encodeMatch(match, ["p"]);
		const { rows, empty, pagination } = paginated(
			await getButtons(ctx),
			pageSize,
			(p as number) ?? 1
		);

		rows.forEach((row) => {
			const button = { text: row.text, payload: [row.payload, `p:${p ?? 1}`].join(";") };
			typeof row.submenu === "undefined"
				? range.text(button, row.callback!).row()
				: range.submenu(button, row.submenu, row.callback!).row();
		});

		empty.forEach(() => range.text("").row());

		pagination.forEach((button) =>
			range.text(
				{
					text: button.text,
					payload:
						typeof match !== "undefined" && match !== ""
							? replaceMatch("p", str2num(button.payload), match)
							: button.payload,
				},
				button.callback!
			)
		);

		return range;
	};
}

export type { RowButton };
export { encodeMatch };

export default usePagination;
