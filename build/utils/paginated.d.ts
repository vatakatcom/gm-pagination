import { MenuFlavor } from "@grammyjs/menu";
import { Context } from "grammy";
export interface Button {
    text: string;
    payload: string;
}
export interface RowButton<C extends Context = Context & MenuFlavor> extends Button {
    callback: (ctx: C) => void;
    submenu?: string;
}
interface Result<C extends Context = Context & MenuFlavor> {
    rows: RowButton<C>[];
    pagination: Button[];
    count: number;
    index: number;
    empty: null[];
}
export declare function paginated<C extends Context = Context & MenuFlavor>(array: RowButton<C>[], pageSize: number, index: number): Result<C>;
export {};
