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
export declare function paginated<C extends Context = Context>(array: RowButton<C>[], pageSize: number, index: number): Result<C>;
export {};
