import { Context } from "grammy";
import { MenuRange } from "@grammyjs/menu";
import { paginated, RowButton } from "./utils/paginated.js";
import { encodeMatch } from "./utils/encodematch.js";

export function usePagination<C extends Context = Context>(
	getButtons: (ctx: C) => Promise<RowButton<C>[]>
): (ctx: C, range: MenuRange<C>) => Promise<MenuRange<C>> {
	return async (ctx, range) => {
		try {
			const buttons = await getButtons(ctx);
			const { p } = encodeMatch(ctx.match as string, ["p"]);

			const { empty, pagination, rows } = paginated(buttons, 7, p);

			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];

				if (typeof row.submenu === "undefined") {
					range
						.text({ text: row.text, payload: [row.payload, `p:${p}`].join(";") }, row.callback)
						.row();
				} else {
					range
						.submenu(
							{ text: row.text, payload: [row.payload, `p:${p}`].join(";") },
							row.submenu,
							row.callback
						)
						.row();
				}
			}

			for (let i = 0; i < empty.length; i++) range.text("").row();

			pagination.forEach((a) =>
				range.text({ text: a.text, payload: a.payload }, (ctx) => ctx.menu.update())
			);
		} catch (error) {
			throw error;
		}

		return range;
	};
}

export type { RowButton };

export default usePagination;
