import { paginated } from "./utils/paginated.js";
import { encodeMatch } from "./utils/encodematch.js";
import { replaceMatch } from "./utils/replacematch.js";
import { str2num } from "./utils/str2num.js";
export function usePagination(getButtons, pageSize = 5) {
    return async (ctx, range) => {
        try {
            const buttons = await getButtons(ctx);
            const { p } = encodeMatch(ctx.match, ["p"]);
            const { empty, pagination, rows } = paginated(buttons, pageSize, p ?? 1);
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                if (typeof row.submenu === "undefined") {
                    range
                        .text({ text: row.text, payload: [row.payload, `p:${p ?? 1}`].join(";") }, row.callback)
                        .row();
                }
                else {
                    range
                        .submenu({ text: row.text, payload: [row.payload, `p:${p ?? 1}`].join(";") }, row.submenu, row.callback)
                        .row();
                }
            }
            for (let i = 0; i < empty.length; i++)
                range.text("").row();
            pagination.forEach((a) => range.text({
                text: a.text,
                payload: ctx.match !== ""
                    ? replaceMatch("p", str2num(a.payload), ctx.match)
                    : a.payload,
            }, (ctx) => ctx.menu.update()));
        }
        catch (error) {
            throw error;
        }
        return range;
    };
}
export { encodeMatch };
export default usePagination;
//# sourceMappingURL=index.js.map