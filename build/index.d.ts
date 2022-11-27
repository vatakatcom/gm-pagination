import { Context } from "grammy";
import { MenuFlavor, MenuRange } from "@grammyjs/menu";
import { RowButton } from "./utils/paginated.js";
import { encodeMatch } from "./utils/encodematch.js";
export declare function usePagination<C extends Context & MenuFlavor = Context & MenuFlavor>(getButtons: (ctx: C) => Promise<RowButton<C>[]>, pageSize?: number): (ctx: C, range: MenuRange<C>) => Promise<MenuRange<C>>;
export type { RowButton };
export { encodeMatch };
export default usePagination;
