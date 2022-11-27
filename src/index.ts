import { Context } from "grammy";
import { MenuFlavor, MenuRange } from "@grammyjs/menu";
import { paginated, RowButton } from "./utils/paginated.js";
import { encodeMatch } from "./utils/encodematch.js";
import { replaceMatch } from "./utils/replacematch.js";
import { str2num } from "./utils/str2num.js";

export function usePagination<C extends Context = Context>(
	getButtons: (ctx: C) => Promise<RowButton<C>[]>,
	pageSize = 5
): (ctx: C, range: MenuRange<C>) => Promise<MenuRange<C>> {
	return async (ctx, range) => {
		try {
			const buttons = await getButtons(ctx);
			const { p } = encodeMatch(ctx.match as string, ["p"]);

			const { empty, pagination, rows } = paginated(buttons, pageSize, (p as number) ?? 1);

			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];

				if (typeof row.submenu === "undefined") {
					range
						.text(
							{ text: row.text, payload: [row.payload, `p:${p ?? 1}`].join(";") },
							row.callback!
						)
						.row();
				} else {
					range
						.submenu(
							{ text: row.text, payload: [row.payload, `p:${p ?? 1}`].join(";") },
							row.submenu,
							row.callback!
						)
						.row();
				}
			}

			for (let i = 0; i < empty.length; i++) range.text("").row();

			pagination.forEach((a) =>
				range.text(
					{
						text: a.text,
						payload:
							typeof ctx.match !== "undefined" && (ctx.match as string) !== ""
								? replaceMatch("p", str2num(a.payload), ctx.match as string)
								: a.payload,
					},
					a.callback!
				)
			);
		} catch (error) {
			throw error;
		}

		return range;
	};
}

export type { RowButton };
export { encodeMatch };

export default usePagination;
