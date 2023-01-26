# Pagination for Grammy Menu

Usage example
```ts
import { Menu } from "@grammyjs/menu";
import { usePagination } from "@vtkcom/gm-pagination";

const menu = new Menu<Context>("menu", { onMenuOutdated: false });

menu
	.dynamic(
		usePagination(async (ctx) => {
			const list = [0,1,2,3,4,5,6,7,8,9]

			return list.map((a, i) => ({
				text: a,
				payload: `id:${i}`,
				callback: fn(a),
			}));
		}, 5)
	)

export { menu };
```